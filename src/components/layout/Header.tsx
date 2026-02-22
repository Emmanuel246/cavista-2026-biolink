import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="h-16 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="mr-4 p-2 rounded-md text-slate-400 hover:bg-white/5 md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-white hidden sm:block tracking-tight">
                    Environmental Health Monitor
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
                </button>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                        <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-200 hidden sm:block">
                        Dr. AI Guide
                    </span>
                </div>
            </div>
        </header>
    );
};
