import styled from 'styled-components';
import { Box } from '@mui/material';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from 'utils/constant';

export const HeaderContainer = styled.div`
  background: var(--leafy-green-1);
  padding: 9px 68px 9px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 78px;

  @media only screen and (max-width: ${TABLET_BREAKPOINT}px) {
    padding: 9px 30px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 72px;
    padding: 8px 23px;
  }
`;

export const Logo = styled.div`
  margin-right: 43px;
  min-width: max-content;
  cursor: pointer;
`;

export const AccountContainer = styled(Box)`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: var(--neutral-6);
  display: flex;
  align-items: center;
  min-width: max-content;
`;

export const AccountItem = styled.div`
  cursor: pointer;
  margin-left: 40px;
  width: max-content;
`;

export const Avatar = styled.div`
  color: var(--orange-zest-2);
  background: var(--baby-blue-30);
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  border-radius: 100%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SearchBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const SearchInput = styled.div<{
  $isMobile: boolean;
}>`
  display: flex;
  align-items: center;
  background: ${props => props.$isMobile ? 'var(--neutral-7)' : 'var(--neutral-6)'};
  padding: 15px 23px;
  border-radius: 80px;
  width: 100%;

  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: none;
    color: var(--leafy-green-1);
    font-style: normal;
    font-weight: normal;
    font-size: ${props => props.$isMobile ? '14px' : '16px'};
    line-height: 24px;
    margin: 0px 14px;

    &::placeholder {
      color: var(${props => props.$isMobile ? '--neutral-4' : '--leafy-green-1'});
    }
  }
`;

// Footer

export const FooterContainer = styled.div`
  background-color: var(--leafy-green-1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px 0px;
  font-size: 12px;

  .MuiContainer-root {
    display: flex;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 32px 0px;
  }
`;

export const FooterContent = styled(Box)`
  width: 100%;
  gap: 20px 40px;
  display: flex;
`;

export const ListContent = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: block;
  }
`;

export const ContentItem = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 40px;
  font-size: 14px;
`;

export const CopyRight = styled.div`
  font-weight: 400;
  font-size: 14px;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 10px;
    font-size: 12px;
  }
`;

export const FooterSocials = styled.div`
  display: flex;
  gap: 20px;
`;

export const Item = styled.div`
  background: var(--fairy-floss-pink-3);
  border-radius: 100%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--leafy-green-1);
  padding: 5px;
  svg {
    font-size: 18px;
  }

  a {
    display: flex;
  }
`;
