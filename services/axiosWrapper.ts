import store from '@stateManager/stores/appStore';
import { setIsAuthenticated } from '@stateManager/stores/slices/userSlice';
import axios from 'axios';
import getConfig from 'next/config';
import { cognitoGetToken } from './aws/amplify-service';

const { publicRuntimeConfig } = getConfig();

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const getCancelToken = () => axios.CancelToken;

const handleError = (error: any) => {
  const { status } = error;
  switch (status) {
    case StatusCode.InternalServerError: {
      break;
    }
    case StatusCode.Forbidden: {
      break;
    }
    case StatusCode.Unauthorized: {
      break;
    }
    case StatusCode.TooManyRequests: {
      break;
    }
  }
  return Promise.reject(error);
};

const http = axios.create({
  baseURL: publicRuntimeConfig.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
  withCredentials: false,
});

http.interceptors.request.use(
  async config => {
    const token = await cognitoGetToken();
    if (!token.accessToken) {
      return Promise.resolve(config);
    }

    //@ts-ignore
    store.dispatch(setIsAuthenticated(true));
    //@ts-ignore
    config.headers.Authorization = 'Bearer ' + token.accessToken;
    return Promise.resolve(config);
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    return handleError(response);
  },
);

export { getCancelToken, http };
