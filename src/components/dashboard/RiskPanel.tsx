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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-5 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Current Risk Assessment
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center text-slate-700 font-medium text-sm">
                        <div className="bg-orange-100 p-1.5 rounded-lg mr-3">
                            <ThermometerSun className="w-4 h-4 text-orange-500" />
                        </div>
                        Heat Stress
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-xs font-bold border', getRiskColors(heatRisk))}>
                        {getRiskLabel(heatRisk)}
                    </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center text-slate-700 font-medium text-sm">
                        <div className="bg-cyan-100 p-1.5 rounded-lg mr-3">
                            <Wind className="w-4 h-4 text-cyan-500" />
                        </div>
                        Air Quality
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-xs font-bold border', getRiskColors(airRisk))}>
                        {getRiskLabel(airRisk)}
                    </span>
                </div>

                <div className="pt-4 mt-2 flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-800 tracking-tight">Overall Assessment</div>
                    <span className={clsx('px-3 py-1 rounded-full text-xs font-bold border', getRiskColors(overallRisk))}>
                        {getRiskLabel(overallRisk)}
                    </span>
                </div>
            </div>
        </div>
    );
};
