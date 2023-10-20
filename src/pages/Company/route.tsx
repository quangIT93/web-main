// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
import Company from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/company-infor',
  component: (
    <MainLayout>
      <Company display={'block'} is_profile={false} />
    </MainLayout>
  ),
};

export default route;
