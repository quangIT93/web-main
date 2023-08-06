import React from 'react';
import { useSearchParams } from 'react-router-dom';
import appplicationApi from 'api/appplication';
import { Box, Typography, Modal } from '@mui/material';
import { Button } from 'antd';

import './style.scss';
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
        Từ chối hồ sơ
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
        Duyệt hồ sơ
      </Button>
      <Modal
        open={openReject}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Từ chối hồ sơ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            Ứng viên này không phù hợp với công việc của bạn
          </Typography>
          <div className="button-modal_reject">
            <Button type="default" danger onClick={() => setOpenReject(false)}>
              Huỷ
            </Button>
            <Button type="primary" onClick={handleClickReject}>
              Đồng ý
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
            Duyệt hồ sơ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            Ứng viên sẽ nhận được thông báo từ bạn
          </Typography>
          <div className="button-modal_reject">
            <Button type="default" danger onClick={() => setOpenApprove(false)}>
              Huỷ
            </Button>
            <Button type="primary" onClick={handleClickApproved}>
              Đồng ý
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SeenApplication;
