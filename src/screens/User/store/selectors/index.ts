import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const userState = (state: any) => state.userReducer || initialState;

const makeSelectLoading = () =>
  createSelector(userState, state => {
    return state.isLoading;
  });

const makeSelectUsers = () =>
  createSelector(userState, state => {
    return state.users;
  });

const makeSelectTotalPage = () =>
  createSelector(userState, state => {
    return state.totalPage;
  });

export {makeSelectLoading, makeSelectUsers, makeSelectTotalPage};
