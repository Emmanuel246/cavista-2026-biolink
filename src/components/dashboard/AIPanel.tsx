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
                    wrapper: 'bg-red-500/10 border-red-500/20 backdrop-blur-sm',
                    icon: <AlertCircle className="w-7 h-7 text-red-500" />,
                    title: 'text-red-700/80',
                    text: 'text-red-700 font-medium'
                };
            case 'MEDIUM':
                return {
                    wrapper: 'bg-amber-500/10 border-amber-500/20 backdrop-blur-sm',
                    icon: <Info className="w-7 h-7 text-amber-600" />,
                    title: 'text-amber-700/80',
                    text: 'text-amber-700 font-medium'
                };
            case 'LOW':
            default:
                return {
                    wrapper: 'bg-emerald-500/10 border-emerald-500/20 backdrop-blur-sm',
                    icon: <CheckCircle className="w-7 h-7 text-emerald-500" />,
                    title: 'text-emerald-700/80',
                    text: 'text-emerald-700 font-medium'
                };
        }
    };

    const style = getPanelStyling();

    return (
        <div className={clsx('rounded-2xl border p-5 sm:p-6 relative overflow-hidden transition-all duration-300 hover:shadow-md', style.wrapper)}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-slate-900/5 mix-blend-overlay">
                <Sparkles className="w-32 h-32" />
            </div>

            <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5 animate-fade-in">
                    {style.icon}
                </div>
                <div className="ml-4 z-10">
                    <h3 className={clsx('text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center', style.title)}>
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                        AI Health Recommendation
                    </h3>
                    <p className={clsx('text-base sm:text-lg leading-relaxed', style.text)}>
                        {recommendation}
                    </p>
                </div>
            </div>
        </div>
    );
};
