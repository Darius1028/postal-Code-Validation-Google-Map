import { renderHook, act } from '@testing-library/react'
import { useGeolocationDetails, NO_POSTAL_CODE } from '../useGeolocationDetails'; // Reemplaza 'tu-archivo' con la ruta correcta a tu archivo

describe('useGeolocationDetails', () => {
  it('should return geolocation details correctly', async () => {
    const placeId = '12345';

    const { result } = renderHook(() => useGeolocationDetails(placeId));

    act(() => {
      result.current;
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.postalCode).not.toBe(NO_POSTAL_CODE);

  });

  it('should handle null placeId', () => {
    const { result } = renderHook(() => useGeolocationDetails(null));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.postalCode).toBe(null);
  });

  it('should clear geolocation details', () => {
    const placeId = '12345';

    const { result } = renderHook(() => useGeolocationDetails(placeId));

    act(() => {
      result.current;
    });

    act(() => {
      result.current.clearPlaceDetails();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.postalCode).toBe(null);
  });
});