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
    iconColorClass = 'text-primary',
    trend,
    statusColorClass,
    className,
}) => {
    return (
        <div className={twMerge('bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col hover:shadow-md transition-shadow', className)}>
            <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-xs sm:text-sm font-medium text-slate-500">{title}</h3>
                <div className={clsx('p-1.5 sm:p-2 rounded-lg bg-slate-50', iconColorClass)}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
            </div>

            <div className="flex items-end justify-between mt-auto">
                <div className="flex items-baseline">
                    <span className={clsx('text-2xl sm:text-3xl font-bold tracking-tight', statusColorClass ? statusColorClass : 'text-slate-800')}>
                        {value}
                    </span>
                    {unit && <span className="text-sm font-medium text-slate-500 ml-1 mb-1">{unit}</span>}
                </div>

                {trend && (
                    <div className={clsx(
                        'flex items-center text-sm font-medium',
                        trend.isUp ? 'text-risk-high' : 'text-risk-low'
                    )}>
                        <span>{trend.isUp ? '↑' : '↓'}</span>
                        <span className="ml-0.5">{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};
