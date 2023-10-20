// import React, { lazy } from 'react'
import MainLayout from 'layouts/main';
import Message from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: 'message',
  component: (
    <MainLayout>
      <Message />
    </MainLayout>
  ),
};

export default route;
