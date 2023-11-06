import React, { lazy } from 'react';
import RouteProps from '../routes';
const Policy = lazy(() => import('.'));
const route: RouteProps = {
  path: '/policy',
  component: <Policy />,
};

export default route;
