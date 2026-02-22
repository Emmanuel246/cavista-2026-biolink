import { GoogleGenAI } from '@google/genai';
import type { LoggedSymptom } from './symptomStorage';
import type { DashboardMetrics } from './types';

// Read from Vite env var
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Create singleton instance if key exists
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const SYSTEM_INSTRUCTION = `You are the EcoBreath AI Health Coach, a highly knowledgeable, empathetic, and concise AI designed to help users manage their respiratory health based on real-time environmental data and their logged symptoms.

Your tone is supportive, medically informed but accessible, and safety-first. You NEVER diagnose conditions or replace a doctor, but you offer practical advice like "Stay indoors," "Use your inhaler," or "Hydrate."

Keep your responses VERY concise (1-3 short paragraphs max), highly relevant to the provided data, and use markdown formatting to emphasize key points safely.`;

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    parts: { text: string }[];
    isAlert?: boolean;
}

export const generateCoachResponse = async (
    userMessage: string,
    history: ChatMessage[],
    currentMetrics: DashboardMetrics | null,
    recentSymptoms: LoggedSymptom[]
): Promise<string> => {
    if (!ai) {
        return "Error: Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env.local file to enable the chat.";
    }

    const userName = localStorage.getItem('ecoBreath_userName') || 'User';
    const userFocus = localStorage.getItem('ecoBreath_focus') || 'respiratory health';

    // Construct the contextual prompt
    let contextStr = "CURRENT CONTEXT:\n";
    contextStr += `- User Profile: Name is ${userName}, Primary Health Focus is ${userFocus}\n`;

    if (currentMetrics) {
        contextStr += `- Environment: Temp: ${currentMetrics.temperature.toFixed(1)}°C, Humidity: ${currentMetrics.humidity.toFixed(0)}%, AQI: ${currentMetrics.airQuality.toFixed(0)} (Risk: ${currentMetrics.overallRisk})\n`;
    } else {
        contextStr += "- Environment: Data loading or unavailable.\n";
    }

    if (recentSymptoms && recentSymptoms.length > 0) {
        contextStr += `- User's recent logged symptoms:\n`;
        recentSymptoms.slice(0, 3).forEach(s => {
            contextStr += `   * ${s.symptom} (${s.severity}) on ${new Date(s.timestamp).toLocaleString()}\n`;
        });
    } else {
        contextStr += "- User's recent logged symptoms: None.\n";
    }

    const enhancedMessage = `${contextStr}\nUSER MESSAGE: ${userMessage}`;

    try {
        // We need to pass previous history to the chat instance to maintain context if desired,
        // but the new SDK's chats.create allows sending a message which appends.
        // For simplicity in a stateless function call, we could just dump the whole history into the prompt,
        // OR we format the history correctly. Given the standard pattern:

        // We recreate the chat state if possible, or just send the entire formatted log as one user prompt for this hackathon to ensure context is perfectly preserved in a stateless call context.

        let fullConvoText = enhancedMessage;
        if (history.length > 0) {
            fullConvoText = "PREVIOUS CHAT HISTORY:\n" + history.map(m => `${m.role.toUpperCase()}: ${m.parts[0].text}`).join("\n\n") + "\n\n" + enhancedMessage;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullConvoText,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            }
        });

        return response.text || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I encountered an error connecting to my servers. Please try again later or check your API key configuration.";
    }
};
