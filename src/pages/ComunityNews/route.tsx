import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const ComunityNews = lazy(() => import('.'));
const route: RouteProps = {
  path: '/news-comunity',
  component: (
    <MainLayout>
      <ComunityNews />
    </MainLayout>
  ),
};

export default route;
