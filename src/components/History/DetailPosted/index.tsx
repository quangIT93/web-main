import React, { useEffect, useState } from 'react';
import moment from 'moment';
// import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import { Space, Tooltip } from 'antd';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// import ImageListItem from '@mui/material/ImageListItem';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Typography, Button } from '@mui/material';

// import SubIcon from '../CardsPosted/SubIcon';

import 'intl';
import 'intl/locale-data/jsonp/en';

// import data
import historyRecruiter from 'api/historyRecruiter';

// impport Icon
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import './styles.scss';

import JobCardDetailPostedHistory from '../JobCardDetailedHistory';

interface IDetailPosted {
  detailPosted: any;
}

const statusCandidates = [
  {
    id: 1,
    statusId: 0,
    statusName: '',
    background: '#0d99ff',
    position: '0%',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    padding: '0px',
  },
  {
    id: 2,
    statusId: 1,
    statusName: 'Đã xem',
    background: '#aaaaaa',
    position: '60%',
    borderRadius: '15px',
    width: 'unset',
    height: 'unset',
    padding: '4px 16px',
  },
  {
    id: 3,
    statusId: 2,
    statusName: 'Đã được duyệt',
    background: '#5cb265',
    position: '60%',
    borderRadius: '15px',
    width: 'unset',
    height: 'unset',
    padding: '4px 16px',
  },
  {
    id: 4,
    statusId: 3,
    statusName: 'Đã từ chối',
    background: '#BD3131',
    position: '60%',
    borderRadius: '15px',
    width: 'unset',
    height: 'unset',
    padding: '4px 16px',
  },
  {
    id: 5,
    statusId: 4,
    statusName: 'Đã tuyển ứng viên',
    background: '#0d99ff',
    position: '60%',
    borderRadius: '15px',
    width: 'unset',
    height: 'unset',
    padding: '4px 16px',
  },
];

const DetailPosted: React.FC<IDetailPosted> = (props) => {
  const { detailPosted } = props;
  const [dataCandidates, setDadaCandidates] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState(detailPosted?.status);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCandidates = async () => {
    try {
      const result = await historyRecruiter.GetAllApplicationsOfAJob(
        detailPosted?.post_id,
        5,
        null,
        'vi',
      );

      if (result) {
        setDadaCandidates(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    // let isMounted = true;
    // setLoading(true);
    getAllCandidates();
    //   .then(() => {
    //   if (isMounted) {
    //     setLoading(false);
    //   }
    // });

    // return () => {
    //   isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleClickPost = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   detailPosted: any,
  // ) => {};

  const handleClickCandidate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    applicationId: number,
    postId: number,
  ) => {
    // console.log('applicationId', applicationId)
    window.open(
      `/candidate-detail?post-id=${postId}&application_id=${applicationId}`,
    );
  };

  return (
    <div className="history-post">
      <JobCardDetailPostedHistory
        item={detailPosted}
        status={status}
        setStatus={setStatus}
        dataCandidates={dataCandidates}
      />
      <Box>
        <h3 style={{ margin: '12px 0' }}>Danh sách các ứng viên</h3>
        {dataCandidates?.applications.map((candidate: any, index: number) => (
          <Card
            key={index}
            sx={{
              minWidth: '100%',
              display: 'flex',
              padding: '12px',
              cursor: 'pointer',
              '&:hover': {
                background: '#e5e5fb',
                transition: 'all 0.3s linear',
              },
              boxShadow: 'none',
              borderRadius: '5px',
              margin: '8px 0',
              background: `${
                candidate.application_status === 0 ? '#F3F8FB' : '#ffffff'
              }`,
            }}
            onClick={(e) =>
              handleClickCandidate(e, candidate.id, detailPosted?.id)
            }
          >
            <div className="image-cadidate_wrap">
              {candidate.avatar ? (
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="image-cadidate"
                />
              ) : (
                <div className="image-cadidate"></div>
              )}
            </div>
            <Box sx={{ marginLeft: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ marginLeft: '12px' }}
                >
                  {candidate.name}
                </Typography>

                {statusCandidates.map((statusCandidate, index) => {
                  if (
                    candidate?.application_status === statusCandidate.statusId
                  ) {
                    return (
                      <p
                        key={index}
                        style={{
                          background: `${statusCandidate.background}`,
                          padding: `${statusCandidate.padding}`,
                          borderRadius: `${statusCandidate.borderRadius}`,
                          color: '#ffffff',
                          //  position: 'absolute',
                          right: `${statusCandidate.position}`,
                          width: `${statusCandidate.width}`,
                          height: `${statusCandidate.height}`,
                          marginLeft: '60px',
                          fontStyle: 'italic  ',
                        }}
                      >
                        {statusCandidate.statusName}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="item-candidate">
                <PersonIcon fontSize="small" className="icon-candidate" />
                <p>
                  {candidate.gender === 0 ? 'Nữ' : 'Nam'} -{' '}
                  {moment(candidate.birthday).format('DD/MM/YYYY')}
                </p>
              </div>
              <div className="item-candidate">
                <LocationOnIcon fontSize="small" className="icon-candidate" />
                <p>{candidate.province_name}</p>
              </div>
              <div className="item-candidate">
                <BusinessCenterIcon
                  fontSize="small"
                  className="icon-candidate"
                />
                <p>
                  Lĩnh vực quan tâm:
                  {candidate.categories.map((candid: any, index: number) => (
                    <span key={index}> {candid.child_category}, </span>
                  ))}
                </p>
              </div>
            </Box>
          </Card>
        ))}
        <Box
          sx={{
            margin: '12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dataCandidates?.length > 0 ? (
            <Button variant="contained">Xem thêm</Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default DetailPosted;
