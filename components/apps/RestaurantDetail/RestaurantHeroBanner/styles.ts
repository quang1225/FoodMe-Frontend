import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import styled from 'styled-components';
import { getFullImageUrl } from 'utils';
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  CSS_TRANSITION,
} from 'utils/constant';

export const StyledWrapper = styled(Box)<any>`
  position: relative;
  width: 100%;
  height: 335px;
  display: flex;
  padding: 32px 0;
  color: white;

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: brightness(50%);
    background: ${props =>
      props.bannerImage
        ? `url(${getFullImageUrl(props.bannerImage)})`
        : 'rgba(0, 0, 0, 0.45)'};
    background-size: cover;
    background-position: 50% 50%;
    z-index: -1;
  }

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    color: #8b8b8b;
    height: unset;

    :before {
      background: white;
      filter: unset;
    }

    .MuiContainer-root {
      justify-content: center;
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    background: #fdfafb;
  }
`;

export const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Name = styled(Typography)`
  font-weight: 700;
  font-size: 36px;
  line-height: 47px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    color: black;
  }
`;

export const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
`;

export const Review = styled.div`
  display: inline;
  font-weight: 600;
  font-size: 16px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    color: #8b8b8b;
  }
`;

export const Rate = styled(Box)`
  display: inline-block;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  margin-right: 12px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    color: #8b8b8b;
  }
`;

export const Bookmark = styled(Box)<any>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${props =>
    props.isBookmarked ? 'var(--leafy-green-1)' : 'var(--neutral-7)'};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  color: ${props => (props.isBookmarked ? 'white' : 'var(--leafy-green-2)')};
  text-align: center;
  line-height: 58px;
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;
  transition: color ${CSS_TRANSITION}, background ${CSS_TRANSITION};

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    display: none;
  }
`;
