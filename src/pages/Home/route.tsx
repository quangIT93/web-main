// import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
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
