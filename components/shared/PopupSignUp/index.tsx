import { Box, Dialog } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import { useAppSelector } from '@stateManager/stores/appStore';
import { MODAL_TYPE } from 'utils/constant';
import { SignUpPopup } from '@stateManager/stores/types/commonSlice.types';
import CommonButton from '../CommonButton';

export interface BookmarkModalProps {
  isOpen: boolean;
}

const DialogTitle = styled(Box)(() => ({
  fontWeight: 700,
  fontSize: '30px',
  lineHeight: '36px',
  maxWidth: 341,
  marginBottom: '14px',
  color: 'var(--orange-zest-2)',
}));

const DialogDescription = styled(Box)(() => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '24px',
  color: '#111111',
  maxWidth: 340,
}));

const LoginButton = styled(Box)(() => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#4F4F4F',
  span: {
    fontWeight: 700,
    color: '#1e81b0',
    cursor: 'pointer',
  },
}));

export default function PopupSignUp({ isOpen }: BookmarkModalProps) {
  const { openModal } = useAppSelector(appState => appState.common);
  const modalDetail = openModal as SignUpPopup;

  const dispatch = useDispatch();

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={() => dispatch(toggleOpenModal(''))}
      PaperProps={{
        style: {
          maxWidth: 420,
          padding: '30px 34px 57px 34px',
        },
      }}
    >
      <DialogTitle className="title-font">{modalDetail.title}</DialogTitle>
      <DialogDescription>{modalDetail.description}</DialogDescription>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 230,
            gap: '22px',
            margin: '45px auto 35px auto',
            textTransform: 'none',
          }}
        >
          <CommonButton
            background="var(--leafy-green-2)"
            $textColor="var(--neutral-7)"
            height={46}
            onClick={() => dispatch(toggleOpenModal(MODAL_TYPE.SIGNUP))}
          >
            <Box sx={{ fontSize: 16, fontWeight: 700 }}>Create an account</Box>
          </CommonButton>
          <CommonButton
            background="var(--orange-zest-2)"
            $textColor="var(--neutral-7)"
            height={46}
            onClick={() => dispatch(toggleOpenModal(''))}
          >
            <Box sx={{ fontSize: 16, fontWeight: 700 }}>Cancel</Box>
          </CommonButton>
        </Box>
        <LoginButton>
          Already have an account?{' '}
          <span onClick={() => dispatch(toggleOpenModal(MODAL_TYPE.LOGIN))}>
            Login
          </span>
        </LoginButton>
      </Box>
    </Dialog>
  );
}
