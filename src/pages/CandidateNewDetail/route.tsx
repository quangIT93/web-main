// import React from 'react'
// import Feed from '.'
import { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
// import CandidateNewDetail from '.';
import RouteProps from '../routes';
const CandidateNewDetail = lazy(() => import('.'));
const route: RouteProps = {
  path: '/candidate-new-detail',
  component: (
    <MainLayout>
      <CandidateNewDetail />
    </MainLayout>
  ),
};

export default route;
