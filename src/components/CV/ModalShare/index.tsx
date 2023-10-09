import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';

interface IModalShare {
    openModalShare: boolean;
    setOpenModalShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalShare: React.FC<IModalShare> = (props) => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const { openModalShare, setOpenModalShare } = props;

    const handleCancel = () => {
        setOpenModalShare(false);
    };

    return (
        <Modal
            width={837}
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

                    }}>
                    {
                        languageRedux === 1 ?
                            "Chia sẻ liên kết tới cv của bạn" :
                            "Share a Link to Your Resume"
                    }
                </h3>
            }
            footer={null}
            open={openModalShare}
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
                    languageRedux === 1 ?
                        "Chia sẻ liên kết này trên mạng xã hội hoặc sao chép và dán URL để gửi cv của bạn qua văn bản, gửi email hoặc chia sẻ cv của bạn trên trang web cá nhân của bạn." :
                        "Share this link on social media or copy and paste the URL to send your resume via text, email or to share your resume on your personal website."
                }
            </p>
            <div className="share-buttons-cv-modal">
                <Button icon={<EmailCVIcon />}>Email</Button>
                <Button icon={<CopyCVIcon />}>
                    {
                        languageRedux === 1 ?
                            "Sao chép liên kết" :
                            "Copy Link"
                    }
                </Button>
                <Button icon={<FaceCVIcon />}>Facebook</Button>
            </div>
        </Modal>
    );
};

export default ModalShare;