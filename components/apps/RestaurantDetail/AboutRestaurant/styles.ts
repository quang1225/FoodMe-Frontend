import { Dialog } from '@mui/material';
import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const Wrapper = styled.div``;

export const SwiperDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: transparent;
    max-width: 1200px;
    max-height: 80vw;
    box-shadow: unset;
  }
`;

export const StyledSwiper = styled(Swiper)`
  .swiper-wrapper {
    align-items: center;
  }
`;
