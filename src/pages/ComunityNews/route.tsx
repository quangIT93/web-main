// import React, { lazy } from 'react'
import MainLayout from 'layouts/MainLayout';
import ComunityNews from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/news-comunity',
  component: (
    <MainLayout>
      <ComunityNews />
    </MainLayout>
  ),
};

export default route;
