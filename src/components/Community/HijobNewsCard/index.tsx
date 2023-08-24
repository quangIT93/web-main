import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.scss';

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  SaveIconOutline,
  SaveIconFill,
} from '#components/Icons';
import communityApi from 'api/apiCommunity';

interface IHijobNewsCard {
  item: any;
  index: any;
}

const HijobNewsCard: React.FC<IHijobNewsCard> = (props) => {
  const { item, index } = props;
  const [like, setLike] = React.useState(item?.liked);
  const [bookmark, setBookmark] = React.useState(item?.bookmarked);
  const [totalLike, setTotalLike] = React.useState(
    item?.communicationLikesCount,
  );
  const handleLikeCommunity = async (communicationId: number) => {
    try {
      const result = await communityApi.postCommunityLike(communicationId);
      if (result) {
        setLike(!like);
        if (result?.data?.communicationId) {
          setTotalLike(totalLike + 1);
        } else {
          setTotalLike(totalLike - 1);
        }
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => { }, [like]);

  const handleClickSave = async () => {
    console.log('handleClick save');
    try {
      const result = await communityApi.postCommunityBookmarked(item.id);
      if (result) {
        //create bookmark
        if (result.status === 201) {
          // setSaveListPost(!saveListPost);
          setBookmark(true);
        } else {
          setBookmark(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleMoveToDetailPage = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=0`, '_parent');
  };

  return (
    <>
      <div
        className="comunitypostNews-card-wrap_content"
        key={index}
      // onClick={() => handleMoveToDetailPage(item?.id)}
      >
        <div className="comunitypostNews-card-wrap_content__left">
          <Avatar shape="square" src={item?.images[0]?.image} icon={<UserOutlined />} />
        </div>
        <div className="comunitypostNews-card-wrap_content__right">
          <div className="comunityPostNews-card-content">
            <div className="comunityPostNews-card-content-title">
              <h3 onClick={() => handleMoveToDetailPage(item?.id)}>{item?.title}</h3>
              <div className="bookmark" onClick={handleClickSave}>
                {bookmark === true ? (
                  <SaveIconFill width={24} height={24} />
                ) : (
                  <SaveIconOutline width={24} height={24} />
                )}
              </div>
            </div>
            <div className="comunityPostNews-card-content_info">
              <ul className={`text-content_postNew `}>{item?.content}</ul>
            </div>
          </div>
          <div className="comunityPostNews-card-interaction">
            <div className="comunitypostNew-card-wrap_actor">
              <div className="comunitypostNew-wrap">
                {/* <img src="../images/banner.png" alt="anh loi" /> */}
                <Avatar
                  size={42}
                  src={item?.profileData?.avatarPath}
                  icon={<UserOutlined />}
                />
                <div className="info-actor_comunity">
                  <p>Người viết</p>
                  <p>{item?.profileData?.name}</p>
                </div>
              </div>
              <p>{new Date(item?.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="comunitypostNew-card-wrap_status">
              <div className="status-item">
                <EysIcon />
                <p>{item?.communicationViewsCount}</p>
              </div>
              <div
                className={like ? 'status-item liked' : 'status-item'}
                onClick={() => handleLikeCommunity(item?.id)}
              >
                <LikeIcon />
                <p>{totalLike}</p>
              </div>
              <div className="status-item" onClick={() => handleMoveToDetailPage(item?.id)}>
                <CommentIcon />
                <p>{item?.communicationCommentsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HijobNewsCard;
