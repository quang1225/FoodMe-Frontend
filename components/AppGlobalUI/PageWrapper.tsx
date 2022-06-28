import { Box, styled } from '@mui/material';
import { getAppDietaryApi } from '@services/dietary/dietaryApi';
import { setListDietary } from '@stateManager/stores/slices/dietarySlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HIDE_HEADER_ROUTES, HIDE_FOOTER_ROUTES } from 'utils/constant';
import { Footer } from './Footer';
import Header from './Header';

const ContainerChildren = styled(Box)(() => ({
  minHeight: 'calc(100vh - 158px)',
}));

const PageWrapper = ({ ...props }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const getAllDietary = async () => {
    const listDietary = await getAppDietaryApi();
    dispatch(setListDietary(listDietary));
  };

  useEffect(() => {
    getAllDietary();
  }, []);

  return (
    <>
      {!HIDE_HEADER_ROUTES.includes(router.pathname) && <Header />}

      <ContainerChildren>{props.children}</ContainerChildren>

      {!HIDE_FOOTER_ROUTES.includes(router.pathname) && <Footer />}
    </>
  );
};

export default PageWrapper;
