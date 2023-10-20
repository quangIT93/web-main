// import React from 'react'
// import Feed from '.'

import MainLayout from 'layouts/main';
import CandidateDetail from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: '/candidate-detail',
  component: (
    <MainLayout>
      <CandidateDetail />
    </MainLayout>
  ),
};

export default route;
