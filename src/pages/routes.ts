import React from 'react'

interface RouteProps {
  path: string
  component: React.ReactElement
}

let routes: RouteProps[] = []
const context = require.context('.', true, /route.tsx$/)
context.keys().forEach((path: string) => {
  routes.push(context(`${path}`).default)
})

export { routes }
export default RouteProps;