import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          // TODO: Implement actual login logic
          const mockUser = { id: '1', email, name: 'Test User' };
          const mockToken = 'mock-jwt-token';
          set({ user: mockUser, token: mockToken, isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Login failed' });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email: string, password: string, name: string) => {
        try {
          set({ isLoading: true, error: null });
          // TODO: Implement actual registration logic
          const mockUser = { id: '1', email, name };
          const mockToken = 'mock-jwt-token';
          set({ user: mockUser, token: mockToken, isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Registration failed' });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 