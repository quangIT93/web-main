import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

import ModalLogin from '../../Home/ModalLogin';

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

import { PostNewest, PostNewestV3 } from '../NewJobs';
import { RootState } from 'store';
import noImage from '../../../img/noImage.png';
// import { HomeValueContext } from 'context/HomeValueContextProvider';

// import ShowNotificativeSave from '../../ShowNotificativeSave';
// interface IitemNewJob {
//   item: {
//     id: number;
//     post_id: Number;
//     title: string;
//     company_name: string;
//     image: string;
//     ward: string;
//     district: string;
//     province: string;
//     end_time: number;
//     start_time: number;
//     salary_max: number;
//     salary_min: number;
//     salary_type: string;
//     resource: {
//       company_icon: string;
//     };
//     job_type: {
//       job_type_name: string;
//     };
//     created_at_text: string;
//     bookmarked: boolean;
//   };
// }
interface Iprops {
  item: PostNewest;
}

interface IpropsV3 {
  item: PostNewestV3;
}

const JobCardV3: React.FC<IpropsV3> = (props) => {
  // const {
  //   setOpenNotificate,
  //   openNotificate,
  // }: {
  //   setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
  //   openNotificate: boolean;
  // } = React.useContext(HomeValueContext);
  const dispatch = useDispatch();
  const [checkBookMark, setCheckBookMark] = React.useState(
    props.item.bookmarked,
  );
  const [error, setError] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`, '_blank');
  };

  const handleImageError = () => {
    setError(true);
  };

  React.useEffect(() => {
    setCheckBookMark(props.item.bookmarked);
  }, [props.item]);

  if (props) {
    return (
      <>
        <ModalLogin
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        />
        <Card
          sx={{
            position: 'relative',
            minWidth: '100%',
            display: 'flex',
            padding: '12px',
            cursor: 'pointer',
            '&:hover': {
              background: '#E7E7ED',
              transition: 'all 0.3s linear',
            },
            // boxShadow: 'unset',
            borderRadius: '12px',
            justifyContent: 'space-between',
            // border: '1px solid #d9d9d9',
            backgroundColor: '#ffffff',
            background: '#ffffff',
            overlow: 'unset',
            boxShadow:
              '0px 2px 1px -1px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0)',
          }}
          onClick={(e) => {
            handleClickItem(e, props.item.id);
          }}
        >
          <ul className="div-card-post-left">
            <ImageListItem
              key={props.item.image}
              sx={{ flex: 1, display: 'flex' }}
            >
              <img
                // src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
                src={
                  props.item.image
                    ? `${props.item.image}?w=164&h=164&fit=crop&auto=format`
                    : `${noImage}`
                }
                alt={props.item.title}
                // //loading="lazy"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: 10,
                }}
              />
              <div className="div-card-post-left_info">
                {' '}
                <Tooltip placement="top" title={props.item.title}>
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
                      color: '#000000',
                    }}
                  >
                    {/* {props?.item?.title?.length > 50
                        ? `${props.item.title.substring(0, 50)} ...`
                        : props.item.title} */}
                    {props?.item?.title}
                  </Typography>
                </Tooltip>
                <Tooltip placement="top" title={props.item.companyName}>
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
                    {/* {props?.item?.company_name?.length > 50
                        ? `${props.item.company_name.substring(0, 50)} ...`
                        : props.item.company_name} */}
                    {props?.item?.companyName}
                  </Typography>
                </Tooltip>
                <div
                  className="text-card-post-left_info"
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
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      marginLeft: '4px',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    {`${props.item.location.district.fullName}, ${props.item.location.province.fullName}`}
                  </Typography>
                </div>
                {/* <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <ClockCircleFilled className="div-card-post-left_info__icon" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {moment(new Date(props.item.start_time)).format('HH:mm')} -{' '}
                    {moment(new Date(props.item.end_time)).format('HH:mm')}
                  </Typography>
                </div> */}
                <div
                  className="text-card-post-left_info"
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
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      marginLeft: '4px',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    {new Intl.NumberFormat('en-US').format(
                      props.item.salaryMin,
                    )}{' '}
                    {props?.item?.moneyType} -{' '}
                    {new Intl.NumberFormat('en-US').format(
                      props.item.salaryMax,
                    ) +
                      ` ${props?.item?.moneyType}` +
                      `/${props.item.salaryType.name}`}
                  </Typography>
                </div>
                <div
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
                    {props.item.createdAtText}
                  </p>
                </div>
              </div>
            </ImageListItem>
          </ul>

          <Space
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
                    // console.log('props.item, ', props.item);

                    if (!localStorage.getItem('accessToken')) {
                      setOpenModalLogin(true);
                      return;
                    }
                    if (checkBookMark) {
                      const result = await bookMarkApi.deleteBookMark(
                        props.item.id,
                      );
                      // props.item.bookmarked = false;
                      if (result) {
                        setCheckBookMark(false);
                        dispatch<any>(setAlertCancleSave(true));
                      }
                    } else {
                      const result = await bookMarkApi.createBookMark(
                        props.item.id,
                      );
                      // props.item.bookmarked = true;
                      if (result) {
                        dispatch<any>(setAlertSave(true));
                        setCheckBookMark(true);
                      }
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {checkBookMark ? (
                  <SaveIconFill width={24} height={24} />
                ) : (
                  <SaveIconOutline width={24} height={24} />
                )}
              </div>
              <div>
                {props.item.companyResourceData.logo ? (
                  <img
                    className="img-resource-company"
                    src={
                      props.item.companyResourceData.logo
                        ? props.item.companyResourceData.logo
                        : ''
                    }
                    alt={
                      languageRedux === 1
                        ? 'Hình ảnh bị lỗi'
                        : languageRedux === 2
                          ? 'Image is corrupted'
                          : '이미지가 손상되었습니다'
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#0d99ff', fontWeight: 500 }}>
              {props.item.jobType.name}
            </p>
          </Space>
        </Card>
      </>
    );
  } else {
    return <></>;
  }
};

export default JobCardV3;
