// import { IDietary } from '@services/dietary/dietaryApi.types';
import { getSearchRestaurant } from '@services/restaurants/restaurantsApi';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@stateManager/stores/appStore';
import Cuisine from '../components/apps/Cuisine';
import DietaryRequirements from '../components/apps/DietaryRequirements';
import RestaurantsNearMe from '../components/apps/RestaurantsNearMe';
import SearchLocation from '../components/apps/Search/SearchLocation';
import { Box } from '@mui/system';

export interface Props {
  listDietary: any;
}

interface LocationSearch {
  lat: number;
  lng: number;
}

const Home: NextPage<Props> = () => {
  const user = useAppSelector(appState => appState.user);
  const [homepage, setHomepage] = useState({});
  const [isLoading, setLoading] = useState<boolean>(true);
  const [locationSelected, setLocationSelected] = useState<string>('');
  const [keyword, setKeyword] = useState('');
  // const isAuthenticated = useAppSelector(
  //   appState => appState.user.isAuthenticated,
  // );

  const refRestaurantNearMe = useRef<HTMLElement>(null);

  useEffect(() => {
    const { location } = user;
    if (location?.lat) {
      getHomePage(keyword, location);
    }
  }, [user.location]);

  const getHomePage = async (keyword = '', locationSearch: LocationSearch) => {
    clearTimeout();
    setKeyword(keyword);
    if (locationSearch?.lat) {
      setLoading(true);
      const geo = {
        lat: locationSearch?.lat,
        lng: locationSearch?.lng,
      };
      const query: any = {
        keyword,
        filter: { ...geo, ...{ includes: ['dietary', 'cuisine', 'suburb'] } },
      };
      // if (isAuthenticated && user.dietary.length)
      //   query.filter.dietaries = JSON.stringify(
      //     user.dietary.map((dietary: IDietary) => dietary.id),
      //   );
      // if (query.filter.dietaries)
      //   query.filter.dietaries = JSON.parse(query.filter.dietaries);
      const res: any = await getSearchRestaurant(query);
      setHomepage(res);
      setLoading(false);
      setTimeout(() => {
        refRestaurantNearMe &&
          JSON.parse(localStorage.getItem('isScrollDown') || 'false') &&
          refRestaurantNearMe?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        localStorage.removeItem('isScrollDown');
      }, 200);
    }
  };

  return (
    <>
      <Head>
        <title>Food.me</title>
        <meta name="description" content="Connected food technology" />
      </Head>
      <SearchLocation
        handleSearch={(keyword: string, locationSearch: LocationSearch) =>
          getHomePage(keyword, locationSearch)
        }
        setLocationSelected={setLocationSelected}
      />
      <DietaryRequirements
        keyword={keyword}
        isLoading={isLoading}
        data={homepage}
      />
      <Cuisine keyword={keyword} isLoading={isLoading} data={homepage} />
      <Box ref={refRestaurantNearMe}>
        <RestaurantsNearMe
          keyword={keyword}
          isLoading={isLoading}
          data={homepage}
          locationSelected={locationSelected}
        />
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

export default Home;
