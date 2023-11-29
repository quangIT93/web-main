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
    status: string;
}

const ModalPostReviewSuccess: React.FC<IModalPostReviewSuccess> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalPostReviewSuccess, setOpenModalPostReviewSuccess, status } = props;

    const handleCloseModal = () => {
        setOpenModalPostReviewSuccess(false);
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
                    {
                        status === 'create' ?
                            languageRedux === 1
                                ? 'Đăng đánh giá thành công'
                                : languageRedux === 2 ?
                                    'Posted review successfully' :
                                    "리뷰가 성공적으로 게시되었습니다."
                            :
                            status === 'edit' ?
                                languageRedux === 1
                                    ? 'Sửa bài đánh giá thành công'
                                    : languageRedux === 2 ?
                                        'Edited review successfully' :
                                        "리뷰가 성공적으로 편집되었습니다"
                                :
                                languageRedux === 1
                                    ? 'Xóa bài đánh giá thành công'
                                    : languageRedux === 2 ?
                                        'Deleted review successfully' :
                                        "리뷰가 삭제되었습니다."
                    }
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
                    textAlign: 'center',
                }}
            >
                {
                    status === 'create' ?
                        languageRedux === 1
                            ? 'Bài đánh giá của bạn về công ty này đã được đăng thành công.'
                            : languageRedux === 2 ?
                                'Your review of this company has been published successfully.'
                                : "이 회사에 대한 귀하의 리뷰가 성공적으로 게시되었습니다."
                        : status === 'edit' ?
                            languageRedux === 1
                                ? 'Bài đánh giá của bạn về công ty này đã được sửa thành công.'
                                : languageRedux === 2 ?
                                    'Your review of this company has been edited successfully.'
                                    : "이 회사에 대한 귀하의 리뷰가 성공적으로 편집되었습니다."
                            : languageRedux === 1
                                ? 'Bài đánh giá của bạn về công ty này đã được xóa thành công.'
                                : languageRedux === 2 ?
                                    'Your review of this company has been deleted successfully.'
                                    : "이 회사에 대한 귀하의 리뷰가 성공적으로 삭제되었습니다."
                }
            </p>
            <div className={styles.modal_post_review_success_buttons}>
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

export default ModalPostReviewSuccess;
