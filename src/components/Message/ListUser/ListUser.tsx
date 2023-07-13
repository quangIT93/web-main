import React, { useEffect, useState, useContext } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  AudioOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Input, Space } from 'antd';

import messageApi from 'api/messageApi';
import historyRecruiter from 'api/historyRecruiter';

import { listUser, listMessage, countUnRead } from './data';
import './style.scss';
import { ChatContext } from 'context/ChatContextProvider';

import { SeenIcon } from '#components/Icons';

const { Search } = Input;

interface IOpenListChat {
  setOpenListChat: (params: any) => any;
  openListChat: boolean;
}

const ListUserChat: React.FC<IOpenListChat> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(false);

  const [listUserChat, setStateUserChat] = useState<any>([]);
  const {
    setUserInfoChat,
    setReceivedMessages,
    setSendMessages,
    userInfoChat,
    sendMessages,
    receivedMessages,
  } = useContext(ChatContext);

  const getAllUserChat = async () => {
    try {
      const result = await messageApi.getUserChated();
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
  }, [sendMessages, receivedMessages]);

  const getApplicationByIdAndPost = async () => {
    try {
      const result = await historyRecruiter.GetAJobApplication(
        Number(searchParams.get('post_id')),
        searchParams.get('application_id') ?? '',
      );

      if (result.data) {
        setUserInfoChat({
          user_id: result.data.applicationProfile.account_id,
          name: result.data.applicationProfile.name,
          avatar: result.data.applicationProfile.avatar,
          isOnline: null,
        });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getApplicationByIdAndPost();
  }, [searchParams.get('post_id'), searchParams.get('user_id')]);

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
    setSearchParams({ post_id: user.post_id, user_id: user.user_id });
    getAllUserChat();
    setReceivedMessages([
      {
        receiverId: userInfoChat.user_id,
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(searchParams.get('post_id')),
      },
    ]);
    setSendMessages([
      {
        receiverId: userInfoChat.user_id,
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(searchParams.get('post_id')),
      },
    ]);

    windowWidth && props.setOpenListChat(true);

    if (props.openListChat === true && windowWidth) {
      props.setOpenListChat(true);
      let listChatElement = document.querySelector('.list_userChat');
      listChatElement?.classList.add('.hide-list-userChat');
    }
  };

  useEffect(() => {
    listUserChat.map((userChat: any) => {
      if (userChat.user_id === searchParams.get('user_id')) {
        setUserInfoChat({
          user_id: userChat.user_id,
          name: userChat.name,
          avatar: userChat.avatar,
          isOnline: null,
        });
      }
      return null;
    });
  }, [searchParams.get('user_id'), listUserChat]);

  // console.log('tin nhan duoc nhan', receivedMessages)
  // console.log('tin nhan da gui', sendMessages)
  const onSearch = (value: string) => console.log(value);
  if (listUserChat.length !== 0) {
    return (
      <div
        // className="list_userChat"
        className={`list_userChat ${props.openListChat === true && windowWidth ? 'hide-list-userChat' : ''
          }`}
      >
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
              className={`wrap-userInfo ${userInfoChat.user_id === user.user_id ? 'readed-message' : ''
                } `}
              key={index}
              onClick={() => handleClickUserInfo(user)}
            >
              <div className="wrap-avatar_userChat">
                {user.avatar ? (
                  <img src={user.avatar} alt="" />
                ) : (
                  <div>Hijob</div>
                )}
                <span
                  className={`user-online ${user.is_online ? 'user-online_true' : ''
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
    );
  } else {
    return (
      <div className="list_userChat">
        <div className="wrap-img_chat">
          <img src="./images/imageListChatBegin.png" alt="" />
          <div>Bạn chưa có cuộc trò chuyện nào!</div>
        </div>
      </div>
    )
  }

};

export default ListUserChat;
