// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
import Profile from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/profile',
  component: (
    <MainLayout>
      <Profile />
    </MainLayout>
  ),
};

export default route;
