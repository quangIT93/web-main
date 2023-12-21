import React from 'react';

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  EditComunity,
  FilterComunity,
  SaveIconOutline,
  SaveIconFill,
} from '#components/Icons';
import { Box, Typography, MenuItem, TextField } from '@mui/material';
import languageApi from 'api/languageApi';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';

import WorkingStoryCard from '#components/Community/WorkingStoryCard';

import communityApi from 'api/apiCommunity';

import './style.scss';
import HijobNewsCard from '#components/Community/HijobNewsCard';
import NoDataComponent from 'utils/NoDataPage';
import { useSearchParams } from 'react-router-dom';

const CardListBlogSave = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [showText, setShowText] = React.useState('');
  const [openMenu, setOpenMenu] = React.useState(false);
  // const [language, setLanguage] = React.useState<any>();

  const [stories, setStories] = React.useState<any>();
  const [page, setPage] = React.useState<any>(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [sort, setSort] = React.useState('');

  const [createdPost, setCreatedPost] = React.useState<any>();
  const [uploading, setUploading] = React.useState(false);

  const [saveListPost, setSaveListPost] = React.useState(false);

  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
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
  const handleAddText = () => {
    setShowText('showText');
  };

  const footerRef = React.useRef<any>(null);

  React.useEffect(() => {
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

  // const handleClickItemMenu = () => {
  //   console.log('hello');
  // };

  // commun
  const handleGetAllWorkingStory = async () => {
    try {
      const result = await communityApi.getCommunityBookmarked(
        page,
        10,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        // setIsVisible(true);
        setStories(result?.data?.communications);
        if (result?.data?.communications?.length < 10) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('stories: ', stories);

  React.useEffect(() => {
    handleGetAllWorkingStory();
  }, [saveListPost]);

  // more
  const handleChange = async () => {
    try {
      setUploading(true);
      const nextPage = parseInt(page) + 1;
      const result = await communityApi.getCommunityBookmarked(
        nextPage,
        10,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      //
      if (result && result?.data?.communications?.length !== 0) {
        setUploading(false);
        setStories((prev: any) => [...prev, ...result?.data?.communications]);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="list-blog-save-box"
      >
        <div className="back-container">
          {/* <Button
            className="back-button"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={handleHideDetail}
            style={{
              display: showDetailPosted ? 'block' : 'none',
            }}
          /> */}
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '24px',
            }}
          >
            {languageRedux === 1
              ? 'Danh sách bài viết'
              : languageRedux === 2
                ? 'List of articles'
                : languageRedux === 3 && '커뮤니티'}
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              {searchParams.get('c') === '3-0' && languageRedux === 1
                ? ' > Đã lưu'
                : languageRedux === 2
                  ? ' > Saved articles'
                  : languageRedux === 3 && ' > 저정되기'}
            </span>
          </Typography>
        </div>
        {/* <div className="title-comunity-news_icon">
          <div
            className="dropdown dropdown-4"
            ref={footerRef}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <FilterComunity />
            <ul className="dropdown_menu dropdown_menu-4">
              <li
                className="dropdown_item-1"
                style={{ display: openMenu ? 'flex' : 'none' }}
                onClick={handleClickItemMenu}
              >
                <LikeIcon />
                <p>{languageRedux === 1
            ? 'Lượt thích'
            : languageRedux === 2
              ? 'Likes"'
              : '좋아요'}</p>
              </li>
              <li
                className="dropdown_item-2"
                style={{ display: openMenu ? 'flex' : 'none' }}
              >
                <EysIcon />
                <p>{languageRedux === 1
            ? 'Lượt xem'
            : languageRedux === 2
              ? 'Views"'
              : '보다'}</p>
              </li>
              <li
                className="dropdown_item-3"
                style={{ display: openMenu ? 'flex' : 'none' }}
              >
                <CommentIcon />
                <p>{languageRedux === 1
            ? 'Lượt bình luận'
            : languageRedux === 2
              ? 'Comments"'
              : '댓글'}</p>
              </li>
            </ul> */}
        {/* </div> */}
        {/* <EditComunity /> */}
        {/* </div> */}
      </Box>
      <div className="list-blog-create-data">
        {stories && stories?.length !== 0 ? (
          stories.map((item: any, index: any) =>
            item?.communicationData?.type === 1 ? (
              <WorkingStoryCard
                item={item.communicationData}
                index={index}
                setSaveListPost={setSaveListPost}
                saveListPost={saveListPost}
              />
            ) : (
              <HijobNewsCard
                item={item.communicationData}
                index={index}
                setSaveListPost={setSaveListPost}
                saveListPost={saveListPost}
              />
            ),
          )
        ) : (
          <></>
        )}
        {/* {stories && stories.length === 0 ? ( */}
        <Box
          sx={{
            margin: '12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{
              width: 130,
              height: 40,
              backgroundColor: `#0D99FF`,
              marginBottom: '2rem',
              color: '#FFFFFF',
              fontWeight: 'bold',
              display: isVisible ? 'block' : 'none',
            }}
            loading={uploading}
            onClick={handleChange}
          >
            {languageRedux === 1
              ? 'Xem thêm'
              : languageRedux === 2
                ? 'See more'
                : '더보기'}
          </Button>
        </Box>
        {/* // ) : (
        //   <></>
        // )} */}
        {stories && stories.length === 0 ? <NoDataComponent /> : <></>}
      </div>
    </>
  );
};

export default CardListBlogSave;
