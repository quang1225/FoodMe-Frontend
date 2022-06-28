import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToken, IUser, IUserDetail, IUserLocation } from '../types/user.types';
import { http } from '@services/axiosWrapper';
import produce from 'immer';

export const getMyDietary = createAsyncThunk('user', async () => {
  try {
    const res = await http.get('dietary/me');
    const all = (await res.data) || [];
    return all as any;
  } catch (err: any) {
    throw err;
  }
});

const initialState: IUser = {
  detail: {} as IUserDetail,
  token: {} as IToken,
  dietary: [],
  location: {} as IUserLocation,
  geoLocation: '',
  isFetching: false,
  isAuthenticated: false,
  userSearching: null,
};

const userSlide = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<IUserDetail>) =>
      produce(state, draft => {
        draft.detail = action.payload;
      }),
    setIsAuthenticated: (state, action: PayloadAction<boolean>) =>
      produce(state, draft => {
        draft.isAuthenticated = action.payload;
      }),
    setMyDietary: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.dietary = action.payload;
        draft.isFetching = false;
      }),
    setLocation: (state, action: PayloadAction<IUserLocation>) =>
      produce(state, draft => {
        draft.location = action.payload;
      }),
    setGeoLocation: (state, action: PayloadAction<string>) =>
      produce(state, draft => {
        draft.geoLocation = action.payload;
      }),
    setUserFetching: (state, action: PayloadAction<boolean>) =>
      produce(state, draft => {
        draft.isFetching = action.payload;
      }),
    clearUser: state =>
      produce(state, draft => {
        localStorage.clear();
        draft.detail = {} as IUserDetail;
        draft.token = {} as IToken;
        draft.isAuthenticated = false;
        draft.dietary = [];
        draft.userSearching = null;
      }),
  },
  extraReducers(builder) {
    builder.addCase(
      getMyDietary.fulfilled,
      (state, action: PayloadAction<any>) =>
        produce(state, draft => {
          draft.dietary = action.payload;
          draft.isFetching = false;
        }),
    );
    builder.addCase(getMyDietary.pending, state =>
      produce(state, draft => {
        draft.isFetching = true;
      }),
    );
  },
});

export const {
  setIsAuthenticated,
  setUserDetail,
  setMyDietary,
  setLocation,
  setGeoLocation,
  setUserFetching,
  clearUser,
} = userSlide.actions;

export default userSlide.reducer;
