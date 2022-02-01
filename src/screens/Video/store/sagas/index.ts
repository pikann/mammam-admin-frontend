import {call, put, takeLatest} from 'redux-saga/effects';

import * as VideoAction from '../actions';
import { deletePostService, searchPostService } from '../services';

interface Data {
  [key: string]: any;
}

function* getPostsSaga({payload}: any) {
  try {
    yield put({
      type: VideoAction.Types.LOADING.begin,
    });

    const response: Data = yield call(searchPostService, payload);

    yield put({
      type: VideoAction.Types.LOADING.succeeded,
    });

    yield put({
      type: VideoAction.Types.GET_POSTS.succeeded,
      payload: {
        posts: response.data.data,
        totalPage: response.data.totalPage,
      },
    });
  } catch (error) {
    yield put({
      type: VideoAction.Types.LOADING.succeeded,
    });

    yield put({
      type: VideoAction.Types.GET_POSTS.failed,
      payload,
      error,
    });
  }
}

function* deletePostsSaga({payload}: any) {
  try {
    yield call(deletePostService, payload);

    yield put({
      type: VideoAction.Types.DELETE_POST.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: VideoAction.Types.DELETE_POST.failed,
      payload,
      error,
    });
  }
}

export default function* videoWatcher() {
  yield takeLatest(VideoAction.Types.GET_POSTS.begin, getPostsSaga);
  yield takeLatest(VideoAction.Types.DELETE_POST.begin, deletePostsSaga);
}
