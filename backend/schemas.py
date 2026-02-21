from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class SymptomSeverity(str, Enum):
    none = "none"
    mild = "mild"
    moderate = "moderate"
    severe = "severe"

class SensorPayload(BaseModel):
    temperature: float = Field(..., ge=-10, le=60, description="Celsius")
    humidity: float = Field(..., ge=0, le=100, description="Relative humidity %")
    aqi: int = Field(..., ge=0, le=500, description="Air Quality Index")
    device_id: Optional[str] = Field(default="esp32-001")

class SymptomEntry(BaseModel):
    chest_tightness: SymptomSeverity = SymptomSeverity.none
    shortness_of_breath: SymptomSeverity = SymptomSeverity.none
    coughing: SymptomSeverity = SymptomSeverity.none
    wheezing: SymptomSeverity = SymptomSeverity.none
    fatigue: SymptomSeverity = SymptomSeverity.none
    notes: Optional[str] = Field(default=None, max_length=500)