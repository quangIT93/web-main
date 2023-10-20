import React, { useEffect, useState } from 'react';
import moment from 'moment';
// import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import { Space, Tooltip } from 'antd';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// import ImageListItem from '@mui/material/ImageListItem';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Typography, Button } from '@mui/material';
import male_null_avatar from '../../../img/male_null_avatar.png';
import female_null_avatar from '../../../img/female_null_avatar.png';
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
import languageApi from 'api/languageApi';
import postApi from 'api/postApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';

interface IDetailPosted {
  detailPosted: any;
}

// const statusCandidates = [
//   {
//     id: 1,
//     statusId: 0,
//     statusName: '',
//     background: '#0d99ff',
//     position: '0%',
//     borderRadius: '50%',
//     width: '16px',
//     height: '16px',
//     padding: '0px',
//   },
//   {
//     id: 2,
//     statusId: 1,
//     statusName: 'Đã xem',
//     background: '#aaaaaa',
//     position: '60%',
//     borderRadius: '15px',
//     width: 'unset',
//     height: 'unset',
//     padding: '4px 16px',
//   },
//   {
//     id: 3,
//     statusId: 2,
//     statusName: 'Đã được duyệt',
//     background: '#5cb265',
//     position: '60%',
//     borderRadius: '15px',
//     width: 'unset',
//     height: 'unset',
//     padding: '4px 16px',
//   },
//   {
//     id: 4,
//     statusId: 3,
//     statusName: 'Đã từ chối',
//     background: '#BD3131',
//     position: '60%',
//     borderRadius: '15px',
//     width: 'unset',
//     height: 'unset',
//     padding: '4px 16px',
//   },
//   {
//     id: 5,
//     statusId: 4,
//     statusName: 'Đã tuyển ứng viên',
//     background: '#0d99ff',
//     position: '60%',
//     borderRadius: '15px',
//     width: 'unset',
//     height: 'unset',
//     padding: '4px 16px',
//   },
// ];

const DetailPosted: React.FC<IDetailPosted> = (props) => {
  const { detailPosted } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [dataCandidates, setDadaCandidates] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState(detailPosted?.status);
  // const [language, setLanguage] = React.useState<any>();
  const [post, setPost] = React.useState<any>();
  const [dataProvinces, setDataProvinces] = useState<any>(null);

  // get post by id-post
  const getPostById = async () => {
    try {
      // const result = await postApi.getById(POST_ID);
      const result = await postApi.getPostV3(
        detailPosted?.id,
        languageRedux === 1 ? 'vi' : 'en',
      );
      // console.log('result', result2);
      if (result) {
        setPost(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostById();
  }, [languageRedux]);

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? "vi" : "en"
  //     );
  //     if (result) {
  //       setLanguage(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi()
  // }, [languageRedux])
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      statusName: language?.history_page?.seen,
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
      statusName: language?.approved,
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
      statusName: language?.rejected,
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
      statusName: language?.this_candidate_has_been_recruited,
      background: '#0d99ff',
      position: '60%',
      borderRadius: '15px',
      width: 'unset',
      height: 'unset',
      padding: '4px 16px',
    },
  ];

  const getAllCandidates = async () => {
    try {
      const result = await historyRecruiter.GetAllApplicationsOfAJob(
        detailPosted?.post_id,
        5,
        null,
        languageRedux === 1 ? 'vi' : 'en',
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
  }, [languageRedux]);

  // const handleClickPost = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   detailPosted: any,
  // ) => {};

  const handleClickCandidate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    applicationId: number,
    postId: number,
    candidate: any,
  ) => {
    window.open(
      `/candidate-detail?post-id=${postId}&application_id=${applicationId}&candidate-id=${candidate.account_id}`,
    );
  };

  // console.log("dataCandidates", dataCandidates);

  return (
    <div className="history-post">
      <JobCardDetailPostedHistory
        item={post}
        status={status}
        setStatus={setStatus}
        dataCandidates={dataCandidates}
        language={language}
        languageRedux={languageRedux}
      />
      <Box>
        <h3 style={{ margin: '12px 0' }}>
          {language?.history_page?.list_of_candidates}
        </h3>
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
              handleClickCandidate(e, candidate.id, detailPosted?.id, candidate)
            }
          >
            <div className="image-cadidate_wrap">
              <img
                src={candidate.avatar ? candidate.avatar : female_null_avatar}
                alt={candidate.name}
                className="image-cadidate"
              />
            </div>
            <Box
              sx={{
                marginLeft: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
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
                  sx={{
                    marginLeft: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
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
                          fontSize: '12px',
                        }}
                      >
                        {statusCandidate.statusName}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="item-detail-candidate">
                <PersonIcon
                  fontSize="small"
                  className="icon-detail-candidate"
                />
                <p>
                  {candidate.gender === 0 ? language?.female : language?.male} -{' '}
                  {moment(candidate.birthday).format('DD/MM/YYYY')}
                </p>
              </div>
              <div className="item-detail-candidate">
                <LocationOnIcon
                  fontSize="small"
                  className="icon-detail-candidate"
                />
                <p>{candidate.province_name}</p>
              </div>
              <div className="item-detail-candidate">
                <BusinessCenterIcon
                  fontSize="small"
                  className="icon-detail-candidate"
                />
                <p>
                  {language?.career_objective}{' '}
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
            <Button variant="contained">{language?.more}</Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default DetailPosted;
