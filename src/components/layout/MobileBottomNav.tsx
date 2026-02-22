import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, FileText, Bot } from 'lucide-react';
import { clsx } from 'clsx';

export const MobileBottomNav: React.FC = () => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B0F19]/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around pb-safe z-50 h-16 px-2 shadow-[0_-4px_24px_-10px_rgba(34,211,238,0.2)]">
            <NavLink
                to="/"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative",
                    isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                )}
            >
                {({ isActive }) => (
                    <>
                        <LayoutDashboard className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold">Home</span>
                        {isActive && <div className="absolute top-0 w-8 h-1 bg-cyan-400 rounded-b-full shadow-[0_4px_8px_rgba(34,211,238,0.8)]"></div>}
                    </>
                )}
            </NavLink>

            <NavLink
                to="/history"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative",
                    isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                )}
            >
                {({ isActive }) => (
                    <>
                        <LineChart className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold">History</span>
                        {isActive && <div className="absolute top-0 w-8 h-1 bg-cyan-400 rounded-b-full shadow-[0_4px_8px_rgba(34,211,238,0.8)]"></div>}
                    </>
                )}
            </NavLink>

            <NavLink
                to="/log"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative",
                    isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                )}
            >
                {({ isActive }) => (
                    <>
                        <FileText className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold">Log Menu</span>
                        {isActive && <div className="absolute top-0 w-8 h-1 bg-cyan-400 rounded-b-full shadow-[0_4px_8px_rgba(34,211,238,0.8)]"></div>}
                    </>
                )}
            </NavLink>

            <NavLink
                to="/coach"
                className={({ isActive }) => clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative",
                    isActive ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
                )}
            >
                {({ isActive }) => (
                    <>
                        <Bot className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold">AI Coach</span>
                        {isActive && <div className="absolute top-0 w-8 h-1 bg-indigo-400 rounded-b-full shadow-[0_4px_8px_rgba(99,102,241,0.8)]"></div>}
                    </>
                )}
            </NavLink>
        </nav>
    );
};
