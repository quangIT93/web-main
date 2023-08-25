import React, { useState, useEffect } from 'react';
// import ReactHtmlParser from 'react-html-parser'

import { Tooltip, Switch, Button } from 'antd';

import { DeleteKeywordIcon } from '#components/Icons';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { styled, lighten, darken } from '@mui/system';
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   OutlinedInput,
//   NativeSelect,
//   ListSubheader,
//   TextField,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Autocomplete,
//   Box,
//   Chip,
//   ListItemButton,
//   Collapse,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
// } from '@mui/material';

// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import Api
import notificationApi from 'api/notification';
import notificationKeywordApi from 'api/notificationKeyword';
// import locationApi from '../../../api/locationApi';

import {
  // LocationIcon,
  CateIcon,
  // CreateKeywordIcon,
  LocationHomeIcon,
} from '#components/Icons';

import './style.scss';
// import fake data notificates
// import { notificates } from './data';

import { HomeValueContext } from 'context/HomeValueContextProvider';

import CircularProgress from '@mui/material/CircularProgress';

import languageApi from 'api/languageApi';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { searchResultVi } from 'validations/lang/vi/searchResult';
import { searchResultEn } from 'validations/lang/en/searchResult';
import { postDetail } from 'validations/lang/vi/postDetail';
import { postDetailEn } from 'validations/lang/en/postDetail';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const Notificate = () => {
  const {
    setOpenNotificate,
    openNotificate,
  }: {
    setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
    openNotificate: boolean;
  } = React.useContext(HomeValueContext);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [dataNotification, setDataNotification] = useState<any>([]);
  const [dataNotificationKeyword, setDataNotificationkeyword] = useState<any>(
    [],
  );

  const [activeSystem, setActiveSystem] = useState(true);
  const [activeKeyword, setActiveKeyword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState(true);

  const [valueApp, setValueApp] = useState(
    dataNotificationKeyword?.status?.pushStatus,
  );
  const [valueMall, setValueMall] = useState(
    dataNotificationKeyword?.status?.emailStatus,
  );

  const [idKeyWords, setIdKeywords] = useState<number[]>([]);

  const [openModalDeleteKeyword, setOpenModalDeleteKeyword] =
    React.useState(false);

  const refNotification = React.useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<any>();
  // const inputRef = useRef<InputRef>(null);

  // console.log("dataNotification", dataNotification);

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setLanguage(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi();
  }, [languageRedux]);

  const handleClickActiveSystem = (e: any) => {
    setActiveSystem(true);
    if (activeKeyword === true) {
      setActiveKeyword(false);
      setOpenModalDeleteKeyword(false);
    }
  };

  const handleClickActiveKeyword = (e: any) => {
    setActiveKeyword(true);
    if (activeSystem === true) setActiveSystem(false);
  };
  const getApiNotificate = async () => {
    try {
      setIsLoading(true);
      const result = await notificationApi.getNotificationV2(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setIsLoading(false);
        setDataNotification(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getApiNotificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApiNotificateKeyword = async () => {
    try {
      // const result = await notificationKeywordApi.getNotificationKeyword();
      const result = await notificationKeywordApi.getNotificationKeywordV3(
        languageRedux === 1 ? 'vi' : 'en',
      );
      // console.log('keyword v3', result);
      if (result) {
        setDataNotificationkeyword(result.data);
        setValueApp(result.data.status.pushStatus);
        setValueMall(result.data.status.emailStatus);
      }
    } catch (error) {}
  };
  const [dataNotificationAll, setDataNotificationAll] = useState<any>([]);

  const getApiNotificateKeywordAll = async () => {
    try {
      const result = await notificationKeywordApi.getNotificationKeyword('vi');
      // const result = await notificationKeywordApi.getNotificationKeywordV3(
      //   languageRedux === 1 ? 'vi' : 'en',
      // );
      // console.log('keyword v3', result);
      if (result) {
        setDataNotificationAll(result.data);
        setValueApp(result.data.status.pushStatus);
        setValueMall(result.data.status.emailStatus);
      }
    } catch (error) {}
  };

  console.log('dataNotificationAll', dataNotificationAll);

  useEffect(() => {
    getApiNotificateKeyword();
    getApiNotificateKeywordAll();
  }, [input, valueApp, valueMall]);

  const handleChangeStatusKeyword = async (id: number, status: number) => {
    try {
      const result = await notificationKeywordApi.putStatusNotification(
        id,
        status === 1 ? 0 : 1,
      );
      if (result) {
        setInput(!input);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    const handleCLoseNotificate = (event: any) => {
      event.stopPropagation();
      if (
        openNotificate &&
        !event.target.closest('.notification') &&
        !event.target.closest('.btn-notice')
      ) {
        setOpenNotificate(false);
      }
    };

    document.addEventListener('click', handleCLoseNotificate);

    return () => {
      document.removeEventListener('click', handleCLoseNotificate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickNotiKey = (postId: number) => {
    window.open(`post-detail?post-id=${postId}`, '_blank');
  };

  const handleClickNoty = (
    postId: number,
    applicationId: number,
    typeText: string,
  ) => {
    if (typeText === 'recruiter') {
      window.open(
        `candidate-detail?post-id=${postId}&application_id=${applicationId}`,
        '_parent',
      );
    }

    if (typeText === 'applicator') {
      window.open(`post-detail?post-id=${postId}`, '_parent');
    }

    if (typeText === 'communicationComment') {
      window.open(`post-detail?post-id=${postId}`, '_parent');
    }
  };

  const handleChangeEmail = async (e: any) => {
    console.log(e.target.value);
    try {
      const result = await notificationKeywordApi.putPlatform(
        parseInt(e.target.value) === 1 ? 0 : 1,
        valueApp ? 1 : 0,
      );
      if (result) {
        if (parseInt(e.target.value) === 1) {
          setValueMall(0);
        } else {
          setValueMall(1);
        }
      } else {
        setValueMall(e.target.value);
      }
    } catch (error) {
      setValueMall(e.target.value);
    }
  };

  const handleChangeApp = async (e: any) => {
    try {
      const result = await notificationKeywordApi.putPlatform(
        valueMall,
        parseInt(e.target.value) === 1 ? 0 : 1,
      );

      if (result) {
        if (parseInt(e.target.value) === 1) {
          setValueApp(0);
        } else {
          setValueApp(1);
        }
      }
    } catch (error) {
      setValueApp(valueApp);
    }
  };

  const handleClickItemKeyword = (idKeyword: number) => {
    // Kiểm tra nếu idKeyword đã tồn tại trong mảng idKeywords
    if (idKeyWords.includes(idKeyword)) {
      // Xóa idKeyword khỏi mảng bằng cách sử dụng filter
      const filteredIds = idKeyWords.filter((id: number) => id !== idKeyword);
      setIdKeywords(filteredIds);
    } else {
      // Nếu idKeyword không tồn tại, thêm nó vào mảng
      setIdKeywords((prevIds) => [...prevIds, idKeyword]);
    }
  };

  const handleOpenModalDeleteKeyWord = () => {
    if (true) {
      setOpenModalDeleteKeyword(!openModalDeleteKeyword);
    } else {
      setOpenModalDeleteKeyword(!openModalDeleteKeyword);
    }
  };

  const handleClickDeleteItemKeyword = async () => {
    try {
      const result = await notificationKeywordApi.deleteKeyword(idKeyWords);
      if (result) {
        getApiNotificateKeyword();
        setOpenModalDeleteKeyword(false);
      }
    } catch (error) {
      console.log('error', error);
      setOpenModalDeleteKeyword(false);
    }
  };

  const handleClose = () => {
    setOpenModalDeleteKeyword(false);
  };

  console.log('DataNotification', dataNotification);
  console.log('dataNotificationKeyword', dataNotificationKeyword);

  return (
    <div className="notification" ref={refNotification}>
      <div className="top-notificate">
        <div
          className={`top-notificate_system ${
            activeSystem ? 'active-system' : ''
          }`}
          onClick={handleClickActiveSystem}
        >
          {language?.notification}
        </div>
        <div
          className={`top-notificate_keyword ${
            activeKeyword ? 'active-keyword' : ''
          }`}
          onClick={handleClickActiveKeyword}
        >
          {language?.keyword2}
        </div>
      </div>
      <div className="bottom-notificate">
        {isLoading ? (
          <CircularProgress sx={{ marginTop: '50%', color: '#0d99ff' }} />
        ) : activeSystem ? (
          dataNotification?.notifications?.map(
            (notificate: any, index: number) => {
              if (notificate.data.typeText === 'keyword') {
                return (
                  <div
                    key={index}
                    className="wrap-system"
                    onClick={() => handleClickNotiKey(notificate.data.postId)}
                  >
                    <div className="wrap-img_keyword">
                      <img
                        src={notificate.data.image}
                        alt={language?.err_none_img}
                      />
                    </div>
                    <div className="content-notificate">
                      <div className="wrap-title_contentNotificate">
                        <Tooltip
                          placement="top"
                          title={notificate.data.postTitle}
                        >
                          <h3>{notificate.data.postTitle}</h3>
                        </Tooltip>
                        {notificate.data.companyResource.log ? (
                          <img
                            src={notificate.data.companyResource.logo}
                            alt=""
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <Tooltip
                        placement="top"
                        title={notificate.data.companyResource.companyName}
                      >
                        <h5>{notificate.data.companyResource.companyName}</h5>
                      </Tooltip>
                      <ul>
                        <Tooltip
                          placement="top"
                          title={`${notificate.data.location.province.name}, ${notificate.data.location.district.name}`}
                        >
                          <li>
                            {/* <LocationIcon /> */}
                            <LocationHomeIcon />
                            <p>
                              {`${notificate.data.location.province.name}, ${notificate.data.location.district.name}`}
                            </p>
                          </li>
                        </Tooltip>
                        <li>
                          <CateIcon />
                          <p>
                            {notificate.data.category.map(
                              (cate: any, index: number) => {
                                return `${cate.child_category}${' '}`;
                              },
                            )}
                          </p>
                        </li>
                      </ul>
                      <div className="time-content_keyword">
                        <div className="wrap-time">
                          <p>
                            {new Date(
                              notificate.data.createdAt,
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          <p>
                            {new Date(
                              notificate.data.createdAt,
                            ).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        <p>{notificate.data.jobType.name}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="wrap-notificate_system"
                    onClick={() =>
                      handleClickNoty(
                        notificate.data.postId,
                        notificate.data.applicationId,
                        notificate.data.typeText,
                      )
                    }
                  >
                    <h3>{notificate.content_app.title}</h3>
                    <h5
                      dangerouslySetInnerHTML={{
                        __html: notificate.content_app.body,
                      }}
                    />
                    <div className="wrap-time">
                      <p>
                        {new Date(notificate.data.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </p>
                      <p>
                        {new Date(notificate.data.createdAt).toLocaleDateString(
                          'en-GB',
                        )}
                      </p>
                    </div>
                  </div>
                );
              }
            },
          )
        ) : (
          <div className="wrap-keyword">
            <p>{language?.get_job_listings_by_keyword_via}</p>
            <div className="wrap-checkbox_keyword">
              <div className="checkbox-keyword">
                <input
                  type="checkbox"
                  name="app"
                  id="app"
                  value={valueApp}
                  disabled
                  onChange={handleChangeApp}
                  checked={valueApp === 1 ? true : false}
                  style={{ cursor: 'not-allowed' }}
                />
                <label htmlFor="app" style={{ color: '#ccc' }}>
                  App
                </label>
              </div>
              <div className="checkbox-keyword">
                <input
                  type="checkbox"
                  id="email"
                  value={valueMall}
                  name="email"
                  onChange={handleChangeEmail}
                  checked={valueMall === 1 ? true : false}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="count-keyword">
              <p>
                {language?.there_are_has_been_saved}
                <strong>{` ${
                  dataNotificationKeyword.keywords.length > 0
                    ? dataNotificationKeyword.keywords.length
                    : 0
                }/10 `}</strong>
                {language?.keywords_has_been_saved}
              </p>
            </div>
            {dataNotificationKeyword ? (
              dataNotificationKeyword?.keywords?.map(
                (dataKeyword: any, index: number) => (
                  <div
                    className={`wrap-content_keyword ${
                      idKeyWords?.includes(dataKeyword?.id) ? 'selected' : ''
                    }`}
                    key={index}
                  >
                    <div
                      className="content_keyword"
                      onClick={() => handleClickItemKeyword(dataKeyword?.id)}
                    >
                      <Tooltip title={dataKeyword.keyword} placement="top">
                        <h3>{dataKeyword.keyword}</h3>
                      </Tooltip>
                      <ul>
                        <li>
                          <LocationHomeIcon />
                          {/* <p>{`${dataKeyword.province.name}, ${dataKeyword.district.name}`}</p> */}
                          <Tooltip
                            title={dataKeyword.keywordDistricts.map(
                              (location: any, index: number) => {
                                return `${location.fullName}${
                                  index ===
                                  dataKeyword.keywordDistricts.length - 1
                                    ? ''
                                    : ', '
                                }`;
                              },
                            )}
                            placement="top"
                          >
                            <p>
                              {dataKeyword.keywordDistricts.map(
                                (location: any, index: number) => {
                                  return `${location.fullName}${
                                    index ===
                                    dataKeyword.keywordDistricts.length - 1
                                      ? ''
                                      : ', '
                                  }`;
                                },
                              )}
                            </p>
                          </Tooltip>
                        </li>
                        <li>
                          <CateIcon />
                          {/* <p>{`${dataKeyword.category.name}`}</p> */}
                          <Tooltip
                            title={dataKeyword.keywordCategories.map(
                              (cate: any, index: number) => {
                                return `${cate.fullName}${
                                  index ===
                                  dataKeyword.keywordCategories.length - 1
                                    ? ''
                                    : ', '
                                }`;
                              },
                            )}
                            placement="top"
                          >
                            <p>
                              {dataKeyword.keywordCategories.map(
                                (cate: any, index: number) => {
                                  return `${cate.fullName}${
                                    index ===
                                    dataKeyword.keywordCategories.length - 1
                                      ? ''
                                      : ', '
                                  }`;
                                },
                              )}
                            </p>
                          </Tooltip>
                        </li>
                      </ul>
                      <div className="wrap-time_keyword">
                        <p>
                          {new Date(dataKeyword.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                        </p>

                        <p>
                          {new Date(dataKeyword.createdAt).toLocaleDateString(
                            'en-GB',
                          )}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={dataKeyword.status === 1 ? true : false}
                      checkedChildren=""
                      unCheckedChildren=""
                      onChange={() =>
                        handleChangeStatusKeyword(
                          dataKeyword.id,
                          dataKeyword.status,
                        )
                      }
                    />
                  </div>
                ),
              )
            ) : (
              <></>
            )}
          </div>
        )}
        <div
          className={`modal-delete_keyword ${
            openModalDeleteKeyword && !activeSystem
              ? 'open-modal_deleteKeyword'
              : ''
          }`}
        >
          <h4>{language?.delete_this_keyword}</h4>
          <p>{language?.keywords_will_not_be_recoverable_after_deletion}</p>
          <Button
            type="primary"
            className="submit-delete_submitKeyWord"
            onClick={handleClickDeleteItemKeyword}
          >
            {language?.ok1}
          </Button>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="wrap-icon_deleteKeyword"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {/* {activeKeyword ? (
        <div
          className="create-keyword"
          onClick={() => setShowCreateNotification(!showCreateNotification)}
        >
          <CreateKeywordIcon />
        </div>
      ) : (
        <></>
      )} */}

      {idKeyWords.length > 0 && !activeSystem ? (
        <div
          className="icon-delele_keyword"
          onClick={handleOpenModalDeleteKeyWord}
        >
          <DeleteKeywordIcon />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(Notificate);
