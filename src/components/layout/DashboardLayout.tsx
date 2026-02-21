import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';

export const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden relative">
            {/* Desktop Sidebar (hidden on mobile) */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden w-full h-full relative">
                {/* Header (Hamburger removed via internal component logic or just hidden) */}
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
