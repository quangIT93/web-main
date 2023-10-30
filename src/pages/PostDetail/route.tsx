// import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
import { lazy } from 'react';
const Detail = lazy(() => import('.'));
const route: RouteProps = {
  path: '/post-detail',
  component: (
    <MainLayout>
      <Detail />
    </MainLayout>
  ),
};

export default route;
