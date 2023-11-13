import { useState, useEffect, useCallback, useRef } from 'react';

export const NO_POSTAL_CODE = 'NO_POSTAL_CODE';

export const useGeolocationDetails = (placeId) => {
  const [postalCode, setPostalCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const serviceRef = useRef(null);

  useEffect(() => {
    if (!serviceRef.current && window.google?.maps?.places?.PlacesService) {
      serviceRef.current = new window.google.maps.places.PlacesService(document.createElement('div'));
    }
  }, []);

  const handleResponse = (place, status) => {
    setIsLoading(false);

    if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.address_components) {
      const postalCodeComponent = place.address_components.find(component => component.types.includes('postal_code'));
      setPostalCode(postalCodeComponent ? postalCodeComponent.long_name : NO_POSTAL_CODE);
    } else {
      setError(status);
    }
  };

  const clearPlaceDetails = () => {
    setPostalCode(null);
    setIsLoading(false);
    setError(null);
  };

  const getPostalCode = useCallback(() => {
    if (placeId && serviceRef.current) {
      setIsLoading(true);
      setError(null);
      setTimeout(() => {
        serviceRef.current.getDetails({ placeId }, handleResponse);
      }, 500);
    }
  }, [placeId, handleResponse]);

  useEffect(() => {
    getPostalCode();
  }, [placeId]);

  return { postalCode, isLoading, clearPlaceDetails, error };
};