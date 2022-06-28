import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRestaurant } from '../types/restaurant.types';
import { http } from '@services/axiosWrapper';
import produce from 'immer';
import { getRestaurantBySlug } from '@services/restaurants/restaurantDetailApi';
import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';

export interface RestaurantState {
  listRestaurant: Array<IRestaurant>;
  restaurantDetail: IRestaurantDetail;
  isLoading: boolean;
  listDeliveryProviders: any;
  listBookingWidgets: any;
}

const initialState: RestaurantState = {
  listRestaurant: [],
  restaurantDetail: {} as IRestaurantDetail,
  isLoading: false,
  listDeliveryProviders: null,
  listBookingWidgets: null,
};

export const getListRestaurant = createAsyncThunk('restaurants', async () => {
  try {
    const res = await http.get('restaurants');
    const all = (await res.data) || [];
    return all as Array<IRestaurant>;
  } catch (err: any) {
    return [];
  }
});

export const getRestaurantDetail = createAsyncThunk(
  'restaurantDetail',
  async (slug: string) => {
    try {
      const query = {
        select: [
          'geolocation',
          'openingHours',
          'contactEmail',
          'contactPhone',
          'contactSocialMediaLinks',
          'stats',
        ],
      };
      const resDetail = await getRestaurantBySlug(slug, query);
      return resDetail;
    } catch (err: any) {
      return {} as IRestaurantDetail;
    }
  },
);

export const restaurantSlide = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setListDeliveryProviders: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.listDeliveryProviders = action.payload;
      }),
    setListBookingWidgets: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.listBookingWidgets = action.payload;
      }),
    setRestaurantDetail: (state, action: PayloadAction<IRestaurantDetail>) =>
      produce(state, draft => {
        draft.restaurantDetail = action.payload;
      }),
  },
  extraReducers(builder) {
    builder.addCase(
      getListRestaurant.fulfilled,
      (state, action: PayloadAction<IRestaurant[]>) =>
        produce(state, draft => {
          draft.listRestaurant = action.payload;
          draft.isLoading = false;
        }),
    );
    builder.addCase(
      getRestaurantDetail.fulfilled,
      (state, action: PayloadAction<IRestaurantDetail>) =>
        produce(state, draft => {
          draft.restaurantDetail = action.payload;
        }),
    );
  },
});

export const {
  setListDeliveryProviders,
  setListBookingWidgets,
  setRestaurantDetail,
} = restaurantSlide.actions;

export default restaurantSlide.reducer;
