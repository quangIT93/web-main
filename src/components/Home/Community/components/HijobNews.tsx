import React from 'react';

import { Avatar, Skeleton } from 'antd';

import {
  NewsPaperIcon,
  EysIcon,
  LikeIcon,
  CommentIcon,
} from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import communityApi from 'api/apiCommunity';
import { Tooltip } from 'antd';
import ModalLogin from '../../../../components/Home/ModalLogin';
import { Typography } from '@mui/material';

const HijobNews = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [news, setNews] = React.useState<any>();
  const [like, setLike] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [loading, setLoading] = React.useState<any>(false);
  const handleGetHijobNews = async () => {
    try {
      setLoading(true);
      const result = await communityApi.getCommunityNews(
        '',
        '5',
        '',
        0,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setNews(result?.data?.communications);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeCommunity = async (communicationId: number, e: any) => {
    try {
      e.stopPropagation();
      if (!localStorage.getItem('accessToken')) {
        setOpenModalLogin(true);
        // CheckWasLogin();
        return;
      }
      const result = await communityApi.postCommunityLike(communicationId);
      if (result) {
        setLike(!like);
      }
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetHijobNews();
  }, [like, languageRedux]);

  const handleMoveToDetailPage = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=0`, '_parent');
    localStorage.setItem('community', '.community-container');
  };

  return (
    <>
      <div className="community-content-title">
        <div className="community-content-title_left">
          <NewsPaperIcon width={24} height={24} />
          <h3>
            {languageRedux === 1
              ? 'Tin tức'
              : languageRedux === 2
              ? 'Recruitment news'
              : languageRedux === 3 && '뉴스'}
          </h3>
        </div>
        <p onClick={() => window.open('/news-comunity', '_parent')}>
          {languageRedux === 1
            ? 'Xem tất cả'
            : languageRedux === 2
            ? 'View all'
            : languageRedux === 3 && '모두보기'}
        </p>
      </div>
      <div className="community-content-body">
        <Skeleton loading={loading} active>
          {news &&
            news.map((newsItem: any, index: any) => (
              <div
                className="community-content-body-right_item"
                key={index}
                onClick={() => handleMoveToDetailPage(newsItem?.id)}
              >
                <div className="community-content-body_left">
                  {newsItem?.images.length !== 0 ? (
                    <Avatar
                      shape="square"
                      size={50}
                      src={newsItem?.images[0]?.image}
                    />
                  ) : (
                    <Avatar shape="square" size={50} src="./images/news.jpg" />
                  )}
                </div>
                <div className="community-content-body_right">
                  <div className="body-item-title">
                    {/* <Tooltip title={newsItem?.title}> */}
                    {/* <h3>{newsItem?.title}</h3> */}
                    {/* </Tooltip> */}
                    {/* <div className="title"> */}
                    <Typography
                      component="div"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '14px',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        width: '75%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        fontWeight: '500',
                        lineheight: '20px',
                        color: '#000000',
                      }}
                    >
                      {newsItem?.title}
                    </Typography>
                    {/* </div> */}
                    <p>{newsItem?.createdAtText}</p>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div></div>
                    <div className="body-item-actions">
                      <div className="action-item">
                        <EysIcon />
                        <p>{newsItem?.communicationViewsCount}</p>
                      </div>
                      <div
                        className={
                          newsItem.liked ? 'action-item liked' : 'action-item'
                        }
                        onClick={(e) => handleLikeCommunity(newsItem?.id, e)}
                      >
                        <LikeIcon />
                        <p>{newsItem?.communicationLikesCount}</p>
                      </div>
                      <div className="action-item">
                        <CommentIcon />
                        <p>{newsItem?.communicationCommentsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-line"></div>
              </div>
            ))}
        </Skeleton>
      </div>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </>
  );
};

export default HijobNews;
