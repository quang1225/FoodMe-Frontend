import CommonButton from '@components/shared/CommonButton';
import CustomDialogTitle from '@components/shared/components/CustomDialogTitle';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from '@stateManager/stores/appStore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BookingWidgets from './BookingWidgets';

const useStyles = makeStyles((theme: any) => ({
  title: {
    padding: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(3, 4),
  },
  option: {
    padding: '15px 30px',
    textAlign: 'center',
    background: '#FFFFFF',
    // width: 200,
    // height: 65,
    boxShadow: '0px 1px 4px 0px #0000002e',
    cursor: 'pointer',
    borderRadius: '4px',

    '& img': {
      objectFit: 'contain',
    },
  },
  action: {
    padding: theme.spacing('3'),
    justifyContent: 'center !important',
    cursor: 'auto',
  },
  styleButton: {
    width: 230,
    margin: '20px auto 20px auto',
  },
}));

export interface IBooking {
  type?: string;
  merchant_id: number;
  api_key?: any;
}
export interface IMakeABookingDialogProps {
  isOpen: boolean;
  handleClose: any;
}

const MakeABookingDialog = ({
  isOpen,
  handleClose,
}: IMakeABookingDialogProps) => {
  const classes = useStyles();
  const [bookingType, setBookingType] = useState<IBooking>({ merchant_id: 0 });

  const handleBookingClose = () => {
    setBookingType({ merchant_id: 0 });
    handleClose();
  };

  const bookingWidgets = useAppSelector(
    appState => appState.restaurant.listBookingWidgets,
  );

  useEffect(() => {
    if (bookingWidgets && Object.keys(bookingWidgets)?.length === 1 && isOpen) {
      const widgetName = Object.keys(bookingWidgets)[0];
      const service: any = Object.values(bookingWidgets)[0];
      setBookingType({
        type: widgetName,
        merchant_id: service?.merchant_id,
        api_key: service?.api_key,
      });
    }
  }, [bookingWidgets, isOpen]);

  const handleSelectBooking = (data: IBooking) => {
    setBookingType(data);
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleBookingClose}
      PaperProps={{
        style: {
          maxWidth: 420,
          backgroundColor: 'var(--baby-blue-30)',
          width: '100%',
        },
      }}
    >
      {bookingType.merchant_id ? (
        <BookingWidgets booking={bookingType} />
      ) : (
        <>
          <CustomDialogTitle
            className={classes.title}
            onClose={() => {
              handleBookingClose();
            }}
          >
            <Typography
              textAlign="center"
              fontWeight={700}
              fontSize={30}
              className="title-font"
              color="var(--orange-zest-2)"
            >
              Book a table with...
            </Typography>
          </CustomDialogTitle>
          <DialogContent className={classes.content}>
            <>
              {Object.values(bookingWidgets || {}).map(
                (item: any, index: number) => {
                  const name = Object.keys(bookingWidgets)[index];
                  return (
                    <Box
                      className={classes.option}
                      mt={1}
                      onClick={() =>
                        handleSelectBooking({
                          type: name,
                          ...item,
                        })
                      }
                      key={index}
                    >
                      <Image
                        width={130}
                        height={54}
                        src={`/images/booking/${name
                          .toLocaleLowerCase()
                          .replaceAll(' ', '-')}.${
                          name.includes('doo') ? 'png' : 'svg'
                        }`}
                      />
                    </Box>
                  );
                },
              )}
            </>
          </DialogContent>
        </>
      )}
      <CommonButton
        className={classes.styleButton}
        height={46}
        background="var(--orange-zest-2)"
        $textColor="var(--neutral-7)"
        onClick={() => {
          bookingType.merchant_id &&
          bookingWidgets &&
          Object.keys(bookingWidgets)?.length !== 1
            ? setBookingType({ merchant_id: 0 })
            : handleBookingClose();
        }}
      >
        <Typography fontSize={16} className="title-font">
          {bookingType && Object.keys(bookingWidgets || {}).length > 1
            ? 'Back'
            : 'Cancel'}
        </Typography>
      </CommonButton>
    </Dialog>
  );
};

export default MakeABookingDialog;
