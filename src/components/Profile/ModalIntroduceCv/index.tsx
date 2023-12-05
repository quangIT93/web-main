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
              : languageRedux === 2
                ? 'Instructions for creating a CV on HiJob'
                : languageRedux === 3 && 'HiJob에서 이력서 작성 지침'}
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
                : languageRedux === 2
                  ? 'Fill in your information in the Profile page.'
                  : '프로필 페이지에 정보를 입력하세요.'}
            </p>
          </div>
          <div className="introduce-cv_item">
            <div className="introduce-cv_icon">
              <IconMagicWandIntroduceCv />
            </div>
            <p>
              {languageRedux === 1
                ? 'HiJob sẽ tự động điền thông tin từ hồ sơ của bạn. Xem và chọn mẫu CV mà bạn ưng ý.'
                : languageRedux === 2
                  ? 'HiJob will automatically fill in information from your profile. View and choose the CV template you like.'
                  : 'HiJob은 귀하의 프로필 정보를 자동으로 입력합니다. 마음에 드는 이력서 템플릿을 보고 선택하세요.'}
            </p>
          </div>
          <div className="introduce-cv_item">
            <div className="introduce-cv_icon">
              <IconDownloadIntroduceCv />
            </div>
            <p>
              {languageRedux === 1
                ? 'Sau khi hoàn thành, hãy lưu ngay trong hồ sơ tìm việc của bạn trên HiJob (tối đa 10 mẫu CV), hoặc tải xuống miễn phí dưới dạng PDF.'
                : languageRedux === 2
                  ? 'Once completed, immediately save your job search resume on HiJob (up to 10 CV templates), or download it for free as PDF.'
                  : languageRedux === 3 &&
                  '완료되면 즉시 HiJob의 구직 프로필에 저장하거나(최대 10개의 이력서 템플릿) PDF로 무료로 다운로드하세요.'}
            </p>
          </div>
        </div>
      </div>
      <div className="create-buttons-cv-modal">
        <Button type="primary" shape="round" onClick={handleCancel}>
          {languageRedux === 1
            ? 'Chưa cập nhật thông tin'
            : languageRedux === 2
              ? 'Not updated information"'
              : languageRedux === 3 && '정보 업데이트를 아직 하지 않음'}
        </Button>
        {/* <Button type="primary" shape="round" onClick={handleSubmit}>
          {languageRedux === 1
            ? 'Tạo CV ngay'
            : languageRedux === 2
              ? 'Create your CV now'
              : languageRedux === 3 && '지금 이력서를 작성하세요'}
        </Button> */}
      </div>
    </Modal>
  );
};

export default ModalIntroduceCv;
