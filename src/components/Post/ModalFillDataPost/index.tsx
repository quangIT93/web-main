import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from 'antd';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
};

interface IModalFillDataPost {
  openModalFillDataPost: boolean;
  setOpenFillDataPost: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalFillDataPost: React.FC<IModalFillDataPost> = (props) => {
  const { openModalFillDataPost, setOpenFillDataPost } = props;
  console.log('open', openModalFillDataPost);

  const handleClose = () => setOpenFillDataPost(false);

  return (
    <div>
      <Modal
        open={openModalFillDataPost}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box-modal_filterOld">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h5"
            sx={{
              textAlign: 'center',
              color: '#000000',
              position: 'relative',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            Hi Job sẽ tự động điền tất cả các thông tin công việc trước đó của
            bạn!
            {/* <IconButton
              aria-label="close"
              sx={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <CloseIcon />
            </IconButton> */}
          </Typography>
          <p
            style={{
              textAlign: 'center',
              margin: '24px 0',
              fontSize: '16px',
            }}
          >
            Bài tuyển dụng mà bạn muốn Hi Job lấy thông tin tự động
          </p>
          <div className="post_items_old">
            <div className="post_item_old"></div>
          </div>
          {/* <h4
        style={{ color: '#0d99ff ', textAlign: 'center', margin: '12px' }}
      >
        TẢI ỨNG DỤNG HIJOB
      </h4> */}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFillDataPost;
