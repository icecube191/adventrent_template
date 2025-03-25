import { create } from 'zustand';
import { authApi } from '@/utils/api';
import type { User, LoginCredentials, RegisterData } from '@/types/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const { user } = await authApi.login(credentials);
      set({ user, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to login',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const { user } = await authApi.register(userData);
      set({ user, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to register',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await authApi.logout();
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({
        error: 'Failed to logout',
        isLoading: false,
      });
    }
  },

  updateUser: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      let updatedUser;
      
      if ('role' in userData) {
        updatedUser = await authApi.updateRole(userData.role as User['role']);
      } else {
        updatedUser = await authApi.updateProfile(userData);
      }
      
      set({ user: updatedUser, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to update user',
        isLoading: false,
      });
      throw error;
    }
  },
}));

export { useAuthStore }