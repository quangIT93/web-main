import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';

interface IModalShare {
  openModalShare: boolean;
  setOpenModalShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalShare: React.FC<IModalShare> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalShare, setOpenModalShare } = props;

  const handleCancel = () => {
    setOpenModalShare(false);
  };

  return (
    <Modal
      width={837}
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
            ? 'Chia sẻ liên kết tới cv của bạn'
            : languageRedux === 2
              ? 'Share a Link to Your Resume'
              : languageRedux === 3 && 'CV 링크를 공유하세요'}
        </h3>
      }
      footer={null}
      open={openModalShare}
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
        {languageRedux === 1
          ? 'Chia sẻ liên kết này trên mạng xã hội hoặc sao chép và dán URL để gửi cv của bạn qua văn bản, gửi email hoặc chia sẻ cv của bạn trên trang web cá nhân của bạn.'
          : languageRedux === 2
            ? 'Share this link on social media or copy and paste the URL to send your resume via text, email or to share your resume on your personal website.'
            : languageRedux === 3 &&
              '소셜 미디어에서 이 링크를 공유하거나 URL을 복사하여 붙여넣어 문자나 이메일로 CV를 보내거나 개인 웹사이트에서 CV를 공유하세요.'}
      </p>
      <div className="share-buttons-cv-modal">
        <Button icon={<EmailCVIcon />}>Email</Button>
        <Button icon={<CopyCVIcon />}>
          {languageRedux === 1
            ? 'Sao chép liên kết'
            : languageRedux === 2
              ? 'Copy Link'
              : languageRedux === 3 && '링크를 복사'}
        </Button>
        <Button icon={<FaceCVIcon />}>Facebook</Button>
      </div>
    </Modal>
  );
};

export default ModalShare;
