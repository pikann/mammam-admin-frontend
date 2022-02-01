import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'VIDEO',
  'GET_POSTS',
  'DELETE_POST',
  'LOADING',
);

export const getPosts = createActionGenerator(Types.GET_POSTS);
export const deletePost = createActionGenerator(Types.DELETE_POST);
export const loading = createActionGenerator(Types.LOADING);
