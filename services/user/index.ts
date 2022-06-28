import { http } from '../axiosWrapper';

export interface ProfileDetail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
}

export const getProfileDetail = async () => {
  try {
    const res = await http.get<{}>('users/profile');
    const data = await res.data;
    return data as ProfileDetail;
  } catch (err: any) {
    return err?.data?.message;
  }
};

export const updateProfileDetail = async (payload: any) => {
  try {
    const res = await http.patch<{}>('users/profile', payload);
    const data = await res.data;
    return { ok: true, data: data as any };
  } catch (err: any) {
    return { ok: false, message: err?.data?.message };
  }
};

export const verifyAccount = async (email: string) => {
  try {
    const res = await http.post<{}>('users/verify-email', { email });
    return res;
  } catch (err: any) {
    return err?.data?.message;
  }
};

export const verifySocialToken = async (
  code: string,
  redirect_uri: string,
  grant_type: string,
  refresh_token?: string,
) => {
  try {
    return await http.post<{}>('users/oauth/token', {
      code,
      redirect_uri,
      grant_type,
      refresh_token,
    });
  } catch (err: any) {
    return err?.data?.message;
  }
};

export const verifyPhoneNumber = async (phoneNumber: string) => {
  try {
    const res = await http.post<{}>('users/verify-phone', { phoneNumber });
    const data = await res.data;
    return data as any;
  } catch (err: any) {
    return err?.data?.message;
  }
};
