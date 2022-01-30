import HomeLayout from '../components/HomeLayout';
import DashboardScreen from '../screens/Dashboard';
import { AuthenticatedRoute } from './components';

const loginRoutes = [
  {
    path: '/',
    title: 'MamMam Admin Page - Dashboard',
    route: AuthenticatedRoute,
    component: DashboardScreen,
    layout: HomeLayout,
    roles: [],
    permission: [],
    exact: true,
  },
];

export default loginRoutes;