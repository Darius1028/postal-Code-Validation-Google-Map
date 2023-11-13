import { useState, useEffect } from 'react';
import { API_GOOGLE_KEY } from '../config/config';


const GOOGLE_MAPS_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${API_GOOGLE_KEY}&libraries=places&callback=logPlaceDetails`;

export const useAddressAutocomplete = (input) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) return;

      const script = document.createElement('script');
      script.src = GOOGLE_MAPS_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (input && window.google && window.google.maps && window.google.maps.places) {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions({ input }, (predictions) => {
        setSuggestions(predictions ? predictions.slice(0, 3) : []);
      });
    } else {
      setSuggestions([]);
    }
  }, [input]);

  return suggestions;
};