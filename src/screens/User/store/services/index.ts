import AxiosClientInstance from '../../../../utils/axios';

export const searchUserService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/users/search?keyword=${payload.keyword}&page=${payload.page}&perpage=10`,
  );
};

export const banUserService = async (payload: any) => {
  return await AxiosClientInstance.put(
    `/users/${payload}/ban`,
    {}
  );
};

export const unbanUserService = async (payload: any) => {
  return await AxiosClientInstance.put(
    `/users/${payload}/unban`,
    {}
  );
};
