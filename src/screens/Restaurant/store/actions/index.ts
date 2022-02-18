import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'RESTAURANT',
  'GET_RESTAURANTS',
  'DELETE_RESTAURANT',
  'LOADING',
);

export const getRestaurants = createActionGenerator(Types.GET_RESTAURANTS);
export const deleteRestaurant = createActionGenerator(Types.DELETE_RESTAURANT);
export const loading = createActionGenerator(Types.LOADING);
