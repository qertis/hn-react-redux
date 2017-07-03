import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import ListRoute from './List';

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    ListRoute(store)
  ]
});

export default createRoutes;
