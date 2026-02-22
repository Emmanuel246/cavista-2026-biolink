import React from 'react';
import { clsx } from 'clsx';
import { HeartPulse } from 'lucide-react';

interface HealthGaugeProps {
    score: number; // 0 to 100
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({ score }) => {
    // Determine color based on score
    let colorClass = 'text-emerald-500 dark:text-emerald-400';
    let emptyColorClass = 'text-emerald-500/10 dark:text-emerald-400/20';
    let label = 'Excellent';

    if (score < 50) {
        colorClass = 'text-rose-500 dark:text-rose-400';
        emptyColorClass = 'text-rose-500/10 dark:text-rose-400/20';
        label = 'Poor';
    } else if (score < 80) {
        colorClass = 'text-amber-500 dark:text-amber-400';
        emptyColorClass = 'text-amber-500/10 dark:text-amber-400/20';
        label = 'Fair';
    }

    // Circle math for SVG gauge
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative bg-white/70 dark:bg-[var(--color-surface-800)]/80 backdrop-blur-3xl rounded-[2rem] border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 flex flex-col items-center justify-center h-full transition-all duration-400 hover:-translate-y-1 shadow-sm dark:shadow-[var(--shadow-soft-dark)] hover:shadow-md dark:hover:shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100/50 dark:from-white/[0.05] to-transparent pointer-events-none transition-colors duration-300"></div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8 self-start w-full flex items-center relative z-10 transition-colors">
                <HeartPulse className="w-4 h-4 mr-2" />
                Health Score
            </h3>

            <div className="relative flex items-center justify-center w-40 h-40 mt-[-1rem] z-10">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        strokeWidth="12"
                        fill="transparent"
                        className={clsx('transition-colors duration-500', emptyColorClass)}
                    />
                    {/* Foreground Circle */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className={clsx('transition-all duration-[1.5s] ease-out drop-shadow-none dark:drop-shadow-[0_0_8px_currentColor]', colorClass)}
                        stroke="currentColor"
                    />
                </svg>

                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in-up drop-shadow-none dark:drop-shadow-lg transition-colors">
                    <span className={clsx('text-5xl font-black tracking-tighter transition-colors', colorClass)}>
                        {score}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest mt-1 transition-colors">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
};
