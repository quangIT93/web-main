import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import styles from './style.module.scss';
import { getCookie } from 'cookies';

interface IModalReviewNotice {
    openModalReviewNotice: boolean;
    setOpenModalReviewNotice: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalReviewNotice: React.FC<IModalReviewNotice> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalReviewNotice, setOpenModalReviewNotice } = props;

    const handleCloseModal = () => {
        setOpenModalReviewNotice(false);
    };

    return (
        <Modal
            width={500}
            centered
            title={
                <h3
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        // fontWeight: '700',
                        lineHeight: '24px',
                        letterSpacing: '0em',
                        textAlign: 'center',
                    }}
                >
                    {languageRedux === 1
                        ? 'Không thể đăng bài đánh giá'
                        : languageRedux === 2 ?
                            'Unable to post a review' :
                            "리뷰를 게시할 수 없습니다."}
                </h3>
            }
            footer={null}
            open={openModalReviewNotice}
            // onOk={handleOk}
            onCancel={handleCloseModal}
        >
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                }}
            >
                {
                    languageRedux === 1
                        ? 'Bạn chỉ có thể đăng đánh giá sau khi đánh giá số sao và viết đánh giá cho công ty.'
                        : languageRedux === 2 ?
                            'You can only post a review after giving the company a star rating and comment.'
                            : '별점을 매기고 회사에 대한 리뷰를 작성한 후에만 리뷰를 게시할 수 있습니다.'
                }
            </p>
            <div className={styles.modal_review_notice_buttons}>
                <Button
                    type="primary"
                    shape="round"
                    onClick={handleCloseModal}
                >
                    {languageRedux === 1 ? 'Đã hiểu'
                        : languageRedux === 2 ? 'Ok' : '이해했다'}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalReviewNotice;
