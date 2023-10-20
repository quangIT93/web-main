// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
import ComunityNewPost from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/new-comunity',
  component: (
    <MainLayout>
      <ComunityNewPost />
    </MainLayout>
  ),
};

export default route;
