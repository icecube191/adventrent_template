import type { Vehicle, User, AuthResponse, ApiError } from '@/types/api';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

class ApiErrorResponse extends Error {
  constructor(public code: string, public status: number, message: string) {
    super(message);
    this.name = 'ApiErrorResponse';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new ApiErrorResponse(error.code, response.status, error.message);
  }
  return response.json();
}

export const vehiclesApi = {
  search: async (params: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Vehicle[]> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_URL}/vehicles?${queryParams}`);
    return handleResponse<Vehicle[]>(response);
  },

  getById: async (id: string): Promise<Vehicle> => {
    const response = await fetch(`${API_URL}/vehicles/${id}`);
    return handleResponse<Vehicle>(response);
  },
};

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<AuthResponse>(response);
  },

  register: async (userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<AuthResponse>(response);
  },

  getProfile: async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<User>(response);
  },
}; 