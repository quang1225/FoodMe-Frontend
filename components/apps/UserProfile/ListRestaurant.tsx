import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CardGrid from '../../shared/Cards/CardGrid';
import { getMyRestaurantsBookmarks } from '@services/restaurants/restaurantsApi';
import get from 'lodash/get';
import CardGridSkeleton from '@components/shared/Cards/CardGridSkeleton';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from 'utils/constant';
import { SearchIcon } from 'utils/icons';
import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';

const ListRestaurantContainer = styled.div`
  padding: 10px 0 120px 0;
`;

const Title = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
  line-height: 35px;
  color: var(--neutral-black-1);
`;

const List = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 44px 35px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SearchBox = styled(Box)`
  display: flex;
  background: var(--neutral-7);
  max-width: 879px;
  border: 2px solid var(--leafy-green-2);
  border-radius: 100px;
`;

const SearchInput = styled(Box)`
  padding: 21px 30px;
  width: 100%;
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: none;
    font-size: 16px;
    line-height: 26px;
    margin: 0px 10px;
    color: #4f4f4f;
    &::placeholder {
      color: var(--neutral-4);
    }
  }
  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    padding: 16px 10px 16px 20px;
  }
`;

const SearchBtn = styled(Box)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: var(--neutral-6);
  background: var(--leafy-green-2);
  border-radius: 100px;
  padding: 16px 40px;
  cursor: pointer;
  position: relative;
  left: 1px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    padding: 0px;
    min-width: 60px;
  }
`;

export const ListRestaurant = () => {
  const [listRestaurant, setListRestaurant] = useState([]);
  const [keyword, setKeyword] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async (offset: number) => {
    try {
      setLoading(true);
      const data = await getMyRestaurantsBookmarks({
        keyword: keyword,
        filter: { limit: 10, offset: offset },
      });
      const list =
        offset > 0
          ? listRestaurant.concat(get(data, '0', []))
          : get(data, '0', []);
      setListRestaurant(list);
      if (list.length === get(data, '1', 0)) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      return error;
    } finally {
      setOffset(offset + 10);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setOffset(0);
    fetchData(0);
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      (document.documentElement.scrollHeight * 90) / 100;
    if (bottom && hasMore && !isLoading) {
      fetchData(offset);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset, hasMore, isLoading]);

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <ListRestaurantContainer>
      <Container>
        <Title className="title-font">My restaurants</Title>
        <Box sx={{ mt: '37px', mb: '62px' }}>
          <SearchBox>
            <SearchInput sx={{ display: 'flex', alignItems: 'center' }}>
              <SearchIcon
                style={{
                  width: '20px',
                  cursor: 'pointer',
                  color: 'var(--leafy-green-2)',
                }}
              />
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search your bookmarked restaurants"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </SearchInput>
            <SearchBtn
              onClick={() => handleSearch()}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <SearchIcon
                style={{
                  width: '16px',
                  cursor: 'pointer',
                  color: 'var(--neutral-7)',
                }}
              />
              <Box
                className="title-font"
                sx={{ ml: '10px', display: { xs: 'none', md: 'block' } }}
              >
                Search
              </Box>
            </SearchBtn>
          </SearchBox>
        </Box>
        <List
          sx={{
            gridTemplateColumns: {
              lg: 'repeat(3, 1fr)',
              sm: 'repeat(2, 1fr)',
              xs: 'repeat(1, 1fr)',
            },
          }}
        >
          {listRestaurant.map((restaurant: IRestaurantDetail) => (
            <Box key={restaurant.id}>
              <CardGrid isMyBookmark={true} restaurant={restaurant} />
            </Box>
          ))}
          {isLoading &&
            new Array(4)
              .fill('')
              .map((item: string, index: number) => (
                <CardGridSkeleton key={index} />
              ))}
        </List>
      </Container>
    </ListRestaurantContainer>
  );
};

export default ListRestaurant;
