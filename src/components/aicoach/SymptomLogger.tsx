import React, { useState } from 'react';
import type { LoggedSymptom } from '../../services/symptomStorage';
import { Activity, Plus, Save } from 'lucide-react';
import { clsx } from 'clsx';

import { postSymptomLog } from '../../services/api';

const COMMON_SYMPTOMS = [
    'Cough',
    'Wheezing',
    'Shortness of Breath',
    'Chest Tightness',
    'Asthma Attack',
    'Headache',
    'Fatigue'
];

interface SymptomLoggerProps {
    onLogAdded: (log: LoggedSymptom) => void;
}

export const SymptomLogger: React.FC<SymptomLoggerProps> = ({ onLogAdded }) => {
    const [symptom, setSymptom] = useState<string>('');
    const [customSymptom, setCustomSymptom] = useState<string>('');
    const [severity, setSeverity] = useState<LoggedSymptom['severity']>('Mild');
    const [notes, setNotes] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSymptomSelect = (selString: string) => {
        setSymptom(selString);
        if (selString !== 'Other') {
            setCustomSymptom('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const finalSymptom = symptom === 'Other' ? customSymptom : symptom;
        if (!finalSymptom.trim()) return;

        setIsSubmitting(true);

        // Post data to the live backend API
        await postSymptomLog(finalSymptom.trim(), severity, notes.trim());

        // We only pass the fields required by symptomStorage.addLog
        const newLogData = {
            symptom: finalSymptom.trim(),
            severity,
            notes: notes.trim() || undefined
        };

        // For the UI, we just notify the parent (which handles storage)
        // Wait, let's just create a raw mock LoggedSymptom here to pass back up 
        // to maintain dumb-component architecture where possible, but we don't have the ID.
        // We will let the parent handle the storage call and pass it back.
        onLogAdded(newLogData as LoggedSymptom);

        // Reset
        setSymptom('');
        setCustomSymptom('');
        setSeverity('Mild');
        setNotes('');
        setIsSubmitting(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-indigo-500" />
                Log New Symptom
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Symptom Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">What are you experiencing?</label>
                    <div className="flex flex-wrap gap-2">
                        {COMMON_SYMPTOMS.map(s => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => handleSymptomSelect(s)}
                                className={clsx(
                                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
                                    symptom === s
                                        ? 'bg-indigo-500 text-white border-indigo-500'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                                )}
                            >
                                {s}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleSymptomSelect('Other')}
                            className={clsx(
                                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
                                symptom === 'Other'
                                    ? 'bg-indigo-500 text-white border-indigo-500'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                            )}
                        >
                            <Plus className="w-4 h-4 inline mr-1" /> Other
                        </button>
                    </div>

                    {symptom === 'Other' && (
                        <input
                            type="text"
                            placeholder="Describe your symptom..."
                            value={customSymptom}
                            onChange={(e) => setCustomSymptom(e.target.value)}
                            className="mt-3 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            required
                        />
                    )}
                </div>

                {/* Severity */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Severity</label>
                    <div className="flex space-x-4">
                        {(['Mild', 'Moderate', 'Severe'] as const).map(level => (
                            <label key={level} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="severity"
                                    value={level}
                                    checked={severity === level}
                                    onChange={(e) => setSeverity(e.target.value as any)}
                                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                                />
                                <span className={clsx(
                                    'ml-2 text-sm font-medium',
                                    level === 'Severe' ? 'text-red-600' :
                                        level === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                                )}>
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes (Optional)</label>
                    <textarea
                        rows={3}
                        placeholder="E.g., Started after going for a run..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !symptom || (symptom === 'Other' && !customSymptom.trim())}
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Save className={`w-5 h-5 mr-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    {isSubmitting ? 'Saving to Cloud...' : 'Log Symptom'}
                </button>
            </form>
        </div>
    );
};
