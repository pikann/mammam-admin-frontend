import LoginScreen from '../screens/Login';
import { AuthenticateRoute } from './components';

const loginRoutes = [
  {
    path: '/login',
    title: 'MamMam Admin Page - Login',
    route: AuthenticateRoute,
    component: LoginScreen,
    roles: [],
    permission: [],
    exact: true,
  },
];

export default loginRoutes;