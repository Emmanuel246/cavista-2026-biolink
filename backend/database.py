import aiosqlite
import json
import os
from datetime import datetime, timezone

DB_PATH = os.getenv("DB_PATH", "ecobreathe.db")


# ---------------------------------------------------------------------------
# Setup — call once on startup to create tables if they don't exist
# ---------------------------------------------------------------------------

async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS sensor_readings (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp   TEXT NOT NULL,
                sensor_data TEXT NOT NULL,   -- JSON
                risk_data   TEXT NOT NULL    -- JSON
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS symptom_logs (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                logged_at TEXT NOT NULL,
                entry     TEXT NOT NULL      -- JSON
            )
        """)
        await db.commit()


# ---------------------------------------------------------------------------
# Sensor readings
# ---------------------------------------------------------------------------

async def save_sensor_reading(payload: dict, risk: dict) -> int:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "INSERT INTO sensor_readings (timestamp, sensor_data, risk_data) VALUES (?, ?, ?)",
            (
                datetime.now(timezone.utc).isoformat(),
                json.dumps(payload),
                json.dumps(risk),
            )
        )
        await db.commit()
        return cursor.lastrowid


async def get_latest_sensor_reading() -> dict | None:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM sensor_readings ORDER BY id DESC LIMIT 1"
        )
        row = await cursor.fetchone()
        if not row:
            return None
        return {
            "id":                row["id"],
            "timestamp":         row["timestamp"],
            "sensor_readings":   json.loads(row["sensor_data"]),
            "health_assessment": json.loads(row["risk_data"]),
        }


async def get_reading_history(limit: int = 50) -> list:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM sensor_readings ORDER BY id DESC LIMIT ?", (limit,)
        )
        rows = await cursor.fetchall()
        results = [
            {
                "id":              row["id"],
                "timestamp":       row["timestamp"],
                "sensor_readings": json.loads(row["sensor_data"]),
                "health_score":    json.loads(row["risk_data"]).get("health_score"),
            }
            for row in rows
        ]
        return list(reversed(results))  # oldest first for charts


# ---------------------------------------------------------------------------
# Symptom logs
# ---------------------------------------------------------------------------

async def save_symptom_log(entry: dict) -> int:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "INSERT INTO symptom_logs (logged_at, entry) VALUES (?, ?)",
            (
                datetime.now(timezone.utc).isoformat(),
                json.dumps(entry),
            )
        )
        await db.commit()
        return cursor.lastrowid


async def get_latest_symptom_log() -> dict | None:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM symptom_logs ORDER BY id DESC LIMIT 1"
        )
        row = await cursor.fetchone()
        if not row:
            return None
        return json.loads(row["entry"])