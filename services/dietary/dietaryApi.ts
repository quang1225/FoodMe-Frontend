import { http } from '../axiosWrapper';
import { IDietary, UpdateDietary } from '@services/dietary/dietaryApi.types';

interface CreateDietary {
  idList: Array<string>;
}

export const getAppDietaryApi = async () => {
  try {
    const data = (await http.get<IDietary[]>('dietary')).data;
    return data;
  } catch (err: any) {
    throw err?.data?.message;
  }
};

export const createMyDietaryApi = async (payload: CreateDietary) => {
  try {
    const data = (await http.post<IDietary[]>('dietary/me', payload)).data;
    return data;
  } catch (err: any) {
    throw err?.data?.message;
  }
};

export const updateMyDietaryApi = async (
  payload: UpdateDietary,
): Promise<Array<IDietary>> => {
  try {
    const data = (await http.put<IDietary[]>('dietary/me', payload)).data;
    return data;
  } catch (err: any) {
    throw err?.data?.message;
  }
};
