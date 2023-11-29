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

  const [checkedDefault, setCheckedDefault] = useState(true);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const handleCancel = async () => {
    if (checkedDefault && openModalSuccessDownCv.open) {
      await apiCv.putThemeCv(openModalSuccessDownCv?.id, 1);
    }
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
            textAlign: 'center',
          }}
        >
          {languageRedux === 1
            ? 'Lưu thành Công'
            : languageRedux === 2
              ? 'Saved successfully'
              : languageRedux === 3 && '성공적으로 저장 되었음'}
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
          textAlign: 'center',
        }}
      >
        {languageRedux === 1
          ? 'Bạn đã lưu thành công CV'
          : languageRedux === 2
            ? 'You have successfully saved'
            : languageRedux === 3 && 'CV를 성공적으로 저장했습니다.'}
      </p>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginTop: '12px',
          justifyContent: 'center',
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
          {languageRedux === 1
            ? 'Đặt cv này thành mặc định'
            : languageRedux === 2
              ? 'Set as default'
              : languageRedux === 3 && '이 CV를 기본값으로 설정하세요'}
        </label>
      </div>
      <div className="share-buttons-choose-cv-modal">
        <Button
          type="primary"
          shape="round"
          onClick={async () => {
            if (checkedDefault && openModalSuccessDownCv.open) {
              await apiCv.putThemeCv(openModalSuccessDownCv?.id, 1);
            }
            window.open('/profile-cv', '_parent');
          }}
        >
          {languageRedux === 1
            ? 'List CV/Hồ sơ'
            : languageRedux === 2
              ? 'Cv/Resume list'
              : languageRedux === 3 && 'CV/이력서 목록'}
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

export default React.memo(ModalSuccessSaveCv);
