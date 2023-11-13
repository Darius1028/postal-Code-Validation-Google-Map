import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GoogleMapsSearch from '../googleMapsSearch';


jest.mock('../../hooks/useAddressAutocomplete', () => ({
  useAddressAutocomplete: (input) => {
    const suggestions = [
      {
        place_id: '1',
        structured_formatting: {
          main_text: 'Main Text 1',
          secondary_text: 'Secondary Text 1',
        },
      },
      {
        place_id: '2',
        structured_formatting: {
          main_text: 'Main Text 2',
          secondary_text: 'Secondary Text 2',
        },
      },
    ];

    return input ? suggestions : [];
  },
}));

describe('GoogleMapsSearch', () => {
  xit('renders input and suggestions', async () => {
    const { getByPlaceholderText, getByText } = render(<GoogleMapsSearch />);


    const inputElement = getByPlaceholderText('');

    expect(inputElement).toBeInTheDocument();


    fireEvent.change(inputElement, { target: { value: 'Search Text' } });

    await waitFor(() => {
      expect(getByText('Main Text 1')).toBeInTheDocument();
      expect(getByText('Secondary Text 1')).toBeInTheDocument();
      expect(getByText('Main Text 2')).toBeInTheDocument();
      expect(getByText('Secondary Text 2')).toBeInTheDocument();
    });
  });

  xit('handles selection of a suggestion', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <GoogleMapsSearch />
    );

 
    const inputElement = getByPlaceholderText('');


    fireEvent.change(inputElement, { target: { value: 'Search Text' } });

 
    await waitFor(() => {
      expect(getByText('Main Text 1')).toBeInTheDocument();
    });


    fireEvent.click(getByText('Main Text 1'));


    expect(inputElement.value).toBe('Main Text 1');
  });

  xit('displays the image icon', () => {
    const { getByAltText } = render(<GoogleMapsSearch />);
    const imageIcon = getByAltText('Descripción');

    expect(imageIcon).toBeInTheDocument();
  });
});
