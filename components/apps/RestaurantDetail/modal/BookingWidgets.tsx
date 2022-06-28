import OpenTable from '@components/shared/BookingWidgets/OpenTable';
import Resy from '@components/shared/BookingWidgets/Resy';
import { Box } from '@mui/material';
import { BOOKING_TYPE } from 'utils/constant';

const BookingWidgets = (booking: any) => {
  const { type, merchant_id, api_key } = booking.booking;
  const renderBookingForm = () => {
    switch (type.toLocaleLowerCase()) {
      case BOOKING_TYPE.THE_FORK:
        return (
          <>
            <iframe
              src={`https://module.lafourchette.com/en_AU/module/${merchant_id}`}
              width="450px"
              height="450px"
            />
          </>
        );
      case BOOKING_TYPE.OPEN_TABLE:
        return <OpenTable restaurantId={merchant_id} />;
      case BOOKING_TYPE.RESY:
        return <Resy restaurantId={merchant_id} api_key={api_key} />;
      case BOOKING_TYPE.QUANDOO:
        return (
          <>
            <iframe
              src={`https://booking-widget.quandoo.com.au/iframe.html?agentId=2&merchantId=${merchant_id}&origin=https%3A%2F%2Fadmin.quandoo.com&path=https%3A%2F%2Fbooking-widget.quandoo.com%2F`}
              width="450px"
              height="450px"
            />
          </>
        );
      default:
        break;
    }
  };

  return (
    <Box display="flex" justifyContent="center" p={3}>
      {renderBookingForm()}
    </Box>
  );
};

export default BookingWidgets;
