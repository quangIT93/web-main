import React, { useEffect, useState, useContext, useRef } from 'react'

import { Input } from 'antd'

import io from 'socket.io-client'

// import api
import messageApi from 'api/messageApi'
import profileApi from 'api/profileApi'

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

  const [allListChat, setAllListChat] = useState<any>([])
  const [profileUser, setProfileUser] = useState<any>({})
  const [image, setImage] = useState<File | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  // const [previousDate, setPreviousDate] = useState<string | null>(null)

  const { userInfoChat, setSendMessages, sendMessages } =
    useContext(ChatContext)

  let socket = useRef<any>()
  const listRef = useRef<HTMLDivElement>(null)
  const imageInputRef = useRef<any>(null)

  const previousDate = useRef<string | null>(null)

  useEffect(() => {
    socket.current = io('https://181f-14-161-42-152.ngrok-free.app/', {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }, [])

  const getAllListChat = async () => {
    try {
      const result = await messageApi.getChatMessage(
        userInfoChat.user_id,
        // 36353,
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

  const getProfileUser = async () => {
    try {
      const result = await profileApi.getProfile()
      if (result) {
        setProfileUser(result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getProfileUser()
  }, [])

  useEffect(() => {
    try {
      console.log('socketcurrent', socket.current)
      // kết nối web socket
      socket.current.on('connect', () => {
        console.log('::: Socket connected')
        setIsConnected(true)
      })

      // ngắt kết nối websocket
      socket.current.on('disconnect', (reason: any) => {
        console.log('::: Socket disconnected: ', reason)
        setIsConnected(false)
      })

      // gửi in nhắn
      // socket.current.on('client-send-message', (data: Message) => {
      //   console.log('data', data)
      //   setReceivedMessages((prevMessages: Message[]) => [
      //     ...prevMessages,
      //     data,
      //   ])
      // })

      socket.current.on('server-send-message-to-receiver', (data: any) => {
        console.log(' gui tin nhan di den nguoi nhan', data)
        // gui tin nhan di den nguoi nhan
        setReceivedMessages((prevReceive: any[]) => [...prevReceive, data])
      })

      socket.current.on('server-send-message-was-sent', (data: any) => {
        console.log('nhận tin nhan ve khi da gui xong', data)
        // nhận tin nhan ve khi da gui xong
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

  // console.log('receive', receivedMessages)
  // console.log('send', sendMessages)
  console.log('allListChat', allListChat)
  console.log('userInfoChat', userInfoChat)

  // message function
  const handleSendMessage = () => {
    // const socket = io('https://aiworks.vn')
    if (message !== '')
      socket.current.emit('client-send-message', {
        receiverId: userInfoChat.user_id,
        message: message,
        createdAt: Date.now(),
        type: 'text',
        postId: 23894,
        // postId: 36353,
      })

    setMessage('')
  }

  // enter sent message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  //
  const handleImageSelect = () => {
    // Mở hộp thoại chọn hình ảnh khi nhấn vào nút "ImageIcon"
    if (imageInputRef) imageInputRef.current?.click()
  }

  const handleImageUpload = (e: any) => {
    const selectedImage = e.target.files[0]
    console.log('file', selectedImage)

    if (selectedImage) {
      const formData = new FormData()
      formData.append('files', selectedImage)
      socket.current.emit('client-send-message', {
        receiverId: userInfoChat.user_id,
        files: [formData],
        createdAt: Date.now(),
        type: 'image',
        postId: 23894,
      })
    }
    setImage(selectedImage)
    // Thực hiện việc tải lên hình ảnh
    // ...
  }

  // Khi dữ liệu allListChat được cập nhật, cuộn xuống cuối cùng
  useEffect(() => {
    if (listRef.current) {
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight
        }
      }, 100)
    }
  }, [allListChat])
  console.log('render message')
  console.log('render date', new Date().toLocaleDateString())
  if (userInfoChat.length !== 0) {
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
            {/* <span>
            <VideoIcon />
          </span>
          <span>
            <CallIcon />
          </span> */}
            <span>
              <DotIcon />
            </span>
          </div>
        </div>
        <div className="list-content_chat" ref={listRef}>
          {allListChat.map((chat: any, index: number) => {
            const chatDate = new Date(chat.created_at).toLocaleDateString()
            let showDate = false

            if (previousDate.current !== chatDate) {
              previousDate.current = chatDate
              showDate = true
            }

            if (localStorage.getItem('accountId') === chat.sender_id) {
              return (
                <div className="content-chat" key={index}>
                  {/* <img
                  src={profileUser.avatar}
                  alt=""
                  className="content-chat_img"
                /> */}
                  {showDate && (
                    <div className="wrap-date_chat">
                      <hr className="horizontal-line"></hr>
                      <span className="date-chat">
                        {chatDate === new Date().toLocaleDateString()
                          ? 'Hôm nay'
                          : chatDate}
                      </span>
                      <hr className="horizontal-line"></hr>
                    </div>
                  )}
                  <div className="wrap-text_chat">
                    <span
                      className={`text-chat ${
                        chat.message === null || chat.message === ''
                          ? 'text-chat_hidden'
                          : ''
                      }`}
                    >
                      {chat.message !== '' || chat.message !== null
                        ? chat.message
                        : null}
                    </span>

                    <img
                      src={chat.image !== null ? chat.image : null}
                      alt={chat.image}
                    />
                    <small>
                      {new Date(chat.created_at).getHours()}:
                      {new Date(chat.created_at).getMinutes()}
                    </small>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="content-chat2" key={index}>
                  {/* <img
                  src={userInfoChat.avatar}
                  alt=""
                  className="content-chat_img2"
                /> */}

                  {showDate && (
                    <div className="wrap-date_chat">
                      <hr className="horizontal-line"></hr>
                      <span className="date-chat">
                        {chatDate === new Date().toLocaleDateString()
                          ? 'Hôm nay'
                          : chatDate}
                      </span>
                      <hr className="horizontal-line"></hr>
                    </div>
                  )}
                  <div className="wrap-text_chat2">
                    <span
                      className={`text-chat ${
                        chat.message === '' || chat.message === null
                          ? 'text-chat_hidden'
                          : ''
                      }`}
                    >
                      {chat.message !== '' || chat.message !== null
                        ? chat.message
                        : null}
                    </span>
                    <small>
                      {new Date(chat.created_at).getHours()}:
                      {new Date(chat.created_at).getMinutes()}
                    </small>
                  </div>
                </div>
              )
            }
          })}
        </div>

        <div className="inputs-chat">
          <Input
            placeholder="Nhập đoạn chat của bạn"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageUpload}
            // multiple
            style={{ display: 'none' }}
          />
          <span className="input-chatIcon">
            <LocationIcon />
          </span>
          <span className="input-chatIcon" onClick={handleImageSelect}>
            <ImageIcon />
          </span>
          <span className="input-chatIcon" onClick={handleSendMessage}>
            <SendIcon />
          </span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="list-chat">
        <div className="wrap-img_chat">
          <img src="./images/imageChatBegin.png" alt="" />
          <div>Chat giúp bạn thêm nhiều thông tin hiệu quả, nhanh chóng</div>
        </div>
      </div>
    )
  }
}

export default ListChat
