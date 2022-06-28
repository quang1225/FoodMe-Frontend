import TermsOfUseContainer from '@components/apps/TermsOfUseContainer';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const TermsOfUse = () => {
  return (
    <>
      <div>
        <Head>
          <title>User Profile</title>
          <meta name="description" content="User Profile" />
        </Head>
      </div>
      <TermsOfUseContainer />
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

export default TermsOfUse;
