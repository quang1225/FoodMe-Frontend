import styled from 'styled-components';
import { CSS_TRANSITION, MOBILE_BREAKPOINT } from 'utils/constant';

export const HEADER_HEIGHT = 90;

export const Wrapper = styled.div`
  padding-top: ${HEADER_HEIGHT}px;

  .header {
    height: ${HEADER_HEIGHT}px;
    border-bottom: 1px solid #e0e0e0;
    position: fixed;
    top: 0;
    z-index: 1;
    background: white;
    width: 100vw;

    .MuiContainer-root {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 113px;
      height: 44px;
      background: #f2f2f2;
      font-weight: 700;
      font-size: 24px;
      color: #e0e0e0;
    }

    .mobile_menu {
      display: none;
    }

    ul.menus {
      display: flex;
      gap: 36px;

      li {
        color: #8b8b8b;
        transition: color ${CSS_TRANSITION};
        font-size: 16px;
        text-transform: uppercase;
        cursor: pointer;

        :hover {
          color: black;
        }
      }
    }
  }

  .banner {
    display: flex !important;
    height: 390px;
    border-bottom: 1px solid #e0e0e0;

    .left_side {
      width: 50vw;
      display: flex;
      justify-content: end;

      .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 50px;
        text-align: left;

        @media (min-width: 1200px) {
          max-width: 582px;
        }
        @media (max-width: 1200px) {
          padding-left: 24px;
        }

        .title {
          font-weight: 700;
          font-size: 36px;
          color: #111111;
          margin-bottom: 32px;
        }

        .desc {
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
        }
      }
    }

    .right_side {
      flex: 1;
      position: relative;
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    .banner {
      display: table !important;
      padding: 32px 0;

      .left_side {
        width: 100vw !important;
        margin-bottom: 24px;

        .detail {
          .title {
            font-size: 28px;
          }
        }
      }
    }

    .desktop_menu {
      display: none;
    }

    .mobile_menu {
      display: block !important;
    }
  }
`;

export const MobileMenu = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      padding: 12px;
      text-transform: uppercase;
      text-align: center;
    }
  }
`;
