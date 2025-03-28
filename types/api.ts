export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'renter' | 'rentee' | 'both';
}

export interface Vehicle {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  ownerId: string;
}

export interface Booking {
  id: string;
  vehicleId: string;
  renterId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface ApiError {
  message: string;
  errors?: { [key: string]: string[] };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  fullName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}