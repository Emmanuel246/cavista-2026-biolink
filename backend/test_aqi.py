import asyncio
from aqi_service import fetch_aqi, get_aqi_with_fallback


async def main():
    print("--- Test 1: Valid Lagos coordinates ---")
    result = await get_aqi_with_fallback(lat=6.5244, lon=3.3792)
    print(result)
    assert result["source"] == "open-meteo"
    assert result["coordinate_source"] == "gps"

    print("\n--- Test 2: No coordinates (default Lagos fallback) ---")
    result = await get_aqi_with_fallback()
    print(result)
    assert result["source"] == "open-meteo"
    assert result["coordinate_source"] == "default"

    print("\n--- Test 3: Bad coordinates, last known available ---")
    fake_last_known = {
        "aqi": 95,
        "pm2_5": 28.1,
        "pm10": 80.0,
        "fetched_at": "2026-02-21T22:00:00+00:00",
    }
    result = await get_aqi_with_fallback(lat=999, lon=999, last_known=fake_last_known)
    print(result)
    assert result["source"] == "last_known"
    assert result["coordinate_source"] == "cached"
    assert result["aqi"] == 95

    print("\n--- Test 4: Bad coordinates, no last known (unavailable) ---")
    result = await get_aqi_with_fallback(lat=999, lon=999)
    print(result)
    assert result["source"] == "unavailable"
    assert result["aqi"] is None

    print("\n--- All tests passed ---")


asyncio.run(main())