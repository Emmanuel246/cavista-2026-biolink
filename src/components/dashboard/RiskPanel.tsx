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
        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5 flex items-center relative z-10">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Current Risk Assessment
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center text-slate-300 font-bold text-sm">
                        <div className="bg-orange-500/20 shadow-[inset_0_0_12px_rgba(249,115,22,0.3)] p-1.5 rounded-lg mr-3 border border-orange-500/20">
                            <ThermometerSun className="w-4 h-4 text-orange-400" />
                        </div>
                        Heat Stress
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-black border', getRiskColors(heatRisk))}>
                        {getRiskLabel(heatRisk)}
                    </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center text-slate-300 font-bold text-sm">
                        <div className="bg-cyan-500/20 shadow-[inset_0_0_12px_rgba(6,182,212,0.3)] p-1.5 rounded-lg mr-3 border border-cyan-500/20">
                            <Wind className="w-4 h-4 text-cyan-400" />
                        </div>
                        Air Quality
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-black border', getRiskColors(airRisk))}>
                        {getRiskLabel(airRisk)}
                    </span>
                </div>

                <div className="pt-5 mt-2 flex items-center justify-between">
                    <div className="text-sm font-black text-white tracking-widest uppercase">Overall Assessment</div>
                    <span className={clsx('px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border drop-shadow-md', getRiskColors(overallRisk))}>
                        {getRiskLabel(overallRisk)}
                    </span>
                </div>
            </div>
        </div>
    );
};
