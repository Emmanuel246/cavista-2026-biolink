import axios from 'axios';
import type { DashboardMetrics, HistoryDataPoint } from './types';
import { generateMockMetrics, generateMockHistory } from './mockData';

const BASE_URL = '/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

const USE_MOCK_DATA = true; // In Hackathon DEMO mode, we force this, or fallback seamlessly

export const fetchLatestMetrics = async (): Promise<DashboardMetrics> => {
    if (USE_MOCK_DATA) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(generateMockMetrics()), 500); // Simulate network latency
        });
    }

    try {
        const response = await apiClient.get<DashboardMetrics>('/latest');
        return response.data;
    } catch (error) {
        console.warn("API unavailable, falling back to mock data for demo mode.");
        return generateMockMetrics();
    }
};

export const fetchHistory = async (): Promise<HistoryDataPoint[]> => {
    if (USE_MOCK_DATA) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(generateMockHistory()), 500);
        });
    }

    try {
        const response = await apiClient.get<HistoryDataPoint[]>('/history');
        return response.data;
    } catch (error) {
        console.warn("API unavailable, falling back to mock history format.");
        return generateMockHistory();
    }
};
