import React, { useEffect, useState, useContext } from 'react'
import { AudioOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'

import messageApi from 'api/messageApi'

import { listUser, listMessage, countUnRead } from './data'
import './style.scss'
import { ChatContext } from 'context/ChatContextProvider'

const { Search } = Input
const ListUserChat = () => {
  const [listUserChat, setStateUserChat] = useState<any>([])
  const { setUserInfoChat, sendMessages } = useContext(ChatContext)

  const getAllUserChat = async () => {
    try {
      const result = await messageApi.getUserChated()
      console.log('result', result)
      if (result) {
        setStateUserChat(result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getAllUserChat()
  }, [sendMessages])

  const handleClickUserInfo = (user: any) => {
    console.log('click', user)
    setUserInfoChat(user)
  }

  const onSearch = (value: string) => console.log(value)
  return (
    <>
      <div className="list_userChat">
        <div className="header-list_userChat">
          <h4 className="title-header_listUserChat">Tin nhắn</h4>
          <div className="header-listSearch_userChat">
            <Search
              className="searh-user_chat"
              placeholder="input search text"
              onSearch={onSearch}
            />
            {/* <div className="edit-setting_icon">
            <EditOutlined />
            <SettingOutlined />
          </div> */}
          </div>
        </div>

        <div className="list-infoUser">
          {listUserChat.map((user: any, index: number) => (
            <div
              className="wrap-userInfo"
              key={index}
              onClick={() => handleClickUserInfo(user)}
            >
              <div className="wrap-avatar_userChat">
                <img src={user.avatar} alt="" />
              </div>
              <div className="info-user_chat">
                <h4>{user.name}</h4>
                <h5>{user.post_title}</h5>
                <p>{user.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ListUserChat
