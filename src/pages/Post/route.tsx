// import React, { lazy } from 'react'
import { ToastContainer } from 'react-toastify';

import RouteProps from '../routes';
import MainLayout from 'layouts/MainLayout';
import PostProtect from './CheckPost';
import { lazy } from 'react';
const Post = lazy(() => import('.'));
const route: RouteProps = {
  path: '/post',
  component: (
    <>
      <MainLayout>
        <PostProtect>
          <Post />
        </PostProtect>
      </MainLayout>
      <ToastContainer
        style={{
          position: 'absolute',
          display: 'flex',
          width: '40px',
        }}
        position="bottom-center"
        theme="colored"
        autoClose={3}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </>
  ),
};

export default route;
