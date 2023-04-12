import React, { lazy } from 'react'
import Landing from '.'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: Props = {
  path: '/',
  componenet: <Landing />,
}

export default route
