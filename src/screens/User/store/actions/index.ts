import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'VIDEO',
  'GET_USERS',
  'BAN_USER',
  'UNBAN_USER',
  'LOADING',
);

export const getUsers = createActionGenerator(Types.GET_USERS);
export const banUser = createActionGenerator(Types.BAN_USER);
export const unbanUser = createActionGenerator(Types.UNBAN_USER);
export const loading = createActionGenerator(Types.LOADING);
