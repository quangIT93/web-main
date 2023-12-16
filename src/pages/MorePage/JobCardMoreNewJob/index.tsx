import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';

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

import ModalLogin from '../../../components/Home/ModalLogin';
import { RootState } from 'store';
// import ShowNotificativeSave from '#components/ShowNotificativeSave';

interface PostMoreJob {
  id: number;
  address: string;
  bookmarked: boolean;
  companyName: string;
  companyResourceData: {
    id: number;
    logo: string;
    name: string;
  };
  createdAtText: string;
  image: string;
  jobType: {
    id: number;
    name: string;
  };
  location: {
    district: {
      id: number;
      fullName: string;
    };
    province: {
      id: number;
      fullName: string;
    };
    ward: {
      id: number;
      fullName: string;
    };
  };
  moneyType: string;
  salaryMax: number;
  salaryMin: number;
  salaryType: {
    id: number;
    name: string;
  };
  title: string;
}

interface Iprops {
  item: any;
}

const JobCardMoreNewJob: React.FC<Iprops> = (props) => {
  const dispatch = useDispatch();
  const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [infor, setInfor] = React.useState<any>();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  React.useEffect(() => {
    setInfor(props.item);
  }, [props.item]);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`);
  };

  const handleImageError = (image: string | null) => {
    if (image) {
      setError(true);
    }
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
          handleClickItem(e, infor?.id);
        }}
      >
        <ul className="div-card-post-left">
          <ImageListItem
            key={infor?.image}
            sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}
          >
            <img
              src={`${infor?.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${infor?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={infor?.title}
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
                <Tooltip placement="top" title={infor?.title}>
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
                    {infor?.title}
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
                      if (infor?.bookmarked) {
                        const result = await bookMarkApi.deleteBookMark(
                          infor?.id,
                        );
                        infor.bookmarked = false;
                        if (result) {
                          setCheckBookMark(!checkBookMark);
                          dispatch<any>(setAlertCancleSave(true));
                        }
                      } else {
                        const result = await bookMarkApi.createBookMark(
                          infor?.id,
                        );
                        infor.bookmarked = true;
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
                  {infor?.bookmarked ? (
                    <SaveIconFill width={24} height={24} />
                  ) : (
                    <SaveIconOutline width={24} height={24} />
                  )}
                </div>
              </div>
              <div className="div-card-post-left_info__name">
                <Tooltip placement="top" title={infor?.companyName}>
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
                    {infor?.companyName}
                  </Typography>
                </Tooltip>
                <div>
                  {infor?.resource?.company_icon && (
                    <img
                      className="img-resource-company"
                      src={
                        infor?.resource?.company_icon
                          ? infor?.resource?.company_icon
                          : ''
                      }
                      alt={
                        languageRedux === 1
                          ? 'Hình ảnh bị lỗi'
                          : languageRedux === 2
                          ? 'Image is corrupted'
                          : '이미지가 손상되었습니다'
                      }
                      onError={() =>
                        handleImageError(infor?.resource?.company_icon)
                      }
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
                  {`${infor?.location?.district?.fullName}, 
                                    ${infor?.location?.province?.fullName}`}
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
                  {new Intl.NumberFormat('en-US').format(infor?.salaryMin)}{' '}
                  {infor?.moneyType} -{' '}
                  {new Intl.NumberFormat('en-US').format(infor?.salaryMax) +
                    ` ${infor?.moneyType}` +
                    `/${infor?.salaryType?.name}`}
                </Typography>
              </div>
              <div
                className="div-card-post-left_info__jobtype"
                style={{
                  marginTop: 5,
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
                  {infor?.createdAtText}
                </p>
                <p style={{ fontSize: 13, color: '#0d99ff' }}>
                  {infor?.jobType?.name}
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
                  if (infor?.bookmarked) {
                    const result = await bookMarkApi.deleteBookMark(
                      infor?.id,
                    );
                    infor.bookmarked = false;
                    if (result) {
                      setCheckBookMark(!checkBookMark);
                      dispatch<any>(setAlertCancleSave(true));
                    }
                  } else {
                    const result = await bookMarkApi.createBookMark(
                      infor?.id,
                    );
                    infor.bookmarked = true;
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
              {infor?.bookmarked ? (
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
                    infor?.companyResourceData?.logo
                      ? infor?.companyResourceData?.logo
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
            {infor?.jobType?.name}
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

export default JobCardMoreNewJob;
