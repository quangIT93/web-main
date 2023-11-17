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
    setOpenModalNoteValidateCompany: React.Dispatch<React.SetStateAction<boolean>>;
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



const ModalNotiValidateCompany:React.FC<IPropModalNotiValidateCompany> = (props) => {
    const { openModalNoteValidateCompany, setOpenModalNoteValidateCompany } = props;
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
            <h2 className="title-post_guide">{languageRedux? "Công ty của bạn vẫn chưa được phê duyệt": "Your company has not been approved yet"}</h2>
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
                  ? 'Bạn chỉ có thể đăng tin tuyển dụng việc làm sau khi đã phê duyệt hồ sơ công ty. Vui lòng đợi cho đến khi bạn nhận được thông báo! Cám ơn!'
                  : "You can only post job ads after you've approved your company profile. Please wait until you receive the notification! Thank you!"}
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
                {languageRedux === 1 ? 'Xac nhan' : 'Comfirm'}
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
}

export default ModalNotiValidateCompany