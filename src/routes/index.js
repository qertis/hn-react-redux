import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import listRoute from './List';

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    listRoute(store),
  ]
});

export default createRoutes;
