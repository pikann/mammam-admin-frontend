import {combineReducers} from 'redux';

import appReducer from '../store/reducers';
import loginReducer from '../screens/Login/store/reducers';

const rootReducer = combineReducers({
  appReducer,
  loginReducer,
});
export default rootReducer;
