export type SymptomSeverity = 'Mild' | 'Moderate' | 'Severe';

export interface LoggedSymptom {
    id: string;
    timestamp: string;
    symptom: string;
    severity: SymptomSeverity;
    notes?: string;
}

const STORAGE_KEY = 'ecobreath_symptoms';

export const symptomStorage = {
    getLogs: (): LoggedSymptom[] => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to parse symptoms from localStorage", e);
            return [];
        }
    },

    addLog: (log: Omit<LoggedSymptom, 'id' | 'timestamp'>): LoggedSymptom => {
        const logs = symptomStorage.getLogs();
        const newLog: LoggedSymptom = {
            ...log,
            id: Math.random().toString(36).substring(2, 9),
            timestamp: new Date().toISOString()
        };

        logs.unshift(newLog); // Add to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
        return newLog;
    },

    clearLogs: (): void => {
        localStorage.removeItem(STORAGE_KEY);
    }
};
