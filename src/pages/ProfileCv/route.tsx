import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const ProfliCv = lazy(() => import('.'));
const route: RouteProps = {
  path: '/profile-cv',
  component: (
    <MainLayout>
      <ProfliCv />
    </MainLayout>
  ),
};

export default route;
