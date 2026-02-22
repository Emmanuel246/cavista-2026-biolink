import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Leaf, Bot, FileText } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-[#0B0F19]/50 backdrop-blur-2xl text-slate-300 flex-shrink-0 hidden md:flex flex-col h-full border-r border-white/5 relative z-20">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
            <div className="h-16 flex items-center px-6 border-b border-white/5 relative z-10">
                <Leaf className="w-6 h-6 text-cyan-400 mr-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                <span className="text-xl font-bold tracking-tight text-white">EcoBreath AI</span>
            </div>
            <nav className="flex-1 py-6 px-3 space-y-2 relative z-10">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-cyan-500/20 text-cyan-300 shadow-[inset_0_0_12px_rgba(34,211,238,0.2)] border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-cyan-500/20 text-cyan-300 shadow-[inset_0_0_12px_rgba(34,211,238,0.2)] border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <LineChart className="w-5 h-5 mr-3" />
                    History Charts
                </NavLink>
                <NavLink
                    to="/log"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-cyan-500/20 text-cyan-300 shadow-[inset_0_0_12px_rgba(34,211,238,0.2)] border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <FileText className="w-5 h-5 mr-3" />
                    Symptom Log
                </NavLink>
                <NavLink
                    to="/coach"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-500/20 text-indigo-300 shadow-[inset_0_0_12px_rgba(99,102,241,0.2)] border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-indigo-300 hover:translate-x-1 border border-transparent'
                        }`
                    }
                >
                    <Bot className="w-5 h-5 mr-3" />
                    AI Coach
                </NavLink>
            </nav>

            <div className="p-5 border-t border-white/5 text-xs font-medium text-slate-400 flex items-center bg-[#06090F]/50 relative z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                Live Environment
            </div>
        </aside>
    );
};
