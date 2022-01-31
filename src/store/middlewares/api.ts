import {isEmpty} from 'lodash';
import toast from 'toastr';

import {logout, refreshToken, Types} from '../actions';

let previousActions: any = [];
const apiMiddleWare = (store: any) => (next: any) => async (action: any) => {
  const {type: actionType, error: errorAction} = action;

  if (actionType.indexOf('_FAILED') > 0) {
    if (errorAction.response) {
      console.log('FAILED', actionType, errorAction.response.data);
      const statusCode = errorAction.response.data.statusCode;

      if (+statusCode === 401 && !actionType.startsWith('LOGIN')) {
        previousActions.push(action);
        if (!actionType.includes('REFRESH_TOKEN')) {
          store.dispatch(refreshToken.request());
        } else {
          store.dispatch(logout.request());
        }
      } else {
        const message = JSON.stringify(errorAction.response.data.message);
        !isEmpty(message) && toast.error(message);
      }
    } else {
      !isEmpty(errorAction.message) && toast.error(errorAction.message);
    }
  }
  if (
    actionType === Types.REFRESH_TOKEN.succeeded &&
    !isEmpty(previousActions)
  ) {
    previousActions.forEach((previousAction: any) => {
      store.dispatch({
        type: previousAction.type.replace('_FAILED', '_BEGIN'),
        payload: previousAction.payload,
      });
    });
    previousActions = [];
  }

  next(action);
};

export default apiMiddleWare;
