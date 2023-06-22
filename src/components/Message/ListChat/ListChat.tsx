import React, { useEffect, useState, useContext } from 'react'

import { Input } from 'antd'

import io from 'socket.io-client'

// import api
import messageApi from 'api/messageApi'

// import icon
import {
  DotIcon,
  VideoIcon,
  CallIcon,
  LocationIcon,
  ImageIcon,
  SendIcon,
} from '#components/Icons'

import './style.scss'

import { ChatContext } from 'context/ChatContextProvider'

interface Message {
  receiverId: string
  message: string
  // createdAt: number
  type: string
  postId: number
}
const ListChat = () => {
  const [message, setMessage] = useState('')
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
  const [sendMessages, setSendMessages] = useState<Message[]>([])
  const [allListChat, setAllListChat] = useState<any>([])

  const [isConnected, setIsConnected] = useState(false)

  const { userInfoChat } = useContext(ChatContext)

  let socket = React.useRef<any>()

  useEffect(() => {
    socket.current = io('https://aiworks.vn', {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }, [])

  const getAllListChat = async () => {
    try {
      const result = await messageApi.getChatMessage(
        userInfoChat.user_id,
        23894
      )
      if (result) {
        setAllListChat(result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getAllListChat()
  }, [receivedMessages, sendMessages, userInfoChat])

  useEffect(() => {
    try {
      console.log('socketcurrent', socket.current)
      // kết nối web socket
      // socket.current.on('connect', () => {
      //   console.log('::: Socket connected')
      //   setIsConnected(true)
      // })

      // socket.current.on('disconnect', (reason: any) => {
      //   console.log('::: Socket disconnected: ', reason)
      //   setIsConnected(false)
      // })

      // gửi in nhắn
      // socket.current.on('client-send-message', (data: Message) => {
      //   console.log('data', data)
      //   setReceivedMessages((prevMessages: Message[]) => [
      //     ...prevMessages,
      //     data,
      //   ])
      // })

      socket.current.on('server-send-message-to-receiver', (data: any) => {
        console.log('dataaaaa', data)
        setReceivedMessages((prevReceive: any[]) => [...prevReceive, data])
      })

      socket.current.on('server-send-message-was-sent', (data: any) => {
        console.log('data', data)
        // nhaanj tin nhan ve khi
        setSendMessages((prevSend: any[]) => [...prevSend, data])
      })

      // socket.current.on('server-send-error-message', (data: any) => {
      //   console.log('data', data)
      // })

      // return () => {
      //   socket.current.disconnect() // Clean up the socket connection on component unmount
      // }
    } catch (error) {
      console.log('eror', error)
    }
  }, [])

  console.log('receive', receivedMessages)
  console.log('send', sendMessages)
  console.log('allListChat', allListChat)
  console.log('userInfoChat', userInfoChat)

  const handleSendMessage = () => {
    // const socket = io('https://aiworks.vn')
    socket.current.emit('client-send-message', {
      receiverId: userInfoChat.user_id,
      message: message,
      createdAt: 1685870032000,
      type: 'text',
      postId: 23894,
    })
    setMessage('')
  }

  return (
    <div className="list-chat">
      <div className="header-list_chat">
        <div className="wrap-img_chat">
          <img src={userInfoChat.avatar} alt="" />
          <div className="wrap-infoUser_chat">
            <h4>{userInfoChat.name}</h4>
            <span>Đang hoạt động</span>
          </div>
        </div>
        <div className="wrap-icon_chat">
          <span>
            <VideoIcon />
          </span>
          <span>
            <CallIcon />
          </span>
          <span>
            <DotIcon />
          </span>
        </div>
      </div>
      <div className="list-content_chat">
        {allListChat.map((chat: any) => (
          <div className="content-chat">
            {/* <img
              src={userInfoChat.avatar}
              alt=""
              className="content-chat_img"
            /> */}
            <span>{chat.message}</span>
          </div>
        ))}
      </div>

      <div className="inputs-chat">
        <Input
          placeholder="Nhập đoạn chat của bạn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span className="input-chatIcon">
          <LocationIcon />
        </span>
        <span className="input-chatIcon">
          <ImageIcon />
        </span>
        <span className="input-chatIcon" onClick={handleSendMessage}>
          <SendIcon />
        </span>
      </div>
    </div>
  )
}

export default ListChat
