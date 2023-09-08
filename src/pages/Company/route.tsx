// import React, { lazy } from 'react'
import Company from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/company-infor',
  component: <Company display={'block'} is_profile={false} />,
};

export default route;
