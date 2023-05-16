import React, { lazy } from 'react'
import Home from '.'
import RouteProps from '../../../pages/routes'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: RouteProps = {
  path: '/x',
  // componenet: <Home />,
  component: <Home />,
}

// export default 1
export default route
