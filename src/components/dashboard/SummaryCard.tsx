import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SummaryCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: LucideIcon;
    iconColorClass?: string;
    trend?: {
        value: number;
        isUp: boolean;
    };
    statusColorClass?: string;
    className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    value,
    unit,
    icon: Icon,
    iconColorClass = 'text-cyan-600 dark:text-cyan-400',
    trend,
    statusColorClass,
    className,
}) => {
    return (
        <div className={twMerge('relative bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-5 sm:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-slate-50 dark:hover:bg-white/10 group overflow-hidden shadow-sm dark:shadow-none', className)}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100/50 dark:from-white/[0.05] to-transparent pointer-events-none transition-colors duration-300"></div>

            <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-10">
                <h3 className="text-xs sm:text-sm font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase transition-colors">{title}</h3>
                <div className={clsx('p-2 sm:p-2.5 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm dark:shadow-inner bg-slate-50 dark:bg-transparent transition-colors', iconColorClass)}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
            </div>

            <div className="flex items-end justify-between mt-auto relative z-10">
                <div className="flex items-baseline">
                    <span className={clsx('text-3xl sm:text-4xl font-black tracking-tight drop-shadow-none dark:drop-shadow-sm transition-colors', statusColorClass ? statusColorClass : 'text-slate-800 dark:text-white')}>
                        {value}
                    </span>
                    {unit && <span className="text-sm font-bold text-slate-400 dark:text-slate-500 ml-1.5 mb-1 transition-colors">{unit}</span>}
                </div>

                {trend && (
                    <div className={clsx(
                        'flex items-center text-xs font-bold px-2 py-1 rounded-full border transition-colors',
                        trend.isUp ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/10 border-rose-200 dark:border-rose-400/20' : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20'
                    )}>
                        <span>{trend.isUp ? '↑' : '↓'}</span>
                        <span className="ml-0.5">{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};
