import { Box, styled } from '@mui/system';

export const PopoverStyle = styled(Box)(() => ({
  transition:
    'opacity 217ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 145ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  position: 'absolute',
  transformOrigin: '0px 0px',
  paddingTop: '25px',
  zIndex: 97,
  opacity: 1,
  pointerEvents: 'unset',
  top: '10px',
}));

export const Popover = styled(Box)(() => ({
  boxShadow: 'rgb(0 0 0 / 17%) 0px 3px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  width: 'max-content',
  background: '#fff',
  padding: '5px 0',
}));

export const ExtraDietaryItem = styled(Box)<{ actived?: boolean }>(
  ({ actived = false }) => ({
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    fontSize: '12px',
    padding: '10px 17px',
    cursor: 'pointer',
    color: actived ? 'var(--fairy-floss-pink-4)' : 'var(--leafy-green-2)',
    background: actived ? 'var(--leafy-green-1)' : 'var(--neutral-7)',
    textTransform: 'uppercase',
    fontFamily: 'PP Agrandir',
  }),
);
