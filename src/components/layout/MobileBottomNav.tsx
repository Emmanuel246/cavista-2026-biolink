import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, FileText, Bot } from 'lucide-react';
import { clsx } from 'clsx';

export const MobileBottomNav: React.FC = () => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around pb-safe z-50 h-16 px-2">
            <NavLink
                to="/"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-colors",
                    isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                )}
            >
                <LayoutDashboard className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Home</span>
            </NavLink>

            <NavLink
                to="/history"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-colors",
                    isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                )}
            >
                <LineChart className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">History</span>
            </NavLink>

            <NavLink
                to="/log"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-colors",
                    isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                )}
            >
                <FileText className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Log Menu</span>
            </NavLink>

            <NavLink
                to="/coach"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-colors",
                    isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                )}
            >
                <Bot className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">AI Coach</span>
            </NavLink>
        </nav>
    );
};
