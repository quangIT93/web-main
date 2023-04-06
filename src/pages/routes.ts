import React from 'react'

interface Props {
  path: string
  component: React.ReactElement
}

let routes: Props[] = []
const context = require.context('.', true, /route.tsx$/)
context.keys().forEach((path: string) => {
  routes.push(context(`${path}`).default)
})

export default routes
