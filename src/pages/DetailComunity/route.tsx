import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const DetailComunity = lazy(() => import('.'));
const route: RouteProps = {
  path: '/detail-comunity',
  component: (
    <MainLayout>
      <DetailComunity />
    </MainLayout>
  ),
};

export default route;
