import React, { useState, useEffect } from 'react';
import { SymptomLogger } from '../components/aicoach/SymptomLogger';
import { symptomStorage } from '../services/symptomStorage';
import type { LoggedSymptom } from '../services/symptomStorage';

export const SymptomLogPage: React.FC = () => {
    const [symptoms, setSymptoms] = useState<LoggedSymptom[]>([]);

    useEffect(() => {
        setSymptoms(symptomStorage.getLogs());
    }, []);

    const handleLogAdded = (newLogData: LoggedSymptom) => {
        const savedLog = symptomStorage.addLog(newLogData);
        setSymptoms([savedLog, ...symptoms]);
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Symptom Log</h1>
                <p className="text-slate-500 mt-1">Track your daily health and respiratory symptoms.</p>
            </div>

            <div className="space-y-8">
                <SymptomLogger onLogAdded={handleLogAdded} />

                <div>
                    <h3 className="text-md font-semibold text-slate-600 mb-4 ml-1">Recent Logs</h3>
                    {symptoms.length === 0 ? (
                        <div className="text-sm text-slate-400 bg-slate-50 border border-slate-100 p-6 rounded-xl text-center shadow-inner">
                            No symptoms logged yet. Stay healthy!
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {symptoms.map(log => (
                                <div key={log.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-start">
                                        <div className="font-semibold text-slate-800 text-lg">{log.symptom}</div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${log.severity === 'Severe' ? 'bg-red-100 text-red-700 border border-red-200' :
                                                log.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                    'bg-green-100 text-green-700 border border-green-200'
                                            }`}>
                                            {log.severity}
                                        </div>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2 font-medium">
                                        {new Date(log.timestamp).toLocaleString(undefined, {
                                            weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </div>
                                    {log.notes && (
                                        <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            {log.notes}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
