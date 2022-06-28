import { Box, Container, IconButton, Typography } from '@mui/material';
import { useAppSelector } from '@stateManager/stores/appStore';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MODAL_TYPE } from 'utils/constant';
import { EditIcon, SearchIcon } from 'utils/icons';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import InputSearch from './InputSearch';
import { SearchLocationWrapper, Banner, SearchBox, BoxInput } from './styles';
import CommonButton from '@components/shared/CommonButton';
import styled from 'styled-components';
import Icon from '@components/shared/Icons';
import { IDietary } from '@services/dietary/dietaryApi.types';
import { defaultDietary } from '../UserProfile/mocks';

const TagDietary = styled(CommonButton)`
  padding: 8px 18px;
  gap: 7px;
  pointer-events: none;
`;

interface LocationSearch {
  lat: number;
  lng: number;
}

export interface SearchLocationProps {
  handleSearch: (keyword: any, locationSearch: LocationSearch) => void;
  setLocationSelected: (locationName: string) => void;
}

export const SearchLocation = ({ handleSearch }: SearchLocationProps) => {
  const router = useRouter();
  const location = useAppSelector(appState => appState.user.location);
  const user = useAppSelector(appState => appState.user);
  const dispatch = useDispatch();
  const setOpenModal = (value: string) => {
    dispatch(toggleOpenModal(value));
  };
  const [keyword, setKeyword] = useState('');
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );

  const handleChange = (event: any) => {
    debounceFn(event.target.value, location);
    setKeyword(event.target.value);
  };

  const handleDebounceFn = (inputValue: string, geo: LocationSearch) => {
    handleSearch(inputValue, geo);
  };

  const handleSearchResults = () => {
    const query: any = {
      ...(keyword ? { keyword } : {}),
      ...location,
    };
    if (isAuthenticated && user.dietary.length)
      query.dietaries = JSON.stringify(
        get(user, 'dietary', []).map((dietary: IDietary) => dietary.id),
      );
    router.push({ pathname: 'search-results', query });
  };

  const debounceFn = useRef(
    debounce((nextValue, geo) => handleDebounceFn(nextValue, geo), 500),
  ).current;

  return (
    <SearchLocationWrapper>
      <Banner>
        <Image
          src="/images/banner-branch.png"
          alt="search"
          width={367}
          height={509}
        />
      </Banner>
      <Container style={{ position: 'relative' }}>
        <div className="heading title-font">Find food you love</div>
        <div className="tagline title-font">Love the food you find</div>
        <SearchBox sx={{ display: { xs: 'block', md: 'flex' } }}>
          <BoxInput
            sx={{ padding: { xs: '16px 26px', md: '22px' }, minWidth: {xs: 'auto', md: 354} }}
          >
            <InputSearch dark fullWidth />
          </BoxInput>
          <BoxInput sx={{ display: 'flex', width: '100%' }}>
            <div className="search-input">
              <SearchIcon
                style={{
                  width: '20px',
                  cursor: 'pointer',
                  color: 'var(--fairy-floss-pink-2)',
                }}
              />
              <input
                value={keyword}
                onChange={handleChange}
                placeholder="Search for a restaurant, cuisine or dish"
                onKeyDown={e => e.key === 'Enter' && handleSearchResults()}
              />
            </div>
            <div onClick={handleSearchResults} className="search-btn">
              <Image
                src="/images/icons/search.svg"
                alt="search"
                width={17}
                height={17}
              />
              <div className="title-font">Search</div>
            </div>
          </BoxInput>
        </SearchBox>
        {(user?.dietary.length || user.detail.eatEverything) &&
        isAuthenticated ? (
          <Box mt={3}>
            <Box display="flex">
              <Typography
                fontWeight={700}
                color="var(--leafy-green-2)"
                fontSize={18}
                mr={1}
                className="title-font"
              >
                My preferences
              </Typography>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setOpenModal(MODAL_TYPE.ADD_DIETARY);
                  // setTypeUser('old');
                }}
              >
                <EditIcon
                  className="editButton"
                  style={{ fontSize: 16 }}
                  fill="var(--leafy-green-2)"
                />
              </IconButton>
            </Box>
            <Typography
              fontSize={14}
              fontWeight={600}
              color="var(--leafy-green-2)"
              mb={2}
            >
              We will always include these with your searches
            </Typography>
            <Box sx={{ margin: '0 -9px' }}>
              {(get(user, 'detail.eatEverything', false)
                ? (user?.dietary || []).concat(defaultDietary)
                : user?.dietary || []
              ).map((dietary: any) => (
                <Box
                  key={dietary.id}
                  sx={{
                    display: 'inline-block',
                    margin: '5px 9px',
                    verticalAlign: 'middle',
                  }}
                >
                  <TagDietary
                    background="var(--leafy-green-4)"
                    $borderColor="var(--leafy-green-2)"
                    height={50}
                  >
                    <Icon
                      size={30}
                      icon={dietary.name}
                      color="var(--leafy-green-2)"
                    />
                    <Typography
                      fontSize={14}
                      fontWeight={700}
                      className="title-font"
                      color="var(--leafy-green-2)"
                    >
                      {dietary.name}
                    </Typography>
                  </TagDietary>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Container>
    </SearchLocationWrapper>
  );
};

export default SearchLocation;
