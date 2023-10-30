import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const HotJobPage = lazy(() => import('.'));
const route: RouteProps = {
  path: '/hotjobs',
  component: (
    <MainLayout>
      <HotJobPage />
    </MainLayout>
  ),
};

export default route;
