import { http } from '@services/axiosWrapper';
import {
  RestaurantMenuType,
  IRestaurantDetail,
  IDeliveryProviders,
  IRestaurantStats,
} from './restaurantDetailApi.type';

export const getRestaurantBySlug = async (slug: string, query: any) => {
  try {
    const res = await http.get<IRestaurantDetail>(`restaurants/${slug}`, {
      params: { ...query, select: ['deliveryProviders', 'bookingWidgets'] },
    });
    return res.data;
  } catch (err: any) {
    return {} as IRestaurantDetail;
  }
};

export const getRestaurantByDomain = async (domain: string) => {
  try {
    const res = await http.get<IRestaurantDetail>(
      `restaurants/domain/${domain}`,
    );
    return res.data;
  } catch (err: any) {
    return {} as IRestaurantDetail;
  }
};

export const getListIssues = async () => {
  try {
    const res = await http.get<any>(`issue-types`);
    return res.data;
  } catch (err: any) {
    return null;
  }
};

export const reportIssues = async (slug: string, payload: any[]) => {
  try {
    const res = await http.post(`restaurants/${slug}/issues`, {
      issues: payload,
    });
    return res.data;
  } catch (err: any) {
    return {};
  }
};

export const getRestaurantStatsBySlug = async (slug: string, query?: any) => {
  try {
    const data = (
      await http.get<IRestaurantStats>(`restaurants/${slug}`, {
        params: { ...query, select: 'stats' },
      })
    ).data.stats;
    return data;
  } catch (err: any) {
    return null;
  }
};

export const getRestaurantDeliveryProvidersBySlug = async (
  slug: string,
  query?: any,
) => {
  try {
    const data = (
      await http.get<IDeliveryProviders[]>(`restaurants/${slug}`, {
        params: { ...query, select: 'deliveryProviders' },
      })
    ).data;
    return data;
  } catch (err: any) {
    return [];
  }
};

export const getRestaurantBookmarkStatus = async (id: string) => {
  try {
    const res = await http.get<boolean>(`restaurants/${id}/bookmark`);
    return res.data;
  } catch (err: any) {
    return false;
  }
};

export const bookmarkRestaurant = async (slug: string) => {
  try {
    const res = await http.post(`restaurants/bookmarks/me/${slug}`);
    return res.data;
  } catch (err: any) {
    return {};
  }
};

export const deleteBookmarkRestaurant = async (slug: string) => {
  try {
    const res = await http.delete(`restaurants/bookmarks/me/${slug}`);
    return res.data;
  } catch (err: any) {
    return {};
  }
};

export const likeRestaurant = async (id: string, isLiked: boolean) => {
  try {
    const res = await http.post(`restaurants/${id}/likes`, { isLiked });
    return res.data;
  } catch (err: any) {
    return {};
  }
};

export const removeLikeRestaurant = async (id: string) => {
  try {
    const res = await http.delete(`restaurants/${id}/likes`);
    return res.data;
  } catch (err: any) {
    return {};
  }
};

export const disLikeMenu = async (id: string) => {
  try {
    const res = await http.delete(`menu-item/${id}/likes`);
    return res.data;
  } catch (err: any) {
    return {};
  }
};

export const likeMenu = async (id: string, body: { isLiked: boolean }) => {
  try {
    const res = await http.post(`menu-item/${id}/likes`, body);
    return res.data;
  } catch (err: any) {
    return {};
  }
};

export const getRestaurantMenuApi = async (
  slug: string,
): Promise<RestaurantMenuType[]> => {
  try {
    const res = await http.get<RestaurantMenuType[]>(
      `restaurants/${slug}/menu`,
    );
    return res.data;
  } catch (err: any) {
    return [];
  }
};

export const getMenuById = async (
  id: string,
  menuid: number,
): Promise<RestaurantMenuType | null> => {
  try {
    const res = await http.get<RestaurantMenuType>(
      `restaurants/${id}/menu/${menuid}/items`,
    );
    return res.data;
  } catch (err: any) {
    return null;
  }
};

export const getListType = async (): Promise<any | []> => {
  try {
    const res = await http.get<RestaurantMenuType>('restaurants/types');
    return res.data;
  } catch (err: any) {
    return [];
  }
};
