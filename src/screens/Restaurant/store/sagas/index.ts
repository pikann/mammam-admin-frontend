import {call, put, takeLatest} from 'redux-saga/effects';

import * as RestaurantAction from '../actions';
import { deleteRestaurantService, searchRestaurantService } from '../services';

interface Data {
  [key: string]: any;
}

function* getRestaurantsSaga({payload}: any) {
  try {
    yield put({
      type: RestaurantAction.Types.LOADING.begin,
    });

    const response: Data = yield call(searchRestaurantService, payload);

    yield put({
      type: RestaurantAction.Types.LOADING.succeeded,
    });

    yield put({
      type: RestaurantAction.Types.GET_RESTAURANTS.succeeded,
      payload: {
        restaurants: response.data.data,
        totalPage: response.data.totalPage,
      },
    });
  } catch (error) {
    yield put({
      type: RestaurantAction.Types.LOADING.succeeded,
    });

    yield put({
      type: RestaurantAction.Types.GET_RESTAURANTS.failed,
      payload,
      error,
    });
  }
}

function* deleteRestaurantSaga({payload}: any) {
  try {
    yield call(deleteRestaurantService, payload);

    yield put({
      type: RestaurantAction.Types.DELETE_RESTAURANT.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: RestaurantAction.Types.DELETE_RESTAURANT.failed,
      payload,
      error,
    });
  }
}

export default function* restaurantWatcher() {
  yield takeLatest(RestaurantAction.Types.GET_RESTAURANTS.begin, getRestaurantsSaga);
  yield takeLatest(RestaurantAction.Types.DELETE_RESTAURANT.begin, deleteRestaurantSaga);
}
