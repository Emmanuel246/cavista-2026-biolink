import { useState, useEffect } from 'react';
import type { DashboardMetrics } from '../services/types';
import { fetchLatestMetrics } from '../services/api';

export const useMetrics = (pollingIntervalMs = 15000) => {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const loadData = async () => {
        try {
            const data = await fetchLatestMetrics();
            setMetrics(data);
            setLastUpdated(new Date());
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error fetching metrics'));
        } finally {
            if (loading) setLoading(false);
        }
    };

    useEffect(() => {
        loadData(); // Initial load

        const interval = setInterval(loadData, pollingIntervalMs);

        return () => clearInterval(interval);
    }, [pollingIntervalMs]);

    return { metrics, loading, error, lastUpdated, refetch: loadData };
};
