// import React, { lazy } from 'react';
import MainLayout from 'layouts/MainLayout';
import Loading from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: '/loading',
  component: <Loading />,
};

export default route;
