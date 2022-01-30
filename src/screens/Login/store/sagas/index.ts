import {call, put, takeLatest} from 'redux-saga/effects';

import * as LoginAction from '../actions';
import * as AppAction from '../../../../store/actions';
import {loginService} from '../services';
import CookieHandlerInstance from '../../../../utils/cookie';
import CookieFields from '../../../../constants/CookieFields';
import AxiosClientInstance from '../../../../utils/axios';

interface Data {
  [key: string]: any;
}

function* loginSaga({payload}: any) {
  try {
    yield put({
      type: LoginAction.Types.LOADING.begin,
    });
    const response: Data = yield call(loginService, payload);

    if (response.data.role === 'admin') {
      yield CookieHandlerInstance.setCookie(CookieFields.AccessToken, response.data.access_token, response.data.access_token_exp_time / 60);
      yield CookieHandlerInstance.setCookie(CookieFields.RefreshToken, response.data.refresh_token, response.data.refresh_token_exp_time / 60);
      
      yield AxiosClientInstance.setHeader(response.data.access_token);
    } else {
      throw Error('User is not admin!');
    }

    yield put({
      type: AppAction.Types.CHECK_LOGIN.begin,
    });
    
    yield put({
      type: LoginAction.Types.LOADING.succeeded,
    });
    yield put({
      type: LoginAction.Types.LOGIN.succeeded,
    });
  } catch (error) {
    yield put({
      type: LoginAction.Types.LOADING.succeeded,
    });
    yield put({
      type: LoginAction.Types.LOGIN.failed,
      payload: error,
    });
  }
}

export default function* loginWatcher() {
  yield takeLatest(LoginAction.Types.LOGIN.begin, loginSaga);
}
