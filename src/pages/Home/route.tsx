import React, { lazy } from 'react'
import Home from '.'
import RouteProps from '../routes'

import HomeValueContextProvider from 'context/HomeValueContextProvider'

const route: RouteProps = {
  path: '/home',
  component: <Home />,
}

export default route
