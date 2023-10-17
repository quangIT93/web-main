import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon, IconCall, IconEmail, IconMaxUnlock } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';

interface IModalMaxUnlock {
    openModalMaxUnlock: boolean;
    setOpenModalMaxUnlock: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMaxUnlock: React.FC<IModalMaxUnlock> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalMaxUnlock, setOpenModalMaxUnlock } = props;

    const handleCancel = () => {
        setOpenModalMaxUnlock(false);
    };

    return (
        <Modal
            width={630}
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
                        ? 'Không thể mở khóa thông tin ứng viên'
                        : 'Unable to unlock candidate information'}
                </h3>
            }
            footer={null}
            open={openModalMaxUnlock}
            // onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className="max-unlock-modal-image">
                <IconMaxUnlock />
            </div>
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                    textAlign: 'left',
                    marginTop: '24px',
                }}
            >
                {
                    languageRedux === 1
                        ? 'Tài khoản của bạn hiện không đủ Point/lượt mở khóa thông tin ứng viên.\n\nVui lòng liên hệ nhân viên hỗ trợ để xử lý vấn đề này.'
                        : 'Your account currently does not have enough Points/turns to unlock candidate information.\n\nPlease contact support staff to resolve this issue.'
                }
            </p>
            <div className="unlock-candidate-info-modal">
                <div className="unlock-candidate-info-item">
                    <div className="unlock-candidate-info-icon">
                        <IconCall />
                    </div>
                    <p className="unlock-candidate-info-content">(028) 35358983</p>
                </div>
                <div className="unlock-candidate-info-item">
                    <div className="unlock-candidate-info-icon">
                        <IconEmail />
                    </div>
                    <p className="unlock-candidate-info-content">contact.hijob@gmail.com</p>
                </div>
            </div>
        </Modal>
    );
};

export default ModalMaxUnlock;
