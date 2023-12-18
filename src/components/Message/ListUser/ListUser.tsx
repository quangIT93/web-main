import React, { useEffect, useState, useContext } from 'react';

import { useSearchParams } from 'react-router-dom';

// import { Input, Space } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import messageApi from 'api/messageApi';
import historyRecruiter from 'api/historyRecruiter';
import postApi from 'api/postApi';

// import { listUser, listMessage, countUnRead } from './data';
import './style.scss';
import { ChatContext } from 'context/ChatContextProvider';

import { SeenIcon } from '#components/Icons';
import { messVi } from 'validations/lang/vi/mess';
import { messEn } from 'validations/lang/en/mess';
import moment from 'moment';
import communityApi from 'api/apiCommunity';
import profileApi from 'api/profileApi';

// const { Search } = Input;

interface IOpenListChat {
  setOpenListChat: (params: any) => any;
  openListChat: boolean;
  language: any;
  languageRedux: any;
}

const ListUserChat: React.FC<IOpenListChat> = (props) => {
  const { language, languageRedux } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(false);
  const [openBackDrop, setBackDrop] = useState(false);
  const [listUserChat, setStateUserChat] = useState<any>([]);
  const [firstTime, setFirstTime] = useState<any>(true);

  const {
    setUserInfoChat,
    setReceivedMessages,
    setSendMessages,
    userInfoChat,
    sendMessages,
    receivedMessages,
    apply,
  } = useContext(ChatContext);

  const getPostById = async () => {
    try {
      if (
        Number(searchParams.get('post_id')) &&
        searchParams.get('post_id') !== 'null'
      ) {
        const result = await postApi.getPostV3(
          Number(searchParams.get('post_id')),
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (result.data !== null) {
          setUserInfoChat({
            avatar: result?.data?.image,
            image: result?.data?.image,
            company_name: result?.data?.companyResourceData?.name,
            is_online: false,
            name: result?.data?.companyResourceData?.name,
            post_title: result?.data?.title,
            salary_min: result?.data?.salaryMin,
            salary_max: result?.data?.salaryMax,
            money_type_text: result?.data?.moneyTypeText,
            salary_type_id: result?.data?.postSalaryType?.id,
            post_status: result?.data?.status,
            is_owner: false,
            post_id: result?.data?.id,
            applied: result?.data?.applied,
            user_id: result?.data?.accountId,
            message: '',
            status: 0,
          });
        }
      } else if (
        searchParams.get('user_id') &&
        searchParams.get('post_id') === 'null'
      ) {
        const result = await profileApi.getProfileByAccountId(
          languageRedux === 1 ? 'vi' : 'en',
          searchParams.get('user_id'),
        );

        if (result) {
          setUserInfoChat({
            avatar: result?.data?.avatarPath,
            image: result?.data?.avatarPath,
            company_name: '',
            is_online: false,
            name: result?.data?.name,
            post_title: '',
            salary_min: '',
            salary_max: '',
            money_type_text: '',
            salary_type_id: '',
            post_status: 0,
            is_owner: false,
            post_id: null,
            applied: null,
            user_id: result?.data?.accountId,
            message: '',
            status: 0,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostById();
  }, [apply]);

  // console.log("post", post);
  // console.log("listUserChat", listUserChat);

  const getAllUserChat = async () => {
    try {
      const result = await messageApi.getUserChated(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      // const post = await postApi.getPostV3(
      //   Number(searchParams.get('post_id')),
      //   languageRedux === 1 ? 'vi' : 'en',
      // );
      console.log('result', result);

      if (result) {
        setStateUserChat(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllUserChat();
  }, [sendMessages, receivedMessages, languageRedux]);

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

  const handleClickUserInfo = (user: any) => {
    setUserInfoChat(user);
    // console.log(user);

    setBackDrop(true);
    setSearchParams({ post_id: user.post_id, user_id: user.user_id });
    getAllUserChat();
    setReceivedMessages([
      {
        receiverId: searchParams.get('user_id'),
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(searchParams.get('post_id')),
      },
    ]);
    setSendMessages([
      {
        receiverId: searchParams.get('user_id'),
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(searchParams.get('post_id')),
      },
    ]);
    setTimeout(() => {
      setBackDrop(false);
    }, 500);
    windowWidth && props.setOpenListChat(true);

    if (props.openListChat === true && windowWidth) {
      let listChatElement = document.querySelector('.list_userChat');
      listChatElement?.classList.add('.hide-list-userChat');
    }
  };

  if (listUserChat.length !== 0) {
    return (
      <div
        // className="list_userChat"
        className={`list_userChat ${
          props.openListChat === true && windowWidth ? 'hide-list-userChat' : ''
        }`}
      >
        <div className="header-list_userChat">
          <h4 className="title-header_listUserChat">
            {languageRedux === 1
              ? 'Tin nhắn'
              : languageRedux === 2
              ? 'Message'
              : '메시지'}
          </h4>
          <div className="header-listSearch_userChat"></div>
        </div>

        <div className="list-infoUser">
          <Backdrop
            sx={{
              color: '#0d99ff ',
              backgroundColor: 'transparent',
              zIndex: (theme: any) => theme.zIndex.drawer + 1,
            }}
            open={openBackDrop}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {listUserChat.map((user: any, index: number) => (
            <div
              className={`wrap-userInfo ${
                searchParams.get('user_id') === user?.user_id
                  ? 'readed-message'
                  : ''
              } `}
              key={index}
              onClick={() => handleClickUserInfo(user)}
            >
              <div className="wrap-avatar_userChat">
                {user?.avatar ? (
                  <img src={user?.avatar} alt="" />
                ) : (
                  <div>Hijob</div>
                )}
                <span
                  className={`user-online ${
                    user?.is_online ? 'user-online_true' : ''
                  }`}
                ></span>
              </div>
              <div className="info-user_chat">
                <h4>{user?.name ? user?.name : user?.company_name}</h4>
                <h5>{user?.name ? '' : user?.post_title}</h5>
                <p>{user?.message}</p>
              </div>
              <div className="info-chat_icon">
                <small>
                  {user?.created_at
                    ? new Date(user?.created_at).toLocaleString('en-GB')
                    : //   new Date().getDay()
                      moment(new Date()).format('DD/MM/YYYY') +
                      ' ' +
                      moment(new Date()).format('HH:mm:ss')}
                </small>
                {user?.status === 1 ? (
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
    );
  } else if (listUserChat.length === 0) {
    return (
      <div className="list_userChat">
        <div className="wrap-img_chat">
          <img src="./images/imageListChatBegin.png" alt="" />
          <div>
            {languageRedux === 1
              ? 'Bạn chưa có cuộc trò chuyện nào'
              : languageRedux === 2
              ? "You don't have any chats yet"
              : '아직 대화가 없습니다.'}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="list_userChat">
        <div className="wrap-img_chat">
          <img src="./images/imageListChatBegin.png" alt="" />
          <div>
            {languageRedux === 1
              ? 'Bạn chưa có cuộc trò chuyện nào'
              : languageRedux === 2
              ? "You don't have any chats yet"
              : '아직 대화가 없습니다.'}
          </div>
        </div>
      </div>
    );
  }
};

export default ListUserChat;
