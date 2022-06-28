import {
  getRestaurantBySlug,
} from '@services/restaurants/restaurantDetailApi';
import { RootState, useAppSelector } from '@stateManager/stores/appStore';
import {
  setRestaurantDetail,
} from '@stateManager/stores/slices/restaurantSlice';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantDetail from '../../components/apps/RestaurantDetail';
import RestaurantHeroBanner from '../../components/apps/RestaurantDetail/RestaurantHeroBanner';
import BussinessLogin from '@components/apps/Login/BusinessLogin';
import { MODAL_TYPE } from 'utils/constant';
import {
  toggleOpenModal,
  setScrolling,
} from '@stateManager/stores/slices/commonSlice';
import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';

export interface Props {
  resDetail: IRestaurantDetail;
}

const IRestaurant = ({ resDetail }: Props) => {
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );
  const dispatch = useDispatch();
  const { openModal } = useSelector((state: RootState) => state.common || {});
  const setOpenModal = (value: string) => {
    dispatch(toggleOpenModal(value));
  };

  const handleScroll = () => {
    dispatch(setScrolling(true));
  };

  useEffect(() => {
    if (resDetail) dispatch(setRestaurantDetail(resDetail));

    window.addEventListener('scroll', handleScroll);

  return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setRestaurantDetail({} as IRestaurantDetail));
    }
  }, [])

  const seoTitle = `${resDetail.name} - ${resDetail.city}, ${resDetail.country}`;
  const seoDescription = `Detail of the restaurant ${seoTitle}`;
  const seoImg = resDetail.bannerImage;

  return (
    <>
      <div>
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:image" content={seoImg} />
        </Head>
      </div>
      <RestaurantHeroBanner />
      <RestaurantDetail />
      <BussinessLogin
        isOpen={openModal === MODAL_TYPE.BUSINESS_LOGIN}
        restaurantId={restaurantDetail.id}
        handleClose={() => {
          setOpenModal('');
        }}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = '' } = context;
  const slug = context.query.slug + '';
  const query = {
    select: [
      'geolocation',
      'openingHours',
      'contactEmail',
      'contactPhone',
      'contactSocialMediaLinks',
      'stats',
    ],
  };
  const resDetail = await getRestaurantBySlug(slug, query);
  if (!resDetail || !Object.keys(resDetail).length) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
  // Pass data to the page via props
  return {
    props: {
      resDetail,
      ...(await serverSideTranslations(locale, ['common', 'login', 'signup'])),
    },
  };
};

export default IRestaurant;
