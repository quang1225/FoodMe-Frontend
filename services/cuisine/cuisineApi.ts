import { http } from '../axiosWrapper';
import { Cuisine } from './cuisineApi.types';

export const getListCuisine = async (params: any): Promise<Array<Cuisine>> => {
  try {
    const res = await http.get('cuisines', { params });
    const data = await res.data;
    return data as Array<Cuisine>;
  } catch (err: any) {
    return [];
  }
};

export const getListCuisineByIds = async (
  params: any,
): Promise<Array<Cuisine>> => {
  try {
    const res = await http.get('cuisines/list', { params });
    const data = await res.data;
    return data as Array<Cuisine>;
  } catch (err: any) {
    return [];
  }
};
