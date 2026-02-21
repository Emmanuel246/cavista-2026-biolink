from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class SymptomSeverity(str, Enum):
    mild     = "mild"
    moderate = "moderate"
    severe   = "severe"


class SymptomItem(BaseModel):
    """A single symptom with its severity."""
    name: str = Field(..., min_length=1, max_length=100)
    severity: SymptomSeverity


class SensorPayload(BaseModel):
    temperature: float = Field(..., ge=-10, le=60, description="Celsius")
    humidity:    float = Field(..., ge=0, le=100, description="Relative humidity %")
    aqi:         int   = Field(..., ge=0, le=500, description="Air Quality Index")
    device_id:   Optional[str] = Field(default="esp32-001")


class SymptomEntry(BaseModel):
    """
    Matches the frontend symptom log UI exactly.
    - symptoms: the predefined buttons the user selected
    - other_symptoms: anything typed into the Other field
    - notes: the free text box
    """
    symptoms:       list[SymptomItem] = Field(default_factory=list)
    other_symptoms: list[SymptomItem] = Field(default_factory=list)
    notes:          Optional[str]     = Field(default=None, max_length=500)