import CommonButton from '@components/shared/CommonButton';
import CustomDialogTitle from '@components/shared/components/CustomDialogTitle';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme: any) => ({
  title: {
    padding: '20px 0 18px 0',
  },
  content: {
    padding: '0 28px 34px 28px',
    textAlign: 'center',
  },
  option: {
    padding: '18px 30px',
    height: 80,
    textAlign: 'center',
    background: '#FFFFFF',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.18)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  action: {
    padding: theme.spacing('3'),
    justifyContent: 'center !important',
    cursor: 'auto',
  },

  styleButton: {
    width: 230,
    margin: 'auto',
    marginTop: '40px',
  },
}));

const deliveryDataMappingImage: any = {
  deliveroo: '/images/booking/deliveroo.svg',
  menulog: '/images/booking/menulog.svg',
  heyyou: '/images/booking/heyyou.svg',
};

export interface IOrderOnlineDialogProps {
  isOpen: boolean;
  handleClose: any;
  deliveryProviders: any;
}
const OrderOnlineDialog = ({
  isOpen,
  handleClose,
  deliveryProviders,
}: IOrderOnlineDialogProps) => {
  const classes = useStyles();
  const handleOrderClose = () => {
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleOrderClose}
      PaperProps={{
        style: {
          maxWidth: 420,
          backgroundColor: 'var(--baby-blue-30)',
          width: '100%',
        },
      }}
    >
      <CustomDialogTitle
        className={classes.title}
        onClose={() => {
          handleOrderClose();
        }}
      >
        <Typography
          textAlign="center"
          fontWeight={700}
          fontSize={30}
          className="title-font"
          color="var(--orange-zest-2)"
        >
          Order for delivery...
        </Typography>
      </CustomDialogTitle>
      <DialogContent className={classes.content}>
        {deliveryProviders &&
          Object.keys(deliveryProviders).map((item: any, index: number) => {
            return (
              <Link href={deliveryProviders[item]} prefetch={false} key={index}>
                <a target="_blank" rel="noopener noreferrer">
                  <Box
                    className={classes.option}
                    mt={'12px'}
                    key={index}
                    onClick={() => {
                      //   setBookingType(BOOKING_TYPE.THE_FORK);
                    }}
                  >
                    <Image
                      width={item === 'heyyou' ? 65 : 137}
                      height={item === 'heyyou' ? 45 : 37}
                      layout="fixed"
                      //   sizes="50vw"
                      src={deliveryDataMappingImage[item.toLowerCase()]}
                    />
                  </Box>
                </a>
              </Link>
            );
          })}
        <CommonButton
          className={classes.styleButton}
          height={46}
          background="var(--orange-zest-2)"
          $textColor="var(--neutral-7)"
          onClick={handleOrderClose}
        >
          <Typography fontSize={16} className="title-font">
            Cancel
          </Typography>
        </CommonButton>
      </DialogContent>
    </Dialog>
  );
};

export default OrderOnlineDialog;
