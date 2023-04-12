import React, { lazy } from 'react'
import Home from '.'
import RouteProps from '../routes'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: Props = {
  path: '/home',
  componenet: <Home />,
}

export default route
