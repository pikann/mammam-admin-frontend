import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const appState = (state: any) => state.appReducer || initialState;

const makeSelectLogin = () =>
  createSelector(appState, state => {
    return state.login;
  });

export {
  makeSelectLogin,
};
