import {all, fork} from '@redux-saga/core/effects';

import appWatcher from '../store/sagas';
import loginWatcher from '../screens/Login/store/sagas';
import videoWatcher from '../screens/Video/store/sagas';
import userWatcher from '../screens/User/store/sagas';
import restaurantWatcher from '../screens/Restaurant/store/sagas';

export function* rootSaga() {
  yield all([fork(appWatcher)]);
  yield all([fork(loginWatcher)]);
  yield all([fork(videoWatcher)]);
  yield all([fork(userWatcher)]);
  yield all([fork(restaurantWatcher)]);
}
