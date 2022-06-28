import { Button } from '@mui/material';
import styled from 'styled-components';
import { CSS_TRANSITION } from 'utils/constant';

export default styled(Button)<{
  background?: string;
  $borderColor?: string;
  $textColor?: string;
  height?: number;
  disabled?: boolean;
}>`
  background: ${props =>
    props.disabled ? 'var(--neutral-6)' : props.background || 'unset'};
  color: ${props => props.$textColor || 'var(--leafy-green-2)'};
  border: ${props =>
    `2px solid ${
      props.disabled
        ? 'var(--neutral-6)'
        : props.$borderColor || props.background || 'unset'
    }`};
  border-radius: 100px;
  padding: 12px 18px;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  font-family: 'PP Agrandir';
  height: ${props => props.height || 42}px;
  transition: filter ${CSS_TRANSITION};

  &:hover {
    background: ${props => props.background || 'unset'};
    filter: brightness(85%);
  }
`;
