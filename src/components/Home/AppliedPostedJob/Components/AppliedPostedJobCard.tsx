import React, { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
//import scss

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

import {
  LocationHomeIcon,
  ClockIcon,
  BagHomeIcon,
  DolaIcon,
  SaveIconOutline,
  SaveIconFill,
} from '#components/Icons';

import { Space, Button, Tooltip } from 'antd';

import moment from 'moment';
import bookMarkApi from 'api/bookMarkApi';

import HomeValueContextProvider, {
  HomeValueContext,
} from 'context/HomeValueContextProvider';

import ShowNotificativeSave from '../../ShowNotificativeSave';

const AppliedPostedJobCard: React.FC<any> = (props) => {
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
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`);
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
          handleClickItem(e, props.item.post_id);
        }}
      >
        <div
          style={{ display: props.item.type === "post" ? "block" : 'none' }}
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
              minWidth: '80px',
              minHeight: '80px',
            }}
          >
            <img
              src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item.title}
              loading="lazy"
              style={{
                width: '80px !important',
                height: '80px !important',
                borderRadius: 10,
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
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {new Date(props.item.start_time).toLocaleDateString(
                    'en-GB',
                  )}
                  -
                  {new Date(props.item.end_time).toLocaleDateString(
                    'en-GB',
                  )}
                </Typography>
              </div>
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
                <div>
                  {!error && (
                    <img
                      className="img-resource-company"
                      src={
                        props.item.resource.company_icon
                          ? props.item.resource.company_icon
                          : ''
                      }
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
          </div>
        </div>
        <div className="applied-posted-card_bottom">
          <div className="applied-posted-card_date">
            <span style={{ display: props.item.type === "application" ? "block" : 'none' }}>
              Đã nộp vào &nbsp;
              {new Date(props.item.created_at).toLocaleDateString(
                'en-GB',
              )},&nbsp;
              {moment(new Date(props.item.created_at)).format('HH:mm')}
            </span>
            <span style={{ display: props.item.type === "post" ? "block" : 'none' }}>
              <strong style={{ color: "#0d99ff" }}>{props.item.num_of_application}</strong>&nbsp;
              Ứng viên đã nộp hồ sơ
            </span>
          </div>
          <Button
            style={{ display: props.item.type === "application" ? "block" : 'none' }}
            rootClassName="button-approved" type="primary"
          >
            Đã được duyệt
          </Button>
          <Button
            style={{ display: props.item.type === "post" ? "block" : 'none' }}
            rootClassName="button-check" type="primary"
          >
            Kiểm tra ngay
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AppliedPostedJobCard;
