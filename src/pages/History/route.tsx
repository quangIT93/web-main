import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const History = lazy(() => import('.'));
const route: RouteProps = {
  path: 'history',
  component: (
    <MainLayout>
      <History />
    </MainLayout>
  ),
};

export default route;
