import styled from 'styled-components';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from 'utils/constant';
import { Divider } from '@mui/material';

export const Wrapper = styled.div`
  background-color: #d7f2f7;
  padding: 29px 0 51px 0;

  .contactWrapper {
    width: auto;
    padding: 10px 0;

    svg {
      height: 20px;
    }

    .title-font {
      line-height: normal;
    }
  }

  .title-font {
    @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      font-size: 16px;
      text-transform: uppercase;
    }
  }

  .link-contact {
    word-break: break-word;
    color: var(--neutral-black-1);
    @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      color: var(--neutral-1);
      font-size: 14px;
    }
  }

  .link {
    :hover {
      cursor: pointer;
    }
  }

  .contact-infos {
    display: flex;

    @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
      flex-direction: column;
      gap: 5px;
    }
  }

  .contact_title {
    font-weight: 700;
    font-size: 18px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 32px 0 48px 0;
  }
`;

export const DividerStyle = styled(Divider)`
  margin: 0px 75px;
  border-color: #076c4f;
`;
