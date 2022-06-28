import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import store from '@stateManager/stores/appStore';
import {
  clearUser,
  setUserDetail,
} from '@stateManager/stores/slices/userSlice';
import { IToken, IUserDetail } from '@stateManager/stores/types/user.types';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const getRandomString = (bytes: number) => {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join('');
};

const intToHex = (nr: number) => {
  return nr.toString(16).padStart(2, '0');
};

export const cognitoGetToken = async () => {
  try {
    const session: any = await Auth.currentSession();
    const accessToken = session?.accessToken?.jwtToken || '';
    const token: IToken = {
      accessToken: accessToken,
      refreshToken: '',
      expiredAt: 0,
      idToken: '',
    };
    return token;
  } catch (error: any) {
    return {} as IToken;
  }
};

export interface CognitoSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const cognitoSignUp = async (data: CognitoSignupData) => {
  try {
    const res: any = await Auth.signUp({
      username: data.email,
      password: getRandomString(30) + '@A', //pass need upper text and special
      attributes: {
        email: data.email,
        family_name: data.lastName,
        given_name: data.firstName,
        phone_number: data.phoneNumber,
      },
    });

    if (res?.userConfirmed) {
      const email = res?.user?.username;
      //@ts-ignore
      store.dispatch(
        setUserDetail({
          email: email,
        } as IUserDetail),
      );
      return {
        success: true,
        data: res?.user?.username,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || '',
    };
  }
};

export const cognitoSignIn = async (email: string) => {
  try {
    const res = await Auth.signIn(email);
    return res;
  } catch (error) {
    throw error;
  }
};

const rememberPath = () => {
  localStorage.setItem(
    'prevPathname',
    window.location.pathname + window.location.search,
  );
};

export const cognitoLogout = async () => {
  try {
    rememberPath();
    await Auth.signOut();
    //@ts-ignore
    store.dispatch(clearUser());
  } catch (error) {
    throw error;
  }
};

export const cognitoVerifyOTP = async (user: any, otp: any) => {
  try {
    const cognitoUser = await Auth.sendCustomChallengeAnswer(user, otp);
    if (!cognitoUser?.signInUserSession?.accessToken?.jwtToken) {
      throw '';
    }

    return {
      success: true,
    };
  } catch (error) {
    const verifyFalseTimes =
      +(localStorage.getItem('verifyFalseTimes') || 0) + 1;
    localStorage.setItem('verifyFalseTimes', verifyFalseTimes + '');
    return {
      success: false,
      data: `Invalid code ${verifyFalseTimes + 1} times`,
    };
  }
};

const handleSignUp = (signUp = false) => {
  if (signUp) localStorage.setItem('new_user', 'true');
};

export const cognitoSignInGoogle = (signUp = false) => {
  rememberPath();
  handleSignUp(signUp);

  return Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  });
};
export const cognitoSignInFacebook = (signUp = false) => {
  rememberPath();
  handleSignUp(signUp);

  return Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Facebook,
  });
};
