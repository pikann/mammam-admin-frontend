import produce from 'immer';

import * as AppActions from '../actions';

export const initialState = {
  login: false,
};

export type AppState = typeof initialState;

const appReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: AppState) => {
    switch (type) {
      case AppActions.Types.CHECK_LOGIN.succeeded:
        draft.login = payload.login;
        break;
      default:
        break;
    }
  });

export default appReducer;
