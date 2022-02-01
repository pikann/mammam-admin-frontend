import AxiosClientInstance from '../../../../utils/axios';

export const searchPostService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/posts/search?keyword=${payload.keyword}&page=${payload.page}&perpage=10`,
  );
};

export const deletePostService = async (payload: any) => {
  return await AxiosClientInstance.delete(`/posts/${payload}`, {});
};
