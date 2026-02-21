import React from 'react';
import { clsx } from 'clsx';
import { HeartPulse } from 'lucide-react';

interface HealthGaugeProps {
    score: number; // 0 to 100
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({ score }) => {
    // Determine color based on score
    let colorClass = 'text-risk-low';
    let emptyColorClass = 'text-risk-low/20';
    let label = 'Excellent';

    if (score < 50) {
        colorClass = 'text-risk-high';
        emptyColorClass = 'text-risk-high/20';
        label = 'Poor';
    } else if (score < 80) {
        colorClass = 'text-risk-medium';
        emptyColorClass = 'text-risk-medium/20';
        label = 'Fair';
    }

    // Circle math for SVG gauge
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col items-center justify-center h-full">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 self-start w-full flex items-center">
                <HeartPulse className="w-5 h-5 mr-2 text-rose-500" />
                Health Score
            </h3>

            <div className="relative flex items-center justify-center w-40 h-40">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        strokeWidth="12"
                        fill="transparent"
                        className={clsx('transition-colors duration-500', emptyColorClass)}
                    />
                    {/* Foreground Circle */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className={clsx('transition-all duration-1000 ease-out', colorClass)}
                        stroke="currentColor"
                    />
                </svg>

                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={clsx('text-4xl font-black tracking-tighter', colorClass)}>
                        {score}
                    </span>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
};
