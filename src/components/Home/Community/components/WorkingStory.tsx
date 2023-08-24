import React from 'react';
import {
  ThinkingIcon,
  UseCircleIcon,
  EysIcon,
  LikeIcon,
  CommentIcon,
} from '#components/Icons';
import communityApi from 'api/apiCommunity';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const WorkingStory = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [stories, setStories] = React.useState<any>();
  const [position, setPosition] = React.useState<any>();

  const handleMoveToDetailPage = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=1`, '_parent');
    localStorage.setItem('community', '.community-container');
  };

  const handleGetWorkingStory = async () => {
    try {
      const result = await communityApi.getCommunityNews('', '5', '', 1);
      if (result) {
        setStories(result?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetWorkingStory();
  }, []);

  return (
    <>
      <div className="community-content-title">
        <div className="community-content-title_left">
          <ThinkingIcon />
          <h3>HiJob Working story</h3>
        </div>
        <p
          onClick={() => {
            window.open('/new-comunity', '_parent');
            localStorage.setItem('community', '.community-container');
          }}
        >
          View all
        </p>
      </div>
      <div className="community-content-body">
        {stories &&
          stories.map((story: any, index: any) => (
            <div
              className="community-content-body_item"
              key={index}
              onClick={() => handleMoveToDetailPage(story?.id)}
            >
              <div className="body-item-title">
                <h3>{story?.title}</h3>
                <p>{story?.createdAtText}</p>
              </div>
              <div className="body-item-user">
                <UseCircleIcon />
                <p>{story?.profileData?.name}</p>
              </div>
              <div className="body-item-actions">
                <div className="action-item">
                  <EysIcon />
                  <p>{story?.communicationViewsCount}</p>
                </div>
                <div className="action-item">
                  <LikeIcon />
                  <p>{story?.communicationLikesCount}</p>
                </div>
                <div className="action-item">
                  <CommentIcon />
                  <p>{story?.communicationCommentsCount}</p>
                </div>
              </div>
              <div className="border-line"></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default WorkingStory;
