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

import { LocationHomeIcon, DolaIcon } from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
// import bookMarkApi from 'api/bookMarkApi';

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
    bookmarked: boolean;
  };
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  dataCandidates: any;
}

const JobCardDetailPostedHistory: React.FC<IitemNewJob> = (props) => {
  // const dispatch = useDispatch();

  // const [error, setError] = React.useState(false);

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
              key={props.item.image}
              sx={{ flex: 1, display: 'flex' }}
            >
              <img
                src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${props.item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={props.item.title}
                loading="lazy"
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
                      fontSize: '14px',
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
                      fontSize: '14px',
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
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    {new Intl.NumberFormat('en-US').format(
                      props.item.salary_min,
                    )}{' '}
                    {/* {props.item?.money_type_text} */}-{' '}
                    {new Intl.NumberFormat('en-US').format(
                      props.item.salary_max,
                    ) + `/${props.item.salary_type}`}
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
                      fontSize: 14,
                      fontStyle: 'italic',
                      fontWeight: '400',
                    }}
                  >
                    {props.item.created_at_text}
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
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: '400',
            }}
          >
            {' '}
            Đã đăng vào: {moment(props.item?.created_at).format('DD/MM/YY')}
          </p>
          <p
            style={{
              margin: '0 24px',
              background: '#0D99FF',
              padding: '4px 12px',
              borderRadius: '15px',
              color: '#ffffff',
            }}
          >
            {props.dataCandidates?.applications.length} đơn ứng tuyển
          </p>

          {props.status === 1 ? (
            <p
              style={{
                background: '#5CB265',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
              }}
            >
              Đang tuyển
            </p>
          ) : props.status === 3 ? (
            <p
              style={{
                background: '#aaaaaa',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
              }}
            >
              Đã đóng
            </p>
          ) : (
            <p
              style={{
                background: '#aaaaaa',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
              }}
            >
              Không chấp nhận
            </p>
          )}
        </Box>
      </Card>
    </>
  );
};

export default JobCardDetailPostedHistory;
