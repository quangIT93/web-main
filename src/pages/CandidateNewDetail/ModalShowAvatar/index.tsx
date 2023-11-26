import React from 'react';

// import './style.scss';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './style.scss';

interface IModalShowAvatar {
  openModalShowAvatar: boolean;
  setOpenModalShowAvatar: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
}
const ModalShowAvatar: React.FC<IModalShowAvatar> = (props) => {
  const { openModalShowAvatar, setOpenModalShowAvatar, image } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const handleCancel = () => {
    setOpenModalShowAvatar(false);
  };
  return (
    <Modal
      width={614}
      centered
      footer={null}
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
            ? 'Avatar ứng viên'
            : languageRedux === 2
              ? 'Candidate avatar'
              : languageRedux === 3 && '후보자 아바타'}
        </h3>
      }
      open={openModalShowAvatar}
      onCancel={handleCancel}
      className="modal-show-avatar-container"
    >
      {/* {roleRedux === 0 ? <CandidateIcon /> : <RecruiterIcon />} */}
      <img src={image} alt="ảnh lỗi" />
    </Modal>
  );
};

export default ModalShowAvatar;
