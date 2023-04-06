import React from 'react'
import Feed from '.'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: Props = {
  path: '/feed',
  componenet: <Feed />,
}

export default route
