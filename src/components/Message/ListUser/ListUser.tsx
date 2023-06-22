import React from 'react'
import { AudioOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import './style.scss'
const { Search } = Input
const ListUserChat = () => {
  const onSearch = (value: string) => console.log(value)

  return (
    <>
      <div className="header-list_userChat">
        <h4 className="title-header_listUserChat">Tin nhắn</h4>
        <div className="header-listSearch_userChat">
          <Search
            className="searh-user_chat"
            placeholder="input search text"
            onSearch={onSearch}
          />
          <div className="edit-setting_icon">
            <EditOutlined />
            <SettingOutlined />
          </div>
        </div>
      </div>
    </>
  )
}

export default ListUserChat
