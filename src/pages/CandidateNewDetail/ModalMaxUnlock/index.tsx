import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

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
                        ? 'Đã vượt quá số lần thử mở khóa'
                        : 'The number of unlock attempts has been exceeded'}
                </h3>
            }
            footer={null}
            open={openModalMaxUnlock}
            // onOk={handleOk}
            onCancel={handleCancel}
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
                        ? 'Chỉ có thể mở khóa tối đa 3 ứng viên/ 1 ngày'
                        : 'Can only unlock a maximum of 3 candidates/day'
                }
            </p>
            <div className="unlock-candidate-buttons-modal">
                <Button onClick={handleCancel} type="primary" shape="round">
                    {
                        languageRedux === 1 ?
                            "Đã hiểu" :
                            "OK"
                    }
                </Button>
            </div>
        </Modal>
    );
};

export default ModalMaxUnlock;
