import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';

export const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-50 overflow-hidden relative selection:bg-cyan-500/30 transition-colors duration-300">
            {/* Ambient Background Glows (Dark Mode Only) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none hidden dark:block"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none hidden dark:block"></div>

            {/* Desktop Sidebar (hidden on mobile) */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden w-full h-full relative z-10">
                {/* Header */}
                <Header />

                {/* Scrollable Main Area (padding bottom for PWA nav bar) */}
                <main className="flex-1 overflow-y-auto p-4 pb-24 md:pb-8 sm:p-6 lg:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Fixed Mobile Bottom Nav */}
            <MobileBottomNav />
        </div>
    );
};
