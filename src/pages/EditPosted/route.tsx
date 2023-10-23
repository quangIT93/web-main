// import React from 'react'
// import Feed from '.';

import MainLayout from 'layouts/MainLayout';
import EditPosted from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: '/edit-posted',
  component: (
    <MainLayout>
      <EditPosted />
    </MainLayout>
  ),
};

export default route;
