import React from 'react';
import type { RiskLevel } from '../../services/types';
import { Sparkles, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface AIPanelProps {
    recommendation: string;
    overallRisk: RiskLevel;
}

export const AIPanel: React.FC<AIPanelProps> = ({ recommendation, overallRisk }) => {

    const getPanelStyling = () => {
        switch (overallRisk) {
            case 'HIGH':
                return {
                    wrapper: 'bg-rose-50/80 dark:bg-rose-500/10 border-rose-200/50 dark:border-rose-500/20 shadow-sm dark:shadow-[0_8px_32px_-8px_rgba(244,63,94,0.15)]',
                    icon: 'text-rose-500 dark:text-rose-400',
                    title: 'text-rose-700 dark:text-rose-300',
                    text: 'text-rose-900 dark:text-rose-100 font-medium'
                };
            case 'MEDIUM':
                return {
                    wrapper: 'bg-amber-50/80 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20 shadow-sm dark:shadow-[0_8px_32px_-8px_rgba(245,158,11,0.15)]',
                    icon: 'text-amber-500 dark:text-amber-400',
                    title: 'text-amber-700 dark:text-amber-300',
                    text: 'text-amber-900 dark:text-amber-100 font-medium'
                };
            case 'LOW':
            default:
                return {
                    wrapper: 'bg-[var(--color-brand-50)]/80 dark:bg-[var(--color-brand-500)]/10 border-[var(--color-brand-100)]/50 dark:border-[var(--color-brand-500)]/20 shadow-sm dark:shadow-[0_8px_32px_-8px_rgba(20,184,166,0.15)]',
                    icon: 'text-[var(--color-brand-500)] dark:text-[var(--color-brand-400)]',
                    title: 'text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]',
                    text: 'text-[var(--color-brand-900)] dark:text-[var(--color-brand-100)] font-medium'
                };
        }
    };

    const style = getPanelStyling();
    const IconComponent = overallRisk === 'HIGH' ? AlertCircle : overallRisk === 'MEDIUM' ? Info : CheckCircle;

    return (
        <div className={clsx('rounded-[2rem] border p-6 sm:p-8 relative overflow-hidden transition-all duration-400 backdrop-blur-3xl', style.wrapper)}>
            <div className="absolute top-0 right-0 -mt-6 -mr-6 text-black/5 dark:text-white/5 transition-colors duration-400">
                <Sparkles className="w-40 h-40" />
            </div>

            <div className="flex items-start relative z-10">
                <div className={clsx("flex-shrink-0 mt-0.5 animate-fade-in drop-shadow-sm dark:drop-shadow-md transition-colors", style.icon)}>
                    <IconComponent className="w-8 h-8" />
                </div>
                <div className="ml-5">
                    <h3 className={clsx('text-xs font-black uppercase tracking-widest mb-1.5 flex items-center transition-colors', style.title)}>
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                        AI Health Recommendation
                    </h3>
                    <p className={clsx('text-base sm:text-lg leading-relaxed drop-shadow-none dark:drop-shadow-sm transition-colors', style.text)}>
                        {recommendation}
                    </p>
                </div>
            </div>
        </div>
    );
};
