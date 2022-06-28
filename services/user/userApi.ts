import { http } from '@services/axiosWrapper';
import { IDietary } from '@services/dietary/dietaryApi.types';
import { GetUserDetailApiRes } from '@services/user/userApi.types';
import { IUserDetail } from '@stateManager/stores/types/user.types';

export const verifyEmailApi = async (email: string) => {
  try {
    //@ts-ignore
    const data = await http.post<boolean>('users/verify-email', { email });
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error?.data?.message };
  }
};

export const verifyUpdateEmailApi = async (email: string) => {
  try {
    //@ts-ignore
    const data = await http.patch<boolean>('users/verify-update-email', {
      email,
    });
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error?.data?.message };
  }
};

export const verifyUpdateEmailOtp = async (token: string) => {
  try {
    const data = //@ts-ignore
      await http.post<boolean>('users/verify-update-email-otp', { token });
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error?.data?.message };
  }
};

export const verifyPhoneNumberApi = async (phoneNumber: string) => {
  try {
    const data = //@ts-ignore
      await http.post<boolean>('users/verify-phone', { phoneNumber });
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error?.data?.message };
  }
};

export const checkEmailApi = async (email: string) => {
  try {
    //@ts-ignore
    const data = await http.post<boolean>('users/check-email', { email });
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error?.data?.message };
  }
};

export const verifyDataApi = async (verifyData: IUserDetail) => {
  try {
    //@ts-ignore
    const data = await http.post<boolean>('users/verify-data', verifyData);
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error?.data?.message };
  }
};

export const getUserDetailApi = async () => {
  try {
    const data = (await http.get<GetUserDetailApiRes>('users/profile')).data;
    return data;
  } catch (err) {
    return null;
  }
};

export const getMyDietaryApi = async () => {
  try {
    const data = (await http.get<IDietary[]>('dietary/me')).data;
    return data;
  } catch (err: any) {
    return null;
  }
};

export const updateUserDetailApi = async (payload: any) => {
  try {
    const data = (await http.patch('users/profile', payload)).data;
    return { ok: true, data };
  } catch (err: any) {
    return { ok: false, message: err?.data?.message };
  }
};
