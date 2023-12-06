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
            {languageRedux === 1
              ? 'Bạn không thể đăng bài tuyển dụng'
              : languageRedux === 2
              ? 'You cannot post a job advertisement'
              : languageRedux === 3 && '채용공고 게시 실패'}
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
                ? 'HiJob rất tiếc phải thông báo tài khoản nhà tuyển dụng của Quý khách hàng không thể đăng tin tuyển dụng. Lí do vì thông tin công tin bị thiếu hoặc nội dung chưa hợp lệ, Quý khách vui lòng liên hệ:'
                : languageRedux === 2
                ? 'HiJob regrets to inform you that your employer account cannot post job ads. If the information is missing or the content is invalid, please contact:'
                : languageRedux === 3 &&
                  'HiJob에서는 이 계정이 채용 광고를 게시할 수 없음을 알려드리게 되어 유감스럽습니다. 그 이유는 회사 정보가 누락되었거나 내용이 유효하지 않기 때문입니다. 문의하시기 바랍니다.'}
            </p>
            <p>
              {' '}
              {languageRedux === 1
                ? 'Email CSKH: contact.hijob@gmail.com'
                : languageRedux === 2
                ? 'Customer care email: contact.hijob@gmail.com'
                : languageRedux === 3 &&
                  '고객 관리 이메일: contact.hijob@gmail.com'}
            </p>
          </div>
          {/* <div className="wrap-button_haveCompany">
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
          </div> */}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNotiValidateCompany;
