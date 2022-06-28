import { Dialog, DialogContent, Typography } from '@mui/material';
import React from 'react';
import CustomDialogTitle from '../../shared/components/CustomDialogTitle';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from 'utils/constant';

const Title = styled(CustomDialogTitle)`
  padding: 24px 24px 30px 24px;
`;

const Content = styled(DialogContent)`
  padding: 0px 41px 60px 41px;
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 0px 20px 60px 20px;
  }
`;

export interface ILoginDialogProps {
  isOpen: boolean;
  handleClose: any;
}
const LoginDialog = ({ isOpen, handleClose }: ILoginDialogProps) => {
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
      <Title
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
          Log in
        </Typography>
      </Title>
      <Content>
        <LoginForm />
      </Content>
    </Dialog>
  );
};

export default LoginDialog;
