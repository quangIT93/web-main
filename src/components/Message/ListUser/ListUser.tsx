import React, { useEffect, useState, useContext } from 'react'

import { useSearchParams } from 'react-router-dom'

import { AudioOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'

import messageApi from 'api/messageApi'
import historyRecruiter from 'api/historyRecruiter'

import { listUser, listMessage, countUnRead } from './data'
import './style.scss'
import { ChatContext } from 'context/ChatContextProvider'

import { SeenIcon } from '#components/Icons'

const { Search } = Input
const ListUserChat = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [listUserChat, setStateUserChat] = useState<any>([])
  const {
    setUserInfoChat,
    setReceivedMessages,
    setSendMessages,
    userInfoChat,
    sendMessages,
    receivedMessages,
  } = useContext(ChatContext)

  console.log('sendMessages', sendMessages)
  console.log('receivedMessages', receivedMessages)

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
  }, [sendMessages, receivedMessages])

  const getApplicationByIdAndPost = async () => {
    try {
      const result = await historyRecruiter.GetAJobApplication(
        Number(searchParams.get('post_id')),
        searchParams.get('application_id') ?? ''
      )

      if (result.data) {
        setUserInfoChat({
          user_id: result.data.applicationProfile.account_id,
          name: result.data.applicationProfile.name,
          avatar: result.data.applicationProfile.avatar,
          isOnline: null,
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getApplicationByIdAndPost()
  }, [searchParams.get('post_id'), searchParams.get('user_id')])

  const handleClickUserInfo = (user: any) => {
    console.log('click', user)
    setSearchParams({ post_id: user.post_id, user_id: user.user_id })
    getAllUserChat()
    setReceivedMessages([
      {
        receiverId: userInfoChat.user_id,
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(searchParams.get('post_id')),
      },
    ])
    setSendMessages([
      {
        receiverId: userInfoChat.user_id,
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(searchParams.get('post_id')),
      },
    ])
  }

  useEffect(() => {
    listUserChat.map((userChat: any) => {
      if (userChat.user_id === searchParams.get('user_id')) {
        setUserInfoChat({
          user_id: userChat.user_id,
          name: userChat.name,
          avatar: userChat.avatar,
          isOnline: null,
        })
      }
      return null
    })
  }, [searchParams.get('user_id'), listUserChat])

  console.log('tin nhan duoc nhan', receivedMessages)
  console.log('tin nhan da gui', sendMessages)
  const onSearch = (value: string) => console.log(value)
  return (
    <>
      <div className="list_userChat">
        <div className="header-list_userChat">
          <h4 className="title-header_listUserChat">Tin nhắn</h4>
          <div className="header-listSearch_userChat">
            {/* <Search
              className="searh-user_chat"
              placeholder="input search text"
              onSearch={onSearch}
            /> */}
            {/* <div className="edit-setting_icon">
            <EditOutlined />
            <SettingOutlined />
          </div> */}
          </div>
        </div>

        <div className="list-infoUser">
          {listUserChat.map((user: any, index: number) => (
            <div
              className={`wrap-userInfo ${
                userInfoChat.user_id === user.user_id ? 'readed-message' : ''
              } `}
              key={index}
              onClick={() => handleClickUserInfo(user)}
            >
              <div className="wrap-avatar_userChat">
                <img src={user.avatar} alt="" />
                <span
                  className={`user-online ${
                    user.is_online ? 'user-online_true' : ''
                  }`}
                ></span>
              </div>
              <div className="info-user_chat">
                <h4>{user.name}</h4>
                <h5>{user.post_title}</h5>
                <p>{user.message}</p>
              </div>
              <div className="info-chat_icon">
                <small>{new Date(user.created_at).toLocaleString()}</small>
                {user.status === 1 ? (
                  <span className="count-message_readed">
                    <SeenIcon />
                  </span>
                ) : (
                  <span className="count-message_receive"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ListUserChat
