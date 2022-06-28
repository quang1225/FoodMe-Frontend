import { http } from '../axiosWrapper';
import { SearchRestaurant, IRestaurant } from './restaurantApi.types';

export const getListRestaurant = async (params: any) => {
  try {
    const data = (await http.get<IRestaurant[]>('restaurants', { params }))
      .data;
    return data;
  } catch (err: any) {
    return [];
  }
};

export const getMyRestaurantsBookmarks = async (params: any) => {
  try {
    const res = await http.get<{}>('restaurants/bookmarks/me', { params });
    const all = await res.data;
    return all as Array<any>;
  } catch (err: any) {
    return [];
  }
};

export const getSearchRestaurant = async (params: any) => {
  try {
    const data = (
      await http.get<SearchRestaurant[]>('restaurants/search', { params })
    ).data;
    return data;
  } catch (err: any) {
    return err?.data;
  }
};

export const getGallery = async (id: string): Promise<any> => {
  try {
    const res = await http.get<{}>(`/restaurants/${id}/galleries`);
    const data = await res.data;
    return data;
  } catch (err: any) {
    return null;
  }
};
