import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import {
  CopyCVIcon,
  EmailCVIcon,
  FaceCVIcon,
  IconNotiIntroduceCompany,
  IconEditIntroduceCv,
  IconComfirmIntroduceCompany,
} from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

const ModalIntroduceCreateCompany = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [openIntroduceCreateCompany, setOpenIntroduceCreateCompany] =
    useState(false);

  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  useEffect(() => {
    profileV3?.companyInfo === null
      ? setOpenIntroduceCreateCompany(true)
      : setOpenIntroduceCreateCompany(false);
  }, []);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setOpenIntroduceCreateCompany(false);
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
              ? 'Hướng dẫn đăng ký thông tin công ty'
              : languageRedux === 2
                ? 'Instructions for registering company information'
                : languageRedux === 3 && '회사 정보 등록 방법'}
          </h3>
          <img style={{ width: 146 }} src="/companyIntroduce.png" alt="CV" />
        </div>
      }
      footer={null}
      open={openIntroduceCreateCompany}
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
                ? 'Điền thông tin công ty của bạn theo mẫu có sẵn.'
                : languageRedux === 2
                  ? 'Fill in your company information according to the available form.'
                  : languageRedux === 3 &&
                    '사용 가능한 양식에 따라 회사 정보를 입력하세요.'}
            </p>
          </div>
          <div className="introduce-cv_item">
            <div className="introduce-cv_icon">
              <IconNotiIntroduceCompany />
            </div>
            <p>
              {languageRedux === 1
                ? 'HiJob sẽ kiểm tra, xác minh thông tin công ty và phê duyệt trước thông tin công ty của bạn'
                : languageRedux === 2
                  ? 'HiJob will check, verify company information and pre-approve your company information.'
                  : languageRedux === 3 &&
                    'HiJob은 회사 정보를 확인, 검증하고 귀하의 회사 정보를 사전 승인합니다.'}
            </p>
          </div>
          <div className="introduce-cv_item">
            <div className="introduce-cv_icon">
              <IconComfirmIntroduceCompany />
            </div>
            <p>
              {languageRedux === 1
                ? 'Sau khi xác minh và phê duyệt thành công thông tin công ty. Bạn có thể đăng tin tuyển dụng tại HiJob.'
                : languageRedux === 2
                  ? 'After successfully verifying and approving company information. You can post job advertisements at HiJob.'
                  : languageRedux === 3 &&
                    '회사 정보를 성공적으로 확인하고 승인한 후. HiJob에 채용 광고를 게시할 수 있습니다.'}
            </p>
          </div>
        </div>
      </div>
      <div className="create-buttons-cv-modal">
        <Button type="primary" shape="round" onClick={handleCancel}>
          {languageRedux === 1
            ? 'Đăng ký ngay'
            : languageRedux === 2
              ? 'Register now'
              : languageRedux === 3 && '지금 등록하세요'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalIntroduceCreateCompany;
