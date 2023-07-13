import React, { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageListItem from '@mui/material/ImageListItem';

//ANT
import {
  EnvironmentFilled,
  ClockCircleFilled,
  EuroCircleFilled,
  CaretDownFilled,
} from '@ant-design/icons';

import { setAlertCancleSave, setAlertSave } from 'store/reducer/alertReducer';

import { LocationHomeIcon, DolaIcon, SaveIconOutline, SaveIconFill } from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
import bookMarkApi from 'api/bookMarkApi';

import { PostNewest } from '../NewJobs';
import HomeValueContextProvider, {
  HomeValueContext,
} from 'context/HomeValueContextProvider';

import ShowNotificativeSave from '../../ShowNotificativeSave';
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
    bookmarked: boolean;
  };
}
interface Iprops {
  item: PostNewest;
}

const JobCard: React.FC<Iprops> = (props) => {
  const {
    setOpenNotificate,
    openNotificate,
  }: {
    setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
    openNotificate: boolean;
  } = React.useContext(HomeValueContext);
  const dispatch = useDispatch();
  const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`);
  };

  const handleImageError = () => {
    setError(true);
  }

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
        }}
        onClick={(e) => {

          handleClickItem(e, props.item.id);
        }}
      >
        <div
          className="div-card-post-left"
        >
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
                  }}
                >
                  {`${props.item.district}, ${props.item.province}`}
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
                  }}
                >
                  {new Intl.NumberFormat('en-US').format(props.item.salary_min)}{' '}
                  -{' '}
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
                    fontSize: 13,
                    fontStyle: 'italic',
                  }}
                >
                  {props.item.created_at_text}
                </p>
              </div>
            </div>
          </ImageListItem>
        </div>

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
                src={props.item.resource.company_icon ? props.item.resource.company_icon : ''}
                alt="ảnh"
                onError={handleImageError}
              />
            )}
            </div>

          </div>
          <p style={{ fontSize: 13, color: '#0d99ff' }}>
            {props.item.job_type.job_type_name}
          </p>
        </Space>
      </Card>
    </>
  );
};

export default JobCard;
