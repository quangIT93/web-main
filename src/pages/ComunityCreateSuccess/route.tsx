import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const ComunityCreateSuccess = lazy(() => import('.'));
const route: RouteProps = {
  path: '/comunity-create-success-content',
  component: (
    <MainLayout>
      <ComunityCreateSuccess />
    </MainLayout>
  ),
};

export default route;
