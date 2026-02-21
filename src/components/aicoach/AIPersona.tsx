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

        setMessages(initialMessages);
    }, [metrics]);

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
        <div className="bg-slate-900 rounded-xl shadow-xl w-full h-full border border-slate-800 flex flex-col overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <Bot className="w-64 h-64" />
            </div>

            {/* Header */}
            <div className="flex-shrink-0 flex items-center p-4 border-b border-slate-700 bg-slate-900/90 backdrop-blur z-10">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 ring-2 ring-indigo-500/50">
                    <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold font-sans tracking-tight flex items-center text-white">
                        EcoBreath AI
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 ml-2" />
                    </h3>
                    <p className="text-xs text-slate-400">Powered by Gemini</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar z-10">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={clsx(
                            "p-3.5 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-md animate-fade-in-up flex items-start",
                            msg.role === 'model'
                                ? (msg.isAlert ? 'bg-red-500/10 border border-red-500/30 text-rose-100 rounded-tl-sm self-start' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm self-start')
                                : 'bg-indigo-600 border border-indigo-500 text-white rounded-tr-sm self-end ml-auto'
                        )}
                    >
                        <div className="mr-3 mt-0.5 flex-shrink-0">
                            {msg.role === 'model' && msg.isAlert && <AlertCircle className="w-4 h-4 text-red-400" />}
                            {msg.role === 'model' && !msg.isAlert && <Bot className="w-4 h-4 text-indigo-400" />}
                            {msg.role === 'user' && <User className="w-4 h-4 text-indigo-200" />}
                        </div>

                        <div className="text-sm md:text-base leading-relaxed font-medium whitespace-pre-wrap">
                            {/* Very primitive markdown rendering for bolding usually found in gemini responses */}
                            {msg.parts[0].text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="p-3.5 rounded-2xl max-w-[85%] bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none self-start flex items-center animate-fade-in">
                        <Bot className="w-4 h-4 text-indigo-400 mr-3 animate-pulse" />
                        <div className="flex space-x-1.5 opacity-50">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-3 bg-slate-800 border-t border-slate-700 z-10">
                <form onSubmit={handleSendMessage} className="flex relative items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about your symptoms or environment..."
                        disabled={isLoading}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
                <div className="text-center mt-2">
                    <span className="text-[10px] text-slate-500">Gemini may display inaccurate info, so double-check its responses.</span>
                </div>
            </div>
        </div>
    );
};
