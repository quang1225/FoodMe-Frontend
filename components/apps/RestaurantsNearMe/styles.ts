import styled from 'styled-components';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from 'utils/constant';
import { Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const RestaurantContainer = styled(Container)`
  margin: 61px auto 94px auto;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin: 40px auto;
  }
`;

export const Headline = styled.h1`
  font-weight: bold;
  font-size: 38px;
  color: var(--neutral-1);
  margin: 0;
  padding: 5px 0;
  max-width: max-content;
  width: 100%;
  margin-right: 40px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    margin-bottom: 20px;
    margin-right: 0px;
    font-size: 26px;
  }
`;

export const List = styled.div`
  margin: 0 -10px;
`;

export const Spacing = styled.div`
  margin: 10px;
  display: inline-block;
`;

export const SkeletonStyle = styled(Skeleton)`
  border-radius: 100px;
`;
