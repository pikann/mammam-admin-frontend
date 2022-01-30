import axios from 'axios';

import Urls from '../../constants/Urls';

export const refreshTokenService = async (refreshToken: string) => {
  return await axios.get(`${Urls.API}auth/refresh-token`, {
    headers: {Authorization: `Bearer ${refreshToken}`},
  });
};
