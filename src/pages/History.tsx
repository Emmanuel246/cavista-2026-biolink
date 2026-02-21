import React, { useEffect, useState } from 'react';
import type { HistoryDataPoint } from '../services/types';
import { fetchHistoryData } from '../services/api';
import { HistoryChart } from '../components/dashboard/HistoryChart';
import { Loader2 } from 'lucide-react';

export const History: React.FC = () => {
    const [data, setData] = useState<HistoryDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const historyData = await fetchHistoryData();
                setData(historyData);
            } catch (error) {
                console.error("Failed to fetch history data", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        // Refresh history every 5 minutes in a real app, 
        // but for demo we just load it once.
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-3 text-lg text-slate-600 font-medium">Loading History...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Historical Data</h1>
                <p className="text-slate-500 mt-1">Review environmental trends over the last hour.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HistoryChart
                    data={data}
                    dataKey="temperature"
                    title="Temperature"
                    color="#f97316" // orange-500
                    unit="°C"
                />
                <HistoryChart
                    data={data}
                    dataKey="humidity"
                    title="Humidity"
                    color="#3b82f6" // blue-500
                    unit="%"
                />
                <div className="md:col-span-2">
                    <HistoryChart
                        data={data}
                        dataKey="airQuality"
                        title="Air Quality (AQI)"
                        color="#0ea5e9" // sky-500
                        unit="AQI"
                    />
                </div>
            </div>
        </div>
    );
};
