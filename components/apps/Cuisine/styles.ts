import { Box } from '@mui/system';
import styled from 'styled-components';
import { TABLET_BREAKPOINT, MOBILE_BREAKPOINT } from 'utils/constant';

export const Background = styled.div`
  background: var(--baby-blue-4);
  padding: 44px 0 47px 0;
  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    padding: 40px 0;
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
  margin-bottom: 50px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    margin-bottom: 32px;
    font-size: 26px;
  }
`;

export const List = styled.div`
  display: flex;
  max-height: 155vh;
  flex-flow: column wrap;
  align-content: space-between;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 38px;
  line-height: 50px;
  text-transform: uppercase;
  color: var(--orange-zest-2);
  margin-bottom: 24px;
`;

export const Name = styled.a`
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  color: var(--neutral-1);
  margin-bottom: 12px;
  display: block;
  font-family: 'Open Sans', sans-serif;
`;

export const Masonry = styled(Box)<{
  $height: number;
}>`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: start;
  counter-reset: box;
  height: ${props => `${props.$height / 3.2}px`};
  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    height: ${props => `${props.$height / 2}px`};
  }
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    height: ${props => `${props.$height / 1}px`};
  }
`;

export const Column = styled(Box)`
  &:not(:last-child) {
    margin-bottom: 48px;
  }
`;
