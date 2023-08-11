import React, { useMemo, useCallback } from 'react';
import queryString from 'query-string';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Collapse } from 'antd';
import { Box, Typography } from '@mui/material';

// import component
import Footer from '../../components/Footer/Footer';
import CardsPosted from '#components/History/CardsPosted';
import CardsApplied from '#components/History/CardsApplied';
import CardsSavedJob from '#components/History/CardsSavedJob';
// import CardsListBlog from '#components/History/CardsListBlog';

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

const { Panel } = Collapse;

const dataItem = [
  {
    id: 1,
    title: 'Các công việc đã ứng tuyển',
    childs: [
      'Tất cả',
      // 'Đã được duyệt', 'Đang chờ duyệt'
    ],
  },
  {
    id: 2,
    title: 'Các công việc đã lưu',
    childs: ['Tất cả'],
  },
  {
    id: 3,
    title: 'Các công việc đã đăng tuyển',
    childs: ['Tất cả', 'Chưa đóng', 'Đã đóng'],
  },
  // {
  //   id: 4,
  //   title: 'Danh sách bài viết',
  //   childs: ['Đã lưu', 'Đã được tạo'],
  // },
];
const HistoryPost = () => {
  const queryParams = queryString.parse(window.location.search);
  // const hotjobtype = Number(searchParams.get('post'));
  const hotjobtype = Number(queryParams['post']);
  const [activeChild, setActiveChild] = React.useState(
    hotjobtype === 2 ? '2-0' : '0-0',
  );
  const [ItemLeft, setItemLeft] = React.useState<null | number>(
    hotjobtype === 2 ? 2 : 0,
  );
  const [showDetailPosted, setShowDetailPosted] =
    React.useState<boolean>(false);
  // console.log('searchParams', hotjobtype === 2);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    // event.preventDefault()
  }

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    document.title = 'HiJob - Lịch sử ứng tuyển/đăng tuyển';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_history' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="#0d99ff "
      href="/"
      onClick={handleClick}
      target="_parent"
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#0d99ff "
      href="/history"
      onClick={handleClick}
      target="_parent"
    >
      Lịch sử
    </Link>,
    <Typography key="3" color="text.primary">
      {ItemLeft === dataItem[0].id - 1
        ? dataItem[0].title
        : ItemLeft === dataItem[1].id - 1
        ? dataItem[1].title
        : dataItem[2].title}
    </Typography>,
    <Typography key="3" color="text.primary">
      {activeChild === '0-0'
        ? 'Tất cả'
        : // : activeChild === '0-1'
          // ? 'Đã được duyệt'
          // : activeChild === '0-2'
          // ? 'Đang chờ duyệt'
          ''}

      {activeChild === '1-0' ? 'Tất cả' : ''}

      {activeChild === '2-0'
        ? 'Tất cả'
        : activeChild === '2-1'
        ? 'Chưa đóng'
        : activeChild === '2-2'
        ? 'Đã đóng'
        : ''}

      {activeChild === '3-0'
        ? 'Đã lưu'
        : activeChild === '3-1'
        ? 'Đã được tạo'
        : ''}
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

  // const CardListBlog = useMemo(() => {
  //   if (ItemLeft === 3) {
  //     return <CardsListBlog activeChild={activeChild} />;
  //   }
  //   return null;
  // }, [ItemLeft, activeChild]);

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
    if (hotjobtype === 2) {
      setItemLeft(2);
      setActiveChild('2-0');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="post-history">
      <Navbar />
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
              defaultActiveKey={
                hotjobtype && hotjobtype === 2 ? ['2', '0'] : ['0', '0']
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
                        {item.title}
                      </div>
                    }
                    key={index}
                    className={`history-left_item`}
                  >
                    {item.childs.map((child: string, idx: number) => (
                      <div
                        key={idx}
                        className={
                          activeChild === `${index}-${idx}`
                            ? 'active-child child-item'
                            : 'child-item'
                        }
                        onClick={() => handleChildClick(`${index}-${idx}`)}
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
            {/* {CardListBlog} */}
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
