import React from 'react';
import { Bell, User, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
    onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-[4.5rem] bg-white/70 dark:bg-[var(--color-surface-800)]/80 backdrop-blur-3xl border border-slate-200/60 dark:border-white/5 flex items-center justify-between px-5 sm:px-6 z-10 sticky top-2 sm:top-4 mx-2 sm:mx-4 lg:mx-6 rounded-[2rem] shadow-sm dark:shadow-[var(--shadow-soft-dark)] transition-colors duration-400 mb-2 sm:mb-4">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="mr-3 p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/5 md:hidden transition-all bg-white dark:bg-transparent shadow-sm dark:shadow-none border border-slate-200/60 dark:border-transparent"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                    <h1 className="text-xl font-extrabold text-slate-900 dark:text-white hidden sm:block tracking-tight transition-colors">
                        Welcome back
                    </h1>
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase hidden sm:block mt-0.5">Environmental Overview</span>
                </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)] transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                    title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors relative rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--color-risk-high)] rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] border-2 border-white dark:border-[var(--color-surface-800)] box-content"></span>
                </button>
                <div className="flex items-center pl-2 ml-2 border-l border-slate-200 dark:border-white/10">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--color-brand-500)] to-indigo-500 flex items-center justify-center text-white shadow-md shadow-[var(--color-brand-500)]/20 shadow-[0_0_15px_rgba(20,184,166,0.3)] border-2 border-white/20">
                        <User className="w-4.5 h-4.5" />
                    </div>
                </div>
            </div>
        </header>
    );
};
