import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ValidZipCodes } from '../utils/constants';
import { useGeolocationDetails } from '../hooks/useGeolocationDetails';
import { Modal as AddressConfirmationModal } from './modal';
import { Modal as OutOfDeliveryModal } from './modal';
import { LoadingOverlay } from './loadingOverlay';

import target from '../assets/map-pin-gray.png'; 

export const SuggestionsList = ({ suggestions } ) => {

  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [isAddressConfirmationModalOpen, setIsAddressConfirmationModalOpen] = useState(false);
  const [isOutOfDeliveryModalOpen, setIsOutOfDeliveryModalOpen] = useState(false);
  const { postalCode, isLoading, clearPlaceDetails } = useGeolocationDetails(selectedPlaceId);

  const handleSuggestionClick = (placeId) => {
    setSelectedPlaceId(placeId);
  };

  const openAddressConfirmationModal = () => {
    setIsAddressConfirmationModalOpen(true);
  };

  const closeAddressConfirmationModal = () => {
    setIsAddressConfirmationModalOpen(false);
    resetModalState();
  };

  const openOutOfDeliveryModalModal = () => {
    setIsOutOfDeliveryModalOpen(true);
  };

  const closeOutOfDeliveryModalModal = () => {
    setIsOutOfDeliveryModalOpen(false);
    resetModalState();
  };

  const resetModalState = () => {
    setSelectedPlaceId(null);
    clearPlaceDetails();
  };

  useEffect(() => {
    if (postalCode) {
      if (ValidZipCodes.includes(postalCode.toString())) {
        openAddressConfirmationModal();
      } else {
        openOutOfDeliveryModalModal();
      }
    }
  }, [postalCode]);

    return (
    <>
      {isLoading && (
        <LoadingOverlay />
      )}
       <ul className="suggestions">
        {suggestions.map((suggestion, index) => (
          <li
            className="suggestion-item"
            key={index}
            onClick={() => handleSuggestionClick(suggestion.place_id)}
          >
            <img class="suggestion-icon" src={target} alt="Descripción" />
            <div class="suggestion-main-text" >{suggestion.structured_formatting.main_text}</div>
            <div class="suggestion-secondary-text" >{suggestion.structured_formatting.secondary_text}</div>
          </li>
        ))}
      </ul>   
      <AddressConfirmationModal 
        isOpen={isAddressConfirmationModalOpen} 
        onClose={closeAddressConfirmationModal} 
        title="Address updated" 
        subtitle="New address added to your account" 
        content={[
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
          "Nisi ut aliquip ex ea commodo consequat."
        ]}
        acceptBtn="understood"
      />
      <OutOfDeliveryModal 
        isOpen={isOutOfDeliveryModalOpen} 
        onClose={closeOutOfDeliveryModalModal} 
        title="Out of Delivery Area" 
        subtitle='"Wherever I go, there I am."'
        content={[
          "Sadly, this quote is not true for us. In other words, we are not operating in your area (yet), but things change everyday.",
          "Sign up to our newsletter to get notified."
        ]}
        acceptBtn="understood"
      />
    </>

    );
  };
  
  SuggestionsList.propTypes = {
    suggestions: PropTypes.arrayOf(
      PropTypes.shape({
        place_id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
  };
  
  SuggestionsList.defaultProps = {
    suggestions: [],
  };
  