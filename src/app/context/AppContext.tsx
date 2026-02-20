import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserData {
  name: string;
  email: string;
}

export interface PhaseAnswer {
  phaseId: number;
  questions: Record<number, string | string[]>;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  responsible: string;
  status: string;
  phase: string;
  lastActivity: string;
}

interface AppContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  phases: PhaseAnswer[];
  savePhaseAnswer: (phaseId: number, questionId: number, answer: string | string[]) => void;
  completePhase: (phaseId: number) => void;
  currentPhase: number;
  isPhaseUnlocked: (phaseId: number) => boolean;
  resetProgress: () => void;
  // Admin
  isAdmin: boolean;
  projects: Project[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'gdc_data';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserData | null>(null);
  const [phases, setPhases] = useState<PhaseAnswer[]>([
    { phaseId: 1, questions: {}, completed: false },
    { phaseId: 2, questions: {}, completed: false },
    { phaseId: 3, questions: {}, completed: false },
  ]);
  const [isAdmin] = useState(false);

  // Mock projects for admin dashboard
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Transformación Digital',
      responsible: 'Ana García',
      status: 'En progreso',
      phase: 'Fase 2',
      lastActivity: '15/02/2026',
    },
    {
      id: '2',
      name: 'Nuevo CRM',
      responsible: 'Carlos Ruiz',
      status: 'Completado',
      phase: 'Fase 3',
      lastActivity: '10/02/2026',
    },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.user) setUserState(data.user);
        if (data.phases) setPhases(data.phases);
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, phases }));
    }
  }, [user, phases]);

  const setUser = (userData: UserData) => {
    setUserState(userData);
  };

  const savePhaseAnswer = (phaseId: number, questionId: number, answer: string | string[]) => {
    setPhases((prev) =>
      prev.map((phase) =>
        phase.phaseId === phaseId
          ? { ...phase, questions: { ...phase.questions, [questionId]: answer } }
          : phase
      )
    );
  };

  const completePhase = (phaseId: number) => {
    setPhases((prev) =>
      prev.map((phase) =>
        phase.phaseId === phaseId ? { ...phase, completed: true } : phase
      )
    );
  };

  const currentPhase = phases.findIndex((p) => !p.completed) + 1 || phases.length;

  const isPhaseUnlocked = (phaseId: number) => {
    if (phaseId === 1) return true;
    return phases[phaseId - 2]?.completed || false;
  };

  const resetProgress = () => {
    setUserState(null);
    setPhases([
      { phaseId: 1, questions: {}, completed: false },
      { phaseId: 2, questions: {}, completed: false },
      { phaseId: 3, questions: {}, completed: false },
    ]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        phases,
        savePhaseAnswer,
        completePhase,
        currentPhase,
        isPhaseUnlocked,
        resetProgress,
        isAdmin,
        projects,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}