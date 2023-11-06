import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import styles from './style.module.scss';
import { getCookie } from 'cookies';

interface IModalPostReviewSuccess {
    openModalPostReviewSuccess: boolean;
    setOpenModalPostReviewSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPostReviewSuccess: React.FC<IModalPostReviewSuccess> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalPostReviewSuccess, setOpenModalPostReviewSuccess } = props;

    const handleCloseModal = () => {
        setOpenModalPostReviewSuccess(false);
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
                        ? 'Đăng đánh giá thành công'
                        : 'Posted review successfully'}
                </h3>
            }
            footer={null}
            open={openModalPostReviewSuccess}
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
                        ? 'Bài đánh giá của bạn về công ty này đã được đăng thành công.'
                        : 'Your review of this company has been published successfully.'
                }
            </p>
            <div className={styles.modal_post_review_success_buttons}>
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

export default ModalPostReviewSuccess;
