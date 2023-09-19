import React from 'react';

import { useDispatch } from 'react-redux';

import {
  Box,
  TextField,
  Modal,
  Typography,
  MenuItem,
  Button,
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

interface IModalReference {
  openModalEditReference: {
    open: boolean;
    name: string;
    email: string;
    phone: string;
    id: null | number;
  };
  setOpenModalEditReference: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      name: string;
      email: string;
      phone: string;
      id: null | number;
    }>
  >;
  setReferenceValues: React.Dispatch<React.SetStateAction<any>>;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 840,
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

const ModalEditReference: React.FC<IModalReference> = (props) => {
  const {
    openModalEditReference,
    setOpenModalEditReference,
    setReferenceValues,
  } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  const [fullName, setFullName] = React.useState<any>();
  const [company, setCompany] = React.useState<any>();
  const [phone, setPhone] = React.useState<any>();
  const [mail, setMail] = React.useState<any>();

  React.useEffect(() => {
    setPhone(openModalEditReference.phone);
    setFullName(openModalEditReference.name);
    setMail(openModalEditReference.email);
  }, [profileV3]);

  const dispatch = useDispatch();

  const handleOnchangeFullName = (e: any) => {
    setFullName(e.target.value);
  };
  const handleOnchangeCompany = (e: any) => {
    setCompany(e.target.value);
  };
  const handleOnchangePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const handleOnchangeMail = (e: any) => {
    setMail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await apiCv.putProfileReference(
        fullName,
        phone,
        mail,
        openModalEditReference.id,
      );
      if (result) {
        const resultProfile = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (resultProfile) {
          dispatch(setProfileV3(resultProfile));
        }
      }
    } catch (error) {}

    // setReferenceValues((prev: any) => [
    //   {
    //     fullName: fullName,
    //     company: company,
    //   },
    //   ...prev,
    // ]);
    setFullName('');
    setCompany('');
    setPhone('');
    setMail('');
    setOpenModalEditReference({
      open: false,
      name: '',
      email: '',
      phone: '',
      id: null,
    });
  };

  const handleClose = () => {
    setOpenModalEditReference({
      open: false,
      name: '',
      email: '',
      phone: '',
      id: null,
    });
  };

  return (
    <Modal
      open={openModalEditReference.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="Modal-personnal-info">
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
          {languageRedux === 1 ? 'Thêm tham khảo' : 'Add Reference'}
        </Typography>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1
              ? 'Họ và tên của người tham khảo'
              : 'Reference’s Full name'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={fullName}
            onChange={handleOnchangeFullName}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={languageRedux === 1 ? 'Họ và tên' : 'Full name'}
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1 ? 'Số điện thoại' : 'Phone number'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={phone}
            onChange={handleOnchangePhone}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={languageRedux === 1 ? 'Số điện thoại' : 'Phone number'}
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1 ? 'Email' : 'Email'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={mail}
            onChange={handleOnchangeMail}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={languageRedux === 1 ? 'Email' : 'Email'}
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {language?.profile_page?.save_info}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEditReference;
