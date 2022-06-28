import styled from 'styled-components';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from 'utils/constant';
import { Box, Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const RestaurantContainer = styled(Container)`
  margin: 50px auto;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin: 40px auto;
  }
`;

export const Headline = styled.h1`
  font-weight: bold;
  font-size: 38px;
  text-transform: capitalize;
  color: var(--neutral-1);
  margin: 0;
  padding: 5px 0;
  max-width: max-content;
  width: 100%;
  margin-right: 40px;
  margin-bottom: 20px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    margin-right: 0px;
    font-size: 26px;
  }
`;

export const List = styled(Box)`
  margin: 0 -10px;
`;

export const Spacing = styled(Box)`
  margin: 10px;
  display: inline-block;
  vertical-align: middle;
`;

export const SkeletonStyle = styled(Skeleton)`
  border-radius: 100px;
`;
