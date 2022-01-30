import {createAction} from 'redux-actions';

export const createActionGenerator = (input: any) => {
  return {
    request: createAction(input.begin),
    success: createAction(input.succeeded),
    fail: createAction(input.failed),
  };
};
