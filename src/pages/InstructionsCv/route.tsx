import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import RouteProps from '../routes';
const InstructionsCv = lazy(() => import('.'));
// import HomeValueContextProvider from 'context/HomeValueContextProvider';

const route: RouteProps = {
  path: '/intructionsCv',
  component: (
    <MainLayout>
      <InstructionsCv />
    </MainLayout>
  ),
};

export default route;
