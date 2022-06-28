import styled from 'styled-components';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from 'utils/constant';
import { Box } from '@mui/material';

export const Banner = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    display: none;
  }
`;

export const BoxInput = styled(Box)`
  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    background: #ffffff;
    border: 2px solid var(--leafy-green-2);
    border-radius: 100px;
    margin-bottom: 16px;
  }
`;

export const SearchBox = styled(Box)`
  background: #ffffff;
  max-width: 963px;
  border: 2px solid var(--leafy-green-2);
  border-radius: 100px;

  .location {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: max-content;
    padding: 18px;
    border-radius: 4px 0 0 4px;
    cursor: pointer;

    div {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 26px;
    }

    input {
      outline: none;
      border: none;
      color: var(--neutral-2);
    }
  }

  .search-input {
    display: flex;
    align-items: center;
    padding: 18px 5px 18px 26px;
    width: 100%;
    border-left: 2px solid var(--leafy-green-2);

    input {
      width: 100%;
      outline: none;
      background-color: transparent;
      border: none;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 26px;
      margin: 0px 10px;
      color: var(--neutral-2);

      &::placeholder {
        color: var(--neutral-4);
      }
    }
  }

  .search-btn {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--neutral-6);
    background: var(--leafy-green-2);
    border-radius: 100px;
    padding: 18px 43px;
    min-width: max-content;
    cursor: pointer;
    position: relative;
    left: 2px;
    div {
      margin-left: 10px;
      font-weight: bold;
      font-size: 16px;
    }
  }

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    border: none;
    background: unset;
    .search-input {
      padding: 16px 5px 16px 26px;
      border-left: unset;
    }
    .search-btn {
      padding: 0;
      min-width: 60px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        display: none;
      }
    }
  }
`;

export const SearchLocationWrapper = styled.div`
  background: var(--fairy-floss-pink-3);
  padding: 92px 0 125px 0;
  position: relative;

  .dietary {
    padding: theme.spacing(1, 3);
    font-size: 14;
    font-weight: 600;
    background: 'white';
    color: '#333333';
    height: 48;
    border-radius: 100;
    border: '1px solid #BDBDBD';
  }

  .dietaryBox {
    display: 'inline-block';
    margin-right: 16;
  }

  .heading {
    font-style: normal;
    font-weight: bold;
    font-size: 72px;
    line-height: 98px;
    color: var(--leafy-green-2);
  }

  .tagline {
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 52px;
    color: var(--leafy-green-2);
    padding: 7px 0 60px 0;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 47px 0;

    .heading {
      font-size: 44px;
      line-height: 58px;
    }

    .tagline {
      font-size: 32px;
      line-height: 42px;
      padding: 7px 0 40px 0;
    }
  }
`;
