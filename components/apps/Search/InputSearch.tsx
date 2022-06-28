import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { LocationSearch } from 'utils/icons';
import { useRouter } from 'next/router';
import { useAppSelector } from '@stateManager/stores/appStore';
import { styled } from '@mui/system';
import {
  setGeoLocation,
  setLocation,
} from '@stateManager/stores/slices/userSlice';

export interface InputSearchProps {
  dark?: boolean;
  fullWidth?: boolean;
  isRestaurantNearMe?: boolean;
}

const InputSearchContainer = styled(Box)<InputSearchProps>(
  ({ dark, fullWidth }) => ({
    cursor: 'pointer',
    maxWidth: fullWidth ? 'auto' : 293,
    '& input': {
      outline: 'none',
      border: 'none',
      background: 'transparent',
      color: dark ? 'var(--leafy-green-1)' : '#fff',
      fontWeight: 600,
      width: '100%',
      fontSize: '14px',
    },
  }),
);

export const InputSearch = ({
  dark = false,
  fullWidth = false,
  isRestaurantNearMe = false,
}: InputSearchProps) => {
  const router = useRouter();
  const { geoLocation } = useAppSelector(appState => appState.user);
  const { googleMaps } = useAppSelector(appState => appState.common);
  const dispatch = useDispatch();
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchInput.current || !googleMaps?.maps?.places?.Autocomplete) return;

    const autocomplete = new googleMaps.maps.places.Autocomplete(
      searchInput.current,
      { types: ['geocode'] },
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place?.geometry) {
        const geo = {
          lat: place.geometry.location?.lat(),
          lng: place.geometry.location?.lng(),
        };

        dispatch(setLocation(geo));
        dispatch(setGeoLocation(place.formatted_address));
        handleChangeQuery(geo, router.query);
      }
    });

    return () => {
      googleMaps.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [googleMaps, searchInput, geoLocation, router.query]);

  useEffect(() => {
    if (searchInput.current) searchInput.current.value = geoLocation || '';
  }, [geoLocation]);

  const handleChangeQuery = (location: any, query: any) => {
    const path = window.location.pathname;
    if (path === '/search-results') {
      return router.push({
        pathname: 'search-results',
        query: { ...query, ...location },
      });
    }
    if (path === '/') {
      return localStorage.setItem(
        'isScrollDown',
        JSON.stringify(isRestaurantNearMe),
      );
    }
  };

  return (
    <InputSearchContainer
      key={geoLocation}
      dark={dark}
      fullWidth={fullWidth}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <LocationSearch
        style={{
          width: '24px',
          color: dark
            ? 'var(--fairy-floss-pink-2)'
            : 'var(--fairy-floss-pink-3)',
        }}
      />
      <Box sx={{ ml: '8px', width: '100%' }}>
        {/* <Autocomplete
          apiKey={process.env.GOOGLE_MAP_API_KEY + ''}
          defaultValue={geoLocation || ''}
          inputAutocompleteValue={geoLocation}
          placeholder=""
          onPlaceSelected={(place: any) => handleSelectLocation(place)}
          language="en"
          options={{
            types: ['(regions)'],
          }}
          libraries={['places']}
        /> */}
        <input ref={searchInput} />
      </Box>
    </InputSearchContainer>
  );
};

export default InputSearch;
