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
          {languageRedux === 1 ? 'Mở khóa ứng viên' : 'Unlock Candidates'}
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
          : 'Unlock candidates so you can communicate directly with candidates through personal information!'}
      </p>
      <div className="update-info-buttons">
        <Button type="primary" shape="round" onClick={handleConfirm}>
          {languageRedux === 1 ? 'Xác nhận' : 'Confirm'}
        </Button>
        <Button type="text" shape="round" onClick={handleCancel}>
          {languageRedux === 1 ? 'Hủy' : 'Cancel'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalUnlockCandidate;
