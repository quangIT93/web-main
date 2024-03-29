import React from 'react';
import { useSearchParams } from 'react-router-dom';
import appplicationApi from 'api/appplication';
import { Box, Typography, Modal } from '@mui/material';
import { Button } from 'antd';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

interface ISeenApplication {
  setStatusApplication: React.Dispatch<React.SetStateAction<number>>;
}

const SeenApplication: React.FC<ISeenApplication> = (props) => {
  const { setStatusApplication } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [openReject, setOpenReject] = React.useState(false);
  const [openApprove, setOpenApprove] = React.useState(false);
  const handleClose = () => setOpenReject(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const handleClickReject = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '');
    try {
      const result = await appplicationApi.updateApplication(candidateId, 3);
      if (result) {
        setStatusApplication(3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickApproved = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '');

    try {
      const result = await appplicationApi.updateApplication(candidateId, 2);
      if (result) {
        setStatusApplication(2);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        name="SeenApplicationReject"
        type="primary"
        style={{
          backgroundColor: '#BD3131',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 8px',
        }}
        onClick={() => setOpenReject(true)}
      >
        {languageRedux === 1
          ? 'Từ chối hồ sơ'
          : languageRedux === 2
            ? 'Reject application'
            : languageRedux === 3 && '신청 거부'}
      </Button>
      <Button
        name="SeenApplicationApprove"
        type="primary"
        style={{
          backgroundColor: '#5CB365',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setOpenApprove(true)}
      >
        {languageRedux === 1
          ? 'Duyệt hồ sơ'
          : languageRedux === 2
            ? 'Browse profiles'
            : languageRedux === 3 && '프로필 찾아보기'}
      </Button>
      <Modal
        open={openReject}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {languageRedux === 1
              ? 'Từ chối hồ sơ ?'
              : languageRedux === 2
                ? 'Reject application?'
                : languageRedux === 3 && '신청 거부'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            {languageRedux === 1
              ? 'Ứng viên này không phù hợp với công việc của bạn'
              : languageRedux === 2
                ? 'This candidate is not suitable for your job'
                : languageRedux === 3 &&
                  '이 후보자는 귀하의 직무에 적합하지 않습니다.'}
          </Typography>
          <div className="button-modal_reject">
            <Button type="default" danger onClick={() => setOpenReject(false)}>
              {languageRedux === 1
                ? 'Huỷ'
                : languageRedux === 2
                  ? 'Cancel'
                  : languageRedux === 3 && '취소'}
            </Button>
            <Button type="primary" onClick={handleClickReject}>
              {languageRedux === 1
                ? 'Đồng ý'
                : languageRedux === 2
                  ? 'Ok'
                  : languageRedux === 3 && '동의하다'}
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openApprove}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {languageRedux === 1
              ? 'Duyệt hồ sơ'
              : languageRedux === 2
                ? 'Browse profiles'
                : languageRedux === 3 && '프로필 찾아보기'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            {languageRedux === 1
              ? 'Ứng viên sẽ nhận được thông báo từ bạn'
              : languageRedux === 2
                ? 'Candidates will receive notification from you'
                : languageRedux === 3 &&
                  '신청자는 귀하로부터 통지를 받게 됩니다'}
          </Typography>
          <div className="button-modal_reject">
            <Button type="default" danger onClick={() => setOpenApprove(false)}>
              {languageRedux === 1
                ? 'Huỷ'
                : languageRedux === 2
                  ? 'Cancel'
                  : languageRedux === 3 && '취소'}
            </Button>
            <Button type="primary" onClick={handleClickApproved}>
              {languageRedux === 1
                ? 'Đồng ý'
                : languageRedux === 2
                  ? 'Ok'
                  : languageRedux === 3 && '동의하다'}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SeenApplication;
