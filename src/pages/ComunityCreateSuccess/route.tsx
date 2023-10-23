// import React, { lazy } from 'react'
import MainLayout from 'layouts/MainLayout';
import ComunityCreateSuccess from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/comunity-create-success-content',
  component: (
    <MainLayout>
      <ComunityCreateSuccess />
    </MainLayout>
  ),
};

export default route;
