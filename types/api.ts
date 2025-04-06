export interface Vehicle {
  id: string;
  name: string;
  type: 'atv' | 'boat' | 'jet-ski' | 'snowmobile' | 'side-by-side';
  price: number;
  location: string;
  images: string[];
  description: string;
  features: string[];
  availability: {
    start: string;
    end: string;
  };
  owner: {
    id: string;
    name: string;
    rating: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  reviews?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
} 