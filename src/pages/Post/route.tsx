import React, { lazy } from 'react'
import Post from '.'
import { ToastContainer } from 'react-toastify'

import RouteProps from '../routes'
const route: RouteProps = {
  path: '/post',
  component: (
    <>
      <Post />
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
}

export default route
