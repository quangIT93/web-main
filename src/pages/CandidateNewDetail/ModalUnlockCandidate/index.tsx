import React from 'react';

// import './style.scss';
import { Button, Modal, Radio, Space } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CandidateIcon, RecruiterIcon } from '#components/Icons';

const ModalUnlockCandidate = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const handleCancel = () => {
    // setOpenModalUpdateInfo(false);
  };

  const handleConfirm = () => {};
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
            ? 'Mở khóa ứng viên'
            : languageRedux === 2
              ? 'Unlock Candidates'
              : languageRedux === 3
                ? '후보자 잠금 해제'
                : 'Mở khóa ứng viên'}
        </h3>
      }
      footer={null}
      open={true}
      onCancel={handleCancel}
      className="modal-update-info-container"
    >
      {/* {roleRedux === 0 ? <CandidateIcon /> : <RecruiterIcon />} */}
      <p
        style={{
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: '400',
          letterSpacing: '0.5px',
          textAlign: 'left',
        }}
      >
        {languageRedux === 1
          ? 'Mở khóa ứng viên để bạn có thể giao tiếp trực tiếp với ứng viên thông qua thông tin cá nhân'
          : languageRedux === 2
            ? 'Unlock candidates so you can communicate directly with candidates through personal information!'
            : languageRedux
              ? '개인 정보를 통해 후보자와 직접 소통할 수 있도록 후보자 잠금 해제'
              : 'Mở khóa ứng viên để bạn có thể giao tiếp trực tiếp với ứng viên thông qua thông tin cá nhân'}
      </p>
      <div className="update-info-buttons">
        <Button type="primary" shape="round" onClick={handleConfirm}>
          {languageRedux === 1
            ? 'Xác nhận'
            : languageRedux === 2
              ? 'Confirm'
              : languageRedux === 3 && '확인'}
        </Button>
        <Button type="text" shape="round" onClick={handleCancel}>
          {languageRedux === 1
            ? 'Hủy'
            : languageRedux === 2
              ? 'Cancel'
              : languageRedux === 3 && '취소'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalUnlockCandidate;
