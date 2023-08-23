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
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';

import WorkingStoryCard from '#components/Community/WorkingStoryCard';

import communityApi from 'api/apiCommunity';

import './style.scss';

const CardListBlogSave = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [showText, setShowText] = React.useState('');
  const [openMenu, setOpenMenu] = React.useState(false);
  const [language, setLanguage] = React.useState<any>();

  const [stories, setStories] = React.useState<any>();
  const [page, setPage] = React.useState<any>('0');
  const [isVisible, setIsVisible] = React.useState(true);
  const [sort, setSort] = React.useState('');

  const [saveListPost, setSaveListPost] = React.useState(false);

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

  const handleClickItemMenu = () => {
    console.log('hello');
  };

  // commun
  const handleGetAllWorkingStory = async () => {
    try {
      const result = await communityApi.getCommunityBookmarked();
      if (result) {
        console.log('log', result);
        setStories(result.data);
        if (result?.data?.length < 10) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('stories: ', stories);

  React.useEffect(() => {
    handleGetAllWorkingStory();
  }, [saveListPost]);

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
              fontSize: '16px',
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

      {stories ? (
        stories.map((item: any, index: any) => (
          <WorkingStoryCard
            item={item.communicationData}
            index={index}
            showText={showText}
            handleAddText={handleAddText}
            setSaveListPost={setSaveListPost}
            saveListPost={saveListPost}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default CardListBlogSave;
