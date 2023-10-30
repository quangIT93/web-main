import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const ComunityNewPost = lazy(() => import('.'));
const route: RouteProps = {
  path: '/new-comunity',
  component: (
    <MainLayout>
      <ComunityNewPost />
    </MainLayout>
  ),
};

export default route;
