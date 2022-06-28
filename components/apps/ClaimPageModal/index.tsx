import CustomDialogTitle from '@components/shared/components/CustomDialogTitle';
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import theme from 'styles/theme';
import { MODAL_TYPE } from 'utils/constant';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function ClaimPageModal({ isOpen, handleClose }: ModalProps) {
  const dispatch = useDispatch();
  const setOpenModal = (value: string) => {
    dispatch(toggleOpenModal(value));
  };
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <CustomDialogTitle
        sx={theme => ({
          padding: theme.spacing(3),
        })}
      >
        <Typography textAlign="left" fontWeight={700} fontSize={24}>
          Claim this page
        </Typography>
      </CustomDialogTitle>
      <DialogContent
        sx={{
          padding: theme.spacing(3, 4),
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography component="div" color="#8B8B8B" fontSize={14}>
          Your listing is entirely free of charge, and we are pleased to share
          your offerings with our global community. <br /> <br />
          Claiming your business gives you the added benefits of:
          <List
            sx={{
              listStyle: 'disc inside',
              li: {
                display: 'list-item',
              },
            }}
          >
            <ListItem> Analytics and insights dashboard </ListItem>
            <ListItem>Real-time menu management </ListItem>
            <ListItem>Upload images </ListItem>
            <ListItem> Review and customer feedback management</ListItem>
          </List>
        </Typography>
        {/* `${process.env.BUSINESS_URL}?redirect=login` */}
        {/* <Link href={`${process.env.BUSINESS_URL}?redirect=login`}> */}
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
            width: {md: '50%', xs: '80%'},
            textTransform: 'none',
          }}
          onClick={() => setOpenModal(MODAL_TYPE.BUSINESS_LOGIN)}
        >
          Log in to claim this page
        </Button>
        {/* </Link> */}

        {/* <Button seconda>Create an account</Button> */}

        <Grid
          container
          width="100%"
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
          }}
          pt={5}
          pb={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt={2}
          mb={5}
        >
          <Typography
            color="#8B8B8B"
            fontWeight={400}
            fontSize={14}
            sx={{
              backgroundColor: 'white',
            }}
            mt={-8}
            p={2}
          >
            Don’t have an account? No worries!
          </Typography>
          <Link
            href={`${process.env.BUSINESS_URL}${process.env.BUSINESS_SIGNUP_URL}`}
            passHref
          >
            <Button
              type="submit"
              variant="outlined"
              size="large"
              sx={{
                width: {md: '50%', xs: '80%'},
                textTransform: 'none',
              }}
            >
              Create an account
            </Button>
          </Link>
        </Grid>
        <Button
          type="submit"
          size="large"
          sx={{
            width: {md: '50%', xs: '80%'},
            marginBottom: 5,
            textTransform: 'none',
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
