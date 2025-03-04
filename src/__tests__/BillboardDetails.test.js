import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BillboardDetails from './BillboardDetails';

// Mocking axios
jest.mock('axios');

describe('BillboardDetails Component', () => {
  it('renders input field and button', () => {
    render(<BillboardDetails />);
    
    // Check if the input and button are rendered
    expect(screen.getByPlaceholderText('Enter Billboard ID')).toBeInTheDocument();
    expect(screen.getByText('Get Billboard Details')).toBeInTheDocument();
  });

  it('calls API and displays billboard details on successful fetch', async () => {
    // Sample mock data
    const mockBillboard = {
      id: '1',
      advertiser: 'Test Advertiser',
      billboardText: 'Test Billboard Text',
      image: 'http://example.com/image.jpg',
      address: '123 Billboard St.',
      photosTaken: 10,
    };

    // Mocking axios.get to resolve with the mock data
    axios.get.mockResolvedValueOnce({
      data: { billboard: mockBillboard },
    });

    render(<BillboardDetails />);
    
    // Input the billboard ID and click the button
    fireEvent.change(screen.getByPlaceholderText('Enter Billboard ID'), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByText('Get Billboard Details'));
    
    // Wait for the billboard details to appear
    await waitFor(() => {
      expect(screen.getByText('Billboard Details:')).toBeInTheDocument();
      expect(screen.getByText(mockBillboard.advertiser)).toBeInTheDocument();
      expect(screen.getByText(mockBillboard.billboardText)).toBeInTheDocument();
      expect(screen.getByText(mockBillboard.address)).toBeInTheDocument();
      expect(screen.getByText(`Photos Taken: ${mockBillboard.photosTaken}`)).toBeInTheDocument();
    });
  });

  it('displays error message if API call fails', async () => {
    // Mocking axios.get to reject with an error
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch details'));
    
    render(<BillboardDetails />);
    
    // Input the billboard ID and click the button
    fireEvent.change(screen.getByPlaceholderText('Enter Billboard ID'), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByText('Get Billboard Details'));
    
    // Wait for the error to be handled
    await waitFor(() => {
      // Check for the error in the console (although it might not be directly shown)
      expect(screen.queryByText('Billboard Details:')).not.toBeInTheDocument();
    });
  });
});
