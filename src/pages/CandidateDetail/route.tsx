// import React from 'react'
// import Feed from '.'
import { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
// import CandidateDetail from '.';
import RouteProps from '../routes';
const CandidateDetail = lazy(() => import('.'));
const route: RouteProps = {
  path: '/candidate-detail',
  component: (
    <MainLayout>
      <CandidateDetail />
    </MainLayout>
  ),
};

export default route;
