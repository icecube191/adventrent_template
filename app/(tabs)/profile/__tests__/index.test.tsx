import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { useAuthStore } from '@/store/auth';
import ProfileScreen from '../index';

// Mock the auth store
jest.mock('@/store/auth', () => ({
  useAuthStore: jest.fn()
}));

const mockUser = {
  id: '1',
  fullName: 'Test User',
  email: 'test@example.com',
  role: 'renter'
};

describe('ProfileScreen', () => {
  beforeEach(() => {
    (useAuthStore as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
      updateUser: jest.fn(),
      logout: jest.fn()
    });
  });

  it('displays user information correctly', () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText(mockUser.fullName)).toBeTruthy();
    expect(getByText(mockUser.email)).toBeTruthy();
  });

  it('handles role change', async () => {
    const mockUpdateUser = jest.fn();
    (useAuthStore as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
      updateUser: mockUpdateUser,
      logout: jest.fn()
    });

    const { getByText } = render(<ProfileScreen />);
    const renteeRole = getByText('Rentee');

    await act(async () => {
      fireEvent.press(renteeRole);
    });

    expect(mockUpdateUser).toHaveBeenCalledWith({ role: 'rentee' });
  });

  it('handles logout', async () => {
    const mockLogout = jest.fn();
    (useAuthStore as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
      updateUser: jest.fn(),
      logout: mockLogout
    });

    const { getByText } = render(<ProfileScreen />);
    const logoutButton = getByText('Log Out');

    await act(async () => {
      fireEvent.press(logoutButton);
    });

    expect(mockLogout).toHaveBeenCalled();
  });
});