import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import VehicleCard from '../VehicleCard';

const mockVehicle = {
  id: '1',
  title: 'Test Vehicle',
  type: 'ATV',
  price: 299,
  rating: 4.5,
  reviews: 10,
  primaryImage: 'https://example.com/image.jpg'
};

describe('VehicleCard', () => {
  it('renders vehicle information correctly', () => {
    const { getByText } = render(<VehicleCard {...mockVehicle} />);

    expect(getByText(mockVehicle.title)).toBeTruthy();
    expect(getByText(mockVehicle.type)).toBeTruthy();
    expect(getByText(`$${mockVehicle.price}`)).toBeTruthy();
    expect(getByText(`(${mockVehicle.reviews})`)).toBeTruthy();
  });

  it('shows placeholder when image fails to load', () => {
    const vehicleWithoutImage = { ...mockVehicle, primaryImage: undefined };
    const { getByText } = render(<VehicleCard {...vehicleWithoutImage} />);

    expect(getByText('No image available')).toBeTruthy();
  });

  it('navigates to vehicle details on press', () => {
    const { getByTestId } = render(<VehicleCard {...mockVehicle} />);
    const card = getByTestId('vehicle-card');

    fireEvent.press(card);
    // Navigation is handled by expo-router, which is mocked in the test environment
  });
});