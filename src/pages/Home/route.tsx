import React, { lazy } from 'react'
import Home from '.'
import RouteProps from '../routes'

import HomeValueContextProvider from 'context/HomeValueContextProvider'

const route: RouteProps = {
  path: '/home',
  component: (
    <HomeValueContextProvider>
      <Home />
    </HomeValueContextProvider>
  ),
}

export default route
