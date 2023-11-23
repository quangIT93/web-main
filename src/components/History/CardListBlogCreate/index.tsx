import React from 'react';

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  EditComunity,
  FilterComunity,
  SaveIconOutline,
  SaveIconFill,
  SettingIcon,
  NewestIcon,
} from '#components/Icons';
import { Box, Typography, MenuItem, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message } from 'antd';
// import languageApi from 'api/languageApi';
import './style.scss';
import communityApi from 'api/apiCommunity';
import moment from 'moment';
import { setCookie } from 'cookies';
import NoDataComponent from 'utils/NoDataPage';
import { useSearchParams } from 'react-router-dom';
const CardListBlogCreate = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [showText, setShowText] = React.useState('');
  const [openMenu, setOpenMenu] = React.useState(false);
  const [page, setPage] = React.useState<any>('0');
  const [sort, setSort] = React.useState('');
  const [createdPost, setCreatedPost] = React.useState<any>();
  const [isVisible, setIsVisible] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const handleGetCreatedPost = async () => {
    try {
      const result = await communityApi.getCommunityByAccount(
        page,
        '10',
        sort,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setCreatedPost(result?.data?.communications);
        if (result?.data?.communications?.length < 10) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveToEdit = (id: any, e: any) => {
    e.stopPropagation();
    window.open(`/comunity_create_post?post-community=${id}`, '_parent');
  };

  const handleMoveToDetail = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=1`, '_parent');
    setCookie('fromHistory', '31', 365);
  };

  React.useEffect(() => {
    handleGetCreatedPost();
  }, [sort, languageRedux]);

  const handleAddText = () => {
    setShowText('showText');
  };

  const footerRef = React.useRef<any>(null);
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

  const handleChange = async () => {
    try {
      setUploading(true);
      const nextPage = (parseInt(page) + 1).toString();
      const result = await communityApi.getCommunityByAccount(
        nextPage,
        '10',
        sort,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      //
      if (result && result?.data?.communications?.length !== 0) {
        setUploading(false);
        setCreatedPost((prev: any) => [
          ...prev,
          ...result?.data?.communications,
        ]);
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

  const handleMoveToCreate = () => {
    window.open('/comunity_create_post', '_parent');
  };

  const handleSortBy = (sortString: string) => {
    //cm: comment, l: likes, v: views
    setPage('0');
    if (sort == sortString) {
      setSort('');
      // console.log(sort);
    } else {
      setUploading(false);
      setIsVisible(true);
      setSort(sortString);
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
        className="list-blog-create-box"
      >
        <div className="back-container">
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '24px',
            }}
          >
            {languageRedux === 1 ? 'Danh sách bài viết' : 'List of articles'}
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              {searchParams.get('c') === '3-1' && languageRedux === 1
                ? ' > Bài viết bạn đã tạo'
                : ' > Posted articles'}
            </span>
          </Typography>
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
                  sort === '' ? 'dropdown_item-1  active' : 'dropdown_item-1'
                }
                style={{ display: openMenu ? 'flex' : 'none' }}
                onClick={() => {
                  handleSortBy('');
                }}
              >
                <NewestIcon />
                <p>{language?.history_page?.latest}</p>
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
                <p>{language?.history_page?.likes}</p>
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
                <p>{language?.history_page?.views}</p>
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
                <p>{language?.history_page?.comments}</p>
              </li>
            </ul>
          </div>
          <div className="create-community-post" onClick={handleMoveToCreate}>
            <EditComunity />
          </div>
        </div>
      </Box>
      <div className="list-blog-create-data">
        {createdPost &&
          createdPost.map((item: any, index: any) => (
            <div
              className="community-content-body_item"
              key={index}
              onClick={() => handleMoveToDetail(item?.id)}
            >
              <div className="community-content-body-item_top">
                <div className="body-item-title">
                  <h3>{item?.title}</h3>
                  <div
                    className="title-icon"
                    onClick={(e) => handleMoveToEdit(item?.id, e)}
                  >
                    <SettingIcon />
                  </div>
                </div>
                <p>
                  {item?.createdAtText
                    ? item?.createdAtText
                    : new Date(item?.createdAt).toLocaleDateString('en-GB') +
                      ', ' +
                      moment(new Date(item?.createdAt)).format('HH:mm')}
                </p>
              </div>
              <div className="body-item-actions">
                <div className="action-item">
                  <EysIcon />
                  <p>{item?.totalViews}</p>
                </div>
                <div className="action-item">
                  <LikeIcon />
                  <p>{item?.totalLikes}</p>
                </div>
                <div className="action-item">
                  <CommentIcon />
                  <p>{item?.totalComments}</p>
                </div>
              </div>
            </div>
          ))}
        {createdPost && createdPost.length === 0 ? (
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
        {createdPost && createdPost.length === 0 ? <NoDataComponent /> : <></>}
      </div>
    </>
  );
};

export default CardListBlogCreate;
