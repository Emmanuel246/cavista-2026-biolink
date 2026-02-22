import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Leaf, Bot, FileText } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-white/70 dark:bg-[var(--color-surface-800)]/80 backdrop-blur-3xl text-slate-600 dark:text-slate-300 flex-col h-full rounded-[2rem] border border-slate-200/60 dark:border-white/5 relative shadow-sm dark:shadow-[var(--shadow-soft-dark)] transition-colors duration-400 overflow-hidden flex">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-500)]/5 to-transparent pointer-events-none hidden dark:block"></div>

            <div className="h-[4.5rem] flex items-center px-6 border-b border-slate-200/50 dark:border-white/5 relative z-10">
                <Leaf className="w-6 h-6 text-[var(--color-brand-600)] dark:text-[var(--color-brand-500)] mr-3 dark:drop-shadow-[0_0_12px_rgba(20,184,166,0.6)]" />
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">EcoBreath<span className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-500)]">AI</span></span>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2 relative z-10">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold ${isActive ? 'bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-500)] shadow-sm dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`
                    }
                >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold ${isActive ? 'bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-500)] shadow-sm dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`
                    }
                >
                    <LineChart className="w-5 h-5 mr-3" />
                    History Charts
                </NavLink>
                <NavLink
                    to="/log"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold ${isActive ? 'bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-500)] shadow-sm dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`
                    }
                >
                    <FileText className="w-5 h-5 mr-3" />
                    Symptom Log
                </NavLink>
                <NavLink
                    to="/coach"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`
                    }
                >
                    <Bot className="w-5 h-5 mr-3" />
                    AI Coach
                </NavLink>
            </nav>

            <div className="p-5 border-t border-slate-200/50 dark:border-white/5 text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 flex items-center bg-slate-50/50 dark:bg-[var(--color-surface-900)]/50 relative z-10 uppercase">
                <div className="w-2 h-2 rounded-full bg-[var(--color-risk-low)] mr-2 animate-pulse dark:shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                Live Environment
            </div>
        </aside>
    );
};
