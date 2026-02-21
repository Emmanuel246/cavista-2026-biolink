import React, { useState, useEffect } from 'react';
import { AIPersona } from '../components/aicoach/AIPersona';
import { symptomStorage } from '../services/symptomStorage';
import type { LoggedSymptom } from '../services/symptomStorage';
import { useMetrics } from '../hooks/useMetrics';

export const CoachChatPage: React.FC = () => {
    const [symptoms, setSymptoms] = useState<LoggedSymptom[]>([]);
    const { metrics } = useMetrics(10000);

    useEffect(() => {
        // We fetch logs to feed context to the coach
        setSymptoms(symptomStorage.getLogs());
    }, []);

    return (
        <div className="space-y-4 animate-fade-in max-w-4xl mx-auto h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] flex flex-col">
            <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-slate-800">AI Health Partner</h1>
                <p className="text-slate-500 mt-1">Get dynamic, real-time advice based on your environment.</p>
            </div>

            <div className="flex-1 w-full relative">
                <AIPersona symptoms={symptoms} metrics={metrics} />
            </div>
        </div>
    );
};
