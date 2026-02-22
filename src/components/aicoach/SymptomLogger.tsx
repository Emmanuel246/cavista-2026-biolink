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
        <div className="relative bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10 p-5 md:p-8 overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100/50 dark:from-white/[0.05] to-transparent pointer-events-none transition-colors duration-300"></div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-8 flex items-center relative z-10 transition-colors">
                <Activity className="w-5 h-5 mr-3 text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-colors" />
                Log New Symptom
            </h3>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Symptom Selection */}
                <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-500 dark:text-slate-400 mb-4 transition-colors">WHAT ARE YOU EXPERIENCING?</label>
                    <div className="flex flex-wrap gap-2.5">
                        {COMMON_SYMPTOMS.map(s => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => handleSymptomSelect(s)}
                                className={clsx(
                                    'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md',
                                    symptom === s
                                        ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/50 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                        : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cyan-200 dark:hover:border-cyan-500/30 hover:bg-slate-100 dark:hover:bg-white/10'
                                )}
                            >
                                {s}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleSymptomSelect('Other')}
                            className={clsx(
                                'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md',
                                symptom === 'Other'
                                    ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/50 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                    : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cyan-200 dark:hover:border-cyan-500/30 hover:bg-slate-100 dark:hover:bg-white/10'
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
                            className="mt-4 w-full px-5 py-3 bg-white dark:bg-[#0f172a]/50 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            required
                        />
                    )}
                </div>

                {/* Severity */}
                <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-500 dark:text-slate-400 mb-4 transition-colors">SEVERITY</label>
                    <div className="flex space-x-6 bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 transition-colors">
                        {(['Mild', 'Moderate', 'Severe'] as const).map(level => (
                            <label key={level} className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="severity"
                                    value={level}
                                    checked={severity === level}
                                    onChange={(e) => setSeverity(e.target.value as any)}
                                    className="w-4 h-4 text-cyan-600 dark:text-cyan-500 bg-white dark:bg-white/10 border-slate-300 dark:border-white/20 focus:ring-cyan-500 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                                />
                                <span className={clsx(
                                    'ml-3 text-sm font-bold tracking-wide transition-colors',
                                    severity === level ? (
                                        level === 'Severe' ? 'text-rose-600 dark:text-rose-400 dark:drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]' :
                                            level === 'Moderate' ? 'text-amber-600 dark:text-amber-400 dark:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-emerald-600 dark:text-emerald-400 dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                                    ) : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                                )}>
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-500 dark:text-slate-400 mb-4 transition-colors">ADDITIONAL NOTES (OPTIONAL)</label>
                    <textarea
                        rows={3}
                        placeholder="E.g., Started after going for a run..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-5 py-3 bg-white dark:bg-[#0f172a]/50 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !symptom || (symptom === 'Other' && !customSymptom.trim())}
                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md dark:shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/20 text-sm font-black tracking-widest uppercase text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300"
                >
                    <Save className={`w-5 h-5 mr-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    {isSubmitting ? 'Saving to Cloud...' : 'Log Symptom'}
                </button>
            </form>
        </div>
    );
};
