// import React, { lazy } from 'react';
import MainLayout from 'layouts/main';
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
