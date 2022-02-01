import {call, put, takeLatest} from 'redux-saga/effects';

import * as UserAction from '../actions';
import { banUserService, searchUserService, unbanUserService } from '../services';

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

function* banUserSaga({payload}: any) {
  try {
    yield call(banUserService, payload);

    yield put({
      type: UserAction.Types.BAN_USER.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: UserAction.Types.BAN_USER.failed,
      payload,
      error,
    });
  }
}

function* unbanUserSaga({payload}: any) {
  try {
    yield call(unbanUserService, payload);

    yield put({
      type: UserAction.Types.UNBAN_USER.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: UserAction.Types.UNBAN_USER.failed,
      payload,
      error,
    });
  }
}

export default function* userWatcher() {
  yield takeLatest(UserAction.Types.GET_USERS.begin, getUsersSaga);
  yield takeLatest(UserAction.Types.BAN_USER.begin, banUserSaga);
  yield takeLatest(UserAction.Types.UNBAN_USER.begin, unbanUserSaga);
}
