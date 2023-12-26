import React from 'react';

//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

import SubIcon from '../CardsPosted/SubIcon';

// import { setAlertCancleSave, setAlertSave } from 'store/reducer/alertReducer';

import { LocationHomeIcon, DolaIcon, WorkPostIcon } from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
import noImage from '../../../img/noImage.png';
// import { historyVi } from 'validations/lang/vi/history';
// import { historyEn } from 'validations/lang/en/history';
// import bookMarkApi from 'api/bookMarkApi';

// import ShowNotificativeSave from '../../ShowNotificativeSave';
interface IitemNewJob {
  // item: {
  //   id: number;
  //   post_id: Number;
  //   title: string;
  //   company_name: string;
  //   image: string;
  //   ward: string;
  //   district: string;
  //   province: string;
  //   end_time: number;
  //   start_time: number;
  //   salary_max: number;
  //   salary_min: number;
  //   salary_type: string;
  //   resource: {
  //     company_icon: string;
  //   };
  //   job_type: {
  //     job_type_name: string;
  //   };
  //   created_at_text: string;
  //   created_at: number;
  //   status: number;
  //   bookmarked: boolean;
  // };
  item: any;
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  dataCandidates: any;
  language: any;
  languageRedux: any;
}

const JobCardDetailPostedHistory: React.FC<IitemNewJob> = (props) => {
  // const dispatch = useDispatch();

  // const [error, setError] = React.useState(false);
  const { language, languageRedux } = props;
  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          gap: '15px',
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
      >
        <div className="detail-history-top">
          <ul className="div-card-post-left">
            <ImageListItem
              key={props?.item?.image}
              sx={{ flex: 1, display: 'flex' }}
            >
              <img
                src={
                  props?.item?.image
                    ? `${props?.item?.image}?w=164&h=164&fit=crop&auto=format`
                    : `${noImage}`
                }
                alt={props.item?.title}
                //loading="lazy"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: 10,
                }}
              />
              <div className="div-card-post-left_info">
                {' '}
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
                    ? `${props.item.title.substring(0, 50)} ...`
                    : props.item.title} */}
                    {props?.item?.title}
                  </Typography>
                </Tooltip>
                <Tooltip
                  placement="top"
                  title={props.item?.postCompanyInformation?.name}
                >
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
                    {`${props.item?.location?.district?.fullName}, 
                    ${props.item?.location?.district?.province?.fullName}`}
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
                    {new Intl.NumberFormat('en-US').format(
                      props.item?.salaryMin,
                    )}{' '}
                    {/* {props.item?.money_type_text} */}-{' '}
                    {new Intl.NumberFormat('en-US').format(
                      props.item?.salaryMax,
                    ) + `/${props.item?.postSalaryType?.fullName}`}
                  </Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <WorkPostIcon width={16} height={16} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'nowrap',
                      width: '180px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      marginLeft: '4px',
                      fontSize: '12px',
                      fontWeight: '400',
                    }}
                  >
                    {props.item?.postCategories.map(
                      (cate: any, index: any) =>
                        `${cate.parentCategory.fullName}${
                          index < props.item.postCategories.length - 1
                            ? ', '
                            : ''
                        }`,
                    )}

                    {/* {`${props.item?.location?.district?.fullName}, 
                    ${props.item?.location?.district?.province?.fullName}`} */}
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
                      fontSize: '12px',
                      fontStyle: 'italic',
                      fontWeight: '400',
                    }}
                  >
                    {props.item?.createdAtText}
                  </p>
                </div>
              </div>
            </ImageListItem>
          </ul>
          <Space direction="vertical" align="center">
            <SubIcon
              postId={props.item?.id}
              setStatus={props.setStatus}
              status={props.status}
              language={language}
              languageRedux={languageRedux}
            />
          </Space>
        </div>
        <Box
          className="detail-history-bottom"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: '#001424',
              fontSize: '12px',
              fontStyle: 'italic',
              fontWeight: '400',
            }}
          >
            {languageRedux === 1
              ? 'Đã đăng vào lúc:'
              : languageRedux === 2
              ? 'Posted on:'
              : languageRedux === 3 && '에 게시 됨:'}{' '}
            {props.item?.createdAt != null
              ? `${
                  moment(props.item?.createdAt).format('DD/MM/YYYY') +
                  ' ' +
                  moment(new Date(props.item?.createdAt)).format('HH:mm')
                }`
              : languageRedux === 1
              ? 'Chưa cập nhật'
              : languageRedux === 2
              ? 'Not updated yet'
              : languageRedux === 3 && '업데이트하지 않음'}
          </p>
          <p
            style={{
              margin: '0 24px',
              background: '#0D99FF',
              padding: '4px 12px',
              borderRadius: '15px',
              color: '#ffffff',
              fontSize: '12px',
            }}
          >
            {`${props.dataCandidates?.applications.length}
            ${
              props.dataCandidates?.applications.length <= 1
                ? languageRedux === 1
                  ? 'đơn ứng tuyển'
                  : languageRedux === 2
                  ? 'application'
                  : '지원서'
                : languageRedux === 1
                ? 'đơn ứng tuyển'
                : languageRedux === 2
                ? 'applications'
                : '지원서'
            }`}
          </p>

          {props.status === 1 ? (
            <p
              style={{
                background: '#5CB265',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
                fontSize: '12px',
              }}
            >
              {languageRedux === 1
                ? 'Đang tuyển'
                : languageRedux === 2
                ? 'Recruiting'
                : '현재 모집 중'}
            </p>
          ) : props.status === 3 ? (
            <p
              style={{
                background: '#aaaaaa',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
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
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
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
      </Card>
    </>
  );
};

export default JobCardDetailPostedHistory;
