import React from 'react';

import './style.scss';
import { Button, Modal, Radio, Space } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CandidateIcon, RecruiterIcon } from '#components/Icons';

interface IModalSelectRole {
    openModalUpdateInfo: boolean;
    setOpenModalUpdateInfo: React.Dispatch<React.SetStateAction<boolean>>;
    role: any
}

const ModalUpdateInfo: React.FC<IModalSelectRole> = (props) => {
    const { openModalUpdateInfo, setOpenModalUpdateInfo, role } = props
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const handleCancel = () => {
        setOpenModalUpdateInfo(false);
    };

    const handleConfirm = () => {
        window.open(
            role === 0 ?
                `/profile/` :
                '/company-infor/'
            , '_parent'
        )
        handleCancel();
    }

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
                        role === 0 ?
                            languageRedux === 1 ?
                                "Vui lòng cập nhật hồ sơ của bạn!" :
                                "Please update your profile!"
                            :
                            languageRedux === 1 ?
                                "Vui lòng cập nhật thông tin công ty của bạn!" :
                                "Please update your company information!"
                    }
                </h3>
            }
            footer={null}
            open={openModalUpdateInfo}
            onCancel={handleCancel}
            className="modal-update-info-container"
        >
            {
                role === 0 ?
                    <CandidateIcon /> :
                    <RecruiterIcon />
            }
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                    textAlign: 'left',
                }}
            >
                {
                    role === 0 ?
                        languageRedux === 1 ?
                            "Cập nhật thông tin cá nhân, địa điểm làm việc, ngành nghề,… sẽ giúp nhà tuyển dụng tìm thấy bạn dễ dàng hơn và HiJob sẽ giới thiệu thêm những công việc phù hợp hơn!" :
                            "Updating your personal information, work location, industry,... will help employers find you more easily and HiJob will introduce more suitable jobs!"
                        :
                        languageRedux === 1 ?
                            "Bạn cần cập nhật thông tin công ty để có thể đăng tin tuyển dụng tìm kiếm ứng viên tiềm năng." :
                            "You need to update your company information to be able to post job vacancies looking for potential candidates."
                }
            </p>
            <div className="update-info-buttons">
                <Button type="primary" shape="round" onClick={handleConfirm}>
                    {
                        languageRedux === 1 ?
                            "Xác nhận" : "Confirm"
                    }
                </Button>
                <Button type="text" shape="round" onClick={handleCancel}>
                    {
                        languageRedux === 1 ?
                            "Hủy" : "Cancel"
                    }
                </Button>
            </div>
        </Modal >
    )
}

export default ModalUpdateInfo;