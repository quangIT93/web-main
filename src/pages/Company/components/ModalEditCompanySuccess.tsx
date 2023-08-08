import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from 'antd';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '520px',
  bgcolor: 'background.paper',
  border: 'none',
  // boxShadow: 24,
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

interface IModalEditPost {
  openModalEditCompany: boolean;
  setOpenModalEditCompanySuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalEditCompanySuccess: React.FC<IModalEditPost> = (props) => {
  const { openModalEditCompany, setOpenModalEditCompanySuccess } = props;

  const handleClose = () => {
    setOpenModalEditCompanySuccess(false);
  };
  return (
    <Modal
      open={openModalEditCompany}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ textAlign: 'center', color: '#0d99ff' }}
        >
          Đã chỉnh sửa thông tin công ty thành công!
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          sx={{ margin: '24px 0', fontSize: '15px', textAlign: 'center' }}
        >
          Bạn có muốn quay về trang thông tin cá nhân!
        </Typography>

        <Box
          sx={{
            margin: '12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <Button
            type="primary"
            danger
            onClick={handleClose}
            style={{
              width: '300px',
            }}
          >
            Không
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setOpenModalEditCompanySuccess(false);
              window.open('/profile', '_self');
            }}
            style={{
              width: '300px',
            }}
          >
            Có
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditCompanySuccess;
