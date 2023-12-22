import React, { lazy } from 'react';
import RouteProps from '../routes';
import MainLayout from 'layouts/MainLayout';
const Login = lazy(() => import('.'));
const route: RouteProps = {
  path: 'test',
  component: (
    <MainLayout>
      <Login />
    </MainLayout>
  ),
};

export default route;
