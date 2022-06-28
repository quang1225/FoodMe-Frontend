import CommonButton from '@components/shared/CommonButton';
import { Tab, Tabs } from '@mui/material';
import { Container } from '@mui/system';
import styled from 'styled-components';
import {
  DESKTOP_BREAKPOINT,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from 'utils/constant';

export const Wrapper = styled.div`
  background: #fdfafb;
  .booking_buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 57px;
    gap: 15px;
    button {
      font-size: 16px;
      padding: 8px 21px;
    }

    @media only screen and (max-width: 1100px) {
      justify-content: center;
      gap: 20px;
      flex-direction: column;
      margin-top: 32px;
      button {
        width: 100%;
      }
    }

    @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      justify-content: space-between;
      gap: 10px;
    }
  }

  .detail_tab {
    border-bottom: 1px solid #e5e5e5;
  }

  .location_content {
    padding: 34px 50px 65px 0;

    border-right: 1px solid #e5e5e5;
  }

  .opening_content {
    padding: 34px 0 34px 50px;
  }

  @media only screen and (max-width: ${DESKTOP_BREAKPOINT}px) {
    .location_content {
      padding: 32px 0 38px 0;
      border-right: none;
      border-bottom: 1px solid #e5e5e5;
    }

    .opening_content {
      padding: 25px 0 41px 0;
    }

    .detail_tab {
      border-top: 1px solid #e5e5e5;
    }
  }
`;

export const CustomTabs = styled(Tabs)`
  .MuiButtonBase-root {
    font-family: 'PP Agrandir';
    font-weight: 700;
    text-transform: unset;
    font-size: 20px;
    padding: 0;
    min-width: unset;

    :not(:last-child) {
      margin-right: 40px;
    }

    @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
      :not(:last-child) {
        margin-right: 14px;
      }
      margin: 0 24px;
    }

    @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      margin: 0 16px;
    }
  }

  .MuiTabs-flexContainer {
    padding: 10px 0;
  }
`;

export const CustomTabsMenu = styled(Tabs)`
  .MuiButtonBase-root {
    font-family: 'PP Agrandir';
    font-weight: 700;
    text-transform: unset;
    font-size: 16px;
    padding: 0;
    min-width: unset;

    :not(:last-child) {
      margin-right: 32px;
    }

    @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
      :not(:last-child) {
        margin-right: 14px;
      }
      margin: 0 24px;
    }

    @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      margin: 0 16px;
    }
  }
`;

export const StyleTag = styled(Tab)`
  color: var(--neutral-black-1);
  & Mui-selected {
    color: var(--leafy-green-2);
  }
`;

export const StyleCommonButton = styled(CommonButton)`
  padding: 8px 30px !important;
`;

export const StyleContainer = styled(Container)`
  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    padding: 0 8px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 0;
  }
`;
