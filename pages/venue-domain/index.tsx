import { getRestaurantByDomain } from '@services/restaurants/restaurantDetailApi';
import { setRestaurantDetail } from '@stateManager/stores/slices/restaurantSlice';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';
import Template1 from '../../components/templates/Template1';

export interface Props {
  resDetail: IRestaurantDetail;
}

const IRestaurant = ({ resDetail }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (resDetail) dispatch(setRestaurantDetail(resDetail));
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

      <Template1 />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = '', req } = context;
  const domain = req.headers.host || '';
  // const domain = 'resdomain.lc';

  const resDetail = await getRestaurantByDomain(domain);
  if (!resDetail || !Object.keys(resDetail).length) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  return {
    props: {
      resDetail,
      ...(await serverSideTranslations(locale, ['common', 'login', 'signup'])),
    },
  };
};

export default IRestaurant;
