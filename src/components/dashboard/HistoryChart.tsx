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
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 h-80 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{title} Over Time</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="timestamp"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontWeight: 'bold' }}
                            formatter={(value: any) => [`${value} ${unit}`, title]}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            name={title}
                            stroke={color}
                            strokeWidth={3}
                            dot={{ stroke: color, strokeWidth: 2, r: 4, fill: '#fff' }}
                            activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: color }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
