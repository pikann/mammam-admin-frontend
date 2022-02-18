import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const restaurantState = (state: any) => state.restaurantReducer || initialState;

const makeSelectLoading = () =>
  createSelector(restaurantState, state => {
    return state.isLoading;
  });

const makeSelectRestaurants = () =>
  createSelector(restaurantState, state => {
    return state.restaurants;
  });

const makeSelectTotalPage = () =>
  createSelector(restaurantState, state => {
    return state.totalPage;
  });

export {makeSelectLoading, makeSelectRestaurants, makeSelectTotalPage};
