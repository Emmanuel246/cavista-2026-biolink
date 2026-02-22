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
                    wrapper: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 shadow-sm dark:shadow-[0_0_30px_rgba(244,63,94,0.1)]',
                    icon: 'text-rose-500 dark:text-rose-400',
                    title: 'text-rose-700 dark:text-rose-300',
                    text: 'text-rose-900 dark:text-rose-100 font-medium'
                };
            case 'MEDIUM':
                return {
                    wrapper: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 shadow-sm dark:shadow-[0_0_30px_rgba(245,158,11,0.1)]',
                    icon: 'text-amber-500 dark:text-amber-400',
                    title: 'text-amber-700 dark:text-amber-300',
                    text: 'text-amber-900 dark:text-amber-100 font-medium'
                };
            case 'LOW':
            default:
                return {
                    wrapper: 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20 shadow-sm dark:shadow-[0_0_30px_rgba(6,182,212,0.1)]',
                    icon: 'text-cyan-500 dark:text-cyan-400',
                    title: 'text-cyan-700 dark:text-cyan-300',
                    text: 'text-cyan-900 dark:text-cyan-100 font-medium'
                };
        }
    };

    const style = getPanelStyling();
    const IconComponent = overallRisk === 'HIGH' ? AlertCircle : overallRisk === 'MEDIUM' ? Info : CheckCircle;

    return (
        <div className={clsx('rounded-2xl border p-5 sm:p-6 relative overflow-hidden transition-all duration-300 backdrop-blur-xl', style.wrapper)}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-black/5 dark:text-white/5 transition-colors duration-300">
                <Sparkles className="w-32 h-32" />
            </div>

            <div className="flex items-start relative z-10">
                <div className={clsx("flex-shrink-0 mt-0.5 animate-fade-in drop-shadow-sm dark:drop-shadow-md transition-colors", style.icon)}>
                    <IconComponent className="w-7 h-7" />
                </div>
                <div className="ml-4">
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
