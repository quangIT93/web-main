import React from 'react'; // , { useEffect, FormEvent, useState }
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import { Box, Typography } from '@mui/material';
// import moment, { Moment } from 'moment';

// import { Collapse } from 'antd';
// import { Skeleton } from 'antd';
// import { message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
// import component

// @ts-ignore
import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  // LocationHomeIcon,
  // DolaIcon,
  SaveIconOutline,
  ShareIcon,
  SendComunityIcon,
  SaveIconFill
} from '#components/Icons';
import { useSearchParams } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// @ts-ignore
import { Navbar } from '#components';
import { Modal } from 'antd';
import './style.scss';
import communityApi from 'api/apiCommunity';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
// const { Panel } = Collapse;
import { Input } from 'antd';

const { TextArea } = Input;
interface FormPostCommunityComment {
  communicationId: number;
  content: string;
  images: string[];

}

const Comunity = () => {
  // const [showText, setShowText] = React.useState('');
  // const handleAddText = () => {
  //   setShowText('showText');
  // };
  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  const [detail, setDetail] = React.useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const POST_COMMUNITY_ID = searchParams.get('post-community')
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [cmtContent, setCmtContent] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState('');
  const [like, setLike] = React.useState(false);
  const [bookmark, setBookmark] = React.useState(false);
  const [cmt, setCmt] = React.useState(false);

  const handelChangeCmt = (event: any) => {
    setCmtContent(event.target.value)
  }

  const handleGetDetailCommunityById = async () => {
    try {
      if (POST_COMMUNITY_ID) {
        const result = await communityApi.getCommunityDetailId(POST_COMMUNITY_ID);
        if (result) {
          setDetail(result?.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    handleGetDetailCommunityById();
  }, [POST_COMMUNITY_ID, like, bookmark, cmt])

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const handleLikeCommunity = async (communicationId: number) => {
    try {
      const result = await communityApi.postCommunityLike(communicationId);
      if (result && result?.status === 201) {
        setLike(!like)
      }
      console.log(result);

    } catch (error) {
      console.log(error);
    }
  }

  const handleSaveCommunity = async (communicationId: number) => {
    try {
      const result = await communityApi.postCommunityBookmarked(communicationId);
      if (result && result?.status === 201) {
        setBookmark(!bookmark)
      }
      console.log(result);

    } catch (error) {
      console.log(error);
    }
  }

  const handleCommentCommunity = async () => {
    const form = {
      'communicationId': detail?.id,
      "content": cmtContent,
      "images": [],
    }
    try {
      const result = await communityApi.postCommunityComment(form);
      if (result) {
        setCmt(!cmt)
      }
      console.log(result);

    } catch (error) {
      console.log(error);
    }
    // console.log("content", cmtContent);
  }

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = (img: any) => {
    setPreviewImage(img);
    setPreviewOpen(true);
  };

  const handleKeyPress = (e: any) => {
    e.preventDefault();
    if (e.shiftKey) {
      // Insert a new line into the textArea
      e.target.value += '\n';
    } else
      // if (e.key === 'Enter') {
      handleCommentCommunity();
    // }
  };

  return (
    <div className="comunity-container">
      <Navbar />
      <div className="comunity-content">
        <div className="comunity-detail_post">
          <div className="title-comunity">
            <h3>{detail?.title}</h3>
            <div className="title-comunity_icon">
              {/* <CommentIcon /> */}
              <span>
                <ShareIcon width={24} height={24} />
                Chia sẻ
              </span>
              <span onClick={() => handleSaveCommunity(detail?.id)}>
                {
                  bookmark ?
                    <SaveIconFill width={24} height={24} />
                    :
                    <SaveIconOutline width={24} height={24} />
                }
                Lưu
              </span>
            </div>
          </div>

          <div className="comunityDetail-wrap_content">
            <div className="comunityDetail-content">
              <ul>
                {detail?.content}
              </ul>
            </div>
          </div>
          <ImageList
            className="comunityDetail-wrap_img"
            variant="quilted"
            cols={detail?.communicationImagesData?.images.length >= 4 ? 4 : detail?.communicationImagesData?.images.length}
            rowHeight={detail?.communicationImagesData?.images.length >= 4 ? 200 : 400}
          >
            {detail?.communicationImagesData?.images.map((item: any, index: any) => (
              <ImageListItem key={item}
                cols={
                  detail?.communicationImagesData?.images.length >= 4 &&
                    index === 0 ? 2 : 1
                }
                rows={
                  detail?.communicationImagesData?.images.length >= 4 &&
                    index === 0 ? 2 : 1
                }
              >
                <img
                  onClick={() => { handlePreview(item) }}
                  {...srcset(item, 200,
                    detail?.communicationImagesData?.images.length >= 4 &&
                      index === 0 ? 2 : 1,
                    detail?.communicationImagesData?.images.length >= 4 &&
                      index === 0 ? 2 : 1
                  )}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          {/* <div className="comunityDetail-wrap_img">
            {
              detail?.communicationImagesData?.images.map((img: any, index: any) => (
                <img key={index} src={img} alt="" />
              ))
            }
          </div> */}
          <div className="comunityDetail-wrap_status">
            <div className={like ? `comunitypostNew-status_item liked` : `comunitypostNew-status_item`}
              onClick={() => handleLikeCommunity(detail?.id)}
            >
              <LikeIcon />
              <p>{detail?.totalLikes}</p>
            </div>
            <div className="comunitypostNew-status_item">
              <CommentIcon />
              <p>{detail?.totalComments}</p>
            </div>
            <div className="comunitypostNew-status_item">
              <EysIcon />
              <p>{detail?.totalViews}</p>
            </div>
          </div>
          <div className="comunityDetail-wrap_actor">
            <div className="comunityDetail-wrap">
              {/* <img src={detail?.profileData?.avatar} alt="anh loi" /> */}
              <Avatar size={50} src={detail?.profileData?.avatar} icon={<UserOutlined />} />
              <div className="info-actor_comunityDetail">
                <p>Tác giả</p>
                <p>{detail?.profileData?.name}</p>
              </div>
            </div>
            <p>{detail?.createdAtText}</p>
          </div>

          <div className="comunityDetail-wrap_comment">
            <div className="comunityDetail-comment_chater">
              {/* <img
                src={dataProfile?.avatar ? dataProfile?.avatar : ''}
                alt=""
                style={{ width: '50px', height: '50px' }}
              /> */}
              <Avatar size={50} src={dataProfile?.avatar} icon={<UserOutlined />} />
              {/* <textarea name="Text" rows={5}></textarea> */}
              <div className="comunityDetail-comment_chaterInput">
                {/* <input
                  type="text"
                  value={cmtContent}
                  multiple
                  onKeyDown={handleKeyPress}
                  onChange={handelChangeCmt}
                /> */}
                <TextArea
                  value={cmtContent}
                  onPressEnter={(e: any) => handleKeyPress(e)}
                  onChange={handelChangeCmt}
                  placeholder="Enter comment"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
                <div className="comment-interaction">
                  <div className="comment-chaterInput_send"
                    onClick={handleCommentCommunity}
                  >
                    <SendComunityIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="comunityDetail-list_comment">
              {
                detail?.communicationCommentsData.map((cmtData: any, index: any) => (
                  <div className="comunityDetail-list_comment__item" key={index}>
                    {/* <img
                    src={cmtData?.profileData?.avatar}
                    alt=""
                    style={{ width: '50px', height: '50px' }}
                  /> */}
                    <Avatar size={50} src={cmtData?.profileData?.avatar} icon={<UserOutlined />} />
                    <div className="comunityDetail-comment">
                      <div className="comunityDetail-comment_top">
                        <h3>{cmtData?.profileData?.name}</h3>
                        <h3>|</h3>
                        <p>{cmtData?.createdAtText}</p>
                      </div>
                      <div className="comunityDetail-comment_bottom">
                        <p>
                          {cmtData?.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <Modal open={previewOpen} title="Image" footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Footer />
    </div>
  );
};

export default Comunity;
