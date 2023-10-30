import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const MoreJobsPage = lazy(() => import('.'));
const route: RouteProps = {
  path: '/more-jobs',
  component: (
    <MainLayout>
      <MoreJobsPage />
    </MainLayout>
  ),
};

export default route;
