import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// materi
import { Box, Typography } from '@mui/material';

import moment from 'moment';
import Card from '@mui/material/Card';
import { Space, Tooltip } from 'antd';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ImageListItem from '@mui/material/ImageListItem';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  EnvironmentFilled,
  ClockCircleFilled,
  MessageOutlined,
} from '@ant-design/icons';

// import data// import api
import postApi from 'api/postApi';
import historyRecruiter from 'api/historyRecruiter';
// import component
import 'intl';
import 'intl/locale-data/jsonp/en';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// import icon

// @ts-ignore

// import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Button, Skeleton } from 'antd';

import ItemApply from '../../pages/Profile/components/Item';
// import component
import RejectedApplication from '#components/CandidateDetail/RejectedApplication';
import SeenApplication from '#components/CandidateDetail/SeenApplication';
import ApprovedApplication from '#components/CandidateDetail/ApprovedApplication';
import RecuitApplication from '#components/CandidateDetail/RecuitApplication';
import CVItem from '#components/Profile/CV';
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
// import languageApi from 'api/languageApi';
// import { candidateDetail } from 'validations/lang/vi/candidateDetail';
// import { candidateDetailEn } from 'validations/lang/en/cnadidateDetail';
// import { historyVi } from 'validations/lang/vi/history';
// import { historyEn } from 'validations/lang/en/history';

// const SmallAvatar = styled(Avatar)(({ theme }) => ({
//   width: 22,
//   height: 22,
//   border: `2px solid ${theme.palette.background.paper}`,
//   backgroundColor: 'white',
// }));

interface ItemAppy {
  id?: number | null;
  company_name?: string;
  major?: string;
  start_date?: number;
  end_date?: number;
  extra_information?: string;
  title?: string;
}

interface ICategories {
  child_category_id: number;
  parent_category_id: number;
  parent_category: string;
  child_category: string;
}

const CandidateDetail: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataPost, setDataPost] = useState<any>(null);
  const [dataCandidate, setDataCandidate] = useState<any>(null);
  const [statusApplication, setStatusApplication] = useState<number>(
    // 1
    dataCandidate?.applicationProfile?.application_status,
  );
  const [open, setOpen] = useState(false);
  // const [language, setLanguage] = useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? 'vi' : 'en',
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
  //   getlanguageApi();
  // }, [languageRedux]);

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title = language?.candidate_detail_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Chi tiết ứng viên'
        : 'HiJob - Candidate Details';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_candidate_detail' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // when dataCandidate changed, statusApplication change
  useEffect(() => {
    if (dataCandidate) {
      setStatusApplication(
        dataCandidate?.applicationProfile?.application_status,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCandidate]);
  console.log('dataCandidateDetail', dataCandidate?.applicationProfile?.avatar);

  const getPostById = async () => {
    try {
      const postId = parseInt(searchParams.get('post-id') ?? '');
      const candidateId = searchParams.get('application_id') ?? '';
      const result = await postApi.getById(
        postId,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setDataPost(result.data);
      }
      const detailCandidate = await historyRecruiter.GetAJobApplication(
        postId,
        candidateId,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (detailCandidate) {
        setDataCandidate(detailCandidate.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getPostById().then(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleClickPost = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dataPost: any,
  ) => {
    // console.log('click pi');
  };

  const SeenApply = useMemo(() => {
    if (statusApplication === 1 || statusApplication === 0) {
      return <SeenApplication setStatusApplication={setStatusApplication} />;
    }
    return null;
  }, [statusApplication, setStatusApplication]);

  const ApprovedApply = useMemo(() => {
    if (statusApplication === 2) {
      return (
        <ApprovedApplication setStatusApplication={setStatusApplication} />
      );
    }
    return null;
  }, [statusApplication, setStatusApplication]);

  const RejectedApply = useMemo(() => {
    if (statusApplication === 3) {
      return <RejectedApplication />;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusApplication, setStatusApplication]);

  const RecruitApply = useMemo(() => {
    if (statusApplication === 4) {
      return <RecuitApplication />;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusApplication, setStatusApplication]);
  console.log('dataPost', dataPost);
  console.log(
    'dataCandidate?.applicationProfile?.avatar',
    dataCandidate?.applicationProfile?.avatar,
  );
  console.log('dataCandidate', dataCandidate);
  return (
    <div className="candidate-detail">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <Box className="containerCandidate">
        <Skeleton loading={loading} active>
          <Card
            sx={{
              background: '#D5EDFF',
              padding: '12px',
              margin: '8px 0',
              display: 'flex',
              justifyContent: 'space-between',
              minWidth: '100%',
              borderRadius: '5px',
            }}
            onClick={(e) => handleClickPost(e, dataPost)}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'none',
              }}
            >
              <ImageListItem sx={{ flex: 1, display: 'flex' }}>
                <img
                  src={`${dataPost?.image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`aaa?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="anh job"
                  //loading="lazy"
                  style={{
                    width: '120px',
                    maxWidth: 'auto',
                    height: '100%',
                    maxHeight: 150,
                    borderRadius: 10,
                  }}
                />
                <div
                  style={{ padding: '0', marginLeft: '12px' }}
                  className="div-cart-item-post"
                >
                  <Tooltip placement="top" title="àhakj">
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: '18px',
                        margin: 0,
                        fontWeight: 'bold',
                      }}
                    >
                      {dataPost?.company_name}
                    </Typography>
                  </Tooltip>
                  <Tooltip placement="top" title="j j  j jj">
                    <Typography
                      gutterBottom
                      variant="h1"
                      component="div"
                      sx={{ fontSize: '12px' }}
                    >
                      {dataPost?.title}
                    </Typography>
                  </Tooltip>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <EnvironmentFilled className="icon-cart-item-post" />
                    <Typography variant="body2" color="text.secondary">
                      {dataPost?.district}, {dataPost?.province}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ClockCircleFilled className="icon-cart-item-post" />
                    <Typography variant="body2" color="text.secondary">
                      {moment(dataPost?.start_time).format('HH:mm')} :{' '}
                      {moment(dataPost?.end_time).format('HH:mm')}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AttachMoneyIcon
                      sx={{
                        fontSize: 20,
                        marginLeft: '-2px',
                        marginRight: '2px',
                        color: '#575757',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {new Intl.NumberFormat('en-US').format(
                        dataPost?.salary_min,
                      )}
                      {` ${dataPost?.money_type_text} `}-{' '}
                      {new Intl.NumberFormat('en-US').format(
                        dataPost?.salary_max,
                      ) +
                        ` ${dataPost?.money_type_text} ` +
                        `/${dataPost?.salary_type}`}
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
                      {dataPost?.created_at_text}
                    </p>
                  </div>
                </div>
              </ImageListItem>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    color: '#001424',
                    fontSize: 13,
                    fontStyle: 'italic',
                  }}
                >
                  {language?.posted_on}{' '}
                  {moment(dataPost?.start_date).format('DD/MM/YY')}
                </p>
                {dataPost?.status === 1 ? (
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
                    {language?.recruiting}
                  </p>
                ) : dataPost?.status === 3 ? (
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
                    {language?.post_detail_page?.closed}
                  </p>
                ) : (
                  <p
                    style={{
                      background: '#aaaaaa',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      color: '#ffffff',
                      fontStyle: 'italic',
                    }}
                  >
                    {language?.history_page?.does_not_accept}
                  </p>
                )}
              </Box>
            </Box>
            <Space
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'space-between',
                justifyContent: 'space-between',
              }}
              direction="vertical"
              align="center"
            >
              {/* <BookmarkBorderOutlinedIcon sx={{ top: 0, right: 0 }} /> */}
              <img
                className="img-resource-company"
                src={dataPost?.resource.company_icon}
                alt="anh icon"
              />
              <p
                style={{ fontSize: 13, fontStyle: 'italic', padding: '4px 0' }}
              >
                {dataPost?.job_type.job_type_name}
              </p>
            </Space>
          </Card>
          <p
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            {language?.candidate_resume}
          </p>
          <Box sx={{ marginTop: '10px' }}>
            <div className="div-profile-avatar">
              <div className="div-avatar">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Badge overlap="circular">
                    <Avatar
                      src={
                        dataCandidate?.applicationProfile?.avatar as any
                        // 'https://gig-app-upload.s3-ap-southeast-1.amazonaws.com/images/avatar/1697190564373-1b072f22-916b-49f4-8ab8-fd37e3f3b6a4.jpg'
                      }
                      style={{ height: '70px', width: '70px' }}
                      alt={'ảnh lỗi'}
                    />
                  </Badge>
                  <div style={{ marginLeft: '10px' }}>
                    <h2>
                      {dataCandidate?.applicationProfile?.name
                        ? dataCandidate?.applicationProfile?.name
                        : language?.unupdated}
                    </h2>
                  </div>
                </div>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      ghost
                      icon={<MessageOutlined />}
                      style={{
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={() =>
                        window.open(
                          `/message?post_id=${searchParams.get(
                            'post-id',
                          )}&user_id=${
                            dataCandidate.applicationProfile.account_id
                          }&application_id=${searchParams.get(
                            'application_id',
                          )} `,
                          '_blank',
                        )
                      }
                    ></Button>
                    {ApprovedApply}
                    {RejectedApply}
                    {SeenApply}
                    {RecruitApply}
                  </Box>
                </Box>
              </div>
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  marginTop: '20px',
                  overflowWrap: 'break-word',
                  color: '#575757',
                  fontSize: '14px',
                }}
              >
                {dataCandidate?.applicationProfile?.introduction
                  ? dataCandidate?.applicationProfile?.introduction
                  : language?.unupdated}
              </div>
            </div>
            <div className="div-profile-info">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{language?.personal_information}</h3>
              </div>
              <div className="info-detail">
                <div className="div-detail-row left">
                  <p>{language?.date_of_birth}</p>
                  <p>{language?.sex}</p>
                  <p>{language?.location}</p>
                </div>
                <div className="div-detail-row right">
                  <p>
                    {dataCandidate?.applicationProfile?.birthday
                      ? moment(
                          new Date(dataCandidate?.applicationProfile?.birthday),
                        ).format('DD/MM/yyyy')
                      : language?.unupdated}
                  </p>
                  <p>
                    {dataCandidate?.applicationProfile?.gender
                      ? dataCandidate?.applicationProfile?.gender === 1
                        ? language?.male
                        : language?.female
                      : language?.male}
                  </p>
                  <p>
                    {dataCandidate?.applicationProfile?.address?.name
                      ? dataCandidate?.applicationProfile?.address?.name
                      : language?.unupdated}
                  </p>
                </div>
              </div>
            </div>

            <div className="div-profile-info">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{language?.contact_information}</h3>
              </div>
              <div className="info-detail">
                <div className="div-detail-row left">
                  <p>{language?.phone_number}</p>
                  <p>Email</p>

                  <p>Facebook</p>

                  <p>LinkedIn</p>
                </div>
                <div className="div-detail-row right">
                  <p>
                    {dataCandidate?.applicationProfile?.phone
                      ? dataCandidate?.applicationProfile?.phone
                      : language?.unupdated}
                  </p>
                  <p>
                    {dataCandidate?.applicationProfile?.email
                      ? dataCandidate?.applicationProfile?.email
                      : language?.unupdated}
                  </p>

                  <p>
                    {dataCandidate?.applicationProfile?.facebook
                      ? dataCandidate?.applicationProfile?.facebook
                      : language?.unupdated}
                  </p>

                  <p>
                    {dataCandidate?.applicationProfile?.linkedin
                      ? dataCandidate?.applicationProfile?.linkedin
                      : language?.unupdated}
                  </p>
                </div>
              </div>
            </div>

            <div className="div-profile-info">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3>CV/ Resume</h3>
              </div>
              <Space wrap className="item-info-work">
                {dataCandidate?.applicationProfile?.cv_url ? (
                  <CVItem
                    url={dataCandidate?.applicationProfile?.cv_url}
                    open={open}
                    setOpen={setOpen}
                    isProfile={false}
                    language={language}
                  />
                ) : (
                  <>{language?.unupdated}</>
                )}
              </Space>
            </div>

            <div className="div-profile-info">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{language?.career_objective}</h3>
              </div>
              <Space wrap className="item-info-work">
                {dataCandidate?.categories?.length !== 0
                  ? dataCandidate?.categories?.map(
                      (item: ICategories, index: number) => (
                        <Button key={index} className="btn" type="text">
                          {item.child_category}
                        </Button>
                      ),
                    )
                  : language?.unupdated}
              </Space>
            </div>
            <div className="div-profile-info">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{language?.working_location}</h3>
              </div>
              <Space wrap className="item-info-work">
                {dataCandidate?.locations?.length !== 0
                  ? dataCandidate?.locations?.map(
                      (item: any, index: number) => (
                        <Button key={index} className="btn" type="text">
                          {item?.district}
                        </Button>
                      ),
                    )
                  : language?.unupdated}
              </Space>
            </div>

            <div className="div-profile-info">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{language?.education}</h3>
              </div>
              {dataCandidate?.educations?.length !== 0 ? (
                dataCandidate?.educations?.map(
                  (education: ItemAppy, index: number) => (
                    <ItemApply item={education} key={index} />
                  ),
                )
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}

              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              ></div>
            </div>

            <div className="div-profile-info">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{language?.working_experience}</h3>
              </div>
              {dataCandidate?.experiences?.length !== 0 ? (
                dataCandidate?.experiences?.map((item: any, index: number) => (
                  <ItemApply typeItem="experiences" key={index} item={item} />
                ))
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}

              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              ></div>
            </div>
          </Box>
        </Skeleton>
      </Box>
      {/* <RollTop />
      <Footer /> */}
    </div>
  );
};

export default CandidateDetail;
