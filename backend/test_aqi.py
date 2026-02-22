import asyncio
from aqi_service import fetch_aqi, get_aqi_with_fallback


async def main():
    print("--- Test 1: Valid Lagos coordinates ---")
    result = await fetch_aqi(lat=6.5244, lon=3.3792)
    print(result)

    print("\n--- Test 2: No coordinates, no request, no last known (default fallback) ---")
    result = await get_aqi_with_fallback()
    print(result)

    print("\n--- Test 3: Bad coordinates, last known available ---")
    fake_last_known = {
        "aqi": 95,
        "pm2_5": 28.1,
        "pm10": 80.0,
        "fetched_at": "2026-02-21T22:00:00+00:00",
    }
    result = await get_aqi_with_fallback(lat=999, lon=999, last_known=fake_last_known)
    print(result)

    print("\n--- Test 4: Bad coordinates, no last known (full failure) ---")
    result = await get_aqi_with_fallback(lat=999, lon=999)
    print(result)


asyncio.run(main())