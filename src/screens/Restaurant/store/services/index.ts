import AxiosClientInstance from '../../../../utils/axios';

export const searchRestaurantService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/restaurants?keyword=${payload.keyword}&page=${payload.page}&perpage=10`,
  );
};

export const deleteRestaurantService = async (payload: any) => {
  return await AxiosClientInstance.delete(`/restaurants/${payload}`, {});
};
