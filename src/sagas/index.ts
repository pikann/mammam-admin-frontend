import {all, fork} from '@redux-saga/core/effects';

import appWatcher from '../store/sagas';
import loginWatcher from '../screens/Login/store/sagas';

export function* rootSaga() {
  yield all([fork(appWatcher)]);
  yield all([fork(loginWatcher)]);
}
