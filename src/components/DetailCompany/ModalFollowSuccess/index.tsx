import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import styles from './style.module.scss';
import { getCookie } from 'cookies';

interface IModalPostReviewSuccess {
    openModalFollowSuccess: boolean;
    setOpenModalFollowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFollowSuccess: React.FC<IModalPostReviewSuccess> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalFollowSuccess, setOpenModalFollowSuccess } = props;

    const handleCloseModal = () => {
        setOpenModalFollowSuccess(false);
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
                        ? 'Theo dõi công ty thành công'
                        : 'Follow the company successfully'}
                </h3>
            }
            footer={null}
            open={openModalFollowSuccess}
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
                        ? 'Bạn sẽ nhận được thông báo khi công ty có bài tuyển dụng mới.'
                        : 'You will receive a notification when the company has a new job posting.'
                }
            </p>
            <div className={styles.modal_follow_success_buttons}>
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

export default ModalFollowSuccess;
