import { Box, Dialog } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import CommonButton from '@components/shared/CommonButton';

export interface BookmarkModalProps {
  isOpen: boolean;
}

const DialogTitle = styled(Box)(() => ({
  fontWeight: 700,
  fontSize: '30px',
  lineHeight: '36px',
  maxWidth: 380,
  marginBottom: '20px',
  color: 'var(--orange-zest-2)',
}));

const DialogDescription = styled(Box)(() => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '24px',
  color: '#111111',
  maxWidth: 390,
}));

export default function ThanksModal({ isOpen }: BookmarkModalProps) {
  const dispatch = useDispatch();

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={() => dispatch(toggleOpenModal(''))}
      PaperProps={{
        style: {
          maxWidth: 454,
          padding: '30px 34px 39px 34px',
        },
      }}
    >
      <DialogTitle className="title-font">
        Thanks for your feedback!
      </DialogTitle>
      <DialogDescription>
        This really helps us stay on top of things and ensures that we can
        provide our community with accurate information.
      </DialogDescription>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 230,
            margin: '53px auto 0 auto',
            textTransform: 'none',
          }}
        >
          <CommonButton
            background="var(--orange-zest-2)"
            $textColor="var(--neutral-7)"
            height={46}
            onClick={() => dispatch(toggleOpenModal(''))}
          >
            <Box sx={{ fontSize: 16, fontWeight: 700 }}>Close</Box>
          </CommonButton>
        </Box>
      </Box>
    </Dialog>
  );
}
