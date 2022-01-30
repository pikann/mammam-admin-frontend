import AxiosClientInstance from '../../../../utils/axios';

export const loginService = async (payload: any) => {
  return await AxiosClientInstance.post('/auth/login', payload);
};
