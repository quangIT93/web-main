import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import {
  CopyCVIcon,
  EmailCVIcon,
  FaceCVIcon,
  IconDownloadIntroduceCv,
  IconEditIntroduceCv,
  IconMagicWandIntroduceCv,
} from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

interface ModalIntroduceCv {
  open: boolean;
}

const ModalIntroduceCv: React.FC<any> = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [openModalIntroduceCv, setOpenModalIntroduceCv] = useState(false);

  useEffect(() => {
    roleRedux === 0
      ? setOpenModalIntroduceCv(true)
      : setOpenModalIntroduceCv(false);
  }, []);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setOpenModalIntroduceCv(false);
  };

  const handleSubmit = async () => {
    window.open('/templates-cv');
  };

  return (
    <Modal
      width={706}
      centered
      title={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <h3
            style={{
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontWeight: '700',
              // lineHeight: '24px',
              letterSpacing: '0em',
              textAlign: 'center',
            }}
          >
            {languageRedux === 1
              ? 'Hướng dẫn tạo CV trên HiJob'
              : 'Instructions for creating a CV on HiJob'}
          </h3>
          <img style={{ width: 146 }} src="/cv3 1.png" alt="CV" />
        </div>
      }
      footer={null}
      open={openModalIntroduceCv}
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="introduce-cv-container">
        <div className="introduce-cv-content">
          <div className="introduce-cv_item">
            <div className="introduce-cv_icon">
              <IconEditIntroduceCv />
            </div>
            <p>
              {languageRedux === 1
                ? 'Điền đầy đủ thông tin của bạn trong trang Hồ sơ.'
                : 'Fill in your information in the Profile page.'}
            </p>
          </div>
          <div className="introduce-cv_item">
            <div className="introduce-cv_icon">
              <IconMagicWandIntroduceCv />
            </div>
            <p>
              {languageRedux === 1
                ? 'HiJob sẽ tự động điền thông tin từ hồ sơ của bạn. Xem và chọn mẫu CV mà bạn ưng ý.'
                : 'HiJob will automatically fill in information from your profile. View and choose the CV template you like.'}
            </p>
          </div>
          <div className="introduce-cv_item">
            <div className="introduce-cv_icon">
              <IconDownloadIntroduceCv />
            </div>
            <p>
              {languageRedux === 1
                ? 'Sau khi hoàn thành, hãy lưu ngay trong hồ sơ tìm việc của bạn trên HiJob (tối đa 10 mẫu CV), hoặc tải xuống miễn phí dưới dạng PDF.'
                : 'Once completed, immediately save your job search resume on HiJob (up to 10 CV templates), or download it for free as PDF.'}
            </p>
          </div>
        </div>
      </div>
      <div className="create-buttons-cv-modal">
        <Button type="primary" shape="round" onClick={handleCancel}>
          {languageRedux === 1 ? 'Cập nhật thông tin' : 'Update information'}
        </Button>
        <Button type="primary" shape="round" onClick={handleSubmit}>
          {languageRedux === 1 ? 'Tạo CV ngay' : 'Create your CV now'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalIntroduceCv;
