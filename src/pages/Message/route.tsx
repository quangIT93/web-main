import React, { lazy } from 'react';
import RouteProps from '../routes';
const Message = lazy(() => import('.'));
const route: RouteProps = {
  path: 'message',
  component: <Message />,
};

export default route;
