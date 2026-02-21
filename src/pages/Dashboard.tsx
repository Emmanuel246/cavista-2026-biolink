import React from 'react';
import { useMetrics } from '../hooks/useMetrics';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { RiskPanel } from '../components/dashboard/RiskPanel';
import { AIPanel } from '../components/dashboard/AIPanel';
import { HealthGauge } from '../components/dashboard/HealthGauge';
import { DeviceStatus } from '../components/dashboard/DeviceStatus';
import { Thermometer, Droplets, Wind, Activity, Loader2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { metrics, loading, lastUpdated } = useMetrics(10000); // 10s polling

    if (loading && !metrics) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-3 text-lg text-slate-600 font-medium">Gathering Sensor Data...</span>
            </div>
        );
    }

    if (!metrics) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-red-500">
                <Activity className="w-12 h-12 mb-4" />
                <h2 className="text-xl font-bold">Failed to load metrics</h2>
                <p>Please check your connection and try again.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Environmental Overview</h1>
                    <p className="text-slate-500 mt-1">Real-time health risk analysis and monitoring</p>
                </div>
            </div>

            {/* Top Section - Recommendations */}
            <AIPanel recommendation={metrics.recommendation} overallRisk={metrics.overallRisk} />

            {/* Summary Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <SummaryCard
                    title="Temperature"
                    value={metrics.temperature.toFixed(1)}
                    unit="°C"
                    icon={Thermometer}
                    iconColorClass="text-orange-500 bg-orange-50"
                    statusColorClass={metrics.temperature > 32 ? 'text-red-500' : 'text-slate-800'}
                />
                <SummaryCard
                    title="Humidity"
                    value={metrics.humidity.toFixed(0)}
                    unit="%"
                    icon={Droplets}
                    iconColorClass="text-blue-500 bg-blue-50"
                />
                <SummaryCard
                    title="Air Quality"
                    value={metrics.airQuality.toFixed(0)}
                    unit="AQI"
                    icon={Wind}
                    iconColorClass="text-cyan-500 bg-cyan-50"
                    statusColorClass={metrics.airQuality > 50 ? 'text-yellow-600' : 'text-green-600'}
                />
                <SummaryCard
                    title="Health Score"
                    value={metrics.healthScore}
                    unit="/100"
                    icon={Activity}
                    iconColorClass="text-rose-500 bg-rose-50"
                    statusColorClass={metrics.healthScore < 50 ? 'text-red-500' : metrics.healthScore < 80 ? 'text-yellow-500' : 'text-green-500'}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Gauge */}
                <div className="col-span-1">
                    <HealthGauge score={metrics.healthScore} />
                </div>

                {/* Middle Column - Risks */}
                <div className="col-span-1">
                    <RiskPanel
                        heatRisk={metrics.heatRisk}
                        airRisk={metrics.airRisk}
                        overallRisk={metrics.overallRisk}
                    />
                </div>

                {/* Right Column - Device Status */}
                <div className="col-span-1">
                    <DeviceStatus
                        deviceId="ECO-SENS-A04"
                        lastUpdated={lastUpdated}
                        isOnline={true}
                    />
                </div>
            </div>
        </div>
    );
};
