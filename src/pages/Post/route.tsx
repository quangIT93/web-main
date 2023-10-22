// import React, { lazy } from 'react'
import Post from '.';
import { ToastContainer } from 'react-toastify';

import RouteProps from '../routes';
import MainLayout from 'layouts/main';
const route: RouteProps = {
  path: '/post',
  component: (
    <>
      <MainLayout>
        <Post />
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
