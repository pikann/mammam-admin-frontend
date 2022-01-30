import {isEmpty} from 'lodash';
import toast from 'toastr';

import {logout, refreshToken, Types} from '../actions';

let previousActions: any = [];
const apiMiddleWare = (store: any) => (next: any) => async (action: any) => {
  const {type: actionType, payload: payloadAction} = action;

  if (actionType.indexOf('_FAILED') > 0) {
    if (payloadAction.response) {
      console.log('FAILED', actionType, payloadAction.response.data);
      const statusCode = payloadAction.response.data.statusCode;

      if (+statusCode === 401 && !actionType.startsWith('LOGIN')) {
        previousActions.push(action);
        if (!actionType.includes('REFRESH_TOKEN')) {
          store.dispatch(refreshToken.request());
        } else {
          store.dispatch(logout.request());
        }
      } else {
        const message = JSON.stringify(payloadAction.response.data.message);
        !isEmpty(message) && toast.error(message);
      }
    } else {
      !isEmpty(payloadAction.message) && toast.error(payloadAction.message);
    }
  }
  if (
    actionType === Types.REFRESH_TOKEN.succeeded &&
    !isEmpty(previousActions)
  ) {
    previousActions.forEach((previousAction: any) => {
      store.dispatch({
        type: previousAction.type.replace('_FAILED', '_BEGIN'),
        payload: previousAction.payloadAction,
      });
    });
    previousActions = [];
  }

  next(action);
};

export default apiMiddleWare;
