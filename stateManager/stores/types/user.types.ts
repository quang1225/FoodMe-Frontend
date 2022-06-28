export interface IUser {
  detail: IUserDetail;
  token: IToken;
  dietary: any;
  userSearching: any;
  location: IUserLocation;
  geoLocation: string;
  isFetching: boolean;
  isAuthenticated: boolean;
}

export interface IUserLocation {
  lat: number;
  lng: number;
}

export interface IUserDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  eatEverything: boolean;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiredAt: number;
}
