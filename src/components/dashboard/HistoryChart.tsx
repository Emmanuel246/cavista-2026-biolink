import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { HistoryDataPoint } from '../../services/types';

interface HistoryChartProps {
    data: HistoryDataPoint[];
    dataKey: keyof Omit<HistoryDataPoint, 'timestamp'>;
    title: string;
    color: string;
    unit: string;
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ data, dataKey, title, color, unit }) => {
    return (
        <div className="relative bg-white/70 dark:bg-[var(--color-surface-800)]/80 backdrop-blur-3xl rounded-[2rem] border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 h-[22rem] flex flex-col transition-all duration-400 shadow-sm dark:shadow-[var(--shadow-soft-dark)] hover:shadow-md dark:hover:shadow-lg overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100/50 dark:from-white/[0.05] to-transparent pointer-events-none transition-colors duration-400"></div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 relative z-10 transition-colors">{title} Over Time</h3>
            <div className="flex-1 w-full min-h-0 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} stroke="#cbd5e1" className="dark:!stroke-slate-700/50 transition-colors" />
                        <XAxis
                            dataKey="timestamp"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                            className="dark:fill-slate-400 transition-colors"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                            className="dark:fill-slate-400 transition-colors"
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ fontWeight: 'bold' }}
                            labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                            formatter={(value: any) => [`${value} ${unit}`, title]}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            name={title}
                            stroke={color}
                            strokeWidth={3}
                            dot={{ stroke: color, strokeWidth: 2, r: 4, fill: '#fff', className: 'dark:!fill-[#0f172a]' }}
                            activeDot={{ r: 6, strokeWidth: 2, fill: color, stroke: '#fff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
