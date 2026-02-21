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
                    wrapper: 'bg-red-50 border-red-200',
                    icon: <AlertCircle className="w-6 h-6 text-red-500" />,
                    title: 'text-red-700',
                    text: 'text-red-600 font-medium'
                };
            case 'MEDIUM':
                return {
                    wrapper: 'bg-yellow-50 border-yellow-200',
                    icon: <Info className="w-6 h-6 text-yellow-600" />,
                    title: 'text-yellow-700',
                    text: 'text-yellow-700 font-medium'
                };
            case 'LOW':
            default:
                return {
                    wrapper: 'bg-green-50 border-green-200',
                    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
                    title: 'text-green-700',
                    text: 'text-green-600 font-medium'
                };
        }
    };

    const style = getPanelStyling();

    return (
        <div className={clsx('rounded-xl border p-5 relative overflow-hidden', style.wrapper)}>
            <div className="absolute top-0 right-0 -mt-2 -mr-2 text-white/5">
                <Sparkles className="w-24 h-24" />
            </div>

            <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                    {style.icon}
                </div>
                <div className="ml-3 z-10">
                    <h3 className={clsx('text-sm font-bold uppercase tracking-wider mb-1 flex items-center', style.title)}>
                        <Sparkles className="w-3 h-3 mr-1.5" />
                        AI Health Recommendation
                    </h3>
                    <p className={clsx('text-base sm:text-lg', style.text)}>
                        {recommendation}
                    </p>
                </div>
            </div>
        </div>
    );
};
