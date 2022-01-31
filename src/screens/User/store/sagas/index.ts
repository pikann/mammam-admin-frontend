import {call, put, takeLatest} from 'redux-saga/effects';

import * as UserAction from '../actions';
import { searchUserService } from '../services';

interface Data {
  [key: string]: any;
}

function* getUsersSaga({payload}: any) {
  try {
    yield put({
      type: UserAction.Types.LOADING.begin,
    });

    const response: Data = yield call(searchUserService, payload);

    yield put({
      type: UserAction.Types.LOADING.succeeded,
    });

    yield put({
      type: UserAction.Types.GET_USERS.succeeded,
      payload: {
        users: response.data.data,
        totalPage: response.data.totalPage,
      },
    });
  } catch (error) {
    yield put({
      type: UserAction.Types.LOADING.succeeded,
    });

    yield put({
      type: UserAction.Types.GET_USERS.failed,
      payload,
      error,
    });
  }
}

export default function* userWatcher() {
  yield takeLatest(UserAction.Types.GET_USERS.begin, getUsersSaga);
}
