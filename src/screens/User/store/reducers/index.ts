import produce from 'immer';

import * as UserActions from '../actions';
import { IUser } from '../interfaces/user';

export const initialState = {
  users: [] as IUser[],
  totalPage: 0,
  isLoading: false,
};

export type UserState = typeof initialState;

const userReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: UserState) => {
    switch (type) {
      case UserActions.Types.GET_USERS.succeeded:
        draft.users = payload.users;
        if (payload.totalPage) {
          draft.totalPage = payload.totalPage;
        }
        break;
      case UserActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case UserActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default userReducer;
