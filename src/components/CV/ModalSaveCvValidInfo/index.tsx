import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';

interface IModalSaveCvValidInfo {
  openModalSaveValidInfo: boolean;
  setOpenModalSaveValidInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSaveCvValidInfo: React.FC<IModalSaveCvValidInfo> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalSaveValidInfo, setOpenModalSaveValidInfo } = props;
  const [firstCv, setFirstCv] = useState<any>(false);

  useEffect(() => {
    const firt_cv = getCookie('firstCv');
    if (firt_cv && firt_cv === '1') {
      setFirstCv(true);
    }
  }, []);

  const handleCancel = () => {
    setOpenModalSaveValidInfo(false);
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
            textAlign: 'center',
          }}
        >
          {languageRedux === 1
            ? 'Bạn chưa nhập đầy đủ thông tin'
            : languageRedux === 2
              ? 'You have not entered complete information'
              : languageRedux === 3 && '완전한 정보를 입력하지 않았습니다.'}
        </h3>
      }
      footer={null}
      open={openModalSaveValidInfo}
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
        {languageRedux === 1
          ? 'Vui lòng nhập đầy đủ thông tin trước khi tạo CV'
          : languageRedux === 2
            ? 'Please enter complete information before creating your CV'
            : languageRedux === 3 &&
              'CV를 작성하기 전에 완전한 정보를 입력하십시오'}
      </p>
      <div className="buttons-over-10-cv-modal">
        <Button
          type="primary"
          shape="round"
          onClick={async () => {
            window.open('/profile', '_parent');
          }}
        >
          {languageRedux === 1
            ? 'Trang thông tin người dùng'
            : languageRedux === 2
              ? 'Profile page'
              : languageRedux === 3 && '사용자 정보 페이지'}
        </Button>
        <Button
          type="text"
          shape="round"
          //   style={{
          //     display: firstCv ? 'block' : 'none',
          //   }}
          onClick={handleCancel}
        >
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

export default ModalSaveCvValidInfo;
