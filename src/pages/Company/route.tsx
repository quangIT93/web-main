import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const Company = lazy(() => import('.'));
const route: RouteProps = {
  path: '/company-infor',
  component: (
    <MainLayout>
      <Company display={'block'} is_profile={false} />
    </MainLayout>
  ),
};

export default route;
