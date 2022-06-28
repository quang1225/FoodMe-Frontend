// import users from "./../../data/users";
// import authService from "./../service/authService";
import { Dialog, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CustomDialogTitle from '../../shared/components/CustomDialogTitle';
import VerifyCodeForm from './VerifyCodeForm';

const useStyles = makeStyles((theme: any) => ({
  title: {
    padding: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(3, 4),
  },
}));

export interface IVertifyCodeDialogProps {
  isOpen: boolean;
  handleClose: any;
}
const VertifyCodeDialog = ({
  isOpen,
  handleClose,
}: IVertifyCodeDialogProps) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxWidth: '572px',
          backgroundColor: 'var(--baby-blue-30)',
          height: '100%',
          maxHeight: 900,
        },
      }}
    >
      <CustomDialogTitle className={classes.title} onClose={handleClose}>
        <Typography
          textAlign="center"
          color="var(--orange-zest-2)"
          fontWeight={700}
          fontSize={30}
          className="title-font"
        >
          Check your email
        </Typography>
      </CustomDialogTitle>
      <DialogContent className={classes.content}>
        <VerifyCodeForm handleClose={handleClose} />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default VertifyCodeDialog;
