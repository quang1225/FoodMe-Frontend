import { Dialog, DialogContent, Typography } from '@mui/material';
import React from 'react';
import CustomDialogTitle from '../../shared/components/CustomDialogTitle';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from 'utils/constant';
import { useRouter } from 'next/router';

const Title = styled(CustomDialogTitle)`
  padding: 24px 24px 30px 24px;
`;

const Content = styled(DialogContent)`
  padding: 0px 41px 60px 41px;
  overflow: hidden;
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 0px 30px 60px 30px;
  }
`;

export interface IBusinessLoginProps {
  isOpen: boolean;
  handleClose: any;
  restaurantId: string;
}

const BusinessLogin = ({
  isOpen,
  handleClose,
  restaurantId,
}: IBusinessLoginProps) => {
  const router = useRouter();
  const onSubmit = async (data: any) => {
    router.push(
      (process.env.BUSINESS_URL || '') +
        (process.env.BUSINESS_LOGIN_URL || '') +
        `&email=${data.email}&restaurantId=${restaurantId}`,
    );
  };

  return (
    <Dialog
      fullWidth
      scroll="body"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxWidth: '572px',
          backgroundColor: 'var(--baby-blue-30)',
          width: '100%',
          margin: '10px',
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
        <LoginForm handleClaim={onSubmit} />
      </Content>
    </Dialog>
  );
};

export default BusinessLogin;
