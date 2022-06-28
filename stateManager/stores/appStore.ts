import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import commonSlice from './slices/commonSlice';
import dietarySlice from './slices/dietarySlice';
import restaurantSlice, { RestaurantState } from './slices/restaurantSlice';
import textManagementSlice from './slices/textManagementSlice';
import userSlide from './slices/userSlice';
import { ICommonStageManager } from './types/commonSlice.types';
import { IDietaryManager } from './types/dietarySlice.types';
import { TextManagement } from './types/textManagement.type';
import { IUser } from './types/user.types';

const store: EnhancedStore = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    user: userSlide,
    textManagement: textManagementSlice.reducer,
    dietary: dietarySlice.reducer,
    common: commonSlice.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
});

export default store;

export type RootState = {
  readonly common: ICommonStageManager;
  readonly dietary: IDietaryManager;
  readonly restaurant: RestaurantState;
  readonly user: IUser;
  readonly textManagement: TextManagement;
};

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
