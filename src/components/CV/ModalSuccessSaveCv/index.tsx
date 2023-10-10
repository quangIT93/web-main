import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './style.scss';
import apiCv from 'api/apiCv';

interface IModalSuccessDownCv {
  openModalSuccessDownCv: { open: boolean; id: number | null };
  setOpenModalSuccessDownCv: React.Dispatch<
    React.SetStateAction<{ open: boolean; id: number | null }>
  >;
}

const ModalSuccessSaveCv: React.FC<IModalSuccessDownCv> = (props) => {
  const { openModalSuccessDownCv, setOpenModalSuccessDownCv } = props;

  const [checkedDefault, setCheckedDefault] = useState(false);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const handleCancel = () => {
    setOpenModalSuccessDownCv({ open: false, id: null });
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
      open={openModalSuccessDownCv.open}
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
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginTop: '12px',
        }}
      >
        <input
          type="checkbox"
          name=""
          id="SelectDefauld"
          checked={checkedDefault}
          onChange={() => setCheckedDefault(!checkedDefault)}
        />
        <label htmlFor="SelectDefauld">
          {languageRedux === 1 ? 'Đặt cv này thành mặc định' : 'Set as default'}
        </label>
      </div>
      <div className="share-buttons-choose-cv-modal">
        <Button
          type="primary"
          shape="round"
          onClick={async () => {
            if (checkedDefault && openModalSuccessDownCv.open) {
              await apiCv.putThemeCv(openModalSuccessDownCv?.id, 1);
              window.open('/profile-cv', '_parent');
            }
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
