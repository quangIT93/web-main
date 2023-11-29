import React from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './style.scss';

interface IModalShare {
  openModalNotRecruitment: boolean;
  setOpenModalNotRecruitment: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalNotRecruitment: React.FC<IModalShare> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalNotRecruitment, setOpenModalNotRecruitment } = props;

  const handleCancel = () => {
    setOpenModalNotRecruitment(false);
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
            ? 'Không thể xem hồ sơ ứng viên'
            : languageRedux === 2
              ? 'Unable to view candidate profile'
              : languageRedux === 3 && '후보자 프로필을 볼 수 없습니다'}
        </h3>
      }
      footer={null}
      open={openModalNotRecruitment}
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
          ? 'Chỉ nhà tuyển dụng mới có thể mở xem hồ sơ ứng viên. Đối với người dùng cá nhân, hãy tạo ngay CV để nhanh chóng được nhà tuyển dụng chủ động kết nối với bạn !'
          : languageRedux === 2
            ? 'Only recruiters can open candidate profiles. For individual users, create a CV now to be quickly actively connected with you by employers!'
            : languageRedux === 3 &&
              '고용주만 후보자 프로필을 열고 볼 수 있습니다. 개인 사용자의 경우 이력서를 즉시 작성하면 고용주가 적극적으로 신속하게 귀하와 연결할 수 있습니다.'}
      </p>
      <div className="buttons-not-recruitment-modal">
        <Button
          type="primary"
          shape="round"
          onClick={async () => {
            window.open('/page-cv', '_parent');
          }}
        >
          {languageRedux === 1
            ? 'Đồng ý'
            : languageRedux === 2
              ? 'Ok'
              : languageRedux === 3 && '동의하다'}
        </Button>
        <Button type="text" shape="round" onClick={handleCancel}>
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

export default ModalNotRecruitment;
