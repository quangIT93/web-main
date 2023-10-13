import React, { useMemo, useCallback } from 'react';
import queryString from 'query-string';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Collapse } from 'antd';
import { Box, iconClasses, Typography } from '@mui/material';

import { Space } from 'antd';

// import component
import Footer from '../../components/Footer/Footer';
import CardsPosted from '#components/History/CardsPosted';
import CardsApplied from '#components/History/CardsApplied';
import CardsSavedJob from '#components/History/CardsSavedJob';
import CardsListBlog from '#components/History/CardsListBlog';
import CardListCandidate from '#components/History/CardListCandidate';

import RollTop from '#components/RollTop';

import ShowCancleSave from '#components/ShowCancleSave';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import ShowNotificativeSave from '#components/ShowNotificativeSave';
// api
// import siteApi from 'api/siteApi';

// import icon

import './style.scss';
// @ts-ignore
import { Navbar } from '#components';
// import Item from 'antd/es/list/Item'
import languageApi from 'api/languageApi';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
import { setCookie } from 'cookies';
import CategoryDropdown from '#components/CategoryDropdown';

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
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const queryParams = queryString.parse(window.location.search);
  // const hotjobtype = Number(searchParams.get('post'));
  const hotjobtype = Number(queryParams['post']);
  const community_post = Number(queryParams['community_post']);
  const saved_jobs = Number(queryParams['saved_jobs']);
  const recruitment_post = queryParams['recruitment_post'];
  const candidate = Number(queryParams['candidate']);
  const [activeChild, setActiveChild] = React.useState(
    hotjobtype === 2
      ? '2-0'
      : candidate === 4
      ? '4-0'
      : community_post === 31
      ? '3-1'
      : community_post === 30
      ? '3-0'
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
      : community_post === 31
      ? 3
      : community_post === 30
      ? 3
      : candidate === 4
      ? 4
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

  // const [language, setLanguage] = React.useState<any>();

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

  const dataItem = [
    {
      id: 0,
      // title: language?.history_page?.applied_jobs,
      // childs: [language?.all],
      title:
        languageRedux === 1 ? 'Các công việc đã ứng tuyển' : 'Applied jobs',
      childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
    },
    {
      id: 1,
      // title: language?.history_page?.saved_jobs,
      // childs: [language?.all],
      title: languageRedux === 1 ? 'Các công việc đã lưu' : 'Saved jobs',
      childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
    },
    {
      id: 2,
      // title: language?.history_page?.posted_jobs,
      title:
        languageRedux === 1 ? 'Các công việc đã đăng tuyển' : 'Posted jobs',
      childs: [
        languageRedux === 1 ? 'Tất cả' : 'All',
        languageRedux === 1 ? 'Các công việc chưa đóng' : 'Unclosed jobs',
        languageRedux === 1 ? 'Các công việc đã đóng' : 'Closed jobs',

        // language?.history_page?.unclosed_jobs,

        // language?.history_page?.closed_jobs,
      ],
    },
    {
      id: 3,
      // title: language?.history_page?.list_of_articles,
      title: languageRedux === 1 ? 'Danh sách bài viết' : 'List of articles',
      childs: [
        languageRedux === 1 ? 'Đã lưu' : 'Saved',
        languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posts',
        // language?.history_page?.saved,
        // language?.history_page?.posts_created,
      ],
    },
    {
      id: 4,
      // title: language?.history_page?.list_of_articles,
      title: languageRedux === 1 ? 'Danh sách ứng viên' : 'List of candidates',
      childs: [
        languageRedux === 1 ? 'Tất cả' : 'All',
        // languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posts',
        // language?.history_page?.saved,
        // language?.history_page?.posts_created,
      ],
    },
  ];

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title = language?.history_page?.title_page;
    document.title =
      languageRedux === 1
        ? 'HiJob - Lịch sử ứng tuyển/đăng tuyển'
        : 'HiJob - Job application/posting history';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_history' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="#0d99ff "
      href="/"
      onClick={handleClick}
      target="_parent"
      style={{ fontSize: '12px' }}
    >
      {language?.history_page?.home}
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#0d99ff "
      href="/history"
      onClick={handleClick}
      target="_parent"
      style={{ fontSize: '12px' }}
    >
      {language?.history_page?.history}
    </Link>,
    <Typography key="3" color="text.primary" sx={{ fontSize: '12px' }}>
      {ItemLeft === dataItem[0].id
        ? dataItem[0].title
        : ItemLeft === dataItem[1].id
        ? dataItem[1].title
        : ItemLeft === dataItem[2].id
        ? dataItem[2].title
        : ItemLeft === dataItem[3].id
        ? dataItem[3].title
        : dataItem[4].title}
    </Typography>,
    <Typography key="3" color="text.primary" sx={{ fontSize: '12px' }}>
      {activeChild === '0-0'
        ? language?.all
        : // : activeChild === '0-1'
          // ? 'Đã được duyệt'
          // : activeChild === '0-2'
          // ? 'Đang chờ duyệt'
          ''}

      {activeChild === '1-0' ? language?.all : ''}

      {activeChild === '2-0'
        ? language?.all
        : activeChild === '2-1'
        ? language?.history_page?.not_closed_yet
        : activeChild === '2-2'
        ? language?.closed
        : ''}
      {activeChild === '3-0'
        ? language?.history_page?.saved
        : activeChild === '3-1'
        ? language?.history_page?.have_been_created
        : ''}

      {activeChild === '4-0' ? language?.all : ''}
    </Typography>,
  ];
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

  console.log('ItemLEFT', ItemLeft);

  const CardListCandidates = useMemo(() => {
    if (ItemLeft === 4) {
      return <CardListCandidate />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const handleChildClick = useCallback((childKey: string) => {
    setActiveChild(childKey);
    // console.log('childKey', childKey);

    if (childKey === '2-0') setShowDetailPosted(false);
    if (childKey === '2-1') setShowDetailPosted(false);
    if (childKey === '2-2') setShowDetailPosted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSubTitle = useCallback((index: number) => {
    // console.log('title', index);

    setItemLeft(index);
    setActiveChild(`${index}-0`);
    setShowDetailPosted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setCookie('fromHistory', '0', 365);
    if (hotjobtype === 2) {
      setItemLeft(2);
      setActiveChild('2-0');
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
    if (roleRedux === 0) {
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
      <Navbar />
      <CategoryDropdown />
      <div className="post-history_main">
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
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
                  ? ['2', '0']
                  : community_post && community_post === 31
                  ? ['3', '1']
                  : community_post && community_post === 30
                  ? ['3', '0']
                  : saved_jobs === 1
                  ? ['1', '0']
                  : candidate === 4
                  ? ['4', '0']
                  : roleRedux === 0
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
                        className={`${
                          ItemLeft === index ? 'activeItem' : ''
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
                        roleRedux === 0
                          ? item?.id === 2 || item.id === 4
                            ? 'none'
                            : 'block'
                          : item?.id === 0
                          ? 'none'
                          : 'block',
                    }}
                  >
                    {item.childs.map((child: string, idx: number) => (
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
                    ))}
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
          </Box>
        </Box>
      </div>
      <ShowCancleSave />
      <ShowNotificativeSave />
      <RollTop />
      <Footer />
    </div>
  );
};

export default HistoryPost;
