import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';

export const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-[var(--color-surface-50)] dark:bg-[var(--color-surface-900)] text-slate-800 dark:text-slate-50 overflow-hidden relative selection:bg-brand-500/30 transition-colors duration-400 p-2 md:p-4 gap-2 md:gap-4">
            {/* Ambient Background Glows (Dark Mode Only) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[140px] pointer-events-none hidden dark:block"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none hidden dark:block"></div>

            {/* Desktop Sidebar (hidden on mobile) */}
            <div className="hidden md:block h-full relative z-20">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden w-full h-full relative z-10">
                {/* Header */}
                <Header />

                {/* Scrollable Main Area */}
                <main className="flex-1 overflow-y-auto px-2 pt-2 pb-24 md:pb-4 sm:px-4 lg:px-6 custom-scrollbar">
                    <div className="max-w-7xl mx-auto h-full space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Fixed Mobile Bottom Nav */}
            <MobileBottomNav />
        </div>
    );
};
