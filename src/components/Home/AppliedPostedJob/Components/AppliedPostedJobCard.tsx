import React from 'react';

import { useDispatch } from 'react-redux';
//import scss

//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

import { BackIcon } from '#components/Icons';

import { LocationHomeIcon, ClockIcon, BagHomeIcon } from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';
import { setDataCheckPost } from 'store/reducer/checkPost';
// import bookMarkApi from 'api/bookMarkApi';

const AppliedPostedJobCard: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [error, setError] = React.useState(false);
  // const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const checkPost = useSelector((state: RootState) => state.checkPost.data);
  const handleClickItem = async (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
    type: string,
  ) => {
    // window.open(`/post-detail?post-id=${id}`);
    // type === 'application'
    //   ? window.open(`/post-detail?post-id=${id}`, '_blank')
    //   : window.open(`/history?post=2`, '_parent');
    if (type === 'application') {
      window.open(`/post-detail?post-id=${id}`, '_blank');
    } else {
      window.open(`/history?post=2`, '_parent');
      await dispatch<any>(setDataCheckPost(props.item));
    }
  };

  // console.log(checkPost);

  const handleImageError = () => {
    setError(true);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          cursor: 'pointer',
          gap: '8px',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
        }}
        className="applied-posted-card"
        onClick={(e) => {
          handleClickItem(e, props.item.post_id, props.type);
        }}
      >
        <div
          style={{ display: props.type === 'post' ? 'block' : 'none' }}
          className="applied-posted-card_bag"
        >
          <BagHomeIcon width={24} height={24} />
        </div>
        <div className="applied-posted-card_top">
          <ImageListItem
            key={props.item.image}
            sx={{
              flex: 1,
              display: 'flex',
              width: '80px !important',
              height: '80px !important',
              minWidth: '80px !important',
              minHeight: '80px !important',
            }}
          >
            <img
              src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item.title}
              //loading="lazy"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: 10,
                minWidth: '80px',
              }}
            />
          </ImageListItem>
          <div className="div-card-post-info">
            <div className="div-card-post-info_left">
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
              <Tooltip placement="top" title={props.item.company_name}>
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
                  {props?.item?.company_name}
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
                  {`${props.item.district}, ${props.item.province}`}
                </Typography>
              </div>
              <div
                style={{
                  display: props.item.start_time ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <ClockIcon />
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
                  {new Date(props.item.start_time).toLocaleDateString('en-GB')}-
                  {new Date(props.item.end_time).toLocaleDateString('en-GB')}
                </Typography>
              </div>
            </div>
            <Space
              style={{
                justifyContent: 'space-between',
                display: props.type === 'application' ? 'flex' : 'none',
              }}
              direction="vertical"
              align="center"
              className="div-cardApplied-post-right"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div>
                  {!error && (
                    <img
                      className="img-resource-company"
                      src={
                        props.item.resource.company_icon
                          ? props.item.resource.company_icon
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
              <p style={{ fontSize: 12, fontWeight: 500, color: '#0d99ff' }}>
                {props.item.job_type.job_type_name}
              </p>
            </Space>
          </div>
        </div>
        <div className="applied-posted-card_bottom">
          <div className="applied-posted-card_date">
            <span
              style={{
                display: props.type === 'application' ? 'block' : 'none',
                fontSize: '12px',
              }}
            >
              {languageRedux === 1
                ? 'Đã nộp vào'
                : languageRedux === 2
                ? 'Submitted'
                : languageRedux === 3 && '신청일'}
              &nbsp;
              {new Date(props.item.created_at).toLocaleDateString('en-GB')}
              ,&nbsp;
              {moment(new Date(props.item.created_at)).format('HH:mm')}
            </span>
            <span
              style={{
                display: props.type === 'post' ? 'block' : 'none',
                fontSize: '12px',
              }}
            >
              <strong
                style={{
                  color: '#0d99ff',
                  fontSize: '12px',
                }}
              >
                {props.item.num_of_application}
              </strong>
              &nbsp;
              {languageRedux === 1
                ? 'ứng viên đã nộp hồ sơ'
                : languageRedux === 2
                ? 'applied candidate'
                : languageRedux === 3 && '지원자가 이력서를 제출했습니다'}
            </span>
          </div>
          <div
            style={{
              display: props.type === 'application' ? 'flex' : 'none',
              backgroundColor:
                props.item.application_status === 1
                  ? 'rgba(220, 220, 220, 1)'
                  : props.item.application_status === 2
                  ? 'rgba(92, 178, 101, 1)'
                  : props.item.application_status === 3
                  ? 'rgba(189, 49, 49, 1)'
                  : 'rgba(13, 153, 255, 1)',
              color:
                props.item.application_status === 1
                  ? '#575757'
                  : 'rgba(255, 255, 255, 1)',
              fontSize: '12px',
            }}
            className="button-approved"
          >
            {props.item.application_status === 1
              ? languageRedux === 1
                ? 'Đã ứng tuyển'
                : languageRedux === 2
                ? 'Applied'
                : languageRedux === 3 && '지원되였습니다.'
              : props.item.application_status === 2
              ? languageRedux === 1
                ? 'Đã được duyệt'
                : languageRedux === 2
                ? 'Approved'
                : languageRedux === 3 && '승인되였습니다.'
              : props.item.application_status === 3
              ? languageRedux === 1
                ? 'Đã từ chối'
                : languageRedux === 2
                ? 'Rejected'
                : languageRedux === 3 && '거부'
              : languageRedux === 1
              ? 'Đã được tuyển'
              : languageRedux === 2
              ? 'Hired'
              : languageRedux === 3 && '고용됨'}
          </div>
          <div
            style={{ display: props.type === 'post' ? 'flex' : 'none' }}
            className="button-check"
          >
            {languageRedux === 1
              ? 'Kiểm tra ngay'
              : languageRedux === 2
              ? 'Check now'
              : languageRedux === 3 && '지금 확인하세요'}
            <div className="icon">
              <BackIcon fill="white" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AppliedPostedJobCard;
