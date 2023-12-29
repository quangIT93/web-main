import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { CheckedBlueIcon } from '#components/Icons';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { Button } from 'antd';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

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

interface IPropModalNoteCreatePost {
  openModalNoteCreatePost: boolean;
  setOpenModalNoteCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  language: any;
}

const ModalNoteCreatePost: React.FC<IPropModalNoteCreatePost> = (props) => {
  const { openModalNoteCreatePost, setOpenModalNoteCreatePost, language } =
    props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleClose = () => {
    setOpenModalNoteCreatePost(false);
  };

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
          <h2 className="title-post_guide">
            {languageRedux === 1
              ? 'Hướng dẫn tạo bài đăng hợp lệ'
              : languageRedux === 2
              ? 'Instructions for creating valid posts'
              : '유효한 게시물 작성 지침'}
          </h2>
          <div className="wrap-imagePost_guide">
            <img
              src="./images/guide.png"
              alt=""
              style={{ width: '103px', height: '150px' }}
            />
          </div>
          <div className="wrap-textPost_guide">
            <p>
              {languageRedux === 1
                ? 'Bài đăng của bạn sẽ được kiểm duyệt nội dung trước khi công khai. Hãy đảm bảo các thông tin tuyển dụng của bạn là chính xác!'
                : languageRedux === 2
                ? 'Your post will be moderated before being published. Make sure your job information is correct!'
                : '귀하의 게시물은 게시되기 전에 콘텐츠 검토를 거칩니다. 채용정보가 정확한지 확인해주세요!'}
            </p>
          </div>
          <div className="wrap-list_guide">
            <ul>
              <li>
                <CheckedBlueIcon />
                {languageRedux === 1
                  ? 'Nhập đúng tên công ty của bạn.'
                  : languageRedux === 2
                  ? 'Enter your company name correctly.'
                  : '회사의 정확한 이름을 입력하세요.'}
              </li>
              <li>
                <CheckedBlueIcon />
                {languageRedux === 1
                  ? 'Kiểm tra địa chỉ kỹ càng.'
                  : languageRedux === 2
                  ? 'Check the address carefully.'
                  : '주소를 잘 확인해보세요.'}
              </li>
              <li>
                <CheckedBlueIcon />
                {languageRedux === 1
                  ? 'Bổ sung hình ảnh để ứng viên hiểu hơn về công ty.'
                  : languageRedux === 2
                  ? 'Add images for candidates to better understand the company.'
                  : '후보자가 회사를 더 잘 이해할 수 있도록 이미지를 추가하세요.'}
              </li>
              <li>
                <CheckedBlueIcon />
                {languageRedux === 1
                  ? 'Phân loại đúng Danh mục ngành nghề để ứng viên dễ dàng tìm thấy bài tuyển dụng.'
                  : languageRedux === 2
                  ? 'Properly categorize the category of occupations so that candidates can easily find job postings.'
                  : '후보자가 채용 공고를 쉽게 찾을 수 있도록 직무 범주를 올바르게 분류합니다.'}
              </li>
              <li>
                <CheckedBlueIcon />
                {languageRedux === 1
                  ? 'Để lại số điện thoại liên hệ của bạn để thuận tiện trao đổi với ứng viên.'
                  : languageRedux === 2
                  ? 'Leave your contact phone number to facilitate communication with candidates.'
                  : '지원자와 편리하게 소통할 수 있도록 연락처를 남겨주세요.'}
              </li>
              <li>
                <CheckedBlueIcon />
                {languageRedux === 1
                  ? 'Bạn có thể đăng tối đa 1 bài viết một ngày.'
                  : languageRedux === 2
                  ? 'You can post up to 1 article a day.'
                  : '하루 최대 1개의 게시물을 게시할 수 있습니다.'}
              </li>
            </ul>
          </div>
          <Button
            block
            style={{ marginTop: '12px' }}
            type="primary"
            onClick={handleClose}
          >
            {languageRedux === 1
              ? 'Tôi đã hiểu'
              : languageRedux === 2
              ? 'I got it'
              : '이해합니다'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNoteCreatePost;
