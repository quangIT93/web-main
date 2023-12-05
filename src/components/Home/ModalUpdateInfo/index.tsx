import React from 'react';

import './style.scss';
import { Button, Modal, Radio, Space } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CandidateIcon, RecruiterIcon } from '#components/Icons';

interface IModalSelectRole {
  openModalUpdateInfo: boolean;
  setOpenModalUpdateInfo: React.Dispatch<React.SetStateAction<boolean>>;
  // role: any
}

const ModalUpdateInfo: React.FC<IModalSelectRole> = (props) => {
  const { openModalUpdateInfo, setOpenModalUpdateInfo } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const handleCancel = () => {
    setOpenModalUpdateInfo(false);
  };

  const handleConfirm = () => {
    window.open(roleRedux === 0 ? `/profile/` : '/company-infor', '_parent');
    handleCancel();
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
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Vui lòng cập nhật hồ sơ của bạn!'
              : languageRedux === 2
                ? 'Please update your profile!'
                : languageRedux === 3 && '프로필을 업데이트하십시오!'
            : languageRedux === 1
              ? 'Vui lòng cập nhật thông tin công ty của bạn!'
              : languageRedux === 2
                ? 'Please update your company information!'
                : languageRedux === 3 && '회사 정보를 업데이트하세요.'}
        </h3>
      }
      footer={null}
      open={openModalUpdateInfo}
      onCancel={handleCancel}
      className="modal-update-info-container"
    >
      {roleRedux === 0 ? <CandidateIcon /> : <RecruiterIcon />}
      <p
        style={{
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: '400',
          letterSpacing: '0.5px',
          textAlign: 'left',
        }}
      >
        {roleRedux === 0
          ? languageRedux === 1
            ? 'Cập nhật thông tin cá nhân, địa điểm làm việc, ngành nghề,… sẽ giúp nhà tuyển dụng tìm thấy bạn dễ dàng hơn và HiJob sẽ giới thiệu thêm những công việc phù hợp hơn!'
            : languageRedux === 2
              ? 'Updating your personal information, work location, industry,... will help employers find you more easily and HiJob will introduce more suitable jobs!'
              : languageRedux === 3 &&
                '귀하의 개인 정보, 직장 위치, 업종 등을 업데이트하면 고용주가 귀하를 더 쉽게 찾을 수 있으며 HiJob은 귀하에게 더 적합한 일자리를 소개할 것입니다.'
          : languageRedux === 1
            ? 'Bạn cần cập nhật thông tin công ty để có thể đăng tin tuyển dụng tìm kiếm ứng viên tiềm năng.'
            : languageRedux === 2
              ? 'You need to update your company information to be able to post job vacancies looking for potential candidates.'
              : languageRedux === 3 &&
                '잠재적인 후보자를 찾는 채용 공고를 게시하려면 회사 정보를 업데이트해야 합니다.'}
      </p>
      <div className="update-info-buttons">
        <Button type="primary" shape="round" onClick={handleConfirm}>
          {languageRedux === 1
            ? 'Xác nhận'
            : languageRedux === 2
              ? 'Confirm'
              : languageRedux === 3 && '확인'}
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

export default ModalUpdateInfo;
