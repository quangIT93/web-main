import React from 'react'

// import component
import ListChat from '#components/Message/ListChat/ListChat'
import ListUserChat from '#components/Message/ListUser/ListUser'
import HeaderMessage from '#components/Message/HeaderMessage'
// @ts-ignore
import Navbar from '#components/Navbar'
import Footer from '#components/Footer'
// import ui antd
import { Typography } from 'antd'

import './style.scss'

const { Text } = Typography

const Message = () => {
  return (
    <div className="message-page">
      <Navbar />
      <div className="message-page_main">
        {/* <div className="header-message">
          <HeaderMessage />
        </div> */}
        <div className="wrap-content_message">
          <div className="message-page_left">
            <ListUserChat />
          </div>

          <div className="message-page_right">
            <ListChat />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Message
