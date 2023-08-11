import React from 'react';

// import { useDispatch, useSelector } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// import { setAlertCancleSave, setAlertSave } from 'store/reducer/alertReducer';

import { LocationHomeIcon, DolaIcon } from '#components/Icons';

import { Tooltip } from 'antd';

// import moment from 'moment';
// import bookMarkApi from 'api/bookMarkApi';

// import { PostNewest } from '#components/Home/NewJobs';

// interface Iprops {
//   isLeft: PostNewest;
// }

const AnotherPost: React.FC<any> = (props) => {
  const [error, setError] = React.useState(false);

  // const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
  //   window.open(`/post-detail?post-id=${id}`);
  // };
  console.log('props', props);

  return (
    <>
      <Card
        sx={{
          display: props.item ? 'flex' : 'none',
          padding: '12px',
          cursor: 'pointer',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
        }}
        className="anotherPost-container"
        onClick={props.onClick}
      >
        <div className="anotherPost-content">
          <div className="wrap-anotherPost_info">
            <img
              src={`${props.item?.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.item?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item?.title}
              loading="lazy"
              className="anotherPost_image"
            />
            <div className="anotherPost_info">
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
              <Tooltip placement="top" title={props.item?.company_name}>
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
                    fontWeight: 400,
                  }}
                >
                  {`${props.item?.district}, ${props.item?.province}`}
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
                    fontWeight: 400,
                  }}
                >
                  {new Intl.NumberFormat('en-US').format(
                    props.item?.salary_min,
                  )}{' '}
                  {props.item?.money_type_text} -{' '}
                  {new Intl.NumberFormat('en-US').format(
                    props.item?.salary_max,
                  ) +
                    ` ${props.item?.money_type_text}` +
                    `/${props.item?.salary_type}`}
                </Typography>
              </div>
            </div>
          </div>
          <div className="anotherPost_logo">
            {!error && (
              <img
                className="anotherPost_logo_image"
                src={
                  props?.item?.resource.company_icon
                    ? props.item.resource.company_icon
                    : ''
                }
                alt="ảnh"
                onError={() => {
                  setError(true);
                }}
              />
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default AnotherPost;
