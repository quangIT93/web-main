import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from 'antd';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: 'none',
  // boxShadow: 24,
  outline: 'none',
  borderRadius: '10px',
  p: 4,

  '@media (max-width: 399px)': {
    width: 360,
  },
  '@media (max-width: 375px)': {
    width: 300,
  },

  '@media (min-width: 400px) and (max-width: 640px)': {
    width: 410,
  },
};

interface IModalNotePostedToday {
  openCheckposted: boolean;
  setOpenCheckposted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalNotePostedToday: React.FC<IModalNotePostedToday> = (props) => {
  const { openCheckposted, setOpenCheckposted } = props;
  const handleClose = () => setOpenCheckposted(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const onclick = async () => {
    window.location.reload();
  };

  return (
    <div>
      <Modal
        open={openCheckposted}
        // open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-success_post"
      >
        <Box sx={style}>
          <h2
            className="modal-title_successPost"
            style={{
              textAlign: 'center',
              color: '#0d99ff',
              position: 'relative',
            }}
          >
            {languageRedux === 1 ? 'Thông báo!' : 'Notification!'}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <CloseIcon />
            </IconButton>
          </h2>
          <h6
            className="modal-text_modalPost"
            style={{ margin: '24px 0', fontSize: '15px' }}
          >
            {languageRedux === 1
              ? 'Bạn chỉ có thể đăng 1 tin tuyển dụng mỗi ngày!'
              : 'You can only post 1 job posting per day!'}
          </h6>
          <h6
            className="modal-text_modalPost"
            style={{ margin: '24px 0', fontSize: '15px' }}
          >
            {languageRedux === 1
              ? 'Vui lòng quay lại vào ngày mai!'
              : 'Please come back tomorrow!'}
          </h6>

          {/* <h4
            style={{ color: '#0d99ff ', textAlign: 'center', margin: '12px' }}
          >
            TẢI ỨNG DỤNG HIJOB
          </h4> */}

          <div
            className="div-img-footer"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '8px',
            }}
          >
            <Button
              onClick={() => {
                window.open(`/`, '_parent');
              }}
              className="btn-apply"
              type={'primary'}
              style={{
                width: 320,
                marginTop: 10,
                height: 40,
                fontWeight: 'bold',
                // backgroundColor: 'rgb(189, 49, 49)',
                backgroundColor: '#0d99ff',
              }}
            >
              {languageRedux === 1 ? 'Đến trang chủ' : 'Go to home page'}
            </Button>
            {/* <Button
              onClick={onclick}
              className="btn-apply"
              type={'primary'}
              style={{
                width: 320,
                marginTop: 10,
                height: 40,
                fontWeight: 'bold',
                backgroundColor: '#0d99ff',
              }}
            >
              Tiếp tục đăng bài
            </Button> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNotePostedToday;
