import NotFoundScreen from '../screens/NotFound';
import { PublicRoute } from './components';

const notFoundRoutes = [
  {
    path: '',
    title: 'MamMam Admin Page - Not Found',
    route: PublicRoute,
    component: NotFoundScreen,
    roles: [],
    permission: [],
    exact: true,
  },
];

export default notFoundRoutes;