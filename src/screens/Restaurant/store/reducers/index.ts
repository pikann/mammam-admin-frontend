import produce from 'immer';

import * as RestaurantActions from '../actions';
import { IRestaurant } from '../interfaces/restaurant';

export const initialState = {
  restaurants: [] as IRestaurant[],
  totalPage: 0,
  isLoading: false,
};

export type RestaurantState = typeof initialState;

const restaurantReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: RestaurantState) => {
    switch (type) {
      case RestaurantActions.Types.GET_RESTAURANTS.succeeded:
        draft.restaurants = payload.restaurants;
        if (payload.totalPage) {
          draft.totalPage = payload.totalPage;
        }
        break;
      case RestaurantActions.Types.DELETE_RESTAURANT.succeeded:
        draft.restaurants = draft.restaurants.filter(restaurant => restaurant._id !== payload);
        break;
      case RestaurantActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case RestaurantActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default restaurantReducer;
