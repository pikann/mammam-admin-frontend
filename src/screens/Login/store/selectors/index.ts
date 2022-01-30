import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const loginState = (state: any) => state.loginReducer || initialState;

const makeSelectLoading = () =>
  createSelector(loginState, state => {
    return state.isLoading;
  });

export {makeSelectLoading};
