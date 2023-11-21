import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
// const PageCv = lazy(() => import('.'));
const NewPageCV = lazy(() => import('./NewPageCV'));
const route: RouteProps = {
  path: 'page-cv',
  component: <NewPageCV />
  // (
  //   <MainLayout>
  //     <NewPageCV />
  //   </MainLayout>
  // ),
};

export default route;
