import React from 'react';

import { Avatar } from 'antd';

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

const HijobNews = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [news, setNews] = React.useState<any>();
  const [like, setLike] = React.useState(false);

  const handleGetHijobNews = async () => {
    try {
      const result = await communityApi.getCommunityNews('', '5', '', 0);
      if (result) {
        setNews(result?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeCommunity = async (communicationId: number, e: any) => {
    try {
      e.stopPropagation()
      const result = await communityApi.postCommunityLike(communicationId);
      if (result) {
        setLike(!like);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetHijobNews();
  }, [like]);

  const handleMoveToDetailPage = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=0`, '_parent');
    localStorage.setItem('community', '.community-container');
  };

  return (
    <>
      <div className="community-content-title">
        <div className="community-content-title_left">
          <NewsPaperIcon />
          <h3>HiJob News</h3>
        </div>
        <p onClick={() => window.open('/news-comunity', '_parent')}>View all</p>
      </div>
      <div className="community-content-body">
        {news &&
          news.map((newsItem: any, index: any) => (
            <div
              className="community-content-body-right_item"
              key={index}
              onClick={() => handleMoveToDetailPage(newsItem?.id)}
            >
              <div className="community-content-body_left">
                <Avatar shape="square" size={88} src={newsItem?.images[0]?.image} />
              </div>
              <div className="community-content-body_right">
                <div className="body-item-title">
                  <Tooltip title={newsItem?.title}>
                    <h3>{newsItem?.title}</h3>
                  </Tooltip>
                  <p>{newsItem?.createdAtText}</p>
                </div>
                <div className="body-item-actions">
                  <div className="action-item">
                    <EysIcon />
                    <p>{newsItem?.communicationViewsCount}</p>
                  </div>
                  <div className={newsItem.liked ? "action-item liked" : "action-item"}
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
          ))}
      </div>
    </>
  );
};

export default HijobNews;
