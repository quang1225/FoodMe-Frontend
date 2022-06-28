import styled from 'styled-components';

export const CustomTag = styled.div<{ $actived: boolean }>`
  font-weight: 700;
  font-size: 14px;
  color: ${props =>
    props.$actived ? 'var(--fairy-floss-pink-4)' : 'var(--leafy-green-2)'};
  padding: 5px 12px;
  border: 1px solid
    ${props =>
      props.$actived ? 'var(--leafy-green-1)' : 'var(--leafy-green-2)'};
  border-radius: 40px;
  font-family: 'PP Agrandir';
  background: ${props =>
    props.$actived ? 'var(--leafy-green-1)' : 'transparent'};
`;
