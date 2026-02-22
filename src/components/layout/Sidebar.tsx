import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Leaf, Bot, FileText } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col h-full">
            <div className="h-16 flex items-center px-6 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
                <Leaf className="w-6 h-6 text-primary mr-3" />
                <span className="text-xl font-bold tracking-tight">EcoBreath AI</span>
            </div>
            <nav className="flex-1 py-6 px-3 space-y-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/90 text-white shadow-md shadow-primary/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-white hover:translate-x-1'
                        }`
                    }
                >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/90 text-white shadow-md shadow-primary/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-white hover:translate-x-1'
                        }`
                    }
                >
                    <LineChart className="w-5 h-5 mr-3" />
                    History Charts
                </NavLink>
                <NavLink
                    to="/log"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/90 text-white shadow-md shadow-primary/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-white hover:translate-x-1'
                        }`
                    }
                >
                    <FileText className="w-5 h-5 mr-3" />
                    Symptom Log
                </NavLink>
                <NavLink
                    to="/coach"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-500/90 text-white shadow-md shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-indigo-300 hover:translate-x-1'
                        }`
                    }
                >
                    <Bot className="w-5 h-5 mr-3" />
                    AI Coach
                </NavLink>
            </nav>

            <div className="p-5 border-t border-slate-800/50 text-xs font-medium text-slate-500 flex items-center bg-slate-900/50">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                Live Environment
            </div>
        </aside>
    );
};
