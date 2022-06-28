import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import { setListDeliveryProviders } from '@stateManager/stores/slices/restaurantSlice';
import { MODAL_TYPE } from './constant';

function bookingOrderFunc(restaurantDetail: IRestaurantDetail, dispatch: any) {
  const listOrder = Object.values(restaurantDetail?.deliveryProviders || {});

  if (listOrder.length === 1) {
    return window.open(listOrder[0] as unknown as string, '_blank');
  }
  dispatch(setListDeliveryProviders(restaurantDetail?.deliveryProviders || {}));
  dispatch(toggleOpenModal(MODAL_TYPE.ORDER_ONLINE));
}

export default bookingOrderFunc;
