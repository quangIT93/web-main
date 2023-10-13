import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
interface IModalShare {
  openModalTurnOffStatus: boolean;
  setOpenModalTurnOffStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchJob: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSwitch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalTurnOffStatus: React.FC<IModalShare> = (props) => {
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {
    openModalTurnOffStatus,
    setOpenModalTurnOffStatus,
    setSearchJob,
    setLoadingSwitch,
  } = props;
  const dispatch = useDispatch();
  const handleTurnOff = async () => {
    try {
      const result = await profileApi.putProfileJobV3(null, 0);
      if (result) {
        const resultProfileV3 = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (resultProfileV3) {
          dispatch(setProfileV3(resultProfileV3));
          setSearchJob(false);
          setOpenModalTurnOffStatus(false);
          setLoadingSwitch(false);
        }
      }
    } catch (error) {}
  };

  const handleCancel = () => {
    setOpenModalTurnOffStatus(false);
    setSearchJob(true);
    setLoadingSwitch(false);
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
            textAlign: 'left',
          }}
        >
          {languageRedux === 1
            ? 'Tắt trạng thái tìm việc'
            : 'Turn off job search status'}
        </h3>
      }
      footer={null}
      open={openModalTurnOffStatus}
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
          ? 'Sau khi tắt tìm kiếm việc làm, Nhà tuyển dụng có thể không tìm thấy bạn và cơ hội tìm được công việc phù hợp với bạn sẽ giảm đi.'
          : 'After turning off job search, Recruiters may not be able to find you, and your chances of getting the right job for you are reduced.'}
      </p>
      <div className="share-buttons-choose-cv-modal">
        <Button type="primary" shape="round" onClick={handleTurnOff}>
          {languageRedux === 1 ? 'Tắt' : 'Turn off'}
        </Button>
        <Button type="text" shape="round" onClick={handleCancel}>
          {languageRedux === 1 ? 'Hủy' : 'Cancel'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalTurnOffStatus;
