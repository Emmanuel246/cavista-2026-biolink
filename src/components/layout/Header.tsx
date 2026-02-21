import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="mr-4 p-2 rounded-md text-slate-500 hover:bg-slate-100 md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">
                    Environmental Health Monitor
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-risk-high rounded-full"></span>
                </button>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                        <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden sm:block">
                        Dr. AI Guide
                    </span>
                </div>
            </div>
        </header>
    );
};
