import React, { FormEvent } from 'react';
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

interface IModalUnsaveCompany {
  ShowModalUnsave: boolean;
  setShowModalUnsave: React.Dispatch<React.SetStateAction<boolean>>;
  languageRedux: any;
  handleSubmit: (e: any) => void;
}

const ModalUnsaveCompany: React.FC<IModalUnsaveCompany> = (props) => {
  const { ShowModalUnsave, setShowModalUnsave, languageRedux, handleSubmit } =
    props;

  const handleClose = () => {
    setShowModalUnsave(false);
  };
  return (
    <Modal
      open={ShowModalUnsave}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-unsave"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ textAlign: 'center', color: '#0d99ff' }}
        >
          {languageRedux === 1
            ? 'Bạn chưa lưu thông tin công ty'
            : 'You have not saved your company information'}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          sx={{ margin: '24px 0', fontSize: '15px', textAlign: 'center' }}
        >
          {languageRedux === 1
            ? 'Bạn có muốn lưu thông tin công ty trước khi chuyển trang không?'
            : 'Do you want to save your company information before switching pages?'}
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
            className="cancleChangeRoute"
          >
            No
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              handleClose();
              handleSubmit(e as any);
            }}
            style={{
              width: '300px',
            }}
            className="submitChangeRoute"
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUnsaveCompany;
