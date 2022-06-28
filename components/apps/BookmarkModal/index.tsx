import CustomDialogTitle from '@components/shared/components/CustomDialogTitle';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import { useDispatch } from 'react-redux';
import { MODAL_TYPE } from 'utils/constant';

const useStyles = makeStyles((theme: any) => ({
  title: {
    padding: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(3, 4),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export interface BookmarkModalProps {
  isOpen: boolean;
  handleClose: any;
}

export default function BookmarkModal({
  isOpen,
  handleClose,
}: BookmarkModalProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const setOpenModal = (value: string) => {
    dispatch(toggleOpenModal(value));
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <CustomDialogTitle
        className={classes.title}
        onClose={() => {
          handleClose();
        }}
      >
        <Typography
          textAlign="left"
          variant="h5"
          fontWeight={500}
          fontSize={26}
        >
          Want to bookmark this restaurant?
        </Typography>
      </CustomDialogTitle>
      <DialogContent className={classes.content}>
        <Typography color="#8B8B8B" fontSize={14}>
          Create your own list of restaurants and receive updates when they have
          specials, update their menus and more.
        </Typography>

        <Button
          type="submit"
          //   fullWidth
          variant="contained"
          size="large"
          // color="primary"
          // className={classes.submit}'
          sx={{
            marginTop: 4,
            marginBottom: 3,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
          }}
          onClick={() => setOpenModal(MODAL_TYPE.SIGNUP)}
        >
          Create an account
        </Button>
        {/* <Button seconda>Create an account</Button> */}
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{
            width: '50%',
            marginBottom: 5,
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Typography fontSize={14} color="#4F4F4F">
          Already have an account?
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              color: '#1e81b0',
              cursor: 'pointer',
            }}
            onClick={() => setOpenModal(MODAL_TYPE.LOGIN)}
          >
            {' '}
            Login{' '}
          </Box>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
