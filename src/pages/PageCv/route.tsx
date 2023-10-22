// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
import PageCv from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: 'page-cv',
  component: (
    <MainLayout>
      <PageCv />
    </MainLayout>
  ),
};

export default route;
