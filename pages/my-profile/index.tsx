import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import ListRestaurant from '@components/apps/UserProfile/ListRestaurant';
import ProfileDetail from '@components/apps/UserProfile/ProfileDetail';
import { getMyDietaryApi, getUserDetailApi } from '@services/user/userApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  setMyDietary,
  setUserDetail,
} from '@stateManager/stores/slices/userSlice';
import { useDispatch } from 'react-redux';
import { IUserDetail } from '@stateManager/stores/types/user.types';

const ProfileContainer = styled.div`
  background: #fdfafb;
  min-height: calc(100vh - 158px);
`;

const Home = () => {
  const dispath = useDispatch();

  const getProfile = async () => {
    const res = await getUserDetailApi();
    if (!res) {
      toast.error('Can not get detail data');
      return;
    }

    const data = {
      id: res.id,
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      phoneNumber: res.phoneNumber,
      eatEverything: res.eatEverything,
    } as IUserDetail;
    dispath(setUserDetail(data));

    const dietary = await getMyDietaryApi();
    if (!dietary) {
      return toast.error('Can not get dietary data');
    }

    dispath(setMyDietary(dietary));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div>
        <Head>
          <title>User Profile</title>
          <meta name="description" content="User Profile" />
        </Head>
      </div>
      <ProfileContainer>
        <ProfileDetail />
        <ListRestaurant />
      </ProfileContainer>
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
