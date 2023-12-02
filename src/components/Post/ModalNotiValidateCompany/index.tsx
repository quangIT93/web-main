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

interface IPropModalNotiValidateCompany {
  openModalNoteValidateCompany: boolean;
  setOpenModalNoteValidateCompany: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

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

const ModalNotiValidateCompany: React.FC<IPropModalNotiValidateCompany> = (
  props,
) => {
  const { openModalNoteValidateCompany, setOpenModalNoteValidateCompany } =
    props;
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
    setOpenModalNoteValidateCompany(false);
    window.open('company-infor', '_self');
  };

  const handleClose = () => setOpenModalNoteValidateCompany(false);
  return (
    <div>
      <Modal
        // open={openModalNoteCreateCompany}
        open={openModalNoteValidateCompany}
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
            {languageRedux
              ? 'Đăng bài tuyển dụng không thành công'
              : 'Job posting failed'}
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
                ? 'Thông tin công ty đăng kí của bạn đang được kiểm tra, xác minh. Bạn vui lòng kiểm tra thông báo để nhận phản hồi nhé!'
                : languageRedux === 2
                  ? 'Your login information is being checked and authenticated. Please check your notification to receive feedback!'
                  : languageRedux === 3 &&
                    '귀하의 로그인 정보를 확인 및 인증 중입니다. 피드백을 받으려면 알림을 확인하세요!'}
            </p>
          </div>
          <div className="wrap-button_haveCompany">
            <Button
              block
              style={{ marginTop: '12px' }}
              type="primary"
              onClick={() => {
                setOpenModalNoteValidateCompany(false);
              }}
            >
              {languageRedux === 1
                ? 'Xác nhận'
                : languageRedux === 2
                  ? 'Confirm'
                  : languageRedux === 3 && '확인'}
            </Button>

            <Button
              block
              style={{ marginTop: '12px' }}
              type="default"
              onClick={() => {
                setOpenModalNoteValidateCompany(false);
              }}
            >
              {languageRedux === 1
                ? 'Đóng'
                : languageRedux === 2
                  ? 'Close'
                  : languageRedux === 3 && '닫기'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNotiValidateCompany;
