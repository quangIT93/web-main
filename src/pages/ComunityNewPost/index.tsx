import React, { useEffect } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
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
} from '#components/Icons';

// @ts-ignore
import { Navbar } from '#components';
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroll-component';
import RollTop from '#components/RollTop';
import languageApi from 'api/languageApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import './style.scss';
import communityApi from 'api/apiCommunity';

import WorkingStoryCard from '#components/Community/WorkingStoryCard';

import { setAlertSave } from 'store/reducer/alertReducer';

// const { Panel } = Collapse;

const ComunityNewPost = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
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
    const result = await communityApi.getCommunityNews(nextPage, '10', sort, 1);

    //
    if (result && result?.data?.communications?.length !== 0) {
      setStories((prev: any) => [...prev, ...result?.data?.communications]);
      setPage(nextPage);
    } else {
      setHasMore(false);
      setPage('0');
      message.error('Đã hết bài viết');
      setIsVisible(false);
      // console.log('da het data', result);
    }
  };

  const handleGetAllWorkingStory = async () => {
    try {
      // localStorage.removeItem('reload');
      const result = await communityApi.getCommunityNews(page, '10', sort, 1);
      if (result) {
        setStories(result?.data?.communications);
        setTotal(result?.data?.total);
        if (result?.data?.communications?.length < 10) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetAllWorkingStory();
    setHasMore(true);
  }, [sort, readLoad]);

  // const handleChange = async () => {
  //     const nextPage = (parseInt(page) + 1).toString()
  //     const result = await communityApi.getCommunityNews(nextPage, "10", sort, 1);

  //     //
  //     if (result && result?.data?.length !== 0) {
  //         setStories((prev: any) => [...prev, ...result?.data]);
  //         setPage(nextPage);
  //     } else {
  //         setPage("0");
  //         message.error("da het data");
  //         setIsVisible(false);
  //         // console.log('da het data', result);
  //     }
  // };

  // console.log('page', page);

  const [language, setLanguage] = React.useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setLanguage(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi();
  }, [languageRedux]);
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
      <Navbar />
      <div className="comunity-content">
        <div className="comunityPostNew">
          <div className="title-comunity">
            <h3>{'Hôm nay, HiJob có ' + total + ' bài viết mới'}</h3>
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
                      sort !== '' && sort == 'l'
                        ? 'dropdown_item-1  active'
                        : 'dropdown_item-1'
                    }
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={() => {
                      handleSortBy('l');
                    }}
                  >
                    <LikeIcon />
                    <p>{language?.history_page?.likes}</p>
                  </li>
                  <li
                    className={
                      sort !== '' && sort == 'v'
                        ? 'dropdown_item-2  active'
                        : 'dropdown_item-2'
                    }
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={() => {
                      handleSortBy('v');
                    }}
                  >
                    <EysIcon />
                    <p>{language?.history_page?.views}</p>
                  </li>
                  <li
                    className={
                      sort !== '' && sort == 'cm'
                        ? 'dropdown_item-3  active'
                        : 'dropdown_item-3'
                    }
                    style={{ display: openMenu ? 'flex' : 'none' }}
                    onClick={() => {
                      handleSortBy('cm');
                    }}
                  >
                    <CommentIcon />
                    <p>{language?.history_page?.comments}</p>
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
                                language?.more
                            }
                        </p>
                        <MoreICon width={20} height={20} />
                    </Space>
                </Stack> */}
      </div>
      <RollTop />
      <Footer />
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </div>
  );
};

export default ComunityNewPost;
