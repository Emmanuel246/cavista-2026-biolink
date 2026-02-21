import type { DashboardMetrics, HistoryDataPoint, RiskLevel } from './types';

// Helper to get random number within a range
const getRandom = (min: number, max: number) =>
    Math.round((Math.random() * (max - min) + min) * 10) / 10;

// Derive risk from a value
const getRisk = (value: number, mediumThreshold: number, highThreshold: number): RiskLevel => {
    if (value >= highThreshold) return 'HIGH';
    if (value >= mediumThreshold) return 'MEDIUM';
    return 'LOW';
};

// Generate realistic mock metrics
export const generateMockMetrics = (): DashboardMetrics => {
    const temperature = getRandom(20, 38);
    const humidity = getRandom(30, 80);
    const airQuality = getRandom(20, 180);

    // Simple risk heuristic
    const heatRisk = getRisk(temperature, 30, 35);
    const airRisk = getRisk(airQuality, 50, 100);

    // Overall Risk weighting
    let overallRisk: RiskLevel = 'LOW';
    if (heatRisk === 'HIGH' || airRisk === 'HIGH') {
        overallRisk = 'HIGH';
    } else if (heatRisk === 'MEDIUM' || airRisk === 'MEDIUM') {
        overallRisk = 'MEDIUM';
    }

    // Health Score (mock formula based on values)
    // Base 100 minus penalties
    let healthScore = 100;
    healthScore -= Math.max(0, temperature - 25) * 2;
    healthScore -= Math.max(0, airQuality - 50) * 0.4;
    healthScore = Math.max(0, Math.round(healthScore));

    const recommendations = {
        LOW: "Optimal air and temperature. Safe for outdoor activities.",
        MEDIUM: "Moderate conditions. Sensitive groups should exercise caution outdoors.",
        HIGH: "⚠ High Stress Risk. Hydrate and avoid outdoor activity."
    };

    return {
        temperature,
        humidity,
        airQuality,
        heatRisk,
        airRisk,
        overallRisk,
        healthScore,
        recommendation: recommendations[overallRisk],
        timestamp: new Date().toISOString()
    };
};

// Generate 12 data points (e.g. past 12 intervals)
export const generateMockHistory = (): HistoryDataPoint[] => {
    const history: HistoryDataPoint[] = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5 * 60000); // every 5 minutes
        history.push({
            timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: getRandom(20, 38),
            humidity: getRandom(30, 80),
            airQuality: getRandom(20, 180)
        });
    }

    return history;
};
