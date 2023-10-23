import React from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './style.scss';

interface IModalShare {
    openModalNotRecruitment: boolean;
    setOpenModalNotRecruitment: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalNotRecruitment: React.FC<IModalShare> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalNotRecruitment, setOpenModalNotRecruitment } = props;

    const handleCancel = () => {
        setOpenModalNotRecruitment(false);
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
                        ? 'Không thể xem hồ sơ ứng viên'
                        : 'Unable to view candidate profile'}
                </h3>
            }
            footer={null}
            open={openModalNotRecruitment}
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
                        ? 'Chỉ nhà tuyển dụng mới có thể mở xem hồ sơ ứng viên. Đối với người dùng cá nhân, hãy tạo ngay CV để nhanh chóng được nhà tuyển dụng chủ động kết nối với bạn !'
                        : 'Only recruiters can open candidate profiles. For individual users, create a CV now to be quickly actively connected with you by employers!'
                }
            </p>
            <div className="buttons-not-recruitment-modal">
                <Button
                    type="primary"
                    shape="round"
                    onClick={async () => { window.open('/page-cv', '_parent') }}
                >
                    {languageRedux === 1 ? 'Đồng ý' : 'Ok'}
                </Button>
                <Button
                    type="text"
                    shape="round"
                    onClick={handleCancel}
                >
                    {languageRedux === 1 ? 'Hủy' : 'Cancel'}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalNotRecruitment;
