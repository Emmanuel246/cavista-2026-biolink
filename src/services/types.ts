export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface DashboardMetrics {
    temperature: number; // °C
    humidity: number; // %
    airQuality: number; // AQI
    heatRisk: RiskLevel;
    airRisk: RiskLevel;
    overallRisk: RiskLevel;
    healthScore: number; // 0 - 100
    recommendation: string;
    timestamp: string;
}

export interface HistoryDataPoint {
    timestamp: string;
    temperature: number;
    humidity: number;
    airQuality: number;
}
