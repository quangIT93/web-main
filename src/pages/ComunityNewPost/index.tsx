import React, { useEffect } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
// import moment, { Moment } from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
// import { Collapse } from 'antd';
import { Avatar, Space, message } from 'antd';

import ModalLogin from '../../components/Home/ModalLogin';
// import component
import { Stack } from '@mui/material';

import { useDispatch } from 'react-redux';

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  EditComunity,
  FilterComunity,
  MoreICon,
  NewestIcon,
} from '#components/Icons';

// @ts-ignore
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroll-component';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import './style.scss';
import communityApi from 'api/apiCommunity';

import WorkingStoryCard from '#components/Community/WorkingStoryCard';

import { setAlertSave } from 'store/reducer/alertReducer';
import HijobNewsCard from '#components/Community/HijobNewsCard';
import { getCookie } from 'cookies';

// const { Panel } = Collapse;

const ComunityNewPost = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [openMenu, setOpenMenu] = React.useState(false);
  const [stories, setStories] = React.useState<any>([]);
  const [page, setPage] = React.useState<any>('0');
  const [total, setTotal] = React.useState<any>(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [sort, setSort] = React.useState('');
  const [hasMore, setHasMore] = React.useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [saveListPost, setSaveListPost] = React.useState(false);
  const [readLoad, setReload] = React.useState(false);

  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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

  const fetchMoreData = async () => {
    const nextPage = (parseInt(page) + 1).toString();
    const result = await communityApi.getCommunityNews(
      nextPage,
      '10',
      sort,
      1,
      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
    );

    //
    if (result && result?.data?.communications.length !== 0) {
      setStories((prev: any) => [...prev, ...result?.data?.communications]);
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

  const handleGetAllWorkingStory = async () => {
    // let workingId = JSON.parse(getCookie('workingId') || '');
    try {
      // localStorage.removeItem('reload');
      setLoading(true);
      const result = await communityApi.getCommunityNews(
        page,
        '10',
        sort,
        1,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        setStories(result?.data?.communications);
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
    handleGetAllWorkingStory();
    setHasMore(true);
  }, [sort, readLoad, languageRedux]);

  React.useEffect(() => {
    let workingId = JSON.parse(getCookie('workingId') || '');
    if (workingId) {
      if (stories.map((item: any) => item.id).includes(workingId)) {
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
  }, [stories]);

  // const handleChange = async () => {
  //     const nextPage = (parseInt(page) + 1).toString()
  //     const result = await communityApi.getCommunityNews(nextPage, "10", sort, 1);

  //     //
  //     if (result && result?.data?.length !== 0) {
  //         setStories((prev: any) => [...prev, ...result?.data]);
  //         setPage(nextPage);
  //     } else {
  //         setPage("0");
  //         message.error("Đã hết bài viết để hiển thị");
  //         setIsVisible(false);
  //         // console.log('Đã hết bài viết để hiển thị', result);
  //     }
  // };

  // console.log('page', page);

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
  const footerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const reload = localStorage.getItem('reload');
    if (reload) {
      setReload(true);
    }
  }, []);

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

  const handleMoveToCreate = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
    } else {
      window.open('/comunity_create_post', '_parent');
    }
  };

  return (
    <div className="comunity-container">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <div className="comunityContent">
        <div className="comunityPostNew">
          <div className="title-comunity">
            <div className="title-comunity-new-content">
              <h3>
                {languageRedux === 1
                  ? 'Câu chuyện việc làm'
                  : languageRedux === 2
                    ? 'Working story'
                    : languageRedux === 3 && '워킹스토리'}
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

                  // language?.community_page?.today_hijob_has +
                  //   ' ' +
                  //   total +
                  //   ' ' +
                  //   language?.community_page?.new_posts
                }
              </p>
            </div>
            <div className="title-comunity_icon">
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
              <div
                className="create-community-post"
                onClick={handleMoveToCreate}
              >
                <EditComunity />
              </div>
            </div>
          </div>
          <InfiniteScroll
            dataLength={stories?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
          >
            {stories?.map((item: any, index: any) => (
              <WorkingStoryCard
                item={item}
                index={item.id}
                setSaveListPost={setSaveListPost}
                saveListPost={saveListPost}
              />
            ))}
          </InfiniteScroll>

          {/* {
                        stories && stories.map((item: any, index: any) => (
                            <WorkingStoryCard
                                item={item}
                                index={index}
                                showText={showText}
                                handleAddText={handleAddText}
                            />
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
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </div>
  );
};

export default ComunityNewPost;
