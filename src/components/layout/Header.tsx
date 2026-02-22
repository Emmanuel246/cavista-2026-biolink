import React from 'react';
import { Bell, User, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
    onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-16 bg-white/80 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 transition-colors duration-300">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="mr-4 p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 md:hidden transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-slate-800 dark:text-white hidden sm:block tracking-tight transition-colors">
                    Environmental Health Monitor
                </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                    title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors relative rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
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
