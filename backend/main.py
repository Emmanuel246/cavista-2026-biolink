from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import SensorPayload, SymptomEntry
from risk_engine import assess_environment_risk
from database import (
    init_db,
    save_sensor_reading,
    get_latest_sensor_reading,
    get_reading_history,
    save_symptom_log,
    get_latest_symptom_log,
)


# ---------------------------------------------------------------------------
# Startup: creates ecobreathe.db and tables if they don't exist
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="EcoBreathe AI",
    description="Backend bridging ESP32 hardware and the React dashboard.",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Hardware endpoint
# ---------------------------------------------------------------------------

@app.post("/sensor-data", summary="Receive data from ESP32")
async def receive_sensor_data(payload: SensorPayload):
    """
    ESP32 hits this endpoint every 30-60 seconds.
    Pulls the latest symptom log and factors it into the risk assessment.
    """
    latest_symptoms = await get_latest_symptom_log()

    risk = assess_environment_risk(
        temperature=payload.temperature,
        humidity=payload.humidity,
        aqi=payload.aqi,
        symptoms=latest_symptoms,
    )

    doc_id = await save_sensor_reading(payload.model_dump(), risk)

    return {"status": "success", "id": doc_id}


# ---------------------------------------------------------------------------
# Symptom diary endpoint
# ---------------------------------------------------------------------------

@app.post("/symptom-diary", summary="User logs current symptoms")
async def log_symptoms(entry: SymptomEntry):
    """
    Receives a structured symptom entry from the dashboard.
    Stored independently — factored into the next sensor reading automatically.
    """
    doc_id = await save_symptom_log(entry.model_dump())
    return {"status": "success", "id": doc_id}


# ---------------------------------------------------------------------------
# Dashboard read endpoints
# ---------------------------------------------------------------------------

@app.get("/latest-data", summary="Full latest record for the dashboard")
async def get_latest_data():
    """
    Frontend polls this to update charts and alerts.
    """
    doc = await get_latest_sensor_reading()
    if not doc:
        raise HTTPException(status_code=404, detail="No sensor data received yet.")
    return doc


@app.get("/risk-level", summary="Lightweight risk summary for frequent polling")
async def get_risk_level():
    """
    Smaller payload than /latest-data — poll this more frequently.
    """
    doc = await get_latest_sensor_reading()
    if not doc:
        raise HTTPException(status_code=404, detail="No data yet.")
    assessment = doc.get("health_assessment", {})
    return {
        "health_score":       assessment.get("health_score"),
        "overall_status":     assessment.get("overall_status"),
        "active_alerts":      assessment.get("active_alerts", []),
        "asthma_attack_risk": assessment.get("asthma_attack_risk"),
    }


@app.get("/history", summary="Trend data for dashboard charts")
async def get_history():
    """
    Returns last 50 readings ordered oldest-first so charts render correctly.
    """
    readings = await get_reading_history(limit=50)
    return {"readings": readings}


@app.get("/health", summary="Service health check")
async def health_check():
    return {"status": "ok", "service": "EcoBreathe AI"}