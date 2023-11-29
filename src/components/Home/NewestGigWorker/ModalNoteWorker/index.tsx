import React, { useState } from 'react';

import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { RootState } from '../../../../store/reducer';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 460,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
  '@media (max-width: 399px)': {
    width: 360,
  },
  '@media (max-width: 375px)': {
    width: 300,
  },

  '@media (min-width: 400px) and (max-width: 639px)': {
    width: 410,
  },

  '@media (min-width: 640px) and (max-width: 839px)': {
    width: 640,
  },
};

interface PropModalNoteWorker {
  openModalNoteWorker: boolean;
  setOpenModalNoteWorker: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalNoteWorker: React.FC<PropModalNoteWorker> = (props) => {
  const { openModalNoteWorker, setOpenModalNoteWorker } = props;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleClose = () => {
    setOpenModalNoteWorker(false);
  };

  return (
    <Modal
      open={openModalNoteWorker}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-course-container"
    >
      <Box sx={style}>
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            cursor: 'pointer',
            // border: '1px solid',
            borderRadius: '50%',
            padding: '1px',
          }}
          onClick={handleClose}
        >
          <CloseOutlined style={{ fontSize: '30px' }} />
        </div>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{ marginBottom: '12px' }}
        >
          {languageRedux === 1
            ? 'Bạn không phải là nhà tuyển dụng!'
            : languageRedux === 2
              ? `You don't have to be a recruiter`
              : languageRedux === 3 && '당신은 모집자가 아닙니다!'}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="subtitle1"
          component="p"
          align="center"
          sx={{ marginBottom: '12px' }}
        >
          {languageRedux === 1
            ? 'Chỉ nhà tuyển dụng mới thực hiện được thao tác trên!'
            : languageRedux === 2
              ? `Only the recruiter can perform the above operation`
              : languageRedux === 3 &&
                '채용 담당자만이 이 작업을 수행할 수 있습니다.'}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalNoteWorker;
