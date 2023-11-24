import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// import { CheckedBlueIcon } from '#components/Icons';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import languageApi from 'api/languageApi';
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
  openModalNoteCreateCompany: boolean;
  setOpenModalNoteCreateCompany: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalNoteCreateCompany: React.FC<IPropModalNoteCreatePost> = (props) => {
  const { openModalNoteCreateCompany, setOpenModalNoteCreateCompany } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  // const [language, setLanguage] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? "vi" : "en"
  //     );
  //     if (result) {
  //       setLanguage(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi()
  // }, [languageRedux])

  const handleCreateCompany = () => {
    setOpenModalNoteCreateCompany(false);
    window.open('company-infor', '_self');
  };

  const handleClose = () => setOpenModalNoteCreateCompany(false);
  return (
    <div>
      <Modal
        // open={openModalNoteCreateCompany}
        open={openModalNoteCreateCompany}
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
          <h2 className="title-post_guide">{language?.you_have_not_company}</h2>
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
                ? 'Bài đăng của bạn sẽ được nhiều ứng viên hơn khi có thông tin công ty. Hãy cập nhật thông tin công ty để nhiều ứng viên quan tâm hơn!'
                : languageRedux === 2
                  ? 'Your post will be more candidates when there is company information. Please update company information so that more candidates are interested!'
                  : languageRedux === 3 &&
                    '회사 정보가 있으면 귀하의 게시물에 더 많은 후보자가 표시됩니다. 더 많은 지원자들이 관심을 가질 수 있도록 기업정보를 업데이트해주세요!'}
            </p>
          </div>
          {/* <div className="wrap-list_guide">
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
          </div> */}
          <div className="wrap-button_haveCompany">
            <Button
              block
              style={{ marginTop: '12px' }}
              type="primary"
              onClick={() => {
                setOpenModalNoteCreateCompany(false);
              }}
            >
              {languageRedux === 1
                ? 'Chỉnh sửa sau'
                : languageRedux === 2
                  ? 'Edit later'
                  : languageRedux === 3 && '나중에 수정하세요'}
            </Button>
            <Button
              block
              style={{ marginTop: '12px' }}
              type="primary"
              onClick={handleCreateCompany}
            >
              {languageRedux === 1
                ? 'Tạo thông tin công ty'
                : languageRedux === 2
                  ? 'Create company information'
                  : languageRedux === 3 && '회사 정보 생성'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNoteCreateCompany;
