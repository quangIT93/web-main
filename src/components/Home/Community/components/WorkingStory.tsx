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
import { Skeleton, Tooltip } from 'antd';
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
  const [loading, setLoading] = React.useState<any>(false);
  const handleMoveToDetailPage = (id: any) => {
    window.open(`/detail-comunity?post-community=${id}&type=1`, '_parent');
    localStorage.setItem('community', '.community-container');
  };

  const handleGetWorkingStory = async () => {
    try {
      setLoading(true);
      const result = await communityApi.getCommunityNews(
        '',
        '5',
        '',
        1,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setStories(result?.data?.communications);
        setLike(false);
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
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetWorkingStory();
  }, [like, languageRedux]);

  return (
    <>
      <div className="community-content-title">
        <div className="community-content-title_left">
          <ThinkingIcon />
          <h3>
            {languageRedux === 1
              ? 'Chia sẻ kinh nghiệm làm việc'
              : languageRedux === 2
              ? 'Working story'
              : languageRedux === 3 && '워킹스토리'}
          </h3>
        </div>
        <p
          onClick={() => {
            window.open('/new-comunity', '_parent');
            localStorage.setItem('community', '.community-container');
          }}
        >
          {languageRedux === 1
            ? 'Xem tất cả'
            : languageRedux === 2
            ? 'View all'
            : languageRedux === 3 && '모두보기'}
        </p>
      </div>
      <div className="community-content-body">
        <Skeleton loading={loading} active>
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
                    {story?.title}
                  </Typography>
                  {/* </div> */}
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
                      className={
                        story.liked ? 'action-item liked' : 'action-item'
                      }
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
        </Skeleton>
      </div>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </>
  );
};

export default WorkingStory;
