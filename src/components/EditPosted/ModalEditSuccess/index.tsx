import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from 'antd';
import { postEn } from 'validations/lang/en/post';
import { post } from 'validations/lang/vi/post';

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
  openModalEditPost: boolean;
  setOpenModalEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  languageRedux: any;
  language: any;
}

const ModalEditSuccess: React.FC<IModalEditPost> = (props) => {
  const { openModalEditPost, setOpenModalEditPost, language, languageRedux } = props;
  const handleClose = () => setOpenModalEditPost(false);

  const handleClickCloseModal = () => {
    setOpenModalEditPost(false);
  };
  const handleClickChangePage = () => {
    window.open(`/history`, '_parent');
  };
  return (
    <Modal
      open={openModalEditPost}
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
          {
            languageRedux === 1
              ? "Đã chỉnh sửa bài tuyển dụng thành công!"
              : languageRedux === 2
                ? "Successfully edited job posting!"
                : '채용 게시물이 수정되었습니다!'
          }
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          sx={{ margin: '24px 0', fontSize: '15px', textAlign: 'center' }}
        >
          {
            languageRedux === 1
              ? "Bạn có muốn quay về trang lịch sử để kiểm tra thông tin!"
              : languageRedux === 2
                ? "Do you want to return to the history page to check the information!"
                : '정보를 확인하기 위해 기록 페이지로 돌아가시겠습니까?'
          }
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
            onClick={handleClickCloseModal}
            style={{
              width: '300px',
            }}
          >
            {
              languageRedux === 1
                ? "Không"
                : languageRedux === 2
                  ? "No"
                  : '아니요'
            }
          </Button>
          <Button
            type="primary"
            onClick={handleClickChangePage}
            style={{
              width: '300px',
            }}
          >
            {
              languageRedux === 1
                ? "Đồng ý"
                : languageRedux === 2
                  ? "Agree"
                  : '동의하다'
            }
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditSuccess;
