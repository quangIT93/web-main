// import React, { lazy } from 'react';
import MainLayout from 'layouts/main';
import Detail from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/post-detail',
  component: (
    <MainLayout>
      <Detail />
    </MainLayout>
  ),
};

export default route;
