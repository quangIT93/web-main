import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { CheckedBlueIcon } from '#components/Icons';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { Button } from 'antd';
import './style.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: 'none',
  // boxShadow: 24,
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

interface IPropModalNoteCreatePost {
  openModalNoteCreatePost: boolean;
  setOpenModalNoteCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalNoteCreatePost: React.FC<IPropModalNoteCreatePost> = (props) => {
  const { openModalNoteCreatePost, setOpenModalNoteCreatePost } = props;

  const handleClose = () => setOpenModalNoteCreatePost(false);

  return (
    <div>
      <Modal
        open={openModalNoteCreatePost}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="wrap-guide">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: '10px',
              top: '30px',
              transform: 'translateY(-50%)',
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2 className="title-post_guide">Hướng dẫn tạo bài đăng</h2>
          <div className="wrap-imagePost_guide">
            <img
              src="./images/guide.png"
              alt=""
              style={{ width: '103px', height: '150px' }}
            />
          </div>
          <div className="wrap-textPost_guide">
            <p>
              Bài đăng của bạn sẽ được kiểm duyệt nội dung trước khi công khai.
              Hãy đảm bảo các thông tin tuyển dụng của bạn là chính xác!
            </p>
          </div>
          <div className="wrap-list_guide">
            <ul>
              <li>
                <CheckedBlueIcon />
                Nhập đúng tên công ty của bạn.
              </li>
              <li>
                <CheckedBlueIcon />
                Kiểm tra địa chỉ kỹ càng.
              </li>
              <li>
                <CheckedBlueIcon />
                Bổ sung hình ảnh để ứng viên hiểu hơn về công ty.
              </li>
              <li>
                <CheckedBlueIcon />
                Phân loại đúng Danh mục ngành nghề để ứng viên dễ dàng tìm thấy
                bài tuyển dụng.
              </li>
              <li>
                <CheckedBlueIcon />
                Để lại số điện thoại liên hệ của bạn để thuận tiện trao đổi với
                ứng viên.
              </li>
              <li>
                <CheckedBlueIcon />
                Bạn có thể đăng tối đa 1 bài viết một ngày.
              </li>
            </ul>
          </div>
          <Button
            block
            style={{ marginTop: '12px' }}
            type="primary"
            onClick={handleClose}
          >
            Tôi đã hiểu
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNoteCreatePost;
