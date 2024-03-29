import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from 'antd';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';

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
  languageRedux: any;
  language: any;
}

const ModalEditCompanySuccess: React.FC<IModalEditPost> = (props) => {
  const {
    openModalEditCompany,
    setOpenModalEditCompanySuccess,
    languageRedux,
    language,
  } = props;

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
          {languageRedux === 1
            ? 'Đã chỉnh sửa thông tin công ty thành công!'
            : languageRedux === 2
              ? 'Company information edited successfully!'
              : '회사 정보가 성공적으로 편집되었습니다!'}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          sx={{ margin: '24px 0', fontSize: '15px', textAlign: 'center' }}
        >
          {languageRedux === 1
            ? 'Bạn có muốn quay về trang thông tin cá nhân!'
            : languageRedux === 2
              ? 'Do you want to return to your profile page!'
              : '개인정보 페이지로 돌아가시겠습니까?'}
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
            {languageRedux === 1
              ? 'Không'
              : languageRedux === 2
                ? 'No'
                : '아니요'}
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
            {languageRedux === 1 ? 'Có' : languageRedux === 2 ? 'Yes' : '확인'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditCompanySuccess;
