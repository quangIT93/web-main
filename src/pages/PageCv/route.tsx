import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const PageCv = lazy(() => import('.'));
const route: RouteProps = {
  path: 'page-cv',
  component: (
    <MainLayout>
      <PageCv />
    </MainLayout>
  ),
};

export default route;
