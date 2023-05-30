import React, { lazy } from 'react'
import HistoryPost from '.'
import RouteProps from '../routes'
// import { RouteComponentProps } from 'react-router-dom'
// import { RouteProps } from 'react-router-dom'

// const route: RouteProps = {
//   path: '/home',
//   component: <Home />,
// }

const route: RouteProps = {
  path: '/home',
  component: <HistoryPost />,
}

export default route
