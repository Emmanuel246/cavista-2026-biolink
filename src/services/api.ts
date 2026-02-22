import axios from 'axios';
import type { DashboardMetrics, HistoryDataPoint } from './types';
import { generateMockMetrics, generateMockHistory } from './mockData';

const BASE_URL = 'https://cavista-2026-ecobreathe-ai-production.up.railway.app';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

// Use this toggle if we explicitly want to force mock data, otherwise we try real API and fallback on error
const FORCE_MOCK_DATA = false;

// --- Helper Mappers ---
const mapBackendRiskLevel = (riskStatus: string): 'LOW' | 'MEDIUM' | 'HIGH' => {
    const norm = riskStatus?.toLowerCase() || '';
    if (norm === 'caution' || norm === 'moderate') return 'MEDIUM';
    if (norm === 'alert' || norm === 'high' || norm === 'severe') return 'HIGH';
    return 'LOW'; // default or "low" or "ok"
};

const mapBackendAirRisk = (asthmaRisk: string): 'LOW' | 'MEDIUM' | 'HIGH' => {
    return mapBackendRiskLevel(asthmaRisk);
};

export const fetchLatestMetrics = async (): Promise<DashboardMetrics> => {
    if (FORCE_MOCK_DATA) {
        return new Promise((resolve) => setTimeout(() => resolve(generateMockMetrics()), 500));
    }

    try {
        const response = await apiClient.get('/latest-data');
        const data = response.data;
        const sensors = data.sensor_readings || {};
        const health = data.health_assessment || {};

        return {
            temperature: sensors.temperature || 0,
            humidity: sensors.humidity || 0,
            airQuality: sensors.aqi || 0,
            healthScore: health.health_score || 0,
            overallRisk: mapBackendRiskLevel(health.overall_status),
            heatRisk: mapBackendRiskLevel(health.heat_stress_risk),
            airRisk: mapBackendAirRisk(health.asthma_attack_risk),
            recommendation: (health.recommendations && health.recommendations.length > 0)
                ? health.recommendations[0]
                : "Maintain current activities.",
            timestamp: data.timestamp || new Date().toISOString(),
        };
    } catch (error) {
        console.warn("Backend API unavailable (/latest-data). Falling back to mock data.", error);
        return generateMockMetrics();
    }
};

export const fetchHistoryData = async (): Promise<HistoryDataPoint[]> => {
    if (FORCE_MOCK_DATA) {
        return new Promise((resolve) => setTimeout(() => resolve(generateMockHistory()), 500));
    }

    try {
        const response = await apiClient.get('/history');
        // Backend returns 50 readings in descending order (newest first).
        // Recharts expects ascending (oldest first).
        const readings: any[] = response.data?.readings || [];

        // Sort oldest first
        const sorted = [...readings].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        return sorted.map((r: any) => ({
            timestamp: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: r.sensor_readings?.temperature || 0,
            humidity: r.sensor_readings?.humidity || 0,
            airQuality: r.sensor_readings?.aqi || 0,
        }));
    } catch (error) {
        console.warn("Backend API unavailable (/history). Falling back to mock data.");
        return generateMockHistory();
    }
};

export interface BackendSymptomPayload {
    symptoms: { name: string; severity: string }[];
    other_symptoms: { name: string; severity: string }[];
    notes: string;
}

export const postSymptomLog = async (
    symptomName: string,
    severity: string,
    notes?: string
): Promise<boolean> => {

    const payload: BackendSymptomPayload = {
        symptoms: [],
        other_symptoms: [],
        notes: notes || ""
    };

    const formattedSeverity = severity.toLowerCase();

    // If we know it's a predefined list vs custom, we can split them. 
    // For simplicity, if it's "Other", the UI sends the typed name here.
    // We'll just put standard ones in `symptoms`, everything else in `other_symptoms`
    const COMMON_SYMPTOMS = ['Cough', 'Wheezing', 'Shortness of Breath', 'Chest Tightness', 'Asthma Attack', 'Headache', 'Fatigue'];

    if (COMMON_SYMPTOMS.includes(symptomName)) {
        payload.symptoms.push({ name: symptomName, severity: formattedSeverity });
    } else {
        payload.other_symptoms.push({ name: symptomName, severity: formattedSeverity });
    }

    try {
        await apiClient.post('/symptom-diary', payload);
        console.log("Symptom posted to backend successfully.");
        return true;
    } catch (error) {
        console.error("Failed to post symptom to backend. Ensure backend is running.", error);
        return false;
    }
};
