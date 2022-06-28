import FilterRestaurant from '@components/apps/SearchResults/FilterRestaurant';
import FilterDisplay from '@components/apps/SearchResults/FilterTag';
import SortRestaurant from '@components/apps/SearchResults/SortRestaurant';
import CardGrid from '@components/shared/Cards/CardGrid';
import CardGridSkeleton from '@components/shared/Cards/CardGridSkeleton';
import CardList from '@components/shared/Cards/CardList';
import CardListSkeleton from '@components/shared/Cards/CardListSkeleton';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { getListCuisineByIds } from '@services/cuisine/cuisineApi';
import { Cuisines, iType } from '@services/restaurants/restaurantApi.types';
import { getSearchRestaurant } from '@services/restaurants/restaurantsApi';
import { useAppSelector } from '@stateManager/stores/appStore';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TYPE_VIEW } from '@components/apps/SearchResults/enum';
import { getListType } from '@services/restaurants/restaurantDetailApi';
import { useWidth } from 'utils/useWidth';
import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';
import { useDispatch } from 'react-redux';
import { setLocation } from '@stateManager/stores/slices/userSlice';

const RestaurantBox = styled(Box)(() => ({
  display: 'block',
  marginBottom: 28,
}));

const StickyBox = styled(Box)(() => ({
  position: 'sticky',
  top: 0,
  zIndex: 99,
  background: '#FDFAFB',
}));

const ListView = styled(Box)(() => ({
  display: 'grid',
  gap: 35,
}));

const SearchResults = ({}) => {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);
  const [view, setView] = useState<string>(TYPE_VIEW.LIST_VIEW);
  const location = useAppSelector(appState => appState.user.location);
  const [offsetResults, setOffsetResults] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [listCuisines, setListCuisines] = useState<Array<Cuisines>>([]);
  const [listType, setListType] = useState<Array<iType>>([]);
  const windowWidth = useWidth();
  const dispatch = useDispatch();

  const handleGetResults = async (offset: number) => {
    const keyword = get(router, 'query.keyword', '');
    try {
      setLoading(true);
      const filter = {
        ...router.query,
        ...{ limit: 20, offset: offset || 0 },
      } as any;
      filter.keyword && delete filter.keyword;
      if (filter.dietaries) filter.dietaries = JSON.parse(filter.dietaries);
      if (filter.cuisines) filter.cuisines = JSON.parse(filter.cuisines);
      if (filter.costs) filter.costs = JSON.parse(filter.costs);
      if (filter.types) filter.types = JSON.parse(filter.types);
      const data = await getSearchRestaurant({
        keyword,
        filter: JSON.stringify(filter),
      });
      const clResults = cloneDeep(results);
      if (offset > 0) {
        const restaurants = get(clResults, 'restaurants', []).concat(
          get(data, 'restaurants', []),
        );
        clResults.restaurants = restaurants;
        setResults(clResults);
      } else {
        setResults(data);
      }

      const countDisplay = get(
        offset > 0 ? clResults : data,
        'restaurants.length',
        0,
      );
      if (
        countDisplay === get(data, 'count', 0) ||
        get(data, 'restaurants.length', 0) === 0
      )
        setHasMore(false);
    } catch (error) {
      return error;
    } finally {
      setOffsetResults(offset + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffsetResults(0);
    setResults({});
    setHasMore(true);
    if (!isEmpty(router.query)) {
      handleGetResults(0);
      dispatch(setLocation({
        lat: Number(router.query.lat),
        lng: Number(router.query.lng) 
      }));
    }
  }, [router.query]);

  useEffect(() => {
    if (isEmpty(router.query) && !isEmpty(location)) {
      router.push({
        pathname: 'search-results',
        query: JSON.parse(JSON.stringify(location)),
      });
    }
  }, [location]);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      (document.documentElement.scrollHeight * 85) / 100;
    if (bottom && hasMore && !isLoading) {
      handleGetResults(offsetResults);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offsetResults, hasMore, isLoading]);

  const getListCuisine = async () => {
    try {
      const listIds = JSON.parse(get(router, 'query.cuisines', '[]')).map(
        (item: Cuisines) => item,
      );
      const params: any = { ids: [] };
      listIds.forEach((element: number) => {
        params.ids = params.ids.concat(element);
      });
      const data = await getListCuisineByIds(params);
      setListCuisines(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (JSON.parse(get(router, 'query.cuisines', '[]')).length)
      getListCuisine();
  }, [router.query.cuisines]);

  const handleGetTypes = async () => {
    const response = await getListType();
    setListType(response);
  };

  useEffect(() => {
    handleGetTypes();
  }, []);

  useEffect(() => {
    if (windowWidth > 1200 && windowWidth) {
      setView(TYPE_VIEW.LIST_VIEW);
    } else {
      setView(TYPE_VIEW.GRID_VIEW);
    }
  }, [windowWidth]);

  return (
    <>
      <div>
        <Head>
          <title>Search results</title>
          <meta name="description" content="User Profile" />
        </Head>
      </div>
      <Box
        sx={{ backgroundColor: '#FDFAFB', minHeight: 'calc(100vh - 158px)' }}
      >
        <StickyBox>
          <FilterRestaurant
            listType={listType}
            listCuisineDefault={listCuisines}
          />
          {Object.keys(router.query).filter(
            query =>
              !['lng', 'lat', 'keyword', 'sortField', 'sortOrder'].includes(
                query,
              ),
          ).length ? (
            <FilterDisplay listType={listType} listCuisines={listCuisines} />
          ) : null}
        </StickyBox>
        <Container>
          <SortRestaurant
            view={view}
            setView={(type: string) => setView(type)}
            total={get(results, 'count', 0)}
          />
          <Box pb="111px">
            {view === TYPE_VIEW.LIST_VIEW && (
              <>
                {get(results, 'restaurants', []).map(
                  (restaurant: IRestaurantDetail) => (
                    <RestaurantBox key={restaurant.id}>
                      <CardList restaurant={restaurant} />
                    </RestaurantBox>
                  ),
                )}
                {isLoading &&
                  new Array(5)
                    .fill('')
                    .map((item: string, index: number) => (
                      <CardListSkeleton key={index} />
                    ))}
              </>
            )}
            {view === TYPE_VIEW.GRID_VIEW && (
              <ListView
                sx={{
                  gridTemplateColumns: {
                    lg: 'repeat(3, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    xs: 'repeat(1, 1fr)',
                  },
                }}
              >
                {get(results, 'restaurants', []).map(
                  (restaurant: IRestaurantDetail) => (
                    <Box key={restaurant.id}>
                      <CardGrid restaurant={restaurant} />
                    </Box>
                  ),
                )}
                {isLoading &&
                  new Array(4)
                    .fill('')
                    .map((item: string, index: number) => (
                      <CardGridSkeleton key={index} />
                    ))}
              </ListView>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = '' } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login', 'signup'])),
    },
  };
};

export default SearchResults;
