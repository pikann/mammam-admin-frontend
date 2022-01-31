import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'VIDEO',
  'GET_POSTS',
  'LOADING',
);

export const getPosts = createActionGenerator(Types.GET_POSTS);
export const loading = createActionGenerator(Types.LOADING);
