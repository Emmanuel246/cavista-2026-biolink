from typing import Optional


def assess_environment_risk(
    temperature: float,
    humidity: float,
    aqi: int,
    symptoms: Optional[dict] = None,
) -> dict:
    """
    Simplified risk engine for endpoint testing.
    Only heat stress logic is active right now.
    AQI and symptom scoring are stubbed — replace their internals
    when the logic is defined without touching anything else.
    """

    score = 100
    recommendations = []
    alerts = []

    # ------------------------------------------------------------------
    # Stage 1: Heat Stress (active)
    # ------------------------------------------------------------------
    if temperature > 32 and humidity > 70:
        heat_risk = "High"
        score -= 40
        alerts.append("High Heat Stress")
        recommendations.append(
            "Hydrate immediately and avoid outdoor physical activity."
        )
    elif temperature > 29 and humidity > 60:
        heat_risk = "Moderate"
        score -= 15
        recommendations.append(
            "Drink water regularly and take breaks in cool areas."
        )
    else:
        heat_risk = "Low"

    # ------------------------------------------------------------------
    # Stage 2: Respiratory / AQI (stub — define thresholds when ready)
    # ------------------------------------------------------------------
    respiratory_risk = "Pending"   # replace with real logic

    # ------------------------------------------------------------------
    # Stage 3: Symptom Scoring (stub — define model/rules when ready)
    # ------------------------------------------------------------------
    asthma_attack_risk = "Pending"  # replace with real logic

    # ------------------------------------------------------------------
    # Stage 4: Aggregation
    # ------------------------------------------------------------------
    final_score = max(0, score)

    if final_score >= 85:
        overall_status = "Safe"
    elif final_score >= 60:
        overall_status = "Caution"
    elif final_score >= 35:
        overall_status = "Unsafe"
    else:
        overall_status = "Dangerous"

    if not recommendations:
        recommendations = ["Conditions are optimal. Safe for all activities."]

    return {
        "health_score": final_score,
        "overall_status": overall_status,
        "heat_stress_risk": heat_risk,
        "respiratory_risk": respiratory_risk,
        "asthma_attack_risk": asthma_attack_risk,
        "active_alerts": alerts,
        "recommendations": recommendations,
    }