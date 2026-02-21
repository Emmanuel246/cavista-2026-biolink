import React from 'react';
import type { RiskLevel } from '../../services/types';
import { AlertTriangle, Wind, ThermometerSun } from 'lucide-react';
import { clsx } from 'clsx';

interface RiskPanelProps {
    heatRisk: RiskLevel;
    airRisk: RiskLevel;
    overallRisk: RiskLevel;
}

const getRiskColors = (level: RiskLevel) => {
    switch (level) {
        case 'LOW':
            return 'bg-risk-low/10 text-risk-low border-risk-low/20';
        case 'MEDIUM':
            return 'bg-risk-medium/10 text-risk-medium border-risk-medium/20';
        case 'HIGH':
            return 'bg-risk-high/10 text-risk-high border-risk-high/20';
        default:
            return 'bg-slate-100 text-slate-500 border-slate-200';
    }
};

const getRiskLabel = (level: RiskLevel) => {
    if (level === 'LOW') return 'Low Risk';
    if (level === 'MEDIUM') return 'Moderate Risk';
    if (level === 'HIGH') return 'High Risk';
    return 'Unknown';
};

export const RiskPanel: React.FC<RiskPanelProps> = ({ heatRisk, airRisk, overallRisk }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-slate-400" />
                Current Risk Assessment
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600 font-medium">
                        <ThermometerSun className="w-4 h-4 mr-2 text-orange-400" />
                        Heat Stress
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-xs font-bold border', getRiskColors(heatRisk))}>
                        {getRiskLabel(heatRisk)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600 font-medium">
                        <Wind className="w-4 h-4 mr-2 text-cyan-500" />
                        Air Quality
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-xs font-bold border', getRiskColors(airRisk))}>
                        {getRiskLabel(airRisk)}
                    </span>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-700">Overall Assessment</div>
                    <span className={clsx('px-3 py-1 rounded-full text-xs font-bold border', getRiskColors(overallRisk))}>
                        {getRiskLabel(overallRisk)}
                    </span>
                </div>
            </div>
        </div>
    );
};
