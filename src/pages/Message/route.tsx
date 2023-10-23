// import React, { lazy } from 'react'
import MainLayout from 'layouts/MainLayout';
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
