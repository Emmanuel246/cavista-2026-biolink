import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wind, Leaf, ArrowRight, User } from 'lucide-react';
import { clsx } from 'clsx';

export const OnboardingPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [concern, setConcern] = useState('');

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1 && name.trim()) {
            setStep(2);
        } else if (step === 2 && concern) {
            // Save to localStorage
            localStorage.setItem('ecoBreath_onboarded', 'true');
            localStorage.setItem('ecoBreath_userName', name.trim());
            localStorage.setItem('ecoBreath_focus', concern);

            // Redirect to dashboard
            navigate('/', { replace: true });
        }
    };

    const healthConcerns = [
        'Asthma',
        'Allergies',
        'Heart Condition',
        'COPD / Respiratory',
        'General Wellness',
        'Other'
    ];

    return (
        <div className="min-h-screen bg-[var(--color-surface-50)] dark:bg-[var(--color-surface-900)] flex items-center justify-center p-4 transition-colors duration-400">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-brand-500)]/10 blur-[140px] pointer-events-none hidden dark:block"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none hidden dark:block"></div>

            <div className="w-full max-w-md bg-white/70 dark:bg-[var(--color-surface-800)]/80 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-10 shadow-xl dark:shadow-[var(--shadow-soft-dark)] border border-slate-200/50 dark:border-white/5 relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100/50 dark:from-white/[0.05] to-transparent pointer-events-none"></div>

                {/* Logo Area */}
                <div className="flex justify-center mb-10 relative z-10">
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-600)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-brand-500)]/30">
                            <Wind className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-[var(--color-surface-800)] rounded-full flex items-center justify-center shadow-sm">
                            <Leaf className="w-4 h-4 text-[var(--color-brand-500)]" />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleNext} className="relative z-10">
                    {/* Step 1: Name */}
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-2 transition-colors">Welcome to EcoBreath AI</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-center mb-8 font-medium">Let's personalize your healthy environment.</p>

                            <div className="mb-8">
                                <label className="block text-sm font-bold tracking-wide text-slate-500 dark:text-slate-400 mb-4 ml-1">WHAT SHOULD WE CALL YOU?</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50/80 dark:bg-[var(--color-surface-900)]/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent transition-all sm:text-lg font-bold shadow-inner dark:shadow-none"
                                        placeholder="Your first name"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!name.trim()}
                                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-[1.5rem] text-sm font-black tracking-widest uppercase text-white bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-500)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md dark:shadow-lg shadow-[var(--color-brand-500)]/20"
                            >
                                Continue <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Health Concerns */}
                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-2 transition-colors">Nice to meet you, {name.trim()}!</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-center mb-8 font-medium">To tailor AI recommendations, what is your primary focus?</p>

                            <div className="mb-8">
                                <div className="grid grid-cols-2 gap-3">
                                    {healthConcerns.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setConcern(item)}
                                            className={clsx(
                                                'px-4 py-3 rounded-2xl text-sm font-bold transition-all border text-left flex items-center',
                                                concern === item
                                                    ? 'bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-500)]/20 text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)] border-[var(--color-brand-500)]/50 shadow-sm dark:shadow-none ring-1 ring-[var(--color-brand-500)]/50'
                                                    : 'bg-white/50 dark:bg-[var(--color-surface-900)]/30 text-slate-600 dark:text-slate-300 border-slate-200/50 dark:border-white/10 hover:border-[var(--color-brand-200)] hover:bg-slate-50 dark:hover:bg-[var(--color-surface-800)]'
                                            )}
                                        >
                                            <div className={clsx("w-3 h-3 rounded-full mr-3 shrink-0 border", concern === item ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)]" : "border-slate-300 dark:border-slate-600")} />
                                            <span className="leading-tight">{item}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-5 py-4 border border-slate-200 dark:border-white/10 rounded-[1.5rem] text-sm font-black text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={!concern}
                                    className="flex-1 flex justify-center items-center py-4 px-4 border border-transparent rounded-[1.5rem] text-sm font-black tracking-widest uppercase text-white bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-500)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md dark:shadow-none shadow-[var(--color-brand-500)]/20"
                                >
                                    Complete Setup
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Step Indicators */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10 transition-colors duration-400 delay-100">
                <div className={clsx("w-2 h-2 rounded-full transition-all duration-300", step === 1 ? "bg-[var(--color-brand-500)] w-6 shadow-[0_0_8px_rgba(20,184,166,0.5)]" : "bg-slate-300 dark:bg-slate-700")} />
                <div className={clsx("w-2 h-2 rounded-full transition-all duration-300", step === 2 ? "bg-[var(--color-brand-500)] w-6 shadow-[0_0_8px_rgba(20,184,166,0.5)]" : "bg-slate-300 dark:bg-slate-700")} />
            </div>
        </div>
    );
};
