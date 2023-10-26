import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
// import Profile from '.';
import RouteProps from '../routes';
const Profile = lazy(() => import('.'));
const route: RouteProps = {
  path: '/profile',
  component: (
    <MainLayout>
      <Profile />
    </MainLayout>
  ),
};

export default route;
