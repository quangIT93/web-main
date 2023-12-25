import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  CopyCVIcon,
  EmailCVIcon,
  FaceCVIcon,
  IconCall,
  IconEmail,
  IconMaxUnlock,
} from '#components/Icons';

import { getCookie } from 'cookies';

interface IModalMaxUnlock {
  openModalNoneCv: boolean;
  setOpenModalNoneCv: React.Dispatch<React.SetStateAction<boolean>>;
  unLock: boolean;
  urlPdf: any;
}

const ModalNoneSave: React.FC<IModalMaxUnlock> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalNoneCv, setOpenModalNoneCv, unLock, urlPdf } = props;

  const handleCancel = () => {
    setOpenModalNoneCv(false);
  };

  return (
    <Modal
      width={630}
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
          {
            // !unLock ?
            languageRedux === 1
              ? 'Không thể lưu ứng viên'
              : languageRedux === 2
              ? 'Unable to save candidate'
              : languageRedux === 3 && '지원자를 저장할 수 없습니다'
            // : unLock && !urlPdf &&
            //     languageRedux === 1
            //     ? "Ứng viên không có CV"
            //     : "Candidate does not have a CV"
          }
        </h3>
      }
      footer={null}
      open={openModalNoneCv}
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <p
        style={{
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: '400',
          letterSpacing: '0.5px',
          textAlign: 'left',
          marginTop: '24px',
        }}
      >
        {
          // !unLock ?
          languageRedux === 1
            ? 'Bạn phải mở khóa ứng viên trước khi lưu ứng viên.'
            : languageRedux === 2
            ? 'You must unlock candidates before saving the candidate.'
            : languageRedux === 3 && '지원자를 저장할 수 없습니다..'
          // : unLock && !urlPdf &&
          //     languageRedux === 1
          //     ? "Hiện tại ứng viên chưa cập nhật CV."
          //     : "Currently the candidate has not updated their CV."
        }
      </p>
    </Modal>
  );
};

export default ModalNoneSave;
