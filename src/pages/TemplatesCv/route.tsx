import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const TemplatesCv = lazy(() => import('.'));
const route: RouteProps = {
  path: '/templates-cv',
  component: (
    <MainLayout>
      <TemplatesCv />
    </MainLayout>
  ),
};

export default route;
