// import React, { lazy } from 'react'
import MainLayout from 'layouts/MainLayout';
import History from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: 'history',
  component: (
    <MainLayout>
      <History />
    </MainLayout>
  ),
};

export default route;
