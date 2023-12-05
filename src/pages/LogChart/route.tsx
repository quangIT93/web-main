import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const LogChart = lazy(() => import('.'));
const route: RouteProps = {
  path: '/chart',
  component: (
    <MainLayout>
      <LogChart />
    </MainLayout>
  ),
};

export default route;
