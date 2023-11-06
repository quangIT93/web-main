import React, { useState } from "react";

import styles from './style.module.scss';
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { SaveIconFill, SaveIconOutline } from "#components/Icons";

import nonAvatar from '../../../img/male_null_avatar.png'
import CompanyRating from "../CompanyRating";
import ModalReviewNotice from "../ModalReviewNotice";
import ModalPostReviewSuccess from "../ModalPostReviewSuccess";
import { useLocation } from "react-router-dom";

interface IReviewCompany {
    company: any
}

const ReviewCompany: React.FC<IReviewCompany> = (props) => {
    const { company } = props;
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const [review, setReview] = useState<any>('');
    const [star, setStar] = useState<any>(0);
    const [rate, setRate] = useState<any>(2.5);
    const [openModalReviewNotice, setOpenModalReviewNotice] = useState<boolean>(false);
    const [openModalPostReviewSuccess, setOpenModalPostReviewSuccess] = useState<boolean>(false);
    const location = useLocation()

    const handleSetStar = (e: any) => {
        setStar(e.target.value)
    }

    const handleSubmitReview = () => {
        if (star === 0) {
            setOpenModalReviewNotice(true);
            return
        }
        setOpenModalPostReviewSuccess(true);
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
                                    `(${rate}/5)`
                                }
                            </p>
                            <CompanyRating rating={rate} />
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
                        <div className={styles.list_review}>
                            {
                                new Array(5).fill(undefined).map((val, idx) =>
                                    <div className={styles.review_item}>
                                        <div className={styles.reviewer_avatar}>
                                            <img src={nonAvatar} alt="" />
                                        </div>
                                        <div className={styles.reviewer_mess_wrap}>
                                            <div className={styles.name_star}>
                                                <div className={styles.reviewer_name}>
                                                    <h2>Phạm Văn Hai</h2>
                                                    <p>10:02 04/10/2023</p>
                                                </div>
                                                <div className={styles.reviewer_star}>
                                                    <CompanyRating rating={4} />
                                                </div>
                                            </div>
                                            <div className={styles.reviewer_message}>
                                                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
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

export default ReviewCompany;