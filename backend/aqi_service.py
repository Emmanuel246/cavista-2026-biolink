import httpx
import os
from datetime import datetime, timezone
from fastapi import Request

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
DEFAULT_LAT = float(os.getenv("DEFAULT_LAT", 6.5244))
DEFAULT_LON = float(os.getenv("DEFAULT_LON", 3.3792))
AQI_TIMEOUT = float(os.getenv("AQI_TIMEOUT_SECONDS", 3))

OPEN_METEO_URL = (
    "https://air-quality-api.open-meteo.com/v1/air-quality"
    "?latitude={lat}&longitude={lon}"
    "&current=pm2_5,pm10,us_aqi"
)

IP_GEO_URL = "http://ip-api.com/json/{ip}?fields=status,lat,lon,city"

# Local/private IPs that cannot be geolocated
UNROUTABLE_PREFIXES = ("127.", "192.168.", "10.", "172.", "::1")


# ---------------------------------------------------------------------------
# Step 1: IP geolocation
# ---------------------------------------------------------------------------

async def get_location_from_ip(request: Request) -> dict | None:
    """
    Extracts the client IP from the request and attempts to geolocate it.
    Returns lat/lon dict or None if the IP is local or lookup fails.
    """
    # Pull real IP — accounts for reverse proxies
    forwarded_for = request.headers.get("x-forwarded-for")
    ip = forwarded_for.split(",")[0].strip() if forwarded_for else request.client.host

    # Skip immediately if local/private IP
    if any(ip.startswith(prefix) for prefix in UNROUTABLE_PREFIXES):
        print(f"[aqi_service] Local IP detected ({ip}), skipping IP geolocation.")
        return None

    try:
        async with httpx.AsyncClient(timeout=AQI_TIMEOUT) as client:
            response = await client.get(IP_GEO_URL.format(ip=ip))
            response.raise_for_status()
            data = response.json()

            if data.get("status") != "success":
                print(f"[aqi_service] IP geolocation failed for {ip}: {data}")
                return None

            return {
                "latitude":  data["lat"],
                "longitude": data["lon"],
                "city":      data.get("city", "Unknown"),
                "source":    "ip",
            }

    except Exception as e:
        print(f"[aqi_service] IP geolocation error: {e}")
        return None


# ---------------------------------------------------------------------------
# Step 2: Fetch AQI from Open-Meteo
# ---------------------------------------------------------------------------

async def fetch_aqi(lat: float, lon: float) -> dict | None:
    """
    Calls Open-Meteo with coordinates.
    Returns clean AQI dict or None if the call fails.
    """
    url = OPEN_METEO_URL.format(lat=lat, lon=lon)
    try:
        async with httpx.AsyncClient(timeout=AQI_TIMEOUT) as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            current = data.get("current", {})

            return {
                "aqi":        current.get("us_aqi"),
                "pm2_5":      current.get("pm2_5"),
                "pm10":       current.get("pm10"),
                "latitude":   data.get("latitude"),
                "longitude":  data.get("longitude"),
                "fetched_at": datetime.now(timezone.utc).isoformat(),
                "source":     "open-meteo",
            }

    except httpx.TimeoutException:
        print(f"[aqi_service] Open-Meteo timed out for ({lat}, {lon}).")
        return None
    except Exception as e:
        print(f"[aqi_service] Open-Meteo error: {e}")
        return None


# ---------------------------------------------------------------------------
# Step 3: Full fallback chain
# ---------------------------------------------------------------------------

async def get_aqi_with_fallback(
    lat: float | None = None,
    lon: float | None = None,
    request: Request | None = None,
    last_known: dict | None = None,
) -> dict:
    """
    Priority order:
        1. Provided coordinates (GPS from frontend)        → open-meteo
        2. IP geolocation from request                     → open-meteo
        3. Default .env coordinates (Lagos)                → open-meteo
        4. Last known good value from database             → last_known
        5. Nothing available                               → unavailable
    """

    # 1. Frontend sent GPS coordinates
    if lat is not None and lon is not None:
        result = await fetch_aqi(lat, lon)
        if result:
            result["coordinate_source"] = "gps"
            return result

    # 2. Try IP geolocation
    if request is not None:
        location = await get_location_from_ip(request)
        if location:
            result = await fetch_aqi(location["latitude"], location["longitude"])
            if result:
                result["coordinate_source"] = "ip"
                result["city"] = location.get("city")
                return result

    # 3. Default Lagos coordinates
    print("[aqi_service] Falling back to default Lagos coordinates.")
    result = await fetch_aqi(DEFAULT_LAT, DEFAULT_LON)
    if result:
        result["coordinate_source"] = "default"
        return result

    # 4. Last known good from database
    if last_known:
        print("[aqi_service] Using last known good AQI from database.")
        last_known["source"] = "last_known"
        last_known["coordinate_source"] = "cached"
        return last_known

    # 5. Nothing worked
    print("[aqi_service] No AQI data available from any source.")
    return {
        "aqi":               None,
        "pm2_5":             None,
        "pm10":              None,
        "source":            "unavailable",
        "coordinate_source": "none",
        "fetched_at":        datetime.now(timezone.utc).isoformat(),
    }