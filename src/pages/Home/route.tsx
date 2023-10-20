// import React, { lazy } from 'react';
import MainLayout from 'layouts/main';
import Home from '.';
import RouteProps from '../routes';

// import HomeValueContextProvider from 'context/HomeValueContextProvider';

const route: RouteProps = {
  path: '/',
  component: (
    <MainLayout>
      <Home />
    </MainLayout>
  ),
};

export default route;
