import React, { lazy } from 'react'
import Message from '.'
import RouteProps from '../routes'

import ChatContextProvider from 'context/ChatContextProvider'
const route: RouteProps = {
  path: 'message',
  component: (
    <ChatContextProvider>
      <Message />
    </ChatContextProvider>
  ),
}

export default route
