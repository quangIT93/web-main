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
  } = useContext(ChatContext);

  const getPostById = async () => {
    try {
      const result = await postApi.getPostV3(
        Number(searchParams.get('post_id')),
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result.data !== null) {
        // setUserChat({
        //   user_id: result?.data?.accountId,
        //   avatar: result?.data?.posterAvatar,
        //   is_online: false,
        //   name: result?.data?.companyResourceData?.name,
        //   company_name: result?.data?.companyResourceData?.name,
        //   post_title: result?.data?.title,
        //   message: '',
        //   status: 0,
        //   post_id: result?.data?.id,
        //   image: result?.data?.image,
        //   salary_min: result?.data?.salaryMin,
        //   salary_max: result?.data?.salaryMax,
        //   money_type_text: result?.data?.moneyTypeText,
        //   salary_type_id: result?.data?.postSalaryType?.id,
        //   post_status: result?.data?.status,
        //   is_owner: false,
        //   applied: result?.data?.applied,
        // })
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
        })
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getPostById()
  }, [firstTime])

  // console.log("post", post);
  // console.log("listUserChat", listUserChat);

  const getAllUserChat = async () => {
    try {
      const result = await messageApi.getUserChated(
        languageRedux === 1 ? 'vi' : 'en',
      );

      const post = await postApi.getPostV3(
        Number(searchParams.get('post_id')),
        languageRedux === 1 ? 'vi' : 'en',
      );
      console.log('result', result);

      if (result) {
        if (post.data !== null) {
          setStateUserChat([
            {
              user_id: post?.data?.accountId,
              avatar: post?.data?.posterAvatar,
              is_online: false,
              name: post?.data?.companyResourceData?.name,
              company_name: post?.data?.companyResourceData?.name,
              post_title: post?.data?.title,
              message: '',
              status: 0,
              post_id: post?.data?.id,
              image: post?.data?.image,
              salary_min: post?.data?.salaryMin,
              salary_max: post?.data?.salaryMax,
              money_type_text: post?.data?.moneyTypeText,
              salary_type_id: post?.data?.postSalaryType?.id,
              post_status: post?.data?.status,
              is_owner: false,
              applied: post?.data?.applied,
            },
            ...result.data
          ]);
          setFirstTime(false)
        } else {
          setStateUserChat(result.data);
        }
        // setStateUserChat(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllUserChat();
  }, [sendMessages, receivedMessages, languageRedux]);

  // const getApplicationByIdAndPost = async () => {
  //   try {
  //     // const result = await historyRecruiter.GetAJobApplication(
  //     //   Number(searchParams.get('post_id')),
  //     //   searchParams.get('application_id') ?? '',
  //     // );
  //     // console.log('chat', result.data);
  //     // const result = await messageApi.getUserChated();

  //     if (searchParams.get('application_id')) {
  //       const resultHistoryRecruiter =
  //         await historyRecruiter.GetAJobApplication(
  //           Number(searchParams.get('post_id')),
  //           searchParams.get('application_id') ?? '',
  //           languageRedux === 1 ? 'vi' : 'en',
  //         );

  //       if (resultHistoryRecruiter) {
  //         // console.log('ressssss', result.data);
  //         const resultPost = await postApi.getPostV3(
  //           Number(searchParams.get('post_id')),
  //           languageRedux === 1 ? 'vi' : 'en',
  //         );
  //         // console.log(resultHistoryRecruiter.data);
  //         // console.log('resultPost', resultPost);

  //         if (resultPost && resultHistoryRecruiter) {
  //           return setUserInfoChat({
  //             user_id:
  //               resultHistoryRecruiter.data.applicationProfile?.account_id,
  //             name: resultHistoryRecruiter.data.applicationProfile?.name,
  //             avatar: resultHistoryRecruiter.data.applicationProfile?.avatar,
  //             imageCompany: resultPost.data?.image,
  //             isOnline: false,
  //             company_name: resultPost.data?.companyName,
  //             image: resultPost.data.image,
  //             applied: resultPost.data.applied,
  //             salary_max: resultPost.data.salaryMax,
  //             salary_min: resultPost.data.salaryMin,
  //             money_type_text: resultPost.data.moneyTypeText,
  //             salary_type_id: resultPost.data.postSalaryType.id,
  //             statusPost: resultPost.status,
  //             is_owner: true,
  //           });
  //         }
  //       }
  //     } else {
  //       const resultGetUserChated = await messageApi.getUserChated(
  //         languageRedux === 1 ? 'vi' : 'en',
  //       );
  //       console.log('result.data', resultGetUserChated.data);

  //       if (resultGetUserChated.data) {
  //         resultGetUserChated.data.map(async (userChat: any) => {
  //           if (userChat.user_id === searchParams.get('user_id')) {
  //             setUserInfoChat({
  //               user_id: userChat.user_id,
  //               name: userChat.name,
  //               avatar: userChat.avatar,
  //               imageCompany: userChat.image,
  //               isOnline: userChat.is_online,
  //               company_name: userChat.company_name,
  //               image: userChat.avatar,
  //               applied: userChat.applied,
  //               salary_max: userChat.salary_max,
  //               salary_min: userChat.salary_min,
  //               money_type_text: userChat.money_type_text,
  //               salary_type_id: userChat.salary_type_id,
  //               statusPost: userChat.status,
  //             });
  //           } else {
  //             const resultGetPostV3 = await postApi.getPostV3(
  //               Number(searchParams.get('post_id')),
  //               languageRedux === 1 ? 'vi' : 'en',
  //             );

  //             // console.log('v3', resultGetPostV3);

  //             if (resultGetPostV3) {
  //               if (
  //                 searchParams.get('post_id') &&
  //                 searchParams.get('user_id')
  //               ) {
  //                 setUserInfoChat({
  //                   user_id: searchParams.get('user_id'),
  //                   name: resultGetPostV3.data.companyName,
  //                   avatar: resultGetPostV3.data.image,
  //                   imageCompany: resultGetPostV3.data.image,
  //                   isOnline: null,
  //                   company_name: resultGetPostV3.data.companyName,
  //                   image: resultGetPostV3.data.image,
  //                   applied: resultGetPostV3.data.applied,
  //                   salary_max: resultGetPostV3.data.salaryMax,
  //                   salary_min: resultGetPostV3.data.salaryMin,
  //                   money_type_text: resultGetPostV3.data.moneyTypeText,
  //                   salary_type_id: resultGetPostV3.data.postSalaryType.id,
  //                   post_title: resultGetPostV3.data.title,
  //                   statusPost: resultGetPostV3.data.status,
  //                 });
  //               }
  //             }
  //           }
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error('error', error);
  //     try {
  //       if (searchParams.get('post_id') && searchParams.get('user_id')) {
  //         const result = await postApi.getPostV3(
  //           Number(searchParams.get('post_id')),
  //           languageRedux === 1 ? 'vi' : 'en',
  //         );

  //         setUserInfoChat({
  //           user_id: searchParams.get('user_id'),
  //           name: result.data.companyName,
  //           avatar: result.data.image,
  //           imageCompany: result.data.image,
  //           isOnline: null,
  //           company_name: result.data.companyName,
  //           image: result.data.image,
  //           applied: result.data.applied,
  //           salary_max: result.data.salaryMax,
  //           salary_min: result.data.salaryMin,
  //           money_type_text: result.data.moneyTypeText,
  //           salary_type_id: result.data.postSalaryType.id,
  //           post_title: result.data.title,
  //           statusPost: result.data.status,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('error', error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getApplicationByIdAndPost();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [languageRedux]);

  // const getInfoUserApplied = async () => {
  //   try {
  //     const result = await messageApi.getUserChated('vi');

  //     if (result) {
  //       setUserInfoChat(result.data);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   getInfoUserApplied();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [languageRedux]);

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

  // useEffect(() => {
  //   // console.log('lis', listUserChat);

  //   listUserChat.map((userChat: any) => {
  //     if (userChat.user_id === searchParams.get('user_id')) {
  //       setUserInfoChat({
  //         user_id: userChat.user_id,
  //         name: userChat.name ? userChat.name : userChat.company_name,
  //         avatar: userChat.avatar,
  //         imageCompany: userChat.image,
  //         isOnline: userChat.is_online,
  //         company_name: userChat.company_name,
  //         image: userChat.image,
  //         applied: userChat.applied,
  //         salary_max: userChat.salary_max,
  //         salary_min: userChat.salary_min,
  //         money_type_text: userChat.money_type_text,
  //         salary_type_id: userChat.salary_type_id,
  //         post_title: userChat.post_title,
  //         statusPost: userChat.status,
  //       });
  //     }
  //     return null;
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [listUserChat]);

  // console.log('tin nhan duoc nhan', receivedMessages)
  // console.log('tin nhan da gui', sendMessages)
  // const onSearch = (value: string) => console.log(value);
  // const userTest = {
  //   post_id: '66596',
  //   user_id: 'dc68ddaf-a185-4c84-a983-c94068f5c646',
  // };

  // console.log('lisstUserrChat', listUserChat);

  if (listUserChat.length !== 0) {
    return (
      <div
        // className="list_userChat"
        className={`list_userChat ${props.openListChat === true && windowWidth ? 'hide-list-userChat' : ''
          }`}
      >
        <div className="header-list_userChat">
          <h4 className="title-header_listUserChat">{language?.message}</h4>
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
          {/* <div
            className={`wrap-userInfo `}
            // key={index}
            onClick={() => handleClickUserInfo(userTest)}
          >
            <div className="wrap-avatar_userChat">
              <div>Hijob</div>
              <span
                className="user-online_true"
              ></span>
            </div>
            <div className="info-user_chat">
              <h4>user.name</h4>
              <h5>user.post_title</h5>
              <p>user.message</p>
            </div>
            <div className="info-chat_icon">
              <small>{new Date().toLocaleString('en-GB')}</small>

              <span className="count-message_receive"></span>
            </div>
          </div> */}
          {listUserChat.map((user: any, index: number) => (
            <div
              className={`wrap-userInfo ${searchParams.get('user_id') === user?.user_id
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
                  className={`user-online ${user?.is_online ? 'user-online_true' : ''
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
                  {
                    user?.created_at ?
                      new Date(user?.created_at).toLocaleString('en-GB') :
                      //   new Date().getDay()
                      moment(new Date()).format('DD/MM/YYYY') + ' ' +
                      moment(new Date()).format('HH:mm:ss')
                  }
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
  } else {
    return (
      <div className="list_userChat">
        <div className="wrap-img_chat">
          <img src="./images/imageListChatBegin.png" alt="" />
          <div>{language?.you_have_no_conversation}</div>
        </div>
      </div>
    );
  }
};

export default ListUserChat;
