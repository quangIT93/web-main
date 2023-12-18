import React from 'react';

// import { useDispatch } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

//ANT

import {
  LocationHomeIcon,
  DolaIcon,
  SaveIconFill,
  SaveIconOutline,
} from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
import bookMarkApi from 'api/bookMarkApi';

import { PropsTypePostNew } from '../JobCardSaveHstory/interfacePostNew';
// import { historyVi } from 'validations/lang/vi/history';
// import { historyEn } from 'validations/lang/en/history';
// import bookMarkApi from 'api/bookMarkApi';

// import HomeValueContextProvider, {
//   HomeValueContext,
// } from 'context/HomeValueContextProvider';

interface IitemNewJob {
  item: PropsTypePostNew;
  index: number;
  language: any;
  languageRedux: any;
}

const JobCardViewPost: React.FC<IitemNewJob> = (props) => {
  // const {
  //   setOpenNotificate,
  //   openNotificate,
  // }: {
  //   setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
  //   openNotificate: boolean;
  // } = React.useContext(HomeValueContext);
  // const dispatch = useDispatch();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);
  const { language, languageRedux } = props;
  const [checkBookMark, setCheckBookMark] = React.useState(
    props.item?.bookmarked,
  );
  const [error, setError] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`, '_parent');
  };

  const handleImageError = () => {
    setError(true);
  };

  const handleBookmark = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (props.item?.bookmarked) {
      const result = await bookMarkApi.deleteBookMark(props.item?.id);
      if (result) {
        setCheckBookMark(!checkBookMark);
        props.item.bookmarked = false;
      }
    } else {
      const result = await bookMarkApi.createBookMark(props.item?.id);
      if (result) {
        setCheckBookMark(!checkBookMark);
        props.item.bookmarked = true;
      }
    }
  };

  return (
    <>
      <Card
        onClick={(e) => {
          handleClickItem(e, props.item.id);
        }}
        className="JobCardSaveHstory"
      >
        <ul className="div-card-post-left">
          <ImageListItem
            key={props.item.image}
            sx={{ flex: 1, display: 'flex' }}
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
                  {/* {props?.item?.title?.length > 50
                    ? `${props.item?.title.substring(0, 50)} ...`
                    : props.item?.title} */}
                  {props?.item?.title}
                </Typography>
              </Tooltip>
              <Tooltip placement="top" title={props.item?.companyName}>
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
                    ? `${props.item?.company_name.substring(0, 50)} ...`
                    : props.item?.company_name} */}
                  {props?.item?.companyName}
                </Typography>
              </Tooltip>
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
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    marginLeft: '4px',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  {`${props.item?.location?.district.fullName}, ${props.item?.location?.province.fullName}`}
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
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    marginLeft: '4px',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  {new Intl.NumberFormat('en-US').format(props.item?.salaryMin)}{' '}
                  {props?.item?.moneyType}-{' '}
                  {new Intl.NumberFormat('en-US').format(
                    props.item?.salaryMin,
                  ) +
                    ` ${props?.item?.moneyType}` +
                    `/${props.item?.salaryType?.name}`}
                </Typography>
              </div>
              <div
                style={{
                  marginTop: 5,
                }}
              >
                <p
                  style={{
                    color: '#AAAAAA',
                    fontSize: 12,
                    fontStyle: 'italic',
                    fontWeight: '400',
                  }}
                >
                  {props.item?.createdAtText}
                </p>
              </div>
            </div>
          </ImageListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '12px',
            }}
            className="box_history__job"
          >
            <p
              style={{
                color: '#001424',
                fontSize: 12,
                fontStyle: 'italic',
              }}
            >
              {languageRedux === 1
                ? 'Đã đăng vào lúc:'
                : languageRedux === 2
                ? 'Posted on:'
                : languageRedux === 3 && '에 게시 됨:'}{' '}
              {props.item?.createdAtText != null
                ? props.item?.createdAtText
                : languageRedux === 1
                ? 'Chưa cập nhật'
                : languageRedux === 2
                ? 'Not updated yet'
                : languageRedux === 3 && '업데이트하지 않음'}
            </p>
            {/* {props.item?.status === 1 ? (
              <p
                style={{
                  background: '#0D99FF',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '100px',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                {languageRedux === 1
                  ? 'Đang tuyển'
                  : languageRedux === 2
                  ? 'Recruiting'
                  : '현재 모집 중'}
              </p>
            ) : props.item?.status === 3 ? (
              <p
                style={{
                  background: '#aaaaaa',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '100px',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                {languageRedux === 1
                  ? 'Đã đóng'
                  : languageRedux === 2
                  ? 'Closed'
                  : '닫은'}
              </p>
            ) : (
              <p
                style={{
                  background: '#aaaaaa',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '100px',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                {languageRedux === 1
                  ? 'Không chấp nhận'
                  : languageRedux === 2
                  ? 'Does not accept'
                  : '수락하지 않음'}
              </p>
            )} */}
            <p
              style={{ fontSize: '12px', color: '#0d99ff', fontWeight: 500 }}
              className="history_jobTypeName"
            >
              {props.item.jobType?.name}{' '}
            </p>
          </Box>
        </ul>

        <Space
          style={{ justifyContent: 'space-between' }}
          direction="vertical"
          align="center"
          // className="div-card-post-right"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {' '}
            {}
            <div onClick={(e) => handleBookmark(e)}>
              {checkBookMark ? (
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
                    props.item.companyResourceData?.logo
                      ? props.item.companyResourceData?.logo
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
          {/* <p style={{ fontSize: 12, color: '#0d99ff', fontWeight: 500 }}>
            {props.item.job_type.job_type_name}
          </p> */}
        </Space>
      </Card>
    </>
  );
};

export default JobCardViewPost;
