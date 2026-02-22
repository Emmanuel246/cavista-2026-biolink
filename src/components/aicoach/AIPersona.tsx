import React, { useEffect, useState, useRef } from 'react';
import type { LoggedSymptom } from '../../services/symptomStorage';
import type { DashboardMetrics } from '../../services/types';
import { generateCoachResponse } from '../../services/geminiService';
import type { ChatMessage } from '../../services/geminiService';
import { Bot, Sparkles, AlertCircle, Send, User } from 'lucide-react';
import { clsx } from 'clsx';

interface AIPersonaProps {
    symptoms: LoggedSymptom[];
    metrics: DashboardMetrics | null;
}

export const AIPersona: React.FC<AIPersonaProps> = ({ symptoms, metrics }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Greeting based on context
    useEffect(() => {
        if (messages.length > 0) return; // Prevent resetting chat on metrics poll

        const initialMessages: ChatMessage[] = [
            {
                id: 'greet-1',
                role: 'model',
                parts: [{ text: "Hello! I'm your EcoBreath AI Health Coach. How are you feeling today?" }]
            }
        ];

        if (metrics && metrics.overallRisk === 'HIGH') {
            initialMessages.push({
                id: 'alert-1',
                role: 'model',
                isAlert: true,
                parts: [{ text: `Heads up: Current environmental risk is HIGH. AQI is ${metrics.airQuality.toFixed(0)}.` }]
            });
        }

        if (metrics) {
            setMessages(initialMessages);
        }
    }, [metrics, messages.length]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessageStr = inputValue.trim();
        const newUserMsg: ChatMessage = {
            id: Math.random().toString(),
            role: 'user',
            parts: [{ text: userMessageStr }]
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsLoading(true);

        const historyForGemini = [...messages, newUserMsg];

        // Call Gemini Service
        const aiResponseText = await generateCoachResponse(userMessageStr, historyForGemini, metrics, symptoms);

        const newAiMsg: ChatMessage = {
            id: Math.random().toString(),
            role: 'model',
            parts: [{ text: aiResponseText }]
        };

        setMessages(prev => [...prev, newAiMsg]);
        setIsLoading(false);
    };

    return (
        <div className="relative bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-sm dark:shadow-2xl w-full h-full border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden transition-colors duration-300">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] dark:opacity-[0.03] pointer-events-none transition-opacity">
                <Bot className="w-64 h-64 text-slate-900 dark:text-white" />
            </div>

            {/* Header */}
            <div className="flex-shrink-0 flex items-center p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/80 dark:bg-[#0f172a]/50 backdrop-blur-md z-10 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center mr-3 ring-2 ring-cyan-500/30 dark:ring-cyan-500/50 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-colors">
                    <Bot className="w-5 h-5 text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-colors" />
                </div>
                <div>
                    <h3 className="text-lg font-black tracking-tight flex items-center text-slate-800 dark:text-white transition-colors">
                        EcoBreath AI
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 ml-2 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-colors" />
                    </h3>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider transition-colors">POWERED BY GEMINI</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar z-10 relative">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={clsx(
                            "flex items-end w-full animate-fade-in-up",
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {msg.role === 'model' && (
                            <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center mr-2 flex-shrink-0 border border-cyan-200 dark:border-cyan-500/30">
                                {msg.isAlert ? <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" /> : <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                            </div>
                        )}
                        <div
                            className={clsx(
                                "px-5 py-3.5 max-w-[85%] md:max-w-[75%] shadow-sm relative",
                                msg.role === 'model'
                                    ? (msg.isAlert
                                        ? 'bg-rose-50 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 text-rose-900 dark:text-rose-100 rounded-2xl rounded-bl-sm backdrop-blur-md'
                                        : 'bg-white dark:bg-[#1e293b]/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-2xl rounded-bl-sm backdrop-blur-md')
                                    : 'bg-gradient-to-br from-cyan-600 to-indigo-600 border border-cyan-500/50 text-white rounded-2xl rounded-br-sm shadow-md shadow-cyan-500/20'
                            )}
                        >
                            <div className="text-sm md:text-base leading-relaxed font-medium whitespace-pre-wrap">
                                {/* Very primitive markdown rendering for bolding usually found in gemini responses */}
                                {msg.parts[0].text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className={clsx("font-black drop-shadow-sm", msg.role === 'user' ? "text-white" : "text-slate-900 dark:text-white")}>{part}</strong> : part)}
                            </div>
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center ml-2 flex-shrink-0 border border-indigo-200 dark:border-indigo-500/30">
                                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-end w-full animate-fade-in justify-start">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center mr-2 flex-shrink-0 border border-cyan-200 dark:border-cyan-500/30">
                            <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                        </div>
                        <div className="px-5 py-4 max-w-[85%] bg-white dark:bg-[#1e293b]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl rounded-bl-none flex items-center shadow-sm">
                            <div className="flex space-x-1.5 opacity-60">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 bg-slate-50/90 dark:bg-[#0f172a]/80 backdrop-blur-md border-t border-slate-200 dark:border-white/5 z-10 transition-colors duration-300">
                <form onSubmit={handleSendMessage} className="flex relative items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about your symptoms or environment..."
                        disabled={isLoading}
                        className="w-full bg-white dark:bg-[#1e293b]/50 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white rounded-full pl-6 pr-14 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 transition-all font-medium shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="absolute right-2 p-2.5 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 shadow-md dark:shadow-shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
                <div className="text-center mt-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 transition-colors">Gemini may display inaccurate info, double-check its responses.</span>
                </div>
            </div>
        </div>
    );
};
