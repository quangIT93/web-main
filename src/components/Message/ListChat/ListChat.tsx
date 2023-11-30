import React, { useEffect, useState, useContext, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Button, notification } from 'antd';

import io from 'socket.io-client';
import CircularProgress from '@mui/material/CircularProgress';

import { ExclamationCircleFilled } from '@ant-design/icons';

import { Box, Typography, Modal } from '@mui/material';

// import api
import messageApi from 'api/messageApi';
// import profileApi from 'api/profileApi';
import appplicationApi from 'api/appplication';

// import { Skeleton } from 'antd';
import Backdrop from '@mui/material/Backdrop';
// import icon
import { ImageIcon, SendIcon, CloseIcon } from '#components/Icons';

import './style.scss';

import { ChatContext } from 'context/ChatContextProvider';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

import { messVi } from 'validations/lang/vi/mess';
import { messEn } from 'validations/lang/en/mess';
import { postDetail } from 'validations/lang/vi/postDetail';
import { postDetailEn } from 'validations/lang/en/postDetail';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
  '@media (max-width: 399px)': {
    width: 360,
  },
  '@media (max-width: 600px)': {
    width: 400,
  },
};

interface IOpenListChat {
  setOpenListChat: (params: any) => any;
  openListChat: boolean;
  setApply: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListChat: React.FC<IOpenListChat> = (props) => {
  // const { language, languageRedux } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  // const userProfile = useSelector((state: RootState) => state.profile.profile);
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const [message, setMessage] = useState('');

  const [allListChat, setAllListChat] = useState<any>([]);
  // const [profileUser, setProfileUser] = useState<any>({});
  // const [image, setImage] = useState<File | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  // const [previousDate, setPreviousDate] = useState<string | null>(null)

  const [openModalApply, setOpenModalApply] = React.useState(false);

  const [api, contextHolder] = notification.useNotification();

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

  // const previousDate = useRef<string | null>(null);

  // useEffect(() => {
  //   socket.current = io(
  //     // 'https://181f-14-161-42-152.ngrok-free.app/',
  //     'https://neoworks.vn',
  //     // 'https://aiworks.vn',
  //     {
  //       extraHeaders: {
  //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //       },
  //     },
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getAllListChat = async () => {
    setOpenBackdrop(true);
    try {
      const result = await messageApi.getChatMessage(
        searchParams.get('user_id'),
        // 36353,
        searchParams.get('post_id')
          ? Number(searchParams.get('post_id'))
          : null,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessages, sendMessages, userInfoChat, languageRedux]);

  // const getProfileUser = async () => {
  //   try {
  //     const result = await profileApi.getProfile();
  //     if (result) {
  //       setProfileUser(result.data);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   getProfileUser();
  // }, []);

  // useEffect(() => {
  //   // kết nối web socket
  //   // socket.current.on('connect', () => {
  //   // setIsConnected(true);
  //   // });
  //   console.log('socket.current vao', socket.current);

  //   if (isConnected === false && !socket.current) {
  //     socket.current = io('https://neoworks.vn', {
  //       extraHeaders: {
  //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //       },
  //     });
  //     console.log('socket.current trong', socket.current);

  //     socket.current.on('disconnect', (reason: any) => {
  //       console.log('ket noi that bai');

  //       setIsConnected(true);
  //     });

  //     socket.current.on('connect', () => {
  //       // Kết nối thành công
  //       console.log('ket noi thanh cong');

  //       setIsConnected(true);
  //     });

  //     socket.current.on('server-send-message-to-receiver', (data: any) => {
  //       // Xử lý tin nhắn từ máy chủ
  //       setReceivedMessages((prevReceive) => [...prevReceive, data]);
  //     });

  //     socket.current.on('server-send-message-was-sent', (data: any) => {
  //       // console.log('nhận tin nhan ve khi da gui xong', data);
  //       // nhận tin nhan ve khi da gui xong
  //       setSendMessages((prevSend: any[]) => [...prevSend, data]);
  //     });
  //   }

  //   // ngắt kết nối websocket
  //   // socket.current.on('disconnect', (reason: any) => {
  //   // setIsConnected(false);
  //   // });

  //   // gửi in nhắn
  //   // socket.current.on('client-send-message', (data: Message) => {
  //   //   console.log('data', data)
  //   //   setReceivedMessages((prevMessages: Message[]) => [
  //   //     ...prevMessages,
  //   //     data,
  //   //   ])
  //   // })

  //   // socket.current.on('server-send-message-to-receiver', (data: any) => {
  //   // console.log(' gui tin nhan di den nguoi nhan', data);
  //   // gui tin nhan di den nguoi nhan
  //   //   setReceivedMessages((prevReceive: any[]) => [...prevReceive, data]);
  //   // });

  //   // socket.current.on('server-send-message-was-sent', (data: any) => {
  //   // console.log('nhận tin nhan ve khi da gui xong', data);
  //   // nhận tin nhan ve khi da gui xong
  //   //   setSendMessages((prevSend: any[]) => [...prevSend, data]);
  //   // });

  //   // socket.current.on('server-send-error-message', (data: any) => {
  //   //   console.log('data', data)
  //   // })

  //   // return () => {
  //   //   socket.current.disconnect() // Clean up the socket connection on component unmount
  //   // }
  //   // return () => {
  //   //   socket.current.disconnect();
  //   // };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (isConnected === false && !socket.current) {
      socket.current = io(
        // 'https://aiworks.vn',
        'https://neoworks.vn',
        {
          extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      // console.log('socket.current trong', socket.current);
      // console.log('socket.current trong .connected', socket.current.connected);

      socket.current.on('disconnect', (reason: any) => {
        // console.log('ket noi that bai');
        setIsConnected(false);
      });

      if (socket.current.connected === false) {
        setIsConnected(true);
      }

      socket.current.on('connect', () => {
        // Kết nối thành công
        // console.log('ket noi thanh cong');
        setIsConnected(true);
      });

      socket.current.on('server-send-message-to-receiver', (data: any) => {
        // Xử lý tin nhắn từ máy chủ
        setReceivedMessages((prevReceive) => [...prevReceive, data]);
        console.log('sender message 1111111111');
      });

      socket.current.on('server-send-message-was-sent', (data: any) => {
        // console.log('nhận tin nhan ve khi da gui xong', data);
        // nhận tin nhan ve khi da gui xong
        setSendMessages((prevSend: any[]) => [...prevSend, data]);
        console.log('sender message 22222222222222');
      });
    }
  }, []); // Thêm một mảng phụ thuộc trống

  // console.log('receive', receivedMessages)
  // console.log('send', sendMessages)
  // console.log('allListChat', allListChat)

  // console.log('searchParams.get("post_id")', searchParams.get('post_id'))

  // message function
  const handleSendMessage = () => {
    // const socket = io('https://aiworks.vn')

    if (message !== '')
      socket.current.emit('client-send-message', {
        receiverId: searchParams.get('user_id'),
        message: message,
        createdAt: Date.now(),
        type: 'text',
        postId:
          searchParams.get('post_id') !== 'null'
            ? searchParams.get('post_id')
            : null,
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
        receiverId: searchParams.get('user_id'),
        files: Array.from(selectedImage),
        createdAt: Date.now(),
        type: 'image',
        // postId: searchParams.get('post_id'),
        postId:
          searchParams.get('post_id') !== 'null'
            ? searchParams.get('post_id')
            : null,
      });
    }
    // setImage(selectedImage);
    // Thực hiện việc tải lên hình ảnh
    // ...
  };

  // Khi dữ liệu allListChat được cập nhật, cuộn xuống cuối cùng
  // React.useEffect(() => {
  //   if (listRef.current) {
  //     listRef.current.scrollTop = listRef.current.clientHeight;
  //   }
  //   if (lastChatRef.current) {
  // lastChatRef.current.scrollIntoView({
  //   behavior: 'auto',
  //   block: 'end',
  // });
  // lastChatRef.current.scrollIntoView(false);
  //   }
  // }, [allListChat]);

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

  // console.log('info', userInfoChat);
  // console.log('allListChat', allListChat);
  // console.log('userInfoChat', userInfoChat);

  const handleClickApplication = () => {
    setOpenModalApply(true);
  };

  // console.log('userInfoChat', userInfoChat);

  const handleCloseModalApply = () => {
    setOpenModalApply(false);
    // setIsApplied(false);
  };

  const handleApply = async () => {
    if (
      !profileV3.name ||
      !profileV3.addressText ||
      !profileV3.birthday ||
      profileV3.gender === null ||
      profileV3.gender === undefined ||
      !profileV3.phone ||
      !profileV3.email
    ) {
      api.info({
        message:
          languageRedux === 1
            ? 'Cập nhật thông tin'
            : languageRedux === 2
              ? 'Update information'
              : '정보 업데이트',
        description:
          languageRedux === 1
            ? 'Vui lòng cập nhật thông tin để ứng tuyển công việc'
            : languageRedux === 2
              ? 'Please update your information to apply for the job'
              : '해당 직무에 지원하려면 정보를 업데이트하세요.',
        placement: 'top',
        icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
      });
      return;
    }

    try {
      const result = await appplicationApi.applyAplication(
        Number(searchParams.get('post_id')),
      );

      if (result) {
        // console.log('result', result.data);
        props.setApply(true);
        setOpenModalApply(false);
      }
    } catch (error) {
      api.info({
        message: languageRedux === 1 ? 'Đăng nhập thất bại' : 'Login Failded',
        description: languageRedux === 1 ? '' : '',
        placement: 'top',
        icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
      });
    }
  };

  if (searchParams.get('user_id')) {
    return (
      <div
        // className="list-chat"
        className={`list-chat ${
          props.openListChat === true && windowWidth
            ? 'show-list-chat-responesive'
            : ''
        }`}
      >
        {contextHolder}
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
                src={
                  userInfoChat.avatar
                    ? userInfoChat.avatar
                    : userInfoChat.image
                      ? userInfoChat.image
                      : ''
                }
                alt={userInfoChat.company_name}
                onError={(e: any) => {
                  e.target.onerror = null; // Ngăn sự kiện lặp lại
                  e.target.src =
                    'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/no-image.png'; // Đường dẫn của hình ảnh mặc định
                }}
              />
              <span
                className={`user-chat_online ${
                  userInfoChat.is_online ? 'user-chat_onlineTrue' : ''
                }`}
              ></span>
            </div>
            <div className="wrap-infoUser_chat">
              <h4>{userInfoChat.name}</h4>
              {userInfoChat.isOnline ? (
                <span>
                  {languageRedux === 1
                    ? 'Đang hoạt động'
                    : languageRedux === 2
                      ? 'Active'
                      : '활동적인'}
                </span>
              ) : (
                <span>
                  {languageRedux === 1
                    ? 'Không hoạt động'
                    : languageRedux === 2
                      ? 'Inactive'
                      : '비활성'}
                </span>
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
                    src={userInfoChat.image}
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
                    {new Intl.NumberFormat('en-US').format(
                      userInfoChat.salary_max,
                    )}{' '}
                    -
                    {new Intl.NumberFormat('en-US').format(
                      userInfoChat.salary_min,
                    )}{' '}
                    {userInfoChat.money_type_text}/
                    {userInfoChat.salary_type_id === 1
                      ? languageRedux === 1
                        ? 'Giờ'
                        : languageRedux === 2
                          ? 'Hour'
                          : '시간'
                      : userInfoChat.salary_type_id === 2
                        ? languageRedux === 1
                          ? 'Ngày'
                          : languageRedux === 2
                            ? 'Day'
                            : '낮'
                        : userInfoChat.salary_type_id === 3
                          ? languageRedux === 1
                            ? 'Tháng'
                            : languageRedux === 2
                              ? 'Month'
                              : '월'
                          : userInfoChat.salary_type_id === 4
                            ? languageRedux === 1
                              ? 'Tuần'
                              : languageRedux === 2
                                ? 'Week'
                                : '주'
                            : userInfoChat.salary_type_id === 5
                              ? languageRedux === 1
                                ? 'Công việc'
                                : languageRedux === 2
                                  ? 'Job'
                                  : '직업'
                              : userInfoChat.salary_type_id === 6
                                ? languageRedux === 1
                                  ? 'Thương lượng'
                                  : languageRedux === 2
                                    ? 'Negotiate'
                                    : '협상하다'
                                : ''}
                  </p>
                </div>
              </div>

              <Button
                type={userInfoChat.applied ? 'default' : 'primary'}
                disabled={
                  userInfoChat.post_status === 3 ||
                  userInfoChat.post_status === 0
                }
                style={
                  userInfoChat.is_owner === true
                    ? { display: 'none' }
                    : { display: '' }
                }
                onClick={handleClickApplication}
              >
                {userInfoChat.post_status === 3
                  ? languageRedux === 1
                    ? 'Đã đóng'
                    : languageRedux === 2
                      ? 'Closed'
                      : '닫은'
                  : userInfoChat.applied === false &&
                      userInfoChat.post_status === 0
                    ? languageRedux === 1
                      ? 'Chưa duyệt'
                      : languageRedux === 2
                        ? 'Not approved yet'
                        : '아직 승인되지 않음'
                    : userInfoChat.applied === false &&
                        userInfoChat.post_status === 1
                      ? languageRedux === 1
                        ? 'Ứng tuyển ngay'
                        : languageRedux === 2
                          ? 'Apply now'
                          : '지금 신청하세요'
                      : userInfoChat.applied === true
                        ? languageRedux === 1
                          ? 'Đã ứng tuyển'
                          : languageRedux === 2
                            ? 'Applied'
                            : '적용된'
                        : ''}
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
                          ? languageRedux === 1
                            ? 'Hôm nay'
                            : languageRedux === 2
                              ? 'Today'
                              : '오늘'
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
            placeholder={
              languageRedux === 1
                ? 'Nhập tin nhắn...'
                : languageRedux === 2
                  ? 'Enter message...'
                  : '메시지를 입력하세요...'
            }
            value={message}
            onChange={(e) => {
              listRef?.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
              });
              window.scrollTo(0, document.body.scrollHeight);
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

        <Modal
          open={openModalApply}
          onClose={handleCloseModalApply}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center', color: '#0d99ff' }}
            >
              {languageRedux === 1
                ? 'Ứng tuyển cho công việc này'
                : languageRedux === 2
                  ? 'Apply for this job'
                  : '이 직업에 지원하세요'}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={{ margin: '24px 0', fontSize: '15px', textAlign: 'center' }}
            >
              {languageRedux === 1
                ? 'Thông tin của bạn sẽ được gửi cho nhà tuyển dụng. Ứng tuyển cho công việc này?'
                : languageRedux === 2
                  ? 'Your information will be sent to employers. Apply for this job?'
                  : '귀하의 정보가 고용주에게 전송됩니다. 이 직업에 지원하시겠습니까?'}
            </Typography>

            <Box
              sx={{
                margin: '12px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <Button
                type="primary"
                danger
                onClick={handleCloseModalApply}
                style={{
                  width: '300px',
                }}
              >
                {languageRedux === 1
                  ? 'Không'
                  : languageRedux === 2
                    ? 'No'
                    : languageRedux === 3 && '아니요'}
              </Button>
              <Button
                type="primary"
                onClick={handleApply}
                style={{
                  width: '300px',
                }}
              >
                {languageRedux === 1
                  ? 'Có'
                  : languageRedux === 2
                    ? 'Yes'
                    : languageRedux === 3 && '확인'}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="list-chat">
        <div className="wrap-img_chat">
          <img src="./images/imageChatBegin.png" alt="" />
          <div>
            {languageRedux === 1
              ? 'Chat giúp bạn thêm nhiều thông tin hiệu quả, nhanh chóng'
              : languageRedux === 2
                ? 'Chat helps you to add more information effectively and quickly'
                : '채팅은 더 빠르고 효과적인 정보를 제공합니다.'}
          </div>
        </div>
      </div>
    );
  }
};

export default ListChat;
