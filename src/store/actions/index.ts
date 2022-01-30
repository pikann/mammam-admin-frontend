import {createActionGenerator} from '../../utils/actionGenerator';
import {actionTypesFactory} from '../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'APP',
  'CHECK_LOGIN',
  'LOGOUT',
  'REFRESH_TOKEN',
);

export const checkLogin = createActionGenerator(Types.CHECK_LOGIN);
export const logout = createActionGenerator(Types.LOGOUT);
export const refreshToken = createActionGenerator(Types.REFRESH_TOKEN);
