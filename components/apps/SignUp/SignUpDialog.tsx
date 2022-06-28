// import users from "./../../data/users";
// import authService from "./../service/authService";
import { Dialog, DialogContent, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomDialogTitle from '../../shared/components/CustomDialogTitle';
import SignUpForm from './SignUpForm';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    padding: '24px 24px 10px 24px',
  },
  content: {
    padding: '0px 9px 60px 9px',
    [theme?.breakpoints?.down('sm')]: {
      padding: '0px 4px 50px 4px',
    },
  },
}));

export interface ISignUpDialogProps {
  isOpen: boolean;
  handleClose: any;
  setTypeUser: any;
}
const SignUpDialog = ({ isOpen, handleClose }: ISignUpDialogProps) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxWidth: '572px',
          backgroundColor: 'var(--baby-blue-30)',
          height: 'calc(100% - 20px)',
          maxHeight: 900,
        },
      }}
    >
      <CustomDialogTitle
        className={classes.title}
        onClose={() => {
          handleClose();
        }}
      >
        <Typography
          textAlign="center"
          color="var(--orange-zest-2)"
          fontWeight={700}
          fontSize={30}
          className="title-font"
        >
          Create account
        </Typography>
      </CustomDialogTitle>
      <DialogContent className={classes.content}>
        <SignUpForm />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default SignUpDialog;
