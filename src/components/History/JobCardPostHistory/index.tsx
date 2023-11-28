import React from 'react';

// import { useDispatch } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

import { LocationHomeIcon, DolaIcon } from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
// import bookMarkApi from 'api/bookMarkApi';

// import HomeValueContextProvider, {
//   HomeValueContext,
// } from 'context/HomeValueContextProvider';

// import ShowNotificativeSave from '../../ShowNotificativeSave';
interface IitemNewJob {
  item: {
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
    created_at: number;
    status: number;
    num_of_application: number;
    bookmarked: boolean;
    money_type_text: string;
  };
  handleShowDetail: (event: any, params: any) => any;
  isHide: boolean;
  language: any;
  languageRedux: any;
}

const JobCardPostHistory: React.FC<IitemNewJob> = (props) => {
  // const {
  //   setOpenNotificate,
  //   openNotificate,
  // }: {
  //   setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
  //   openNotificate: boolean;
  // } = React.useContext(HomeValueContext);
  const { language, languageRedux } = props;

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px',
          cursor: 'pointer',
          margin: '10px 0',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
        }}
        onClick={(e) => {
          props.handleShowDetail(e, props.item);
        }}
      >
        <ul className="div-card-post-left">
          <ImageListItem
            key={props.item.image}
            sx={{ flex: 1, display: 'flex' }}
          >
            <img
              src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item.title}
              //loading="lazy"
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
                    color: '#575757',
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
                  {new Intl.NumberFormat('en-US').format(props.item.salary_min)}{' '}
                  {props?.item?.money_type_text}-{' '}
                  {new Intl.NumberFormat('en-US').format(
                    props.item.salary_max,
                  ) +
                    ` ${props?.item?.money_type_text}` +
                    `/${props.item.salary_type}`}
                </Typography>
              </div>
              {/* <div
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
                  categories thiếu data
                </Typography>
              </div> */}
              <div
                style={{
                  marginTop: 5,
                }}
              >
                <p
                  style={{
                    color: '#aaaaaa',
                    fontSize: 12,
                    fontStyle: 'italic',
                    fontWeight: '400',
                  }}
                >
                  {props.item.created_at_text}
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
          >
            <p
              style={{
                color: '#001424',
                fontSize: 12,
                fontStyle: 'italic',
                fontWeight: '400',
              }}
            >
              {languageRedux === 1
                ? 'Đã đăng vào lúc:'
                : languageRedux === 2
                  ? 'Posted on:'
                  : languageRedux === 3 && '에 게시 됨:'}{' '}
              {props.item?.created_at != null
                ? moment(props.item?.created_at).format('DD/MM/YYYY') +
                ' ' +
                moment(new Date(props.item?.created_at)).format('HH:mm')
                : languageRedux === 1
                  ? 'Chưa cập nhật'
                  : languageRedux === 2
                    ? 'Not updated yet'
                    : languageRedux === 3 && '업데이트하지 않음'}
            </p>

            <p
              style={{
                background: '#5cb265',
                padding: '4px 12px',
                borderRadius: '15px',
                color: '#ffffff',
                marginLeft: '30px',
                display: props.isHide ? 'none' : 'block',
                fontSize: '12px',
              }}
            >
              {props.item.num_of_application}{' '}
              {props.item.num_of_application <= 1
                ? languageRedux === 1
                  ? 'đơn ứng tuyển'
                  : languageRedux === 2
                    ? 'application'
                    : '단일 적용'
                :
                languageRedux === 1
                  ? 'đơn ứng tuyển'
                  : languageRedux === 2
                    ? 'applications'
                    : '단일 적용'
              }
            </p>
            {props.item.status === 1 ? (
              <p
                style={{
                  background: '#0D99FF',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '30px',
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
            ) : props.item.status === 3 ? (
              <p
                style={{
                  background: '#aaaaaa',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '30px',
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
                  marginLeft: '30px',
                  fontSize: '12px',
                }}
              >
                {languageRedux === 1
                  ? 'Không chấp nhận'
                  : languageRedux === 2
                    ? 'Does not accept'
                    : '수락하지 않음'}
              </p>
            )}
          </Box>
        </ul>

        <Space
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
          direction="vertical"
          align="center"
          className="div-card-post-right"
        >
          {/* <div
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
                                    if (props.item.bookmarked) {
                                        const result = await bookMarkApi.deleteBookMark(
                                            props.item.id,
                                        );
                                        props.item.bookmarked = false;
                                        if (result) {
                                            setCheckBookMark(!checkBookMark);
                                            dispatch<any>(setAlertCancleSave(true));
                                        }
                                    } else {
                                        const result = await bookMarkApi.createBookMark(
                                            props.item.id,
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
                            {props.item.bookmarked ? (
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
                                        props.item.resource.company_icon
                                            ? props.item.resource.company_icon
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
                    </div> */}
          <p style={{ fontSize: 12, color: '#0d99ff', fontWeight: 500 }}>
            {props.item.job_type.job_type_name}
          </p>
        </Space>
      </Card>
    </>
  );
};

export default JobCardPostHistory;
