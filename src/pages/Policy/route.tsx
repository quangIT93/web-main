import React from 'react'
import Policy from '.'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: Props = {
  path: '/policy',
  componenet: <Policy />,
}

export default route
