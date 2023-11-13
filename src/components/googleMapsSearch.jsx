import React, { useState } from 'react';
import { useAddressAutocomplete } from '../hooks/useAddressAutocomplete';
import { SuggestionsList } from './suggestionsList';
import target from '../assets/map-pin.png'; 

const GoogleMapsSearch = () => {

  const [input, setInput] = useState('');
  const suggestions = useAddressAutocomplete(input);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClick = async (placeId) => {
    if (placeId !== selectedPlaceId) {
      setSelectedPlaceId(placeId);
    }
  };

  return (
    <div className="search-container">
      <div className='input-icon-container'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder=""
        />
        <img class="input-icon" src={target} alt="Descripción" />
        {suggestions.length > 0 && <SuggestionsList suggestions={suggestions} />}   
      </div>
    </div>
  );
};

export default GoogleMapsSearch;
