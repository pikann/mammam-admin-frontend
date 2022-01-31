import {call, put, takeLatest} from 'redux-saga/effects';

import AxiosClientInstance from '../../utils/axios';
import * as AppActions from '../actions';
import {refreshTokenService} from '../services';
import CookieHandlerInstance from '../../utils/cookie';
import CookieFields from '../../constants/CookieFields';

interface Data {
  [key: string]: any;
}

function* checkLogin() {
  try {
    const token: string = yield CookieHandlerInstance.getCookie(CookieFields.AccessToken);

    if (token) {
      AxiosClientInstance.setHeader(token);
      
      yield put({
        type: AppActions.Types.CHECK_LOGIN.succeeded,
        payload: {
          login: true,
        },
      });
    } else {
      yield put({
        type: AppActions.Types.CHECK_LOGIN.succeeded,
        payload: {
          login: false,
        },
      });

      AxiosClientInstance.setHeader('');
    }
  } catch (error) {
    yield put({
      type: AppActions.Types.CHECK_LOGIN.failed,
      error,
    });
  }
}

function* logout() {
  try {
    yield CookieHandlerInstance.removeCookie(CookieFields.AccessToken);
    yield CookieHandlerInstance.removeCookie(CookieFields.RefreshToken);

    yield put({type: AppActions.Types.CHECK_LOGIN.begin});

    yield put({
      type: AppActions.Types.LOGOUT.succeeded,
    });
  } catch (error) {
    yield put({
      type: AppActions.Types.LOGOUT.failed,
      error,
    });
  }
}

function* refreshToken() {
  try {
    const token: string = yield CookieHandlerInstance.getCookie(CookieFields.RefreshToken);

    if (token) {
      const response: Data = yield call(refreshTokenService, token);

      yield CookieHandlerInstance.setCookie(CookieFields.AccessToken, response.data.access_token, response.data.refresh_token_exp_time / 60);
      yield CookieHandlerInstance.setCookie(CookieFields.RefreshToken, response.data.refresh_token, response.data.refresh_token_exp_time / 60);
      AxiosClientInstance.setHeader(response.data.access_token);

      yield put({type: AppActions.Types.REFRESH_TOKEN.succeeded});
    } else {
      yield put({type: AppActions.Types.LOGOUT.begin});
    }
  } catch (error) {
    yield put({
      type: AppActions.Types.REFRESH_TOKEN.failed,
      error,
    });
  }
}

export default function* appWatcher() {
  yield takeLatest(AppActions.Types.CHECK_LOGIN.begin, checkLogin);
  yield takeLatest(AppActions.Types.LOGOUT.begin, logout);
  yield takeLatest(AppActions.Types.REFRESH_TOKEN.begin, refreshToken);
}
