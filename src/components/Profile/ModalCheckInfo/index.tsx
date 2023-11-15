import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import styles from './style.module.scss';

interface IModalCheckInfo {
    openModalCheckInfo: boolean;
    setOpenModalCheckInfo: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
}

const ModalCheckInfo: React.FC<IModalCheckInfo> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalCheckInfo, setOpenModalCheckInfo, type } = props;

    const handleCancel = () => {
        setOpenModalCheckInfo(false);
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
                        languageRedux === 1 ? 'Cập nhật thông tin' : 'Update information'
                    }
                </h3>
            }
            footer={null}
            open={openModalCheckInfo}
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
                    textAlign: 'center',
                }}
            >
                {

                    type === 'upInfo' ?
                        languageRedux === 1
                            ? 'CV cơ bản cần có thông tin cá nhân, giới thiệu bản thân và vị trí ứng tuyển. Hãy điền đầy đủ thông tin để có thể tạo được các mẫu CV.'
                            : 'A basic CV needs to have personal information, introduce yourself and the position you are applying for. Please fill in all information to be able to create CV templates.'
                        :
                        languageRedux === 1
                            ? 'Hãy bổ sung thêm các thông tin: trình độ học vấn, kinh nghiệm làm việc, kỹ năng,... giúp CV của bạn chuyên nghiệp hơn để thu hút nhà tuyển dụng.'
                            : 'Add additional information: education level, work experience, skills, etc. to make your CV more professional to attract employers.'
                }
            </p>
            <div className={styles.button_check_info_modal}>
                <Button
                    type="primary"
                    shape="round"
                    onClick={handleCancel}
                >
                    {languageRedux === 1 ? 'Cập nhật hồ sơ' : 'Update profile'}
                </Button>
                <Button
                    type="text"
                    shape="round"
                    style={{
                        display: type === 'upInfo' ? 'none' : 'block',
                    }}
                    onClick={() => window.open('/templates-cv', '_parent')}
                >
                    {languageRedux === 1 ? 'Tiếp tục tạo CV' : 'Continue creating CV'}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalCheckInfo;
