// import React, { lazy } from 'react'
import MainLayout from 'layouts/MainLayout';
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
