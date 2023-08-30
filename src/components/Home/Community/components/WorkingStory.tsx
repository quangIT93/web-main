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
import { Tooltip } from 'antd';
import ModalLogin from '../../../../components/Home/ModalLogin';
import { Typography } from '@mui/material';

const WorkingStory = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const [stories, setStories] = React.useState<any>();
  const [position, setPosition] = React.useState<any>();
  const [like, setLike] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const handleMoveToDetailPage = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=1`, '_parent');
    localStorage.setItem('community', '.community-container');
  };

  const handleGetWorkingStory = async () => {
    try {
      const result = await communityApi.getCommunityNews(
        '',
        '10',
        '',
        1,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setStories(result?.data?.communications);
        setLike(result?.data?.communications?.liked);
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
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetWorkingStory();
  }, [like]);

  return (
    <>
      <div className="community-content-title">
        <div className="community-content-title_left">
          <ThinkingIcon />
          <h3>
            {languageRedux === 1
              ? 'Chia sẻ kinh nghiệm làm việc'
              : 'HiJob Working story'}
          </h3>
        </div>
        <p
          onClick={() => {
            window.open('/new-comunity', '_parent');
            localStorage.setItem('community', '.community-container');
          }}
        >
          {language?.home_page?.view_all}
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
                {/* <Tooltip title={story?.title}> */}
                {/* <h3>{story?.title}</h3> */}
                {/* </Tooltip> */}
                <div className="title">
                  <Typography gutterBottom component="div" variant="body2" color="text.secondary">
                    {story?.title}
                  </Typography>
                </div>
                <p>{story?.createdAtText}</p>
              </div>
              <div className="body-item_bottom">
                <div className="body-item-user">
                  <UseCircleIcon />
                  <p>{story?.profileData?.name.slice(0, 2) + '...'}</p>
                </div>
                <div className="body-item-actions">
                  <div className="action-item">
                    <EysIcon />
                    <p>{story?.communicationViewsCount}</p>
                  </div>
                  <div
                    className={story.liked ? 'action-item liked' : 'action-item'}
                    onClick={(e) => handleLikeCommunity(story?.id, e)}
                  >
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
            </div>
          ))}
      </div>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </>
  );
};

export default WorkingStory;
