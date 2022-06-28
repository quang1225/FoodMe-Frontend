import PrivacyPolicyContainer from '@components/apps/PrivacyPolicyContainer';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <>
      <div>
        <Head>
          <title>User Profile</title>
          <meta name="description" content="User Profile" />
        </Head>
      </div>
      <PrivacyPolicyContainer />
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

export default PrivacyPolicy;
