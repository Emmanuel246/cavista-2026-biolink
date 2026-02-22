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
            return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
        case 'MEDIUM':
            return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
        case 'HIGH':
            return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
        default:
            return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700';
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
        <div className="relative bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-slate-50 dark:hover:bg-white/10 overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100/50 dark:from-white/[0.05] to-transparent pointer-events-none transition-colors duration-300"></div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5 flex items-center relative z-10 transition-colors">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Current Risk Assessment
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <div className="flex items-center text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors">
                        <div className="bg-orange-50 dark:bg-orange-500/20 shadow-sm dark:shadow-[inset_0_0_12px_rgba(249,115,22,0.3)] p-1.5 rounded-lg mr-3 border border-orange-100 dark:border-orange-500/20 transition-colors">
                            <ThermometerSun className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                        </div>
                        Heat Stress
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-black border transition-colors', getRiskColors(heatRisk))}>
                        {getRiskLabel(heatRisk)}
                    </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <div className="flex items-center text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors">
                        <div className="bg-cyan-50 dark:bg-cyan-500/20 shadow-sm dark:shadow-[inset_0_0_12px_rgba(6,182,212,0.3)] p-1.5 rounded-lg mr-3 border border-cyan-100 dark:border-cyan-500/20 transition-colors">
                            <Wind className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                        </div>
                        Air Quality
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-black border transition-colors', getRiskColors(airRisk))}>
                        {getRiskLabel(airRisk)}
                    </span>
                </div>

                <div className="pt-5 mt-2 flex items-center justify-between">
                    <div className="text-sm font-black text-slate-800 dark:text-white tracking-widest uppercase transition-colors">Overall Assessment</div>
                    <span className={clsx('px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border drop-shadow-sm dark:drop-shadow-md transition-colors', getRiskColors(overallRisk))}>
                        {getRiskLabel(overallRisk)}
                    </span>
                </div>
            </div>
        </div>
    );
};
