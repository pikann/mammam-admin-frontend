import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const videoState = (state: any) => state.videoReducer || initialState;

const makeSelectLoading = () =>
  createSelector(videoState, state => {
    return state.isLoading;
  });

const makeSelectPosts = () =>
  createSelector(videoState, state => {
    return state.posts;
  });

const makeSelectTotalPage = () =>
  createSelector(videoState, state => {
    return state.totalPage;
  });

export {makeSelectLoading, makeSelectPosts, makeSelectTotalPage};
