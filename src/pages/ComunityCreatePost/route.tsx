import React, { lazy } from 'react';
import RouteProps from '../routes';
import MainLayout from 'layouts/MainLayout';
const ComunityCreatePost = lazy(() => import('.'));
const route: RouteProps = {
  path: '/comunity_create_post',
  component: (
    <MainLayout>
      <ComunityCreatePost />
    </MainLayout>
  ),
};

export default route;
