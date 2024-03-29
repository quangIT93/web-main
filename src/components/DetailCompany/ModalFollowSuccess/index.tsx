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
                        ? 'Theo dõi công ty thành công'
                        : languageRedux === 2 ?
                            'Follow the company successfully'
                            : '회사를 성공적으로 팔로우하셨습니다'}
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
                    textAlign: 'center',
                }}
            >
                {
                    languageRedux === 1
                        ? 'Cám ơn bạn đã theo dõi công ty. Bạn sẽ nhận được thông báo về công việc mới nhất từ công ty này.'
                        : languageRedux === 2 ?
                            'Thank you for following the company. You will receive notifications about the latest jobs from this company.'
                            : '회사를 팔로우해주셔서 감사합니다. 이 회사의 최신 채용공고에 대한 알림을 받게 됩니다.'
                }
            </p>
            <div className={styles.modal_follow_success_buttons}>
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

export default ModalFollowSuccess;
