import React from 'react'

// import ui antd

import { Typography } from 'antd'
import { MessageOutlined } from '@ant-design/icons'
import './style.scss'

const { Text, Title } = Typography

const HeaderMessage = () => {
  return (
    <>
      <div className="header-message_left">
        <MessageOutlined className="icon-message" />
      </div>

      <div className="header-message_right">
        <Title level={3} className="header-message_Title">
          HiJob Hộp thoại
        </Title>
        <Text className="header-message_text">Tin nhắn</Text>
      </div>
    </>
  )
}

export default HeaderMessage
