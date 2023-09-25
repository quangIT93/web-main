import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './style.scss';

interface IModalSuccessDownCv {
  openModalSuccessDownCv: boolean;
  setOpenModalSuccessDownCv: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSuccessSaveCv: React.FC<IModalSuccessDownCv> = (props) => {
  const { openModalSuccessDownCv, setOpenModalSuccessDownCv } = props;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const handleCancel = () => {
    setOpenModalSuccessDownCv(false);
  };
  return (
    <Modal
      width={400}
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
          {languageRedux === 1 ? 'Lưu thành Công' : 'Saved successfully'}
        </h3>
      }
      footer={null}
      open={openModalSuccessDownCv}
      // onOk={handleOk}
      onCancel={handleCancel}
      className="modal-dđ"
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
          ? 'Bạn đã lưu thành công CV'
          : 'You have successfully saved'}
      </p>
      <div className="share-buttons-choose-cv-modal">
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            window.open('/profile-cv', '_parent');
          }}
        >
          {languageRedux === 1 ? 'List CV/Hồ sơ' : 'Cv/Resume list'}
        </Button>
        <Button
          type="text"
          shape="round"
          //   style={{
          //     display: firstCv ? 'block' : 'none',
          //   }}
          onClick={handleCancel}
        >
          {languageRedux === 1 ? 'Hủy' : 'Cancel'}
        </Button>
      </div>
    </Modal>
  );
};

export default React.memo(ModalSuccessSaveCv);
