import React, { useEffect, useState, useContext, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Button } from 'antd';

import io from 'socket.io-client';
import CircularProgress from '@mui/material/CircularProgress';

// import api
import messageApi from 'api/messageApi';
import profileApi from 'api/profileApi';

// import { Skeleton } from 'antd';
import Backdrop from '@mui/material/Backdrop';
// import icon
import {
  DotIcon,
  VideoIcon,
  CallIcon,
  LocationIcon,
  ImageIcon,
  SendIcon,
  CloseIcon,
} from '#components/Icons';

import './style.scss';

import { ChatContext } from 'context/ChatContextProvider';
interface Message {
  receiverId: string;
  message: string;
  // createdAt: number
  type: string;
  postId: number;
}

interface IOpenListChat {
  setOpenListChat: (params: any) => any;
  openListChat: boolean;
}

const ListChat: React.FC<IOpenListChat> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(false);

  const [message, setMessage] = useState('');

  const [allListChat, setAllListChat] = useState<any>([]);
  const [profileUser, setProfileUser] = useState<any>({});
  const [image, setImage] = useState<File | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  // const [previousDate, setPreviousDate] = useState<string | null>(null)

  const updateWindowWidth = () => {
    if (window.innerWidth <= 555) {
      setWindowWidth(true);
    } else {
      setWindowWidth(false);
    }
  };

  useEffect(() => {
    updateWindowWidth();
  }, [windowWidth]);

  const closeListChat = () => {
    props.setOpenListChat(false);
  };

  const {
    userInfoChat,
    setSendMessages,
    sendMessages,
    receivedMessages,
    setReceivedMessages,
  } = useContext(ChatContext);

  let socket = useRef<any>();
  const listRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<any>(null);
  const lastChatRef = useRef<any>(null);

  const previousDate = useRef<string | null>(null);

  useEffect(() => {
    socket.current = io(
      // 'https://181f-14-161-42-152.ngrok-free.app/',
      'https://neoworks.vn',
      {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  }, []);

  const getAllListChat = async () => {
    setOpenBackdrop(true);
    try {
      const result = await messageApi.getChatMessage(
        userInfoChat.user_id,
        // 36353,
        Number(searchParams.get('post_id')),
      );
      if (result) {
        // setTimeout(() => {
        setAllListChat(result.data);
        setOpenBackdrop(false);
        // }, 1000);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllListChat();
  }, [receivedMessages, sendMessages, userInfoChat]);

  const getProfileUser = async () => {
    try {
      const result = await profileApi.getProfile();
      if (result) {
        setProfileUser(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getProfileUser();
  }, []);

  useEffect(() => {
    try {
      // kết nối web socket
      socket.current.on('connect', () => {
        setIsConnected(true);
      });

      // ngắt kết nối websocket
      socket.current.on('disconnect', (reason: any) => {
        setIsConnected(false);
      });

      // gửi in nhắn
      // socket.current.on('client-send-message', (data: Message) => {
      //   console.log('data', data)
      //   setReceivedMessages((prevMessages: Message[]) => [
      //     ...prevMessages,
      //     data,
      //   ])
      // })

      socket.current.on('server-send-message-to-receiver', (data: any) => {
        // console.log(' gui tin nhan di den nguoi nhan', data);
        // gui tin nhan di den nguoi nhan
        setReceivedMessages((prevReceive: any[]) => [...prevReceive, data]);
      });

      socket.current.on('server-send-message-was-sent', (data: any) => {
        // console.log('nhận tin nhan ve khi da gui xong', data);
        // nhận tin nhan ve khi da gui xong
        setSendMessages((prevSend: any[]) => [...prevSend, data]);
      });

      // socket.current.on('server-send-error-message', (data: any) => {
      //   console.log('data', data)
      // })

      // return () => {
      //   socket.current.disconnect() // Clean up the socket connection on component unmount
      // }
    } catch (error) {
      console.log('eror', error);
    }
  }, []);

  // console.log('receive', receivedMessages)
  // console.log('send', sendMessages)
  // console.log('allListChat', allListChat)

  // console.log('searchParams.get("post_id")', searchParams.get('post_id'))

  // message function
  const handleSendMessage = () => {
    // const socket = io('https://aiworks.vn')
    if (message !== '')
      socket.current.emit('client-send-message', {
        receiverId: userInfoChat.user_id,
        message: message,
        createdAt: Date.now(),
        type: 'text',
        postId: searchParams.get('post_id'),
        // postId: 66587,
      });

    setMessage('');
  };

  // enter sent message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  //
  const handleImageSelect = () => {
    // Mở hộp thoại chọn hình ảnh khi nhấn vào nút "ImageIcon"
    if (imageInputRef) imageInputRef.current?.click();
  };

  const handleImageUpload = (e: any) => {
    const selectedImage = e.target.files;

    if (selectedImage) {
      const formData = new FormData();

      formData.append('files', selectedImage);

      socket.current.emit('client-send-message', {
        receiverId: userInfoChat.user_id,
        files: Array.from(selectedImage),
        createdAt: Date.now(),
        type: 'image',
        postId: searchParams.get('post_id'),
      });
    }
    setImage(selectedImage);
    // Thực hiện việc tải lên hình ảnh
    // ...
  };

  // Khi dữ liệu allListChat được cập nhật, cuộn xuống cuối cùng
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.clientHeight;
    }
    if (lastChatRef.current) {
      // lastChatRef.current.scrollIntoView({
      //   behavior: 'auto',
      //   block: 'end',
      // });
      // lastChatRef.current.scrollIntoView(false);
    }
  }, [allListChat]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [allListChat]);

  // useEffect(() => {
  //   setOpenBackdrop(true);
  //   setTimeout(() => {
  //     setOpenBackdrop(false);
  //   }, 1000);
  // }, []);

  console.log('info', userInfoChat);
  console.log('allListChat', allListChat);

  if (userInfoChat.length !== 0) {
    return (
      <div
        // className="list-chat"
        className={`list-chat ${
          props.openListChat === true && windowWidth
            ? 'show-list-chat-responesive'
            : ''
        }`}
      >
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: 'transparent',
          }}
          open={openBackdrop}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="header-list_chat">
          <div className="wrap-img_Userchat">
            <div className="wrap_img">
              <img
                src={userInfoChat.avatar}
                alt={userInfoChat.company_name}
                onError={(e: any) => {
                  e.target.onerror = null; // Ngăn sự kiện lặp lại
                  e.target.src =
                    'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/no-image.png'; // Đường dẫn của hình ảnh mặc định
                }}
              />
              <span
                className={`user-chat_online ${
                  userInfoChat.isOnline ? 'user-chat_onlineTrue' : ''
                }`}
              ></span>
            </div>
            <div className="wrap-infoUser_chat">
              <h4>{userInfoChat.name}</h4>
              {userInfoChat.isOnline ? (
                <span>Đang hoạt động</span>
              ) : (
                <span>offline</span>
              )}
            </div>
          </div>
          {userInfoChat.company_name ? (
            <div className="wrap-icon_chat">
              {/* <span>
            <VideoIcon />
          </span>
          <span>
            <CallIcon />
          </span> */}
              {/* <span>
              <DotIcon />
            </span> */}
              <div className="wrap-infoCompany_chat">
                <div className="imgCompany_chat">
                  <img
                    src={userInfoChat.imageCompany}
                    alt="Ảnh lỗi"
                    onError={(e: any) => {
                      e.target.onerror = null; // Ngăn sự kiện lặp lại
                      e.target.src =
                        'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/no-image.png'; // Đường dẫn của hình ảnh mặc định
                    }}
                  />
                </div>
                <div className="infoCompany_chat">
                  <h4>{userInfoChat.post_title}</h4>
                  <h6>{userInfoChat.company_name}</h6>
                  <p>
                    {userInfoChat.salary_min} - {userInfoChat.salary_max}{' '}
                    {userInfoChat.money_type_text}/
                    {userInfoChat.salary_type_id === 1
                      ? 'Giờ'
                      : userInfoChat.salary_type_id === 2
                      ? 'Ngày'
                      : userInfoChat.salary_type_id === 3
                      ? 'Tháng'
                      : userInfoChat.salary_type_id === 4
                      ? 'Tuần'
                      : userInfoChat.salary_type_id === 5
                      ? 'Công việc'
                      : userInfoChat.salary_type_id === 6
                      ? 'Thương lượng'
                      : ''}
                  </p>
                </div>
              </div>

              <Button
                type={userInfoChat.applied ? 'primary' : 'default'}
                // disabled={!userInfoChat.applied}
                disabled={true}
              >
                {userInfoChat.applied ? 'Ứng tuyển' : 'Đã ứng tuyển'}
              </Button>
            </div>
          ) : (
            <></>
          )}
          <div className="wrap-icon_close" onClick={() => closeListChat()}>
            <CloseIcon />
          </div>
        </div>

        <div className="list-content_chat" ref={listRef}>
          {allListChat.map((chat: any, index: number) => {
            const chatDate = new Date(chat.created_at).toLocaleDateString();
            let showDate = false;

            if (localStorage.getItem('accountId') === chat.sender_id) {
              return (
                <div
                  className={`content-chat ${
                    index === allListChat.length - 1 ? 'lastChatRef' : null
                  }`}
                  key={index}
                  ref={index === allListChat.length - 1 ? lastChatRef : null}
                >
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
                    {chat.image !== null ? (
                      <img
                        src={chat.image !== null ? chat.image : null}
                        alt={chat.image}
                      />
                    ) : (
                      <></>
                    )}
                    <small>
                      {new Date(chat.created_at).getHours()}:
                      {new Date(chat.created_at)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}
                    </small>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={`content-chat2 ${
                    index === allListChat.length - 1
                      ? 'dddddddddddddddddddddddd'
                      : null
                  }`}
                  key={index}
                  ref={index === allListChat.length - 1 ? lastChatRef : null}
                >
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
                    {chat.image !== null ? (
                      <img
                        src={chat.image !== null ? chat.image : null}
                        alt={chat.image}
                      />
                    ) : (
                      <></>
                    )}
                    <small>
                      {new Date(chat.created_at).getHours()}:
                      {new Date(chat.created_at)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}
                    </small>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="inputs-chat">
          <input
            placeholder="Nhập đoạn chat của bạn"
            value={message}
            onChange={(e) => {
              listRef?.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
              });
              setMessage(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            style={{
              fontStyle: 'normal',
              width: '100%',
              borderRadius: '10px',
              border: '1px solid #aaa',
              outline: 'none',
            }}
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageUpload}
            // multiple
            style={{ display: 'none' }}
          />
          {/* <span className="input-chatIcon">
            <LocationIcon />
          </span> */}
          <span className="input-chatIcon" onClick={handleImageSelect}>
            <ImageIcon />
          </span>
          <span className="input-chatIcon" onClick={handleSendMessage}>
            <SendIcon />
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="list-chat">
        <div className="wrap-img_chat">
          <img src="./images/imageChatBegin.png" alt="" />
          <div>Chat giúp bạn thêm nhiều thông tin hiệu quả, nhanh chóng</div>
        </div>
      </div>
    );
  }
};

export default ListChat;
