import React, { useEffect, FormEvent, useState } from 'react';
import { Spin } from 'antd';
import { message } from 'antd';
import { Space } from 'antd';
import { Stack } from '@mui/material';
// import component
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  FilterComunity,
  MoreICon,
  NewestIcon,
} from '#components/Icons';
import { LoadingOutlined } from '@ant-design/icons';
// @ts-ignore

import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import './style.scss';
import communityApi from 'api/apiCommunity';

import HijobNewsCard from '#components/Community/HijobNewsCard';
import { getCookie } from 'cookies';

const ComunityNews = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [openMenu, setOpenMenu] = React.useState(false);
  const footerRef = React.useRef<any>(null);
  // const [language, setLanguage] = React.useState<any>();
  const [hijobNews, setHijobNews] = React.useState<any>([]);
  const [page, setPage] = React.useState<any>('0');
  const [total, setTotal] = React.useState<any>(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [sort, setSort] = React.useState('');
  const [hasMore, setHasMore] = React.useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [readLoad, setReload] = React.useState(false);
  const [saveListPost, setSaveListPost] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  console.log('hijobNews', hijobNews);

  React.useEffect(() => {
    const reload = localStorage.getItem('reload');
    if (reload) {
      setReload(true);
    }
  }, []);

  const fetchMoreData = async () => {
    console.log('moreeeee');

    const nextPage = (parseInt(page) + 1).toString();
    const result = await communityApi.getCommunityNews(
      nextPage,
      '10',
      sort,
      0,
      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
    );

    //
    if (result && result?.data?.communications.length !== 0) {
      setHijobNews((prev: any) => [...prev, ...result?.data?.communications]);
      setPage(nextPage);
    } else {
      setHasMore(false);
      setPage('0');
      message.config({
        top: 750,
        duration: 2,
        maxCount: 3,
      });
      message.error(
        languageRedux === 1
          ? 'Không còn bài viết để hiển thị'
          : languageRedux === 2
          ? 'No more posts to show'
          : languageRedux === 3 && '더 이상 표시할 게시물이 없습니다.',
      );
      setIsVisible(false);
      // console.log('Đã hết bài viết để hiển thị', result);
    }
  };

  const handleSortBy = (sortString: string) => {
    //cm: comment, l: likes, v: views
    setPage('0');
    if (sort == sortString) {
      setSort('');
      // console.log(sort);
    } else {
      setHasMore(true);
      setSort(sortString);
    }
  };

  const handleGetAllHijobNews = async () => {
    try {
      setLoading(true);
      const result = await communityApi.getCommunityNews(
        page,
        '10',
        sort,
        0,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        console.log(result?.data?.communications);
        setHijobNews(result?.data?.communications);
        setTotal(result?.data?.total);
        setLoading(false);
        if (result?.data?.communications.length === 0) {
          setIsVisible(false);
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    let workingId = JSON.parse(getCookie('hijobId') || '');
    if (workingId) {
      if (hijobNews.map((item: any) => item.id).includes(workingId)) {
        document.getElementById(workingId)?.scrollIntoView({
          // behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      } else {
        fetchMoreData();
        window.scrollTo({ top: window.screen.height });
      }
    }
  }, [hijobNews]);

  React.useEffect(() => {
    handleGetAllHijobNews();
    setHasMore(true);
  }, [sort, readLoad, languageRedux]);

  const handleChange = async () => {
    const nextPage = (parseInt(page) + 1).toString();
    const result = await communityApi.getCommunityNews(
      nextPage,
      '10',
      sort,
      0,
      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
    );

    //
    if (result && result?.data?.communications?.length !== 0) {
      setHijobNews((prev: any) => [...prev, ...result?.data?.communications]);
      setPage(nextPage);
    } else {
      setPage('0');
      message.error(
        languageRedux === 1
          ? 'Không còn bài viết để hiển thị'
          : languageRedux === 2
          ? 'No more posts to show'
          : languageRedux === 3 && '더 이상 표시할 게시물이 없습니다.',
      );
      setIsVisible(false);
      // console.log('Đã hết bài viết để hiển thị', result);
    }
  };

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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(new Intl.NumberFormat('en-US').format(total));

  return (
    <div className="comunity-news-container">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <div className="comunity-news-content">
        <div className="comunityPostNews">
          <div className="title-comunity-news">
            <div className="title-comunity-news-content">
              <h3>
                {languageRedux === 1
                  ? 'Tin tức'
                  : languageRedux === 2
                  ? 'Recruitment news'
                  : languageRedux === 3 && '뉴스'}
              </h3>
              <p>
                {
                  loading
                    ? languageRedux === 1
                      ? 'Đang tải'
                      : languageRedux === 2
                      ? 'Loading'
                      : '로드 중'
                    : languageRedux === 1
                    ? `${new Intl.NumberFormat('en-US').format(
                        total,
                      )} bài viết mới`
                    : languageRedux === 2
                    ? `${new Intl.NumberFormat('en-US').format(
                        total,
                      )} new posts`
                    : languageRedux &&
                      `${new Intl.NumberFormat('en-US').format(
                        total,
                      )} 새 게시물`
                  // : language?.community_page?.today_hijob_has +
                  //   ' ' +
                  //   total +
                  //   ' ' +
                  //   language?.community_page?.new_posts
                }
              </p>
            </div>
            <div className="title-comunity-news_icon">
              <div
                className="dropdown dropdown-4"
                ref={footerRef}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <FilterComunity />
                <ul className="dropdown_menu dropdown_menu-4">
                  <li
                    className={
                      sort === ''
                        ? 'dropdown_item-1  active'
                        : 'dropdown_item-1'
                    }
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={() => {
                      handleSortBy('');
                    }}
                  >
                    <NewestIcon />
                    <p>
                      {languageRedux === 1
                        ? 'Mới nhất'
                        : languageRedux === 2
                        ? 'Newest'
                        : languageRedux === 3 && '최신'}
                    </p>
                  </li>
                  <li
                    className={
                      sort !== '' && sort == 'l'
                        ? 'dropdown_item-2  active'
                        : 'dropdown_item-2'
                    }
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={() => {
                      handleSortBy('l');
                    }}
                  >
                    <LikeIcon />
                    <p>
                      {languageRedux === 1
                        ? 'Lượt thích'
                        : languageRedux === 2
                        ? 'Likes"'
                        : '좋아요'}
                    </p>
                  </li>
                  <li
                    className={
                      sort !== '' && sort == 'v'
                        ? 'dropdown_item-3  active'
                        : 'dropdown_item-3'
                    }
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={() => {
                      handleSortBy('v');
                    }}
                  >
                    <EysIcon />
                    <p>
                      {languageRedux === 1
                        ? 'Lượt xem'
                        : languageRedux === 2
                        ? 'Views"'
                        : '보다'}
                    </p>
                  </li>
                  <li
                    className={
                      sort !== '' && sort == 'cm'
                        ? 'dropdown_item-4  active'
                        : 'dropdown_item-4'
                    }
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={() => {
                      handleSortBy('cm');
                    }}
                  >
                    <CommentIcon />
                    <p>
                      {languageRedux === 1
                        ? 'Lượt bình luận'
                        : languageRedux === 2
                        ? 'Comments"'
                        : '댓글'}
                    </p>
                  </li>
                </ul>
              </div>
              {/* <EditComunity /> */}
            </div>
          </div>
          <InfiniteScroll
            dataLength={hijobNews?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
          >
            {hijobNews?.map((item: any, index: any) => (
              <HijobNewsCard
                item={item}
                index={index}
                setSaveListPost={setSaveListPost}
                saveListPost={saveListPost}
              />
            ))}
          </InfiniteScroll>
          {/* {
                        hijobNews && hijobNews.map((item: any, index: any) => (
                            <HijobNewsCard item={item} index={index} />
                        ))
                    } */}
        </div>
        {/* <Stack
                    spacing={2}
                    sx={{
                        display: isVisible ? 'flex' : "none",
                        alignItems: 'center',
                        margin: '24px 0',
                    }}
                >
                    <Space
                        className="div-hover-more"
                        onClick={handleChange}
                    >
                        <p>
                            {
                                languageRedux === 1
            ? 'Xem thêm'
            : languageRedux === 2
              ? 'See more'
              : '더보기'
                            }
                        </p>
                        <MoreICon width={20} height={20} />
                    </Space>
                </Stack> */}
      </div>
      {/* <RollTop /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default ComunityNews;
