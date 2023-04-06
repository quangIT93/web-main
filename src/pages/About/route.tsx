// import React from "react";
import About from '.'

interface Props {
  path: string
  componenet: React.ReactNode
}

const route: Props = {
  path: '/about',
  componenet: <About />,
}

export default route
