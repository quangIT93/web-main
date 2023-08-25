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
import { Avatar, Tooltip, message } from 'antd';
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
  SaveIconFill,
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

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectCoverflow, Navigation } from 'swiper';

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
  const POST_COMMUNITY_ID = searchParams.get('post-community');
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [cmtContent, setCmtContent] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState('');
  const [like, setLike] = React.useState(false);
  const [bookmark, setBookmark] = React.useState(false);
  const [cmt, setCmt] = React.useState(false);

  const handelChangeCmt = (event: any) => {
    setCmtContent(event.target.value);
  };

  const handleGetDetailCommunityById = async () => {
    try {
      if (POST_COMMUNITY_ID) {
        const result = await communityApi.getCommunityDetailId(
          POST_COMMUNITY_ID,
        );
        if (result && result.status !== 400) {
          setLike(result?.data?.liked);
          setDetail(result?.data);
          setBookmark(result?.data?.bookmarked);
        } else {
          window.location.replace('new-comunity');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetDetailCommunityById();
  }, [POST_COMMUNITY_ID, like, bookmark, cmt]);

  console.log('detail', detail);

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    console.log('image', image);
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  const handleLikeCommunity = async (communicationId: number) => {
    if (!localStorage.getItem('accessToken')) {
      message.error('Vui lòng đăng nhập để thực hiện chức năng');
      return;
    }

    try {
      const result = await communityApi.postCommunityLike(communicationId);
      if (result) {
        result.status === 201 ? setLike(true) : setLike(false);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (detail && detail.liked) {
      setLike(true);
    } else if (detail && !detail.liked) {
      setLike(false);
    }

    if (detail && detail.bookmarked) {
      setBookmark(true);
    } else if (detail && !detail.bookmarked) {
      setBookmark(false);
    }
  }, [detail]);

  const handleSaveCommunity = async (communicationId: number) => {
    if (!localStorage.getItem('accessToken')) {
      message.error('Vui lòng đăng nhập để thực hiện chức năng');
      return;
    }

    try {
      const result = await communityApi.postCommunityBookmarked(
        communicationId,
      );
      if (result) {
        setBookmark(!bookmark);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentCommunity = async () => {
    if (!localStorage.getItem('accessToken')) {
      message.error('Vui lòng đăng nhập để thực hiện chức năng');
      return;
    }

    if (cmtContent.trim() == '') {
      message.error('Bạn chưa nhập bình luận');
      return;
    }
    const form = {
      communicationId: detail?.id,
      content: cmtContent,
      images: [],
    };
    try {
      const result = await communityApi.postCommunityComment(form);
      if (result) {
        setCmt(!cmt);
        setCmtContent('');
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    // console.log("content", cmtContent);
  };

  // console.log('detail', detail);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = (img: any) => {
    setPreviewImage(img);
    setPreviewOpen(true);
  };

  const handleKeyPress = (e: any) => {
    // e.preventDefault();

    if (!e.shiftKey) {
      //   // Insert a new line into the textArea
      //   // e.target.value += '\n';
      // }
      // // if (e.key === 'Enter') {
      // else {

      handleCommentCommunity();
    }
    // }
  };

  console.log('detail', detail);

  return (
    <div className="comunity-container">
      <Navbar />
      <div className="comunity-content">
        <div className="comunity-detail_post">
          <div className="title-comunity">
            <Tooltip title={detail?.title}>
              <h3>{detail?.title}</h3>
            </Tooltip>
            <div className="title-comunity_icon">
              {/* <CommentIcon /> */}
              <span>
                <ShareIcon width={24} height={24} />
                Chia sẻ
              </span>
              <span onClick={() => handleSaveCommunity(detail?.id)}>
                {bookmark ? (
                  <SaveIconFill width={24} height={24} />
                ) : (
                  <SaveIconOutline width={24} height={24} />
                )}
                Lưu
              </span>
            </div>
          </div>

          <div className="comunityDetail-wrap_content">
            <div className="comunityDetail-content">
              {/* <div>{detail?.content}</div> */}
              <TextArea
                value={detail?.content}
                autoSize
                // showCount
              />
            </div>
          </div>
          {/* <ImageList
            className="comunityDetail-wrap_img"
            variant="quilted"
            cols={
              detail?.image.length >= 4
                ? 4
                : detail?.image.length
            }
            rowHeight={detail?.image.length >= 4 ? 200 : 400}
          >
            {detail?.image.map((item: any, index: any) => (
              <ImageListItem
                key={item.id}
                cols={
                  detail?.image.length >= 4 && index === 0
                    ? 2
                    : 1
                }
                rows={
                  detail?.image.length >= 4 && index === 0
                    ? 2
                    : 1
                }
              >
                <img
                  onClick={() => {
                    handlePreview(item.image);
                  }}
                  {...srcset(
                    item.image,
                    200,
                    detail?.image?.length >= 4 && index === 0
                      ? 2
                      : 1,
                    detail?.image?.length >= 4 && index === 0
                      ? 2
                      : 1,
                  )}
                  alt={item.image}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList> */}
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            initialSlide={1}
            // slidesPerView={1}
            // spaceBetween={30}
            // loop={true}
            // navigation={true}
            modules={[EffectCoverflow, Navigation]}
            className="detail-community-img-swipper"
          >
            {detail?.image.map((item: any, index: any) => (
              <SwiperSlide className="detail-community-img-swipper_item">
                <img
                  onClick={() => {
                    handlePreview(item.image);
                  }}
                  {...srcset(
                    item.image,
                    200,
                    detail?.image?.length >= 4 && index === 0 ? 2 : 1,
                    detail?.image?.length >= 4 && index === 0 ? 2 : 1,
                  )}
                  alt={item.image}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className="comunityDetail-wrap_img">
            {
              detail?.image?.images.map((img: any, index: any) => (
                <img key={index} src={img} alt="" />
              ))
            }
          </div> */}
          <div className="comunityDetail-wrap_status">
            <div
              className={
                like
                  ? `comunitypostNew-status_item liked`
                  : `comunitypostNew-status_item`
              }
              onClick={() => handleLikeCommunity(detail?.id)}
            >
              <LikeIcon />
              <p>{detail?.communicationLikesCount}</p>
            </div>
            <div className="comunitypostNew-status_item">
              <CommentIcon />
              <p>{detail?.communicationCommentsCount}</p>
            </div>
            <div className="comunitypostNew-status_item">
              <EysIcon />
              <p>{detail?.communicationViewsCount}</p>
            </div>
          </div>
          <div className="comunityDetail-wrap_actor">
            <div className="comunityDetail-wrap">
              {/* <img src={detail?.profileData?.avatar} alt="anh loi" /> */}
              <Avatar
                size={50}
                src={detail?.profileData?.avatar}
                icon={<UserOutlined />}
              />
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
              <Avatar
                size={50}
                src={dataProfile?.avatar}
                icon={<UserOutlined />}
              />
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
                  autoSize
                  // showCount
                />
                <div className="comment-interaction">
                  <div
                    className={
                      cmtContent.trim() != ''
                        ? 'comment-chaterInput_send active'
                        : 'comment-chaterInput_send'
                    }
                    onClick={handleCommentCommunity}
                  >
                    <SendComunityIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="comunityDetail-list_comment">
              {detail?.communicationCommentsData &&
                detail?.communicationCommentsData.map(
                  (cmtData: any, index: any) => (
                    <div
                      className="comunityDetail-list_comment__item"
                      key={index}
                    >
                      {/* <img
                    src={cmtData?.profileData?.avatar}
                    alt=""
                    style={{ width: '50px', height: '50px' }}
                  /> */}
                      <Avatar
                        size={50}
                        src={cmtData?.profile?.avatar}
                        icon={<UserOutlined />}
                      />
                      <div className="comunityDetail-comment">
                        <div className="comunityDetail-comment_top">
                          <h3>{cmtData?.profile?.name}</h3>
                          <h3>|</h3>
                          <p>{cmtData?.createdAtText}</p>
                        </div>
                        <div className="comunityDetail-comment_bottom">
                          <TextArea
                            value={cmtData?.content}
                            autoSize
                            // showCount
                          />
                          {/* <p>{cmtData?.content}</p> */}
                        </div>
                      </div>
                    </div>
                  ),
                )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={previewOpen}
        title="Image"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Footer />
    </div>
  );
};

export default Comunity;
