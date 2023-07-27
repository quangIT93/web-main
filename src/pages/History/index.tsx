import React, { useMemo, useCallback } from 'react';

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

import ShowCancleSave from '#components/ShowCancleSave';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import ShowNotificativeSave from '#components/ShowNotificativeSave';
// api
// import siteApi from 'api/siteApi';

// import icon

import {
  // useNavigate,
  // createSearchParams,
  useSearchParams,
} from 'react-router-dom';

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
];
const HistoryPost = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hotjobtype = Number(searchParams.get('post'));
  const [activeChild, setActiveChild] = React.useState(
    hotjobtype === 2 ? '2-0' : '0-0',
  );
  const [ItemLeft, setItemLeft] = React.useState<null | number>(
    hotjobtype === 2 ? 2 : 0,
  );
  const [showDetailPosted, setShowDetailPosted] =
    React.useState<boolean>(false);
  console.log('searchParams', hotjobtype === 2);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    // event.preventDefault()
  }

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_history' as string,
    });
  }, []);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="#0d99ff "
      href="/"
      onClick={handleClick}
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#0d99ff "
      href="/history"
      onClick={handleClick}
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

  const handleChildClick = useCallback((childKey: string) => {
    setActiveChild(childKey);

    if (childKey === '2-0') setShowDetailPosted(false);
    if (childKey === '2-1') setShowDetailPosted(false);
    if (childKey === '2-2') setShowDetailPosted(false);
  }, []);

  const handleClickSubTitle = useCallback((index: number) => {
    setItemLeft(index);
    setActiveChild(`${index}-0`);
    setShowDetailPosted(false);
  }, []);

  React.useEffect(() => {
    if (hotjobtype === 2) {
      setItemLeft(2);
      setActiveChild('2-0');
    }
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
              {dataItem.map((item: any, index: number) => (
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
              ))}
            </Collapse>
          </Box>

          <Box className="history-post_right">
            {CardsPost}
            {CardsApply}
            {CardsSave}
          </Box>
        </Box>
      </div>
      <ShowCancleSave />
      <ShowNotificativeSave />
      <Footer />
    </div>
  );
};

export default HistoryPost;
