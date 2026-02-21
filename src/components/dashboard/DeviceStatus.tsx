import React from 'react';
import { Cpu, Wifi, Clock, Activity } from 'lucide-react';
import { clsx } from 'clsx';

interface DeviceStatusProps {
    deviceId: string;
    lastUpdated: Date;
    isOnline: boolean;
}

export const DeviceStatus: React.FC<DeviceStatusProps> = ({ deviceId, lastUpdated, isOnline }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-slate-400" />
                Sensor Status
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600 font-medium text-sm">
                        <Activity className="w-4 h-4 mr-2 text-slate-400" />
                        Device ID
                    </div>
                    <span className="font-mono text-sm text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {deviceId}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600 font-medium text-sm">
                        <Wifi className="w-4 h-4 mr-2 text-slate-400" />
                        Connection
                    </div>
                    <div className="flex items-center">
                        <span className={clsx(
                            'w-2 h-2 rounded-full mr-2 animate-pulse',
                            isOnline ? 'bg-green-500' : 'bg-red-500'
                        )}></span>
                        <span className={clsx('text-sm font-semibold', isOnline ? 'text-green-600' : 'text-red-500')}>
                            {isOnline ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600 font-medium text-sm">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />
                        Last Sync
                    </div>
                    <span className="text-sm text-slate-500">
                        {lastUpdated.toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    );
};
