import React, { lazy } from 'react';
import RouteProps from '../routes';
import MainLayout from 'layouts/MainLayout';
const LogChart = lazy(() => import('.'));
const route: RouteProps = {
  path: 'profile-chart',
  component: (
    <MainLayout>
      <LogChart />
    </MainLayout>
  ),
};

export default route;
