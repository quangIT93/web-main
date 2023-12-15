import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

import ModalLogin from '#components/Home/ModalLogin';

//ANT

import { setAlertCancleSave, setAlertSave } from 'store/reducer/alertReducer';

import {
  LocationHomeIcon,
  DolaIcon,
  SaveIconOutline,
  SaveIconFill,
} from '#components/Icons';

import { Space, Tooltip } from 'antd';

// import moment from 'moment';
import bookMarkApi from 'api/bookMarkApi';
import { RootState } from 'store';

interface PostMore {
  id: number;
  post_id: Number;
  title: string;
  company_name: string;
  image: string;
  ward: string;
  district: string;
  province: string;
  end_time: number;
  start_time: number;
  salary_max: number;
  salary_min: number;
  salary_type: string;
  resource: {
    company_icon: string;
  };
  job_type: {
    job_type_name: string;
  };
  created_at_text: string;
  bookmarked: boolean;
  money_type_text: string;
}

interface Iprops {
  item: any;
}

const JobCardMoreJob: React.FC<any> = (props) => {
  // const {
  //   setOpenNotificate,
  //   openNotificate,
  // }: {
  //   setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
  //   openNotificate: boolean;
  // } = React.useContext(HomeValueContext);
  const dispatch = useDispatch();
  const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const location = useLocation();

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (location.pathname === '/post-detail') {
      window.open(`/post-detail?post-id=${id}`, '_parent');
    } else {
      window.open(`/post-detail?post-id=${id}`, '_blank');
    }
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px',
          cursor: 'pointer',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
          overflow: 'unset',
        }}
        onClick={(e) => {
          handleClickItem(e, props.item?.id);
        }}
      >
        <ul className="div-card-post-left">
          <ImageListItem
            key={props.item?.image}
            sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}
          >
            <img
              src={`${props.item?.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.item?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item?.title}
              //loading="lazy"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: 10,
              }}
            />
            <div className="div-card-post-left_info">
              {/* {' '} */}
              <div className="div-card-post-left_info__title">
                <Tooltip placement="top" title={props.item?.title}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: '16px',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontWeight: '700',
                      lineheight: '20px',
                      color: '#575757',
                    }}
                  >
                    {props?.item?.title}
                  </Typography>
                </Tooltip>
                <div
                  onClick={async (e) => {
                    try {
                      e.stopPropagation();
                      if (!localStorage.getItem('accessToken')) {
                        setOpenModalLogin(true);
                        return;
                      }
                      if (props.item?.bookmarked) {
                        const result = await bookMarkApi.deleteBookMark(
                          props.item?.id,
                        );
                        props.item.bookmarked = false;
                        if (result) {
                          setCheckBookMark(!checkBookMark);
                          dispatch<any>(setAlertCancleSave(true));
                        }
                      } else {
                        const result = await bookMarkApi.createBookMark(
                          props.item?.id,
                        );
                        props.item.bookmarked = true;
                        if (result) {
                          dispatch<any>(setAlertSave(true));
                          setCheckBookMark(!checkBookMark);
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {props.item?.bookmarked ? (
                    <SaveIconFill width={24} height={24} />
                  ) : (
                    <SaveIconOutline width={24} height={24} />
                  )}
                </div>
              </div>
              <div className="div-card-post-left_info__name">
                <Tooltip placement="top" title={props.item?.company_name}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontWeight: '400',
                      lineheight: '16px',
                      color: '#575757',
                    }}
                  >
                    {props?.item?.company_name}
                  </Typography>
                </Tooltip>
                <div>
                  {props.item?.resource?.company_icon && (
                    <img
                      className="img-resource-company"
                      src={
                        props.item?.resource?.company_icon
                          ? props.item?.resource?.company_icon
                          : ''
                      }
                      alt={
                        languageRedux === 1
                          ? 'Hình ảnh bị lỗi'
                          : languageRedux === 2
                            ? 'Image is corrupted'
                            : '이미지가 손상되었습니다'
                      }
                      onError={handleImageError}
                    />
                  )}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <LocationHomeIcon />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    marginLeft: '4px',
                  }}
                >
                  {`${props.item.district}, ${props.item.province}`}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <DolaIcon />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    marginLeft: '4px',
                  }}
                >
                  {new Intl.NumberFormat('en-US').format(props.item.salary_min)}{' '}
                  {props?.item?.money_type_text} -{' '}
                  {new Intl.NumberFormat('en-US').format(
                    props.item.salary_max,
                  ) +
                    ` ${props?.item?.money_type_text}` +
                    `/${props.item.salary_type}`}
                </Typography>
              </div>
              <div
                className="div-card-post-left_info__jobtype"
                style={{
                  margin: '5px 0 0 0',
                }}
              >
                <p
                  style={{
                    color: '#575757',
                    fontSize: 12,
                    fontStyle: 'italic',
                    fontWeight: '400',
                  }}
                >
                  {props.item.created_at_text}
                </p>
                <p style={{ fontSize: 13, color: '#0d99ff' }}>
                  {props.item.job_type.job_type_name}
                </p>
              </div>
            </div>
          </ImageListItem>
        </ul>

        {/* <Space
              style={{ justifyContent: 'space-between' }}
              direction="vertical"
              align="center"
              className="div-card-post-right"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div
                  onClick={async (e) => {
                    try {
                      e.stopPropagation();
                      if (props.item?.bookmarked) {
                        const result = await bookMarkApi.deleteBookMark(
                          props.item?.id,
                        );
                        props.item.bookmarked = false;
                        if (result) {
                          setCheckBookMark(!checkBookMark);
                          dispatch<any>(setAlertCancleSave(true));
                        }
                      } else {
                        const result = await bookMarkApi.createBookMark(
                          props.item?.id,
                        );
                        props.item.bookmarked = true;
                        if (result) {
                          dispatch<any>(setAlertSave(true));
                          setCheckBookMark(!checkBookMark);
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {props.item?.bookmarked ? (
                    <SaveIconFill width={24} height={24} />
                  ) : (
                    <SaveIconOutline width={24} height={24} />
                  )}
                </div>
                <div>
                  {!error && (
                    <img
                      className="img-resource-company"
                      src={
                        props.item?.companyResourceData?.logo
                          ? props.item?.companyResourceData?.logo
                          : ''
                      }
                      alt={languageRedux === 1
                  ? 'Hình ảnh bị lỗi'
                  : languageRedux === 2
                    ? 'Image is corrupted'
                    : '이미지가 손상되었습니다'}
                      onError={handleImageError}
                    />
                  )}
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#0d99ff' }}>
                {props.item?.jobType?.name}
              </p>
            </Space> */}
      </Card>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </>
  );
};

export default JobCardMoreJob;
