import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const CandidatesAll = lazy(() => import('.'));
const route: RouteProps = {
  path: '/candidatesAll',
  component: (
    <MainLayout>
      <CandidatesAll />
    </MainLayout>
  ),
};

export default route;
