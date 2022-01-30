import produce from 'immer';

import * as LoginActions from '../actions';

export const initialState = {
  isLoading: false,
};

export type LoginState = typeof initialState;

const loginReducer = (state = initialState, {type}: any) =>
  produce(state, (draft: LoginState) => {
    switch (type) {
      case LoginActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case LoginActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default loginReducer;
