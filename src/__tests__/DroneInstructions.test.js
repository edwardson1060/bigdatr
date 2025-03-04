import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import DroneInstructions from './DroneInstructions';

// Mock axios
jest.mock('axios');

describe('DroneInstructions', () => {
  test('renders form and handles input', () => {
    render(<DroneInstructions />);

    // Check if the form elements exist
    const input = screen.getByPlaceholderText(/Enter drone instructions/i);
    const button = screen.getByText(/Send Instructions/i);

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('submits instructions and shows billboards', async () => {
    const mockData = {
      data: {
        billboards: [
          {
            id: 1,
            advertiser: 'Advertiser 1',
            billboardText: 'Text 1',
            image: 'image_url_1',
            address: 'Address 1',
            photosTaken: 10,
          },
          {
            id: 2,
            advertiser: 'Advertiser 2',
            billboardText: 'Text 2',
            image: 'image_url_2',
            address: 'Address 2',
            photosTaken: 20,
          },
        ],
      },
    };

    // Mock axios GET request
    axios.get.mockResolvedValue(mockData);

    render(<DroneInstructions />);

    // Get input field and button
    const input = screen.getByPlaceholderText(/Enter drone instructions/i);
    const button = screen.getByText(/Send Instructions/i);

    // Simulate user typing in input field and submitting the form
    fireEvent.change(input, { target: { value: 'Fly over area' } });
    fireEvent.click(button);

    // Wait for axios to be called and the billboards to appear
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:4001/instruct-drone?instructions=Fly%20over%20area'
      );
    });

    // Check if the billboards are rendered
    expect(screen.getByText(/Advertiser 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Advertiser 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Text 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Text 2/i)).toBeInTheDocument();
  });

  test('handles error when API request fails', async () => {
    // Simulate axios error
    axios.get.mockRejectedValue(new Error('API error'));

    render(<DroneInstructions />);

    const input = screen.getByPlaceholderText(/Enter drone instructions/i);
    const button = screen.getByText(/Send Instructions/i);

    // Simulate user input and form submission
    fireEvent.change(input, { target: { value: 'Fly over area' } });
    fireEvent.click(button);

    // Wait for error to be logged in console (you can use a mock for console.error if necessary)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:4001/instruct-drone?instructions=Fly%20over%20area'
      );
    });
  });
});
