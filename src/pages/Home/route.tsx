import React, { lazy } from 'react'
import Home from '.'
import RouteProps from '../routes'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: RouteProps = {
  path: '/home',
  // componenet: <Home />,
  component: <Home />,
}

export default route
