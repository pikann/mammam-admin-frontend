import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'VIDEO',
  'GET_USERS',
  'LOADING',
);

export const getUsers = createActionGenerator(Types.GET_USERS);
export const loading = createActionGenerator(Types.LOADING);
