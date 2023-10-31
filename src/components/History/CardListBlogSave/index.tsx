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
      const result = await communityApi.getCommunityBookmarked(page);
      if (result) {
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
      const result = await communityApi.getCommunityBookmarked(nextPage);

      //
      if (result && result?.data?.communications?.length !== 0) {
        setUploading(false);
        setStories((prev: any) => [...prev, ...result?.data?.communications]);
        setPage(nextPage);
      } else {
        setPage('0');
        message.error(
          languageRedux === 1
            ? 'Đã hết bài viết để hiển thị'
            : 'Out of posts to show',
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
            {language?.history_page?.posts_saved}
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
                <p>{language?.history_page?.likes}</p>
              </li>
              <li
                className="dropdown_item-2"
                style={{ display: openMenu ? 'flex' : 'none' }}
              >
                <EysIcon />
                <p>{language?.history_page?.views}</p>
              </li>
              <li
                className="dropdown_item-3"
                style={{ display: openMenu ? 'flex' : 'none' }}
              >
                <CommentIcon />
                <p>{language?.history_page?.comments}</p>
              </li>
            </ul> */}
        {/* </div> */}
        {/* <EditComunity /> */}
        {/* </div> */}
      </Box>
      <div className="list-blog-create-data">
        {stories && stories?.length === 0 ? (
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
        {stories && stories.length === 0 ? (
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
              {language?.more}
            </Button>
          </Box>
        ) : (
          <></>
        )}
        {stories && stories.length === 0 ? <NoDataComponent /> : <></>}
      </div>
    </>
  );
};

export default CardListBlogSave;
