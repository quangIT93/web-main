import React, { memo, useEffect, useState } from "react";

import styles from './style.module.scss';
import TextArea from "antd/es/input/TextArea";
import { Button, Skeleton, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { SaveIconFill, SaveIconOutline } from "#components/Icons";

import nonAvatar from '../../../img/male_null_avatar.png'
import CompanyRating from "../CompanyRating";
import ModalReviewNotice from "../ModalReviewNotice";
import ModalPostReviewSuccess from "../ModalPostReviewSuccess";
import { useLocation } from "react-router-dom";
import apiCompanyV3 from "api/apiCompanyV3";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";

interface IReviewCompany {
    company: any
    companyId: any
}

const ReviewCompany: React.FC<IReviewCompany> = (props) => {
    const { companyId } = props
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const [review, setReview] = useState<any>('');
    const [star, setStar] = useState<any>(0);
    const [openModalReviewNotice, setOpenModalReviewNotice] = useState<boolean>(false);
    const [openModalPostReviewSuccess, setOpenModalPostReviewSuccess] = useState<boolean>(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [page, setPage] = React.useState<any>('0');
    const [loading, setLoading] = React.useState(true);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const location = useLocation()
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const [companyRating, setCompanyRating] = useState<any>([]);
    const [averageRated, setAverageRated] = useState<any>([]);
    const [isSuccess, setIsSuccess] = useState<any>(false);

    const handleRateComapy = async () => {
        try {
            setOpenBackdrop(true);
            const result = await apiCompanyV3.postCompanyRating(
                companyId,
                star,
                review
            )
            if (result) {
                setOpenBackdrop(false);
                setOpenModalPostReviewSuccess(true);
                setIsSuccess(!isSuccess);
            }
        } catch (error) {
            console.log(error);

        }
    }

    const getCompanyRating = async () => {
        try {
            setLoading(true);
            const result = await apiCompanyV3.getCompanyRating(
                companyId,
                0,
                20,
                languageRedux === 1 ? "vi" : "en"
            );
            if (result.status === 200) {
                setLoading(false);
                setAverageRated(result.data.averageRated)
                setCompanyRating(result.data.companyRatings);
                if (result.data.companyRatings.length < 20) {
                    setHasMore(false);
                    setPage('0');
                } else if (result.data.companyRatings.length === 0) {
                    setHasMore(false);
                    setPage('0');
                } else {
                    setHasMore(true);
                }
            }
        } catch (error) {

        }
    }

    const fetchMoreData = async () => {
        try {
            const nextPage = parseInt(page) + 1;
            const result = await apiCompanyV3.getCompanyRating(
                companyId,
                nextPage,
                20,
                languageRedux === 1 ? "vi" : "en"
            );

            if (result && result.data.companyRatings.length !== 0) {
                setCompanyRating((prev: any) => [...prev, ...result?.data.companyRatings]);
                setPage(nextPage);
            } else {
                setHasMore(false);
                setPage('0');
            }
        } catch (error) { }
    };

    useEffect(() => {
        getCompanyRating()
    }, [languageRedux, isSuccess])

    const handleSetStar = (e: any) => {
        setStar(e.target.value)
    }

    const handleSubmitReview = () => {
        if (star === 0) {
            setOpenModalReviewNotice(true);
            return
        }
        handleRateComapy()
        console.log("review", review);
        console.log("star", star);
    }

    return (
        <div className={styles.review_company_container}>
            <div className={styles.review_company_content}>
                <div className={styles.review_company_left}>
                    <div className={styles.review_company_5_star}>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Được đánh giá" :
                                    "Reviewed"
                            }
                        </h3>
                        <div className={styles.star_5_wrap}>
                            <p>
                                {
                                    averageRated !== null ?
                                        `(${averageRated}/5)`
                                        :
                                        `(0/5)`
                                }
                            </p>
                            <CompanyRating rating={averageRated !== null ? averageRated : 0} />
                        </div>
                    </div>
                    <div className={styles.review_company_list_review}>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Đánh giá" :
                                    "Evaluate"
                            }
                        </h3>
                        <InfiniteScroll
                            dataLength={companyRating && companyRating?.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
                            style={{ overflow: 'unset' }}
                            scrollableTarget="scrollableDiv"
                        >
                            <div className={styles.list_review}>
                                {
                                    companyRating && companyRating.map((item: any, idx: any) =>
                                        <Skeleton loading={loading} active key={idx}>
                                            <div className={styles.review_item} key={idx}>
                                                <div className={styles.reviewer_avatar}>
                                                    <img
                                                        src={
                                                            item.profileData.avatarPath ?
                                                                item.profileData.avatarPath :
                                                                nonAvatar
                                                        }
                                                        alt="" />
                                                </div>
                                                <div className={styles.reviewer_mess_wrap}>
                                                    <div className={styles.name_star}>
                                                        <div className={styles.reviewer_name}>
                                                            <h2>
                                                                {
                                                                    item.profileData.name ?
                                                                        item.profileData.name :
                                                                        languageRedux === 1 ?
                                                                            "Thông tin chưa cập nhật" :
                                                                            "Information not updated yet"
                                                                }
                                                            </h2>
                                                            <p>
                                                                {
                                                                    moment(item?.createdAt).format('HH:mm') +
                                                                    ' ' +
                                                                    moment(new Date(item?.createdAt)).format('DD/MM/YYYY')
                                                                }
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
                                    )
                                }
                            </div>

                        </InfiniteScroll>
                    </div>
                </div>
                <div className={styles.review_company_right}
                    style={{
                        display: location?.pathname === '/detail-company' ?
                            "flex" : "none"
                    }}
                >
                    <div className={styles.review_company_title}>
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Đánh giá của bạn" :
                                    "Your review"
                            }
                        </h3>
                        <div className={styles.rating}>
                            <input onChange={handleSetStar} type="radio" name="rating" value="5" id="rating-1" />
                            <label htmlFor="rating-1">
                                <SaveIconOutline width={24} height={24} />
                                <SaveIconFill width={24} height={24} />
                            </label>
                            <input onChange={handleSetStar} type="radio" name="rating" value="4" id="rating-2" />
                            <label htmlFor="rating-2">
                                <SaveIconOutline width={24} height={24} />
                                <SaveIconFill width={24} height={24} />
                            </label>
                            <input onChange={handleSetStar} type="radio" name="rating" value="3" id="rating-3" />
                            <label htmlFor="rating-3">
                                <SaveIconOutline width={24} height={24} />
                                <SaveIconFill width={24} height={24} />
                            </label>
                            <input onChange={handleSetStar} type="radio" name="rating" value="2" id="rating-4" />
                            <label htmlFor="rating-4">
                                <SaveIconOutline width={24} height={24} />
                                <SaveIconFill width={24} height={24} />
                            </label>
                            <input onChange={handleSetStar} type="radio" name="rating" value="1" id="rating-5" />
                            <label htmlFor="rating-5">
                                <SaveIconOutline width={24} height={24} />
                                <SaveIconFill width={24} height={24} />
                            </label>
                        </div>
                    </div>
                    <div className={styles.review_company_box}>
                        <TextArea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder={
                                languageRedux === 1 ?
                                    "Nhập đánh giá của bạn..." :
                                    "Enter your review..."
                            }
                            autoSize={{ minRows: 20, maxRows: 22 }}
                        // rows={20}
                        />
                        <Button
                            type="primary"
                            ghost
                            onClick={handleSubmitReview}
                        // disabled={
                        //     star === 0 && review === '' ? true :
                        //         star === 0 ? true : false}
                        >
                            {
                                languageRedux === 1 ?
                                    "Đăng bài đánh giá" :
                                    "Post a review"
                            }
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
            />
        </div>
    )
}

export default memo(ReviewCompany);