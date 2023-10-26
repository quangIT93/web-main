// import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import InstructionsCv from '.';
import RouteProps from '../routes';

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
