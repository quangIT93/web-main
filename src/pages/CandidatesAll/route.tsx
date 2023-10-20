// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
import CandidatesAll from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/candidatesAll',
  component: (
    <MainLayout>
      <CandidatesAll />
    </MainLayout>
  ),
};

export default route;
