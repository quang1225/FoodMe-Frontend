import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDietary } from '@services/dietary/dietaryApi.types';
import produce from 'immer';
import { IDietaryManager } from '../types/dietarySlice.types';

const dietarySlice = createSlice({
  name: 'dietary',
  initialState: {
    list: [],
    myDietary: [],
    totalRecords: 0,
    listFetching: false,
  } as IDietaryManager,
  reducers: {
    setListDietary: (state, action: PayloadAction<IDietary[]>) =>
      produce(state, draft => {
        draft.list = action.payload;
      }),
    setAppDietary: (state, action: PayloadAction<IDietary[]>) =>
      produce(state, draft => {
        draft.myDietary = action.payload;
      }),
  },
});

export const { setListDietary, setAppDietary } = dietarySlice.actions;

export default dietarySlice;
