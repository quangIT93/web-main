import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const EditPosted = lazy(() => import('.'));
const route: RouteProps = {
  path: '/edit-posted',
  component: (
    <MainLayout>
      <EditPosted />
    </MainLayout>
  ),
};

export default route;
