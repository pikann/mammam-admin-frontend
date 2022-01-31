import {combineReducers} from 'redux';

import appReducer from '../store/reducers';
import loginReducer from '../screens/Login/store/reducers';
import videoReducer from '../screens/Video/store/reducers';
import userReducer from '../screens/User/store/reducers';

const rootReducer = combineReducers({
  appReducer,
  loginReducer,
  videoReducer,
  userReducer,
});
export default rootReducer;
