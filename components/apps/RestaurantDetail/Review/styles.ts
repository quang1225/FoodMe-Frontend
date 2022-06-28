import { LinearProgress } from '@mui/material';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT, CSS_TRANSITION } from 'utils/constant';

export const Wrapper = styled.div`
  .content_wrap {
    padding: 40px 0;
  }

  .main-title {
    font-size: 30px;
    font-weight: 700;
  }

  .review-text {
    font-weight: 700;

    .number-review {
      color: #bdbdbd;
    }
  }

  .buttonStyle {
    box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
    width: 32;
    height: 32;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }

  .big_buttons {
    width: unset;
    gap: 24px;
    display: flex;

    .arrowButton {
      transition: background-color ${CSS_TRANSITION};
      cursor: pointer;
      border-radius: 8px;
      background: #ffffff;
      box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.14);
      height: 84px;
      min-width: 288px;
      display: flex;
      justify-content: space-between;
      padding: 14px;

      .title {
        color: #ff856a;
        font-size: 16px;
        font-weight: 700;
      }

      .title-2 {
        font-size: 14px;
        font-weight: 600;
      }

      :hover {
        background-color: lightgrey;
      }
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    .big_buttons {
      width: 100%;
      flex-direction: column;
      margin-top: 40px;

      .arrowButton {
        min-width: unset;
      }
    }
  }
`;

export const BorderLinearProgress = styled(LinearProgress)<{
  $bgColor: string;
}>`
  height: 7px;
  border-radius: 5px;

  .MuiLinearProgress-bar {
    background-color: ${props => props.$bgColor};
  }
`;
