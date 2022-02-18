import HomeLayout from '../components/HomeLayout';
import DashboardScreen from '../screens/Dashboard';
import UserScreen from '../screens/User';
import VideoScreen from '../screens/Video';
import RestaurantScreen from '../screens/Restaurant';
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
  {
    path: '/user',
    title: 'MamMam Admin Page - User',
    route: AuthenticatedRoute,
    component: UserScreen,
    layout: HomeLayout,
    roles: [],
    permission: [],
    exact: true,
  },
  {
    path: '/video',
    title: 'MamMam Admin Page - Video',
    route: AuthenticatedRoute,
    component: VideoScreen,
    layout: HomeLayout,
    roles: [],
    permission: [],
    exact: true,
  },
  {
    path: '/restaurant',
    title: 'MamMam Admin Page - Restaurant',
    route: AuthenticatedRoute,
    component: RestaurantScreen,
    layout: HomeLayout,
    roles: [],
    permission: [],
    exact: true,
  },
];

export default loginRoutes;