import React from 'react';
import ComunityCreatePost from '.';
import RouteProps from '../routes';
import MainLayout from 'layouts/MainLayout';
const route: RouteProps = {
  path: '/comunity_create_post',
  component: (
    <MainLayout>
      <ComunityCreatePost />
    </MainLayout>
  ),
};

export default route;
