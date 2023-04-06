import React, { lazy } from 'react'
import Home from '.'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: Props = {
  path: '/',
  componenet: <Home />,
}

export default route
