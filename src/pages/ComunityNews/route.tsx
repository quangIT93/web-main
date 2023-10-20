// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
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
