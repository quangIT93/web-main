import React, { memo } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.scss';
import { useDispatch } from 'react-redux';

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  SaveIconFill,
  SaveIconOutline,
} from '#components/Icons';

import communityApi from 'api/apiCommunity';

import { setAlertCancleSave, setAlertSave } from 'store/reducer/alertReducer';

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
  const [like, setLike] = React.useState(item && item?.liked);
  const [bookmark, setBookmark] = React.useState(item?.bookmarked);
  const [totalLike, setTotalLike] = React.useState(
    item?.communicationLikesCount,
  );

  const dispatch = useDispatch();
  console.log('item', item);
  console.log('like', like);

  const handleLikeCommunity = async (communicationId: number) => {
    try {
      const result = await communityApi.postCommunityLike(communicationId);
      if (result.status === 201) {
        setLike(true);
        setTotalLike(totalLike + 1);

        // if (result?.data?.communicationId && item.bookmarked) {
        // } else {
        //   setTotalLike(totalLike - 1);
        // }
      } else {
        setLike(false);
        setTotalLike(totalLike - 1);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log('bookmarked', item.bookmarked);

    if (item !== undefined && item.liked) {
      setLike(true);

      // if (result?.data?.communicationId && item.bookmarked) {
      // } else {
      //   setTotalLike(totalLike - 1);
      // }
    } else if (item && item) {
      setLike(false);
    }
  }, [item]);

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

  console.log('item', item);

  return (
    <>
      <div className="comunitypostNew-card-wrap_content" key={index}>
        {/* <div className="bookmark" onClick={handleClickSave}>
                    {item.bookmarked === true ? (
                        <SaveIconFill width={24} height={24} />
                    ) : (
                        <SaveIconOutline width={24} height={24} />
                    )}
                </div> */}

        <div className="comunityPostNew-card-content">
          <div className="comunityPostNew-card-content-title">
            <h3 onClick={() => handleMoveToDetailPage(item?.id)}>
              {item?.title}
            </h3>
            <div className="bookmark" onClick={handleClickSave}>
              {bookmark === true ? (
                <SaveIconFill width={24} height={24} />
              ) : (
                <SaveIconOutline width={24} height={24} />
              )}
            </div>
          </div>
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
            <p>{item?.communicationViewsCount}</p>
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
            <p>{item?.communicationCommentsCount}</p>
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
