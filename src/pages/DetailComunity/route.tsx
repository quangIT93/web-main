// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
import DetailComunity from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/detail-comunity',
  component: (
    <MainLayout>
      <DetailComunity />
    </MainLayout>
  ),
};

export default route;
