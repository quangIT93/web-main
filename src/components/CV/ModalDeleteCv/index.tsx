import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';

interface IModalShare {
    openModalDeleteCv: boolean;
    setOpenModalDeleteCv: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDeleteCv: React.FC<IModalShare> = (props) => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const { openModalDeleteCv, setOpenModalDeleteCv } = props;

    const handleCancel = () => {
        setOpenModalDeleteCv(false);
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

                    }}>
                    {
                        languageRedux === 1 ?
                            "Xóa CV/Hồ sơ" :
                            "Delete CV/Resume"
                    }
                </h3>
            }
            footer={null}
            open={openModalDeleteCv}
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
                        "Xóa CV/Hồ sơ của bạn, bạn sẽ không thể ứng tuyển công việc bằng cách sử dụng nó nữa.\nBạn có muốn xóa CV/Hồ sơ này không?" :
                        "Delete your CV/Resume, you will no longer be able to apply for jobs using it.\nDo you want to delete this CV/Resume?"
                }
            </p>
            <div className="share-buttons-choose-cv-modal">
                <Button type="primary" shape="round"
                    onClick={handleCancel}
                >
                    {
                        languageRedux === 1 ?
                            "Đồng ý" : "Yes"
                    }
                </Button>
                <Button type="text" shape="round"
                    onClick={handleCancel}
                >
                    {
                        languageRedux === 1 ?
                            "Hủy" : "Cancel"
                    }
                </Button>
            </div>
        </Modal>
    );
};

export default ModalDeleteCv;