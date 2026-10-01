'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured, UserProfile } from '@/lib/supabase';
import { DiagnosisResult, SAMPLE_DIAGNOSES } from '@/lib/mock-predict';
import { PLANS } from '@/lib/plans';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  history: DiagnosisResult[];
  login: (email: string, pass: string) => Promise<{ error?: string }>;
  signup: (email: string, pass: string, fullName: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  loginAsDemo: () => void;
  updatePlan: (planId: 'free' | 'basic' | 'pro') => Promise<void>;
  addDiagnosisToHistory: (result: DiagnosisResult) => void;
  clearHistory: () => void;
  getRemainingScans: () => number | 'unlimited';
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-greenkeeper',
  email: 'agronomist@phytodoc.ai',
  fullName: 'Алексей Смирнов',
  avatarUrl: '',
  planId: 'free',
  diagnosesUsedThisMonth: 2,
  totalDiagnosesCount: 7,
  createdAt: '2026-08-15T09:00:00Z',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'phytodoc_user_v2';
const STORAGE_KEY_HISTORY = 'phytodoc_history_v2';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return DEFAULT_DEMO_USER;
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) return JSON.parse(savedUser);
    } catch {
      // fallback
    }
    return DEFAULT_DEMO_USER;
  });

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<DiagnosisResult[]>(() => {
    if (typeof window === 'undefined') return SAMPLE_DIAGNOSES.slice(0, 3);
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) return JSON.parse(savedHistory);
    } catch {
      // fallback
    }
    return SAMPLE_DIAGNOSES.slice(0, 3);
  });

  // Check real Supabase session if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || 'user@phytodoc.ai',
            fullName: session.user.user_metadata?.full_name || 'Садовод',
            avatarUrl: session.user.user_metadata?.avatar_url || '',
            planId: 'free',
            diagnosesUsedThisMonth: 1,
            totalDiagnosesCount: 1,
            createdAt: session.user.created_at,
          };
          setUser(profile);
          try {
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
          } catch {
            // ignore
          }
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || 'user@phytodoc.ai',
            fullName: session.user.user_metadata?.full_name || 'Садовод',
            avatarUrl: session.user.user_metadata?.avatar_url || '',
            planId: 'free',
            diagnosesUsedThisMonth: 1,
            totalDiagnosesCount: 1,
            createdAt: session.user.created_at,
          };
          setUser(profile);
          try {
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
          } catch {
            // ignore
          }
        } else if (_event === 'SIGNED_OUT') {
          setUser(null);
          try {
            localStorage.removeItem(STORAGE_KEY_USER);
          } catch {
            // ignore
          }
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const saveUser = useCallback((u: UserProfile | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch {
      // ignore
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return { error: error.message };
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
          avatarUrl: '',
          planId: 'free',
          diagnosesUsedThisMonth: 1,
          totalDiagnosesCount: 2,
          createdAt: data.user.created_at,
        };
        saveUser(profile);
      }
      return {};
    }

    // Mock Login
    const mockUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: email.split('@')[0],
      avatarUrl: '',
      planId: 'basic',
      diagnosesUsedThisMonth: 8,
      totalDiagnosesCount: 24,
      createdAt: new Date().toISOString(),
    };
    saveUser(mockUser);
    return {};
  };

  const signup = async (email: string, pass: string, fullName: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { full_name: fullName } },
      });
      if (error) return { error: error.message };
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: fullName || email.split('@')[0],
          avatarUrl: '',
          planId: 'free',
          diagnosesUsedThisMonth: 0,
          totalDiagnosesCount: 0,
          createdAt: data.user.created_at,
        };
        saveUser(profile);
      }
      return {};
    }

    // Mock Signup
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: fullName || 'Новый садовод',
      avatarUrl: '',
      planId: 'free',
      diagnosesUsedThisMonth: 0,
      totalDiagnosesCount: 0,
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);
    return {};
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    saveUser(null);
  };

  const loginAsDemo = () => {
    saveUser(DEFAULT_DEMO_USER);
  };

  const updatePlan = async (planId: 'free' | 'basic' | 'pro') => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      planId,
    };
    saveUser(updated);
  };

  const addDiagnosisToHistory = (result: DiagnosisResult) => {
    setHistory(prev => {
      const next = [result, ...prev.filter(item => item.id !== result.id)];
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    if (user) {
      const updated: UserProfile = {
        ...user,
        diagnosesUsedThisMonth: user.diagnosesUsedThisMonth + 1,
        totalDiagnosesCount: user.totalDiagnosesCount + 1,
      };
      saveUser(updated);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // ignore
    }
  };

  const getRemainingScans = (): number | 'unlimited' => {
    if (!user) return 5;
    const plan = PLANS.find(p => p.id === user.planId) || PLANS[0];
    if (plan.diagnosesPerMonth === 'unlimited') return 'unlimited';
    const remaining = plan.diagnosesPerMonth - user.diagnosesUsedThisMonth;
    return remaining > 0 ? remaining : 0;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isSupabaseConfigured,
        history,
        login,
        signup,
        logout,
        loginAsDemo,
        updatePlan,
        addDiagnosisToHistory,
        clearHistory,
        getRemainingScans,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
