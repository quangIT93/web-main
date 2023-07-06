import React, { useState, useEffect } from 'react';
// import ReactHtmlParser from 'react-html-parser'

import { Space, Tooltip, Input, Switch } from 'antd';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, lighten, darken } from '@mui/system';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  NativeSelect,
  ListSubheader,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Autocomplete,
  Box,
  Chip,
  ListItemButton,
  Collapse,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import Api
import notificationApi from 'api/notification';
import notificationKeywordApi from 'api/notificationKeyword';
import locationApi from '../../../api/locationApi';

import { LocationIcon, CateIcon, CreateKeywordIcon } from '#components/Icons';

import './style.scss';
// import fake data notificates
import { notificates } from './data';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Notificate = () => {
  const [dataNotification, setDataNotification] = useState<any>([]);
  const [dataNotificationKeyword, setDataNotificationkeyword] = useState<any>(
    [],
  );

  const [activeSystem, setActiveSystem] = useState(true);
  const [activeKeyword, setActiveKeyword] = useState(false);

  const [input, setInput] = useState(true);

  // const inputRef = useRef<InputRef>(null);

  const handleClickActiveSystem = () => {
    setActiveSystem(true);
    if (activeKeyword === true) setActiveKeyword(false);
  };

  const handleClickActiveKeyword = () => {
    setActiveKeyword(true);
    if (activeSystem === true) setActiveSystem(false);
  };
  const getApiNotificate = async () => {
    try {
      const result = await notificationApi.getNotificationV2();
      if (result) {
        setDataNotification(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getApiNotificate();
  }, []);

  const getApiNotificateKeyword = async () => {
    try {
      const result = await notificationKeywordApi.getNotificationKeyword();
      if (result) {
        setDataNotificationkeyword(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getApiNotificateKeyword();
  }, [input]);

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

  return (
    <div className="notification">
      <div className="top-notificate">
        <div
          className={`top-notificate_system ${
            activeSystem ? 'active-system' : ''
          }`}
          onClick={handleClickActiveSystem}
        >
          Thông báo
        </div>
        <div
          className={`top-notificate_keyword ${
            activeKeyword ? 'active-keyword' : ''
          }`}
          onClick={handleClickActiveKeyword}
        >
          Từ khoá
        </div>
      </div>
      <div className="bottom-notificate">
        {activeSystem ? (
          dataNotification?.notifications?.map(
            (notificate: any, index: number) => {
              if (notificate.data.typeText === 'keyword') {
                return (
                  <div key={index} className="wrap-system">
                    <div className="wrap-img_keyword">
                      <img src={notificate.data.image} alt="ảnh lỗi" />
                    </div>
                    <div className="content-notificate">
                      <div className="wrap-title_contentNotificate">
                        <Tooltip
                          placement="top"
                          title={notificate.data.postTitle}
                        >
                          <h3>{notificate.data.postTitle}</h3>
                        </Tooltip>
                        <img
                          src={notificate.data.companyResource.logo}
                          alt=""
                        />
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
                            <LocationIcon />
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
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <p>{notificate.data.jobType.name}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="wrap-notificate_system">
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
                        {new Date(
                          notificate.data.createdAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              }
            },
          )
        ) : (
          <div className="wrap-keyword">
            {/* <p>
              Bạn muốn nhận danh sách công việc theo từ khóa tìm kiếm nhanh
              chóng qua:
            </p>
            <div className="wrap-checkbox_keyword">
              <div className="checkbox-keyword">
                <input type="checkbox" id="email" value="email" name="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="checkbox-keyword">
                <input type="checkbox" name="app" id="app" value="app" />
                <label htmlFor="app">APP</label>
              </div>
            </div> */}
            <div className="count-keyword">
              <p>
                Bạn đã lưu trữ được:
                <strong>{` ${dataNotificationKeyword?.keywords?.length}/10 `}</strong>
                gợi ý công việc
              </p>
            </div>

            {dataNotificationKeyword ? (
              dataNotificationKeyword?.keywords?.map(
                (dataKeyword: any, index: number) => (
                  <div className="wrap-content_keyword" key={index}>
                    <div className="content_keyword">
                      <h3>{dataKeyword.keyword}</h3>
                      <ul>
                        <li>
                          <LocationIcon />
                          <p>{`${dataKeyword.province.name}, ${dataKeyword.district.name}`}</p>
                        </li>
                        <li>
                          <CateIcon />
                          <p>{`${dataKeyword.category.name}`}</p>
                        </li>
                      </ul>
                      <div className="wrap-time_keyword">
                        <p>
                          {new Date(dataKeyword.created_at).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                        </p>

                        <p>
                          {new Date(
                            dataKeyword.created_at,
                          ).toLocaleDateString()}
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
    </div>
  );
};

export default Notificate;
