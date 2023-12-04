import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const Google = lazy(() => import('.'));
const route: RouteProps = {
  path: 'google',
  component: (
    <MainLayout>
      <Google />
    </MainLayout>
  ),
};

export default route;
