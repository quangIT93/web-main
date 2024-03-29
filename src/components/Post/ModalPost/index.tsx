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

interface IModalPost {
  openModalPost: boolean;
  setOpenModalPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPost: React.FC<IModalPost> = (props) => {
  const { openModalPost, setOpenModalPost } = props;
  const handleClose = () => setOpenModalPost(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const onclick = async () => {
    window.location.reload();
  };

  return (
    <div>
      <Modal
        open={openModalPost}
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
            {languageRedux === 1
              ? 'Đã đăng tuyển thành công!'
              : languageRedux === 2
                ? 'Successfully posted!'
                : languageRedux === 3 && '성공적으로 게시되었습니다!'}
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
              ? 'Tin tuyển dụng của bạn đã đăng thành công. Chúng tôi có nhiều ứng viên phù hợp với tin tuyển dụng của bạn. Bạn có muốn bắt đầu tìm kiếm ứng viên ngay không ?'
              : languageRedux === 2
                ? 'Your job posting has been successfully posted. We have many candidates who match your job posting. Do you want to start looking for candidates right away?'
                : languageRedux === 3 &&
                '채용 공고가 성공적으로 게시되었습니다. 귀하의 채용 공고에 적합한 구직자가 많이 있습니다. 바로구직자 검색을 시작하시겠습니까?'}
          </h6>

          {/* <h4
            style={{ color: '#0d99ff ', textAlign: 'center', margin: '12px' }}
          >
            TẢI ỨNG DỤNG HIJOB
          </h4> */}
          <div
            className="div-img-modalPost"
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <img
              alt={languageRedux === 1
                ? 'Hình ảnh bị lỗi'
                : languageRedux === 2
                  ? 'Image is corrupted'
                  : '이미지가 손상되었습니다'}
              src={require('../../../img/langdingPage/QRcode-ggplay.png')}
            />
            <img
              style={{ marginLeft: 10 }}
              alt={languageRedux === 1
                ? 'Hình ảnh bị lỗi'
                : languageRedux === 2
                  ? 'Image is corrupted'
                  : '이미지가 손상되었습니다'}
              src={require('../../../img/langdingPage/QRcode-appstore.png')}
            />
          </div>
          <div
            className="div-link-postModal"
            style={{ justifyContent: 'space-around' }}
          >
            <Link
              to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
              target="_blank"
            >
              <img
                id="img-gallery"
                alt={languageRedux === 1
                  ? 'Hình ảnh bị lỗi'
                  : languageRedux === 2
                    ? 'Image is corrupted'
                    : '이미지가 손상되었습니다'}
                src={require('../../../img/langdingPage/image 43.png')}
              />
            </Link>
            <Link
              to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
              target="_blank"
            >
              <img
                alt={languageRedux === 1
                  ? 'Hình ảnh bị lỗi'
                  : languageRedux === 2
                    ? 'Image is corrupted'
                    : '이미지가 손상되었습니다'}
                src={require('../../../img/langdingPage/image 45.png')}
              />
            </Link>
          </div>
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
                window.open(`/history`, '_parent');
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
              {languageRedux === 1
                ? 'Đến trang lịch sử'
                : languageRedux === 2
                  ? 'Go to history page'
                  : languageRedux === 3 && '기록 페이지로 이동'}
            </Button>
            <Button
              onClick={() => {
                window.open(`/candidatesAll`, '_parent');
              }}
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
              {languageRedux === 1
                ? 'Tìm kiếm ứng viên'
                : languageRedux === 2
                  ? 'Looking for candidates'
                  : languageRedux === 3 && '구직자 검색'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPost;
