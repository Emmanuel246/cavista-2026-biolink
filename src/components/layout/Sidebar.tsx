import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Leaf, Bot, FileText } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col h-full">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <Leaf className="w-6 h-6 text-primary mr-3" />
                <span className="text-xl font-bold tracking-tight">EcoBreath AI</span>
            </div>
            <nav className="flex-1 py-6 px-3 space-y-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <LineChart className="w-5 h-5 mr-3" />
                    History Charts
                </NavLink>
                <NavLink
                    to="/log"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <FileText className="w-5 h-5 mr-3" />
                    Symptom Log
                </NavLink>
                <NavLink
                    to="/coach"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-indigo-400'
                        }`
                    }
                >
                    <Bot className="w-5 h-5 mr-3" />
                    AI Coach
                </NavLink>
            </nav>

            <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
                Demo Mode Active
            </div>
        </aside>
    );
};
