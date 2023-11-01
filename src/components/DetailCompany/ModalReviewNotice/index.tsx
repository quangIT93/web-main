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
            width={614}
            centered
            title={
                <h3
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        // fontWeight: '700',
                        lineHeight: '24px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                    }}
                >
                    {languageRedux === 1
                        ? 'Không thể đăng bài đánh giá'
                        : 'Unable to post a review'}
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
                    textAlign: 'left',
                }}
            >
                {
                    languageRedux === 1
                        ? 'Bạn chỉ có thể đăng đánh giá sau khi đánh giá số sao cho công ty.'
                        : 'You can only post a review after giving the company a star rating.'
                }
            </p>
            <div className={styles.modal_review_notice_buttons}>
                <Button
                    type="primary"
                    shape="round"
                    onClick={handleCloseModal}
                >
                    {languageRedux === 1 ? 'Đã hiểu' : 'Ok'}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalReviewNotice;
