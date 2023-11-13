import { renderHook, act } from '@testing-library/react'
import { useAddressAutocomplete } from '../useAddressAutocomplete';

global.window.google = {
  maps: {
    places: {
      AutocompleteService: jest.fn(),
    },
  },
};

const mockPredictions = [
  { description: 'Prediction 1' },
  { description: 'Prediction 2' },
  { description: 'Prediction 3' },
];

describe('useAddressAutocomplete', () => {
  it('should return suggestions when input is provided', async () => {

    const getPlacePredictionsMock = jest.fn((request, callback) => {
      callback(mockPredictions);
    });

    global.window.google.maps.places.AutocompleteService.prototype.getPlacePredictions = getPlacePredictionsMock;


    const { result } = renderHook(() => useAddressAutocomplete('New York'));

    await act(async () => {
      await result.current;
    });

    expect(result.current).toEqual(mockPredictions);
    expect(getPlacePredictionsMock).toHaveBeenCalledWith({ input: 'New York' }, expect.any(Function));
  });

  it('should return an empty array when no input is provided', async () => {
    const { result } = renderHook(() => useAddressAutocomplete(''));

    await act(async () => {
      await result.current;
    });

    expect(result.current).toEqual([]);
  });
});