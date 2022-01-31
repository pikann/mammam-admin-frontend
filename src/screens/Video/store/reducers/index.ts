import produce from 'immer';

import * as VideoActions from '../actions';
import { IPost } from '../interfaces/post';

export const initialState = {
  posts: [] as IPost[],
  totalPage: 0,
  isLoading: false,
};

export type VideoState = typeof initialState;

const videoReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: VideoState) => {
    switch (type) {
      case VideoActions.Types.GET_POSTS.succeeded:
        draft.posts = payload.posts;
        if (payload.totalPage) {
          draft.totalPage = payload.totalPage;
        }
        break;
      case VideoActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case VideoActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default videoReducer;
