import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICommonStageManager, SignUpPopup } from '../types/commonSlice.types';
import produce from 'immer';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    openModal: '',
    googleMaps: null,
    isScrolling: false,
  } as ICommonStageManager,
  reducers: {
    toggleOpenModal: (state, action: PayloadAction<string | SignUpPopup>) =>
      produce(state, draft => {
        draft.openModal = action.payload;
      }),
    setGoogleMaps: (state, action: PayloadAction<unknown>) =>
      produce(state, draft => {
        draft.googleMaps = action.payload;
      }),
    setScrolling: (state, action: PayloadAction<boolean>) =>
      produce(state, draft => {
        draft.isScrolling = action.payload;
      }),
  },
});

export const { toggleOpenModal, setGoogleMaps, setScrolling } =
  commonSlice.actions;

export default commonSlice;
