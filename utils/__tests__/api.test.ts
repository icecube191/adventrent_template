import axios from 'axios';
import { authApi, vehiclesApi } from '../api';
import { storage } from '../storage';

jest.mock('axios');
jest.mock('../storage');

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authApi', () => {
    it('handles login successfully', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          user: { id: '1', email: 'test@example.com' }
        }
      };
      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await authApi.login({
        email: 'test@example.com',
        password: 'password'
      });

      expect(storage.setItem).toHaveBeenCalledWith('token', 'test-token');
      expect(result).toEqual(mockResponse.data);
    });

    it('handles login failure', async () => {
      const mockError = {
        response: {
          data: { error: 'Invalid credentials' }
        }
      };
      (axios.post as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(authApi.login({
        email: 'test@example.com',
        password: 'wrong'
      })).rejects.toThrow();
    });
  });

  describe('vehiclesApi', () => {
    it('fetches vehicles with pagination', async () => {
      const mockVehicles = [
        { id: '1', title: 'Vehicle 1' },
        { id: '2', title: 'Vehicle 2' }
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockVehicles });

      const result = await vehiclesApi.getVehicles({
        page: 1,
        limit: 20
      });

      expect(result).toEqual(mockVehicles);
      expect(axios.get).toHaveBeenCalledWith('/api/vehicles', {
        params: { page: 1, limit: 20 }
      });
    });

    it('handles network errors with retry', async () => {
      (axios.get as jest.Mock)
        .mockRejectedValueOnce(new Error('Network Error'))
        .mockResolvedValueOnce({ data: [] });

      const result = await vehiclesApi.getVehicles();

      expect(result).toEqual([]);
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});