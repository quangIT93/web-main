import React, { memo, useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';
import './style.scss';
import TextArea from 'antd/es/input/TextArea';
import { Button, InputRef, Skeleton, Spin, message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { SaveIconFill, SaveIconOutline } from '#components/Icons';
import nonAvatar from '../../../img/male_null_avatar.png';
import CompanyRating from '../CompanyRating';
import ModalReviewNotice from '../ModalReviewNotice';
import ModalPostReviewSuccess from '../ModalPostReviewSuccess';
import { useLocation } from 'react-router-dom';
import apiCompanyV3 from 'api/apiCompanyV3';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingOutlined } from '@ant-design/icons';
import { Backdrop, CircularProgress } from '@mui/material';
import moment from 'moment';
import ModalLogin from '#components/Home/ModalLogin';
import ModalConfirmDelete from '../ModalConfirmDelete';
interface IReviewCompany {
  company: any;
  companyId: any;
}

const ReviewCompany: React.FC<IReviewCompany> = (props) => {
  const { companyId } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [review, setReview] = useState<any>('');
  const [star, setStar] = useState<any>(0);
  const [openModalReviewNotice, setOpenModalReviewNotice] =
    useState<boolean>(false);
  const [openModalPostReviewSuccess, setOpenModalPostReviewSuccess] =
    useState<boolean>(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] =
    useState<boolean>(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState<any>('0');
  const [loading, setLoading] = React.useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const location = useLocation();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [companyRating, setCompanyRating] = useState<any>([]);
  const [averageRated, setAverageRated] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<any>(false);
  const [myReview, setMyReview] = useState<any>({});
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const inputRef = useRef<InputRef>(null);

  const handleGetReviewAccountOfCompany = async () => {
    try {
      if (companyId) {
        const result = await apiCompanyV3.getReviewAccountOfCompany(
          companyId,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (result) {
          console.log(result);
          setMyReview(result.data);
          setReview(result.data.comment);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRateComapy = async () => {
    try {
      setOpenBackdrop(true);
      const result = await apiCompanyV3.postCompanyRating(
        companyId,
        star,
        review,
      );
      if (result) {
        setOpenBackdrop(false);
        setOpenModalPostReviewSuccess(true);
        setIsSuccess(!isSuccess);
        setStatus('create');
        inputRef.current!.focus({
          cursor: 'end',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenBackdrop(false);
      message.error('Error');
    }
  };

  const handleEditReviewCompany = async () => {
    try {
      if (companyId) {
        const result = await apiCompanyV3.editCompanyReview(
          companyId,
          myReview.star,
          review,
        );
        if (result) {
          setOpenBackdrop(false);
          setOpenModalPostReviewSuccess(true);
          setIsSuccess(!isSuccess);
          setStatus('edit');
          inputRef.current!.focus({
            cursor: 'end',
          });
        }
      }
    } catch (error) {
      setOpenBackdrop(false);
      message.error('Error');
    }
  };

  const getCompanyRating = async () => {
    try {
      setLoading(true);
      const result = await apiCompanyV3.getCompanyRating(
        companyId,
        0,
        20,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      console.log('result: ', result);

      if (result.status === 200 && result.data.companyRatings.length === 20) {
        setLoading(false);
        setAverageRated(result.data.averageRated);
        setCompanyRating(result.data.companyRatings);
      } else if (
        result.data.companyRatings.length > 0 &&
        result.data.companyRatings.length < 20
      ) {
        setLoading(false);
        setAverageRated(result.data.averageRated);
        setCompanyRating(result.data.companyRatings);
        setHasMore(false);
        setPage('0');
      } else {
        setAverageRated(null);
        setCompanyRating([]);
        setHasMore(false);
        setPage('0');
      }
    } catch (error) {
      setHasMore(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = parseInt(page) + 1;
      const result = await apiCompanyV3.getCompanyRating(
        companyId,
        nextPage,
        20,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result && result.data.companyRatings.length !== 0) {
        setCompanyRating((prev: any) => [
          ...prev,
          ...result?.data.companyRatings,
        ]);
        setPage(nextPage);
      } else {
        setHasMore(false);
        setPage('0');
      }
    } catch (error) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getCompanyRating();
    handleGetReviewAccountOfCompany();
  }, [languageRedux, isSuccess]);

  const handleSetStar = (e: any) => {
    setStar(e.target.value);
  };

  const handleSubmitReview = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    if (
      Object.keys(myReview).length === 0 &&
      (star === 0 || review.trim().length === 0)
    ) {
      setOpenModalReviewNotice(true);
      inputRef.current!.focus({
        cursor: 'end',
      });
      return;
    }
    if (review.trim().length > 3000) {
      message.error(
        languageRedux === 1
          ? 'Đánh giá không được vượt quá 3000 ký tự'
          : 'Review cannot exceed 3000 characters',
      );
      inputRef.current!.focus({
        cursor: 'end',
      });
      return;
    }
    Object.keys(myReview).length === 0
      ? handleRateComapy()
      : handleEditReviewCompany();
  };

  const handleDeleteReview = async () => {
    setOpenModalConfirmDelete(true);
  };

  console.log(myReview);

  return (
    <div className={styles.review_company_container}>
      <div className={styles.review_company_content}>
        <div className={styles.review_company_left}>
          <div className={styles.review_company_5_star}>
            <h3>{
              languageRedux === 1 ? 'Được đánh giá'
                : languageRedux === 2 ? 'Reviewed' :
                  "검토됨"
            }</h3>
            <div className={styles.star_5_wrap}>
              <p>{averageRated !== null ? `(${averageRated}/5)` : `(0/5)`}</p>
              <CompanyRating
                rating={averageRated !== null ? averageRated : 0}
              />
            </div>
          </div>
          <div className={styles.review_company_list_review}>
            <h3>{
              languageRedux === 1 ? 'Đánh giá'
                : languageRedux === 2 ? 'Evaluate' :
                  '평가하다'
            }</h3>
            <InfiniteScroll
              dataLength={companyRating && companyRating?.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
              style={{ overflow: 'unset' }}
              scrollableTarget="scrollableDiv"
            >
              <div className={styles.list_review}>
                {companyRating &&
                  companyRating.map((item: any, idx: any) => (
                    <Skeleton loading={loading} active key={idx}>
                      <div className={styles.review_item} key={idx}>
                        <div className={styles.reviewer_avatar}>
                          <img
                            src={
                              item.profileData.avatarPath
                                ? item.profileData.avatarPath
                                : nonAvatar
                            }
                            alt=""
                          />
                        </div>
                        <div className={styles.reviewer_mess_wrap}>
                          <div className={styles.name_star}>
                            <div className={styles.reviewer_name}>
                              <h2>
                                {item.profileData.nameHide
                                  ? item.profileData.nameHide
                                  : languageRedux === 1
                                    ? 'Thông tin chưa cập nhật'
                                    : languageRedux === 2
                                      ? 'Not updated information'
                                      : '업데이트되지 않은 정보'}
                              </h2>

                              <p>
                                {moment(item?.createdAt).format('HH:mm') +
                                  ' ' +
                                  moment(new Date(item?.createdAt)).format(
                                    'DD/MM/YYYY',
                                  )}
                              </p>
                            </div>
                            <div className={styles.reviewer_star}>
                              <CompanyRating rating={Number(item?.star)} />
                            </div>
                          </div>
                          <div className={styles.reviewer_message}>
                            {item?.comment}
                          </div>
                        </div>
                      </div>
                    </Skeleton>
                  ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
        <div
          className={styles.review_company_right}
          style={{
            display: location?.pathname === '/detail-company' ? 'flex' : 'none',
          }}
        >
          <div className={styles.review_company_title}>
            <h3>{languageRedux === 1 ? 'Đánh giá của bạn'
              : languageRedux === 2 ? 'Your review'
                : '당신의 검토'}</h3>
            {Object.keys(myReview).length === 0 ? (
              <div className={styles.rating}>
                <input
                  onChange={handleSetStar}
                  type="radio"
                  name="rating"
                  value="5"
                  id="rating-1"
                />
                <label htmlFor="rating-1">
                  <SaveIconOutline width={24} height={24} />
                  <SaveIconFill width={24} height={24} />
                </label>
                <input
                  onChange={handleSetStar}
                  type="radio"
                  name="rating"
                  value="4"
                  id="rating-2"
                />
                <label htmlFor="rating-2">
                  <SaveIconOutline width={24} height={24} />
                  <SaveIconFill width={24} height={24} />
                </label>
                <input
                  onChange={handleSetStar}
                  type="radio"
                  name="rating"
                  value="3"
                  id="rating-3"
                />
                <label htmlFor="rating-3">
                  <SaveIconOutline width={24} height={24} />
                  <SaveIconFill width={24} height={24} />
                </label>
                <input
                  onChange={handleSetStar}
                  type="radio"
                  name="rating"
                  value="2"
                  id="rating-4"
                />
                <label htmlFor="rating-4">
                  <SaveIconOutline width={24} height={24} />
                  <SaveIconFill width={24} height={24} />
                </label>
                <input
                  onChange={handleSetStar}
                  type="radio"
                  name="rating"
                  value="1"
                  id="rating-5"
                />
                <label htmlFor="rating-5">
                  <SaveIconOutline width={24} height={24} />
                  <SaveIconFill width={24} height={24} />
                </label>
              </div>
            ) : (
              <div className={styles.delete_review}>
                <CompanyRating rating={myReview.star} />
                <Button type="text" danger onClick={handleDeleteReview}>
                  {languageRedux === 1 ? 'Xóa đánh giá'
                    : languageRedux === 2 ? 'Delete review' :
                      "리뷰 삭제"}
                </Button>
              </div>
            )}
          </div>
          <div className={styles.review_company_box}>
            <div className={styles.input_box}>
              <TextArea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={
                  languageRedux === 1
                    ? 'Nhập đánh giá của bạn...'
                    : languageRedux === 2 ? 'Enter your review...'
                      : '리뷰를 입력하세요...'
                }
                autoSize={{ minRows: 20, maxRows: 22 }}
                ref={inputRef}
              // rows={20}
              />
              <div className={styles.notice_input}>
                {review?.length > 3000 ? (
                  <span className={styles.helper_text}>
                    {languageRedux === 1
                      ? 'Đánh giá không được vượt quá 3000 ký tự'
                      : languageRedux === 2 ? 'Review cannot exceed 3000 characters'
                        : '리뷰는 3000자를 초과할 수 없습니다.'}
                  </span>
                ) : review?.length === 0 ? (
                  <span className={styles.helper_text}>
                    {languageRedux === 1
                      ? 'Đánh giá không được để trống'
                      : languageRedux === 2 ? 'Review cannot be blank'
                        : '리뷰는 비워둘 수 없습니다.'}
                  </span>
                ) : (
                  <></>
                )}
                <span className={styles.number_text}>{`${review?.length === undefined ? 0 : review.length
                  }/3000`}</span>
              </div>
            </div>
            <Button
              type="primary"
              ghost
              onClick={handleSubmitReview}
            // disabled={
            //     star === 0 && review === '' ? true :
            //         star === 0 ? true : false}
            >
              {Object.keys(myReview).length === 0
                ? languageRedux === 1
                  ? 'Đăng bài đánh giá'
                  : languageRedux === 2 ? 'Post a review'
                    : '리뷰 게시'
                : languageRedux === 1
                  ? 'Sửa bài đánh giá'
                  : languageRedux === 2 ? 'Edit a review'
                    : '리뷰 편집'}
            </Button>
          </div>
        </div>
        <Backdrop
          sx={{
            color: '#0d99ff ',
            backgroundColor: 'transparent',
            // boxShadow: 'none',
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={openBackdrop}
        //  onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <ModalReviewNotice
        openModalReviewNotice={openModalReviewNotice}
        setOpenModalReviewNotice={setOpenModalReviewNotice}
      />
      <ModalPostReviewSuccess
        openModalPostReviewSuccess={openModalPostReviewSuccess}
        setOpenModalPostReviewSuccess={setOpenModalPostReviewSuccess}
        status={status}
      />
      <ModalConfirmDelete
        openModalConfirmDelete={openModalConfirmDelete}
        setOpenModalConfirmDelete={setOpenModalConfirmDelete}
        companyId={companyId}
        setOpenBackdrop={setOpenBackdrop}
        setStatus={setStatus}
        setOpenModalPostReviewSuccess={setOpenModalPostReviewSuccess}
        setStar={setStar}
        setReview={setReview}
        setMyReview={setMyReview}
        setIsSuccess={setIsSuccess}
        inputRef={inputRef}
        isSuccess={isSuccess}
      />
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </div>
  );
};

export default memo(ReviewCompany);
