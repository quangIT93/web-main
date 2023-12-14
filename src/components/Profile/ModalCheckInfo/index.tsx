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
      width={600}
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
          {languageRedux === 1
            ? 'Cập nhật thông tin'
            : languageRedux === 2
            ? 'Update information'
            : languageRedux === 3 && '정보를 업데이트하세요'}
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
        {type === 'upInfo'
          ? languageRedux === 1
            ? 'CV cơ bản cần có hình ảnh, thông tin cá nhân, giới thiệu bản thân và vị trí ứng tuyển. Hãy điền đầy đủ thông tin để có thể tạo được các mẫu CV.'
            : languageRedux === 2
            ? 'A basic CV needs to have image, personal information, introduce yourself and the position you are applying for. Please fill in all information to be able to create CV templates.'
            : languageRedux === 3 &&
              '기본 CV에는 개인 정보, 소개, 지원하는 직업에 대한 정보가 포함되어야 합니다. CV 템플릿을 생성하려면 전체 정보를 입력하세요.'
          : languageRedux === 1
          ? 'Hãy bổ sung thêm các thông tin: Hình ảnh, trình độ học vấn, kinh nghiệm làm việc, kỹ năng,... giúp CV của bạn chuyên nghiệp hơn để thu hút nhà tuyển dụng.'
          : languageRedux === 2
          ? 'Add additional information: image, education level, work experience, skills, etc. to make your CV more professional to attract employers.'
          : languageRedux === 3 &&
            '교육 수준, 업무 경험, 기술 등 추가 정보를 추가하여 CV를 더욱 전문적으로 만들어 고용주를 유치하세요.'}
      </p>
      <div className={styles.button_check_info_modal}>
        <Button type="primary" shape="round" onClick={handleCancel}>
          {languageRedux === 1
            ? 'Cập nhật hồ sơ'
            : languageRedux === 2
            ? 'Update profile'
            : languageRedux === 3 && '프로필 업데이트'}
        </Button>
        <Button
          type="text"
          shape="round"
          style={{
            display: type === 'upInfo' ? 'none' : 'block',
          }}
          onClick={() => window.open('/templates-cv', '_parent')}
        >
          {languageRedux === 1
            ? 'Tiếp tục tạo CV'
            : languageRedux === 2
            ? 'Continue creating CV'
            : languageRedux === 3 && '바로 이력서 만들기'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalCheckInfo;
