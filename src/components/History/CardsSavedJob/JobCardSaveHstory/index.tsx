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

import { LocationHomeIcon, DolaIcon, SaveIconFill } from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
// import bookMarkApi from 'api/bookMarkApi';

// import HomeValueContextProvider, {
//   HomeValueContext,
// } from 'context/HomeValueContextProvider';

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
  handleDeleteBookmark: (event: any, index: number, bookmarkId: number) => any;
  index: number;
}

const JobCardSaveHistory: React.FC<IitemNewJob> = (props) => {
  // const {
  //   setOpenNotificate,
  //   openNotificate,
  // }: {
  //   setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
  //   openNotificate: boolean;
  // } = React.useContext(HomeValueContext);
  // const dispatch = useDispatch();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`, '_parent');
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
          handleClickItem(e, props.item.id);
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
                fontSize: 13,
                fontStyle: 'italic',
              }}
            >
              Đã đăng vào:{' '}
              {props.item?.created_at != null
                ? moment(props.item?.created_at).format('DD/MM/YY')
                : 'Chưa cập nhật'}
            </p>
            {props.item?.status === 1 ? (
              <p
                style={{
                  background: '#0D99FF',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '100px',
                  fontStyle: 'italic',
                }}
              >
                Đang tuyển
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
                }}
              >
                Đã đóng
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
                }}
              >
                Không chấp nhận
              </p>
            )}
          </Box>
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
                e.stopPropagation();
                props.handleDeleteBookmark(e, props.index, props.item.id);
              }}
            >
              <SaveIconFill width={24} height={24} />
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
                  alt="ảnh"
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#0d99ff', fontWeight: 500 }}>
            {props.item.job_type.job_type_name}
          </p>
        </Space>
      </Card>
    </>
  );
};

export default JobCardSaveHistory;
