import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { config } from '@/config';
import { storage } from './storage';
import type { ApiError, AuthResponse, LoginCredentials, RegisterData, User, Vehicle } from '@/types/api';

/**
 * Base API configuration
 * Using API Gateway URL for development environment
 */
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: config.api?.timeout || 10000, // Default to 10 seconds if not configured
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await storage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors and retries
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config;
    
    // Handle token expiration
    if (error.response?.status === 401) {
      await storage.removeItem('token');
      router.replace('/login');
      return Promise.reject(error);
    }

    // Implement retry logic for network errors
    if (error.message === 'Network Error' && originalRequest && !originalRequest.headers['x-retry']) {
      originalRequest.headers['x-retry'] = 'true';
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/api/auth/login', credentials);
    await storage.setItem('token', data.token);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/api/auth/register', userData);
    await storage.setItem('token', data.token);
    return data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/api/auth/me');
    return data;
  },

  async logout(): Promise<void> {
    await storage.removeItem('token');
    router.replace('/login');
  },

  async updateRole(role: User['role']): Promise<User> {
    const { data } = await api.put<User>('/api/users/role', { role });
    return data;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const { data } = await api.put<User>('/api/users/profile', updates);
    return data;
  },
};

// Vehicles API
export const vehiclesApi = {
  async getVehicles(params?: {
    q?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    startDate?: string;
    endDate?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    page?: number;
    limit?: number;
  }): Promise<Vehicle[]> {
    const { data } = await api.get<Vehicle[]>('/api/vehicles', { params });
    return data;
  },

  async getVehicleById(id: string): Promise<Vehicle> {
    const { data } = await api.get<Vehicle>(`/api/vehicles/${id}`);
    return data;
  },

  async createVehicle(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const { data } = await api.post<Vehicle>('/api/vehicles', vehicleData);
    return data;
  },

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    const { data } = await api.put<Vehicle>(`/api/vehicles/${id}`, updates);
    return data;
  },
};

export default api;