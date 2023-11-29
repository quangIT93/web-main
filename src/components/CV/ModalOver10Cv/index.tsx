import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';

interface IModalShare {
  openModalOver10Cv: boolean;
  setOpenModalOver10Cv: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalOver10Cv: React.FC<IModalShare> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalOver10Cv, setOpenModalOver10Cv } = props;
  const [firstCv, setFirstCv] = useState<any>(false);

  useEffect(() => {
    const firt_cv = getCookie('firstCv');
    if (firt_cv && firt_cv === '1') {
      setFirstCv(true);
    }
  }, []);

  const handleCancel = () => {
    setOpenModalOver10Cv(false);
  };

  return (
    <Modal
      width={500}
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
            ? 'Không thể lưu Cv'
            : languageRedux === 2
              ? 'Unable to save CV'
              : languageRedux === 3 && 'CV를 저장할 수 없습니다.'}
        </h3>
      }
      footer={null}
      open={openModalOver10Cv}
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
          ? 'Bạn chỉ có thể lưu tối đa 10 CV. Vui lòng xóa CV không sử dụng tại trang Quản lý CV'
          : languageRedux === 2
            ? 'You can only save a maximum of 10 CVs. Please delete unused CV at the CV Management page'
            : languageRedux === 3 &&
              'CV는 최대 10개까지만 저장할 수 있습니다. CV 관리 페이지에서 사용하지 않은 CV를 삭제해주세요.'}
      </p>
      <div className="buttons-over-10-cv-modal">
        <Button
          type="primary"
          shape="round"
          onClick={async () => {
            window.open('/profile-cv', '_parent');
          }}
        >
          {languageRedux === 1
            ? 'Trang quảng lý CV'
            : languageRedux === 2
              ? 'CV Management page'
              : languageRedux === 3 && 'CV 관리 페이지'}
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

export default ModalOver10Cv;
