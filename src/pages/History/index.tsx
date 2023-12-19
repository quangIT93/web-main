import React, { useMemo, useCallback } from 'react';
import queryString from 'query-string';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Collapse } from 'antd';
import { Box, iconClasses, Typography } from '@mui/material';
import { RightOutlined } from '@ant-design/icons';

import { Space } from 'antd';

// import component

import CardsPosted from '#components/History/CardsPosted';
import CardsApplied from '#components/History/CardsApplied';
import CardsSavedJob from '#components/History/CardsSavedJob';
import CardsListBlog from '#components/History/CardsListBlog';
import CardListCandidate from '#components/History/CardListCandidate';
import CardListCandidateActivity from '#components/History/CardListActivitiesCandidate';
import CardListEmployerActivity from '#components/History/CardListEmployerCandidate';

import ShowCancleSave from '#components/ShowCancleSave';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import ShowNotificativeSave from '#components/ShowNotificativeSave';
// api
// import siteApi from 'api/siteApi';

// import icon

import './style.scss';
// @ts-ignore

// import Item from 'antd/es/list/Item'
import languageApi from 'api/languageApi';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
import { setCookie } from 'cookies';
import CardListCompany from '#components/History/CardListCompany';
import { useSearchParams } from 'react-router-dom';

const { Panel } = Collapse;

// const dataItem = [
//   {
//     id: 1,
//     title: 'Các công việc đã ứng tuyển',
//     childs: [
//       'Tất cả',
//       // 'Đã được duyệt', 'Đang chờ duyệt'
//     ],
//   },
//   {
//     id: 2,
//     title: 'Các công việc đã lưu',
//     childs: ['Tất cả'],
//   },
//   {
//     id: 3,
//     title: 'Các công việc đã đăng tuyển',
//     childs: ['Tất cả', 'Chưa đóng', 'Đã đóng'],
//   },
// ];
const HistoryPost = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const checkPost = useSelector((state: RootState) => state.checkPost.data);
  const profile = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const queryParams = queryString.parse(window.location.search);
  // const hotjobtype = Number(searchParams.get('post'));
  const hotjobtype = Number(queryParams['post']);
  const community_post = Number(queryParams['community_post']);
  const saved_jobs = Number(queryParams['saved_jobs']);
  const recruitment_post = queryParams['recruitment_post'];
  const candidate = Number(queryParams['candidate']);
  const companyView = Number(queryParams['companyView']);
  const activitiesCandidate = Number(queryParams['activitiesCandidate']);
  const activitiesEmployer = Number(queryParams['activitiesEmployer']);
  const viewedCandidate = Number(queryParams['viewedCandidate']);
  const viewedJob = Number(queryParams['viewedJob']);

  const [activeChild, setActiveChild] = React.useState(
    hotjobtype === 2
      ? '2-1'
      : viewedJob === 11
        ? '1-1'
        : candidate === 4
          ? '4-0'
          : viewedCandidate === 41
            ? '4-1'
            : companyView === 50
              ? '5-0'
              : companyView === 51
                ? '5-1'
                : companyView === 52
                  ? '5-2'
                  : community_post === 31
                    ? '3-1'
                    : community_post === 30
                      ? '3-0'
                      : activitiesCandidate === 70
                        ? '7-0'
                        : activitiesCandidate === 71
                          ? '7-0'
                          : activitiesCandidate === 72
                            ? '7-2'
                            : activitiesEmployer === 60
                              ? '6-0'
                              : activitiesEmployer === 61
                                ? '6-1'
                                : saved_jobs === 1
                                  ? '1-0'
                                  : recruitment_post === 'opening'
                                    ? '2-1'
                                    : recruitment_post === 'closed'
                                      ? '2-2'
                                      : '0-0',
  );
  const [ItemLeft, setItemLeft] = React.useState<null | number>(
    hotjobtype === 2
      ? 2
      : viewedJob === 11
        ? 1
        : community_post === 31
          ? 3
          : community_post === 30
            ? 3
            : candidate === 4
              ? 4
              : viewedCandidate === 41
                ? 4
                : companyView === 50
                  ? 5
                  : companyView === 51
                    ? 5
                    : companyView === 52
                      ? 5
                      : activitiesEmployer === 60
                        ? 6
                        : activitiesEmployer === 61
                          ? 6
                          : activitiesCandidate === 70
                            ? 7
                            : activitiesCandidate === 71
                              ? 7
                              : activitiesCandidate === 72
                                ? 7
                                : saved_jobs === 1
                                  ? 1
                                  : 0,
  );
  const [showDetailPosted, setShowDetailPosted] =
    React.useState<boolean>(false);
  // console.log('searchParams', hotjobtype === 2);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    // event.preventDefault()
  }
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const analytics: any = getAnalytics();
  // console.log(profile?.typeRoleData);
  // console.log(checkPost);
  // const [language, setLanguage] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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

  const dataItem = [
    {
      id: 0,
      // title: language?.history_page?.applied_jobs,
      // childs: [language?.all],
      title:
        languageRedux === 1
          ? 'Các công việc đã ứng tuyển'
          : languageRedux === 2
            ? 'Apllied jobs'
            : languageRedux === 3 && '지원한 직업들',
      childs: [
        languageRedux === 1
          ? 'Tất cả'
          : languageRedux === 2
            ? 'All'
            : languageRedux === 3 && '전부',
      ],
    },
    {
      id: 1,
      // title: language?.history_page?.saved_jobs,
      // childs: [language?.all],
      title:
        languageRedux === 1
          ? 'Công việc của tôi'
          : languageRedux === 2
            ? 'My jobs'
            : languageRedux === 3 && '내 일',
      childs: [
        languageRedux === 1
          ? 'Việc làm đã lưu'
          : languageRedux === 2
            ? 'Saved jobs'
            : languageRedux === 3 && '저장된 작업',
        languageRedux === 1
          ? 'Việc làm đã xem'
          : languageRedux === 2
            ? 'Viewed job'
            : languageRedux === 3 && '본 채용공고.',
      ],
    },
    {
      id: 2,
      // title: language?.history_page?.posted_jobs,
      title:
        languageRedux === 1
          ? 'Các công việc đã đăng tuyển'
          : languageRedux === 2
            ? 'Posted jobs'
            : languageRedux === 3 && '게시된 작업',
      childs: [
        languageRedux === 1
          ? 'Tất cả'
          : languageRedux === 2
            ? 'All'
            : languageRedux === 3 && '전부',
        languageRedux === 1
          ? 'Các công việc chưa đóng'
          : languageRedux === 2
            ? 'Unclosed jobs'
            : languageRedux === 3 && '마감되지 않은 채용정보',
        languageRedux === 1
          ? 'Các công việc đã đóng'
          : languageRedux === 2
            ? 'Closed jobs'
            : languageRedux === 3 && '채용이 마감되었습니다',

        // language?.history_page?.unclosed_jobs,

        // language?.history_page?.closed_jobs,
      ],
    },
    {
      id: 3,
      // title: language?.history_page?.list_of_articles,
      title:
        languageRedux === 1
          ? 'Danh sách bài viết'
          : languageRedux === 2
            ? 'List of articles'
            : languageRedux === 3 && '커뮤니티',
      childs: [
        languageRedux === 1
          ? 'Đã lưu'
          : languageRedux === 2
            ? 'Saved'
            : languageRedux === 3 && '저장됨',
        languageRedux === 1
          ? 'Bài viết bạn đã tạo'
          : languageRedux === 2
            ? 'Posted articles'
            : languageRedux === 3 && '등록되기',
        // language?.history_page?.saved,
        // language?.history_page?.posts_created,
      ],
    },
    {
      id: 4,
      // title: language?.history_page?.list_of_articles,
      title:
        languageRedux === 1
          ? 'Danh sách ứng viên'
          : languageRedux === 2
            ? 'List of candidates'
            : languageRedux === 3 && '지원자 리스트',
      childs: [
        languageRedux === 1
          ? 'Ứng viên đã lưu'
          : languageRedux === 2
            ? 'Saved candidates'
            : languageRedux === 3 && '저장한 구직자.',
        // languageRedux === 1
        //   ? 'Ứng viên đã xem'
        //   : languageRedux === 2
        //     ? 'Viewed candidates'
        //     : languageRedux === 3 && '본 구지자.',
        // languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posts',
        // language?.history_page?.saved,
        // language?.history_page?.posts_created,
      ],
    },
    {
      id: 5,
      // title: language?.history_page?.list_of_articles,
      title:
        languageRedux === 1
          ? 'Danh sách công ty'
          : languageRedux === 2
            ? 'List of companies'
            : languageRedux === 3 && '회사  리스트',
      childs: [
        languageRedux === 1
          ? 'Công ty đã lưu'
          : languageRedux === 2
            ? 'Saved comopanies'
            : languageRedux === 3 && '저장된 회사',
        languageRedux === 1
          ? 'Nhà tuyển dụng xem hồ sơ'
          : languageRedux === 2
            ? 'Employers view resumes'
            : '고용주는 이력서를 봅니다.',
        // languageRedux === 1
        //   ? 'Lượt công ty lưu hồ sơ'
        //   : languageRedux === 2
        //   ? 'Number of companies saved the profile'
        //   : languageRedux === 3 && '내 이력서를 저장한 회사 조회 수.',
      ],
    },
    // {
    //   id: 6,
    //   // title: language?.history_page?.list_of_articles,
    //   title:
    //     languageRedux === 1
    //       ? 'Lượt quan tâm công ty của bạn'
    //       : languageRedux === 2
    //         ? 'Number of visits to your company'
    //         : languageRedux === 3 && '회사 방문 횟수',
    //   childs: [
    //     languageRedux === 1
    //       ? 'Lượt ứng viên xem công ty'
    //       : languageRedux === 2
    //         ? 'Number of candidates viewed the company'
    //         : '내 회사정보를 본 구직자 조회 수',
    //     languageRedux === 1
    //       ? 'Lượt ứng viên theo dõi công ty'
    //       : languageRedux === 2
    //         ? 'Number of candidates following the company'
    //         : '내 회사 관심하는 구직자 조회 수',
    //   ],
    // },
    // {
    //   id: 7,
    //   // title: language?.history_page?.list_of_articles,
    //   title:
    //     languageRedux === 1
    //       ? 'Hoạt động của bạn'
    //       : languageRedux === 2
    //       ? 'Your activities'
    //       : languageRedux === 3 && '귀하의 활동',
    //   childs: [
    //     languageRedux === 1
    //       ? 'Việc làm đã xem'
    //       : languageRedux === 2
    //       ? 'Viewed job'
    //       : languageRedux === 3 && '본 채용공고.',
    //     languageRedux === 1
    //       ? 'Lượt công ty xem hồ sơ'
    //       : languageRedux === 2
    //       ? 'Number of companies that viewed the profile'
    //       : languageRedux === 3 && '내 이력서를 본 회사 조회 수.',
    //     languageRedux === 1
    //       ? 'Lượt công ty lưu hồ sơ'
    //       : languageRedux === 2
    //       ? 'Number of companies saved the profile'
    //       : languageRedux === 3 && '내 이력서를 저장한 회사 조회 수.',
    //   ],
    // },
  ];

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title = language?.history_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Lịch sử ứng tuyển/đăng tuyển'
        : languageRedux === 2
          ? 'HiJob - Job application/posting history'
          : 'HiJob - 입사지원/게시내역';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_history' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

  const CardsPost = useMemo(() => {
    if (ItemLeft === 2) {
      return (
        <CardsPosted
          activeChild={activeChild}
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemLeft, activeChild, showDetailPosted, setShowDetailPosted]);

  const CardsApply = useMemo(() => {
    if (ItemLeft === 0) {
      return <CardsApplied activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const CardsSave = useMemo(() => {
    if (ItemLeft === 1) {
      return <CardsSavedJob activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const CardListBlog = useMemo(() => {
    if (ItemLeft === 3) {
      return <CardsListBlog activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const CardListCandidates = useMemo(() => {
    if (ItemLeft === 4) {
      return <CardListCandidate />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  React.useEffect(() => {
    setSearchParams({
      p: `${ItemLeft}`,
      c: `${activeChild}`,
      post: `0`,
      // community_post: `${queryParams['community_post'] ? queryParams['community_post'] : "0"}`,
      // saved_jobs: `${queryParams['saved_jobs'] ? queryParams['saved_jobs'] : "0"}`,
      // recruitment_post: `${queryParams['recruitment_post'] ? queryParams['recruitment_post'] : "0"}`,
      // candidate:`${queryParams['candidate'] ? queryParams['candidate'] : "0"}`,
    });
  }, [ItemLeft, activeChild]);

  const CardListCompanies = useMemo(() => {
    if (ItemLeft === 5) {
      return <CardListCompany activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const CardListCandidateActivities = useMemo(() => {
    if (ItemLeft === 6) {
      return <CardListEmployerActivity activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const CardListEmployerActivities = useMemo(() => {
    if (ItemLeft === 7) {
      return <CardListCandidateActivity activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const handleChildClick = useCallback((childKey: string) => {
    setActiveChild(childKey);

    if (childKey === '2-0') setShowDetailPosted(false);
    if (childKey === '2-1') setShowDetailPosted(false);
    if (childKey === '2-2') setShowDetailPosted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSubTitle = useCallback((index: number) => {
    setItemLeft(index);
    setActiveChild(`${index}-0`);
    setShowDetailPosted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setCookie('fromHistory', '0', 365);
    if (hotjobtype === 2) {
      setItemLeft(2);
      setActiveChild('2-1');
      return;
    }
    if (viewedJob === 11) {
      setItemLeft(1);
      setActiveChild('1-1');
      return;
    }
    if (community_post === 31) {
      setItemLeft(3);
      setActiveChild('3-1');
      return;
    }
    if (community_post === 30) {
      setItemLeft(3);
      setActiveChild('3-0');
      return;
    }
    if (saved_jobs === 1) {
      setItemLeft(1);
      setActiveChild('1-0');
      return;
    }
    if (recruitment_post === 'opening') {
      setItemLeft(2);
      setActiveChild('2-1');
      return;
    }
    if (recruitment_post === 'closed') {
      setItemLeft(2);
      setActiveChild('2-2');
      return;
    }
    if (candidate === 4) {
      setItemLeft(4);
      setActiveChild('4-0');
      return;
    }
    if (viewedCandidate === 41) {
      setItemLeft(4);
      setActiveChild('4-1');
      return;
    }

    if (companyView === 50) {
      setItemLeft(5);
      setActiveChild('5-0');
      return;
    }

    if (companyView === 51) {
      setItemLeft(5);
      setActiveChild('5-1');
      return;
    }

    if (companyView === 52) {
      setItemLeft(5);
      setActiveChild('5-2');
      return;
    }

    if (activitiesEmployer === 60) {
      setItemLeft(6);
      setActiveChild('6-0');
      return;
    }

    if (activitiesEmployer === 61) {
      setItemLeft(6);
      setActiveChild('6-1');
      return;
    }

    if (activitiesCandidate === 70) {
      setItemLeft(7);
      setActiveChild('7-1');
      return;
    }

    if (activitiesCandidate === 71) {
      setItemLeft(7);
      setActiveChild('7-1');
      return;
    }

    if (activitiesCandidate === 72) {
      setItemLeft(7);
      setActiveChild('7-2');
      return;
    }

    if (profile?.typeRoleData === 0) {
      setItemLeft(0);
      setActiveChild('0-0');
      return;
    } else {
      setItemLeft(2);
      setActiveChild('2-0');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem('accessToken')) window.open(`/`, '_parent');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="post-history">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <div className="post-history_main">
        {/* <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Box> */}
        <Box
          sx={{ display: 'flex', gap: '12px' }}
          className="history-post-content"
        >
          <Box className="history-post_left">
            <Collapse
              // expandIcon={(e: any) => {
              //   return <RightOutlined onClick={(e) => e.stopPropagation()} />;
              // }}
              defaultActiveKey={
                hotjobtype && hotjobtype === 2
                  ? ['2', '1']
                  : viewedJob && viewedJob === 11
                    ? ['1', '1']
                    : community_post && community_post === 31
                      ? ['3', '1']
                      : companyView && companyView === 50
                        ? ['5', '1']
                        : companyView && companyView === 51
                          ? ['5', '1']
                          : companyView && companyView === 52
                            ? ['5', '2']
                            : community_post && community_post === 30
                              ? ['3', '0']
                              : saved_jobs === 1
                                ? ['1', '0']
                                : candidate === 4
                                  ? ['4', '0']
                                  : viewedCandidate === 41
                                    ? ['4', '1']
                                    : activitiesEmployer === 60
                                      ? ['6', '0']
                                      : activitiesEmployer === 61
                                        ? ['6', '1']
                                        : activitiesCandidate === 70
                                          ? ['7', '0']
                                          : activitiesCandidate === 71
                                            ? ['7', '1']
                                            : activitiesCandidate === 72
                                              ? ['7', '2']
                                              : profile?.typeRoleData === 0
                                                ? ['0', '0']
                                                : ['2', '0']
              }
              accordion
              bordered={false}
              ghost={true}
              className="history-post_left__collapse"
            >
              {dataItem.map((item: any, index: number) => {
                return (
                  <Panel
                    header={
                      <div
                        onClick={() => handleClickSubTitle(index)}
                        className={`${ItemLeft === index ? 'activeItem' : ''
                          } panel-title_text`}
                      >
                        <RightOutlined style={{ fontSize: '12px' }} />
                        <span style={{ marginLeft: '8px' }}>{item.title}</span>
                      </div>
                    }
                    key={index}
                    className={`history-left_item`}
                    style={{
                      display:
                        profile?.typeRoleData === 0
                          ? item?.id === 2 || item.id === 4 || item.id === 6
                            ? 'none'
                            : 'block'
                          : item?.id === 0 || item.id === 7
                            ? 'none'
                            : 'block',
                    }}
                  >
                    {item.childs.map((child: string, idx: number) => {
                      if (
                        index === 5 &&
                        idx === 1 &&
                        profile?.typeRoleData === 1
                      ) {
                        return <></>;
                      } else {
                        return (
                          <div
                            key={idx}
                            className={
                              activeChild === `${index}-${idx}`
                                ? 'active-child child-item'
                                : 'child-item'
                            }
                            onClick={() => {
                              handleChildClick(`${index}-${idx}`);
                            }}
                          >
                            {child}
                          </div>
                        );
                      }
                    })}
                  </Panel>
                );
              })}
            </Collapse>
          </Box>

          <Box className="history-post_right">
            {CardsPost}
            {CardsApply}
            {CardsSave}
            {CardListBlog}
            {CardListCandidates}
            {CardListCompanies}
            {CardListCandidateActivities}
            {CardListEmployerActivities}
          </Box>
        </Box>
      </div>
      <ShowCancleSave />
      <ShowNotificativeSave />
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default HistoryPost;
