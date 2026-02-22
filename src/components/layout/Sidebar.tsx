import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Leaf, Bot, FileText } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-white dark:bg-[#0B0F19]/50 backdrop-blur-2xl text-slate-600 dark:text-slate-300 flex-shrink-0 hidden md:flex flex-col h-full border-r border-slate-200 dark:border-white/5 relative z-20 transition-colors duration-300 shadow-sm dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none hidden dark:block"></div>
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-white/5 relative z-10 transition-colors duration-300">
                <Leaf className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mr-3 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors" />
                <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white transition-colors">EcoBreath AI</span>
            </div>
            <nav className="flex-1 py-6 px-3 space-y-2 relative z-10">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shadow-sm dark:shadow-[inset_0_0_12px_rgba(34,211,238,0.2)] border border-cyan-100 dark:border-cyan-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-cyan-700 dark:hover:text-white hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shadow-sm dark:shadow-[inset_0_0_12px_rgba(34,211,238,0.2)] border border-cyan-100 dark:border-cyan-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-cyan-700 dark:hover:text-white hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <LineChart className="w-5 h-5 mr-3" />
                    History Charts
                </NavLink>
                <NavLink
                    to="/log"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shadow-sm dark:shadow-[inset_0_0_12px_rgba(34,211,238,0.2)] border border-cyan-100 dark:border-cyan-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-cyan-700 dark:hover:text-white hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <FileText className="w-5 h-5 mr-3" />
                    Symptom Log
                </NavLink>
                <NavLink
                    to="/coach"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shadow-sm dark:shadow-[inset_0_0_12px_rgba(99,102,241,0.2)] border border-indigo-100 dark:border-indigo-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-700 dark:hover:text-indigo-300 hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <Bot className="w-5 h-5 mr-3" />
                    AI Coach
                </NavLink>
            </nav>

            <div className="p-5 border-t border-slate-200 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center bg-slate-50 dark:bg-[#06090F]/50 relative z-10 transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-2 animate-pulse dark:shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                Live Environment
            </div>
        </aside>
    );
};
