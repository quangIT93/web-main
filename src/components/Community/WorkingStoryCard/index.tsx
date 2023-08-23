import React, { memo } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.scss';

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  SaveIconFill,
  SaveIconOutline,
} from '#components/Icons';

import communityApi from 'api/apiCommunity';

interface IWorkingStoryCard {
  item: any;
  index: any;
  showText: any;
  handleAddText: any;
  setSaveListPost: React.Dispatch<React.SetStateAction<boolean>>;
  saveListPost: boolean;
}

const WorkingStoryCard: React.FC<IWorkingStoryCard> = (props) => {
  const {
    item,
    showText,
    index,
    handleAddText,
    setSaveListPost,
    saveListPost,
  } = props;
  const [like, setLike] = React.useState(false);
  const [totalLike, setTotalLike] = React.useState(
    item?.communicationLikesCount,
  );

  console.log('item', item);

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

  React.useEffect(() => {}, [like]);

  const handleMoveToDetailPage = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=1`, '_parent');
  };

  React.useEffect(() => {
    const content = document.querySelector('.text-content_postNew');
  }, []);

  const handleClickSave = async () => {
    console.log('handleClick save');
    try {
      const result = await communityApi.postCommunityBookmarked(item.id);
      if (result) {
        setSaveListPost(!saveListPost);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('item', item);

  return (
    <>
      <div className="comunitypostNew-card-wrap_content" key={index}>
        <div className="bookmark" onClick={handleClickSave}>
          {item.bookmarked === true ? (
            <SaveIconFill width={24} height={24} />
          ) : (
            <SaveIconOutline width={24} height={24} />
          )}
        </div>

        <div className="comunityPostNew-card-content">
          <h3 onClick={() => handleMoveToDetailPage(item?.id)}>
            {item?.title}
          </h3>
          <div className="comunityPostNew-card-content_info">
            <ul className={`text-content_postNew ${showText}`}>
              {item?.content}
            </ul>
            {!showText ? (
              <span onClick={handleAddText}>Xem thêm...</span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="comunitypostNew-wrap_status">
          <div className="status-item">
            <EysIcon />
            <p>{item?.totalViews}</p>
          </div>
          <div
            className={like ? 'status-item liked' : 'status-item'}
            onClick={() => handleLikeCommunity(item?.id)}
          >
            <LikeIcon />
            <p>{totalLike}</p>
          </div>
          <div
            className="status-item"
            onClick={() => handleMoveToDetailPage(item?.id)}
          >
            <CommentIcon />
            <p>{item?.totalComments}</p>
          </div>
        </div>

        <div className="comunitypostNew-wrap_actor">
          <div className="comunitypostNew-wrap">
            {/* <img src={item?.profileData?.avatarPath} alt="anh loi" /> */}
            <Avatar
              size={50}
              src={item?.profileData?.avatarPath}
              icon={<UserOutlined />}
            />
            <div className="info-actor_comunity">
              <p>Tác giả</p>
              <p>{item?.profileData?.name}</p>
            </div>
          </div>
          <p>{item?.createdAtText}</p>
        </div>
      </div>
    </>
  );
};

export default memo(WorkingStoryCard);
