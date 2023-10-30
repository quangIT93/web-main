import React, { lazy } from 'react';
import RouteProps from '../routes';
const Landing = lazy(() => import('.'));
const route: RouteProps = {
  path: '/landing-page',
  component: <Landing />,
};

export default route;
