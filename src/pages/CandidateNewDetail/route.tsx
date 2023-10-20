// import React from 'react'
// import Feed from '.'

import MainLayout from 'layouts/main';
import CandidateNewDetail from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: '/candidate-new-detail',
  component: (
    <MainLayout>
      <CandidateNewDetail />
    </MainLayout>
  ),
};

export default route;
