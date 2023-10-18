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
import { setAlertSuccess } from 'store/reducer/profileReducer/alertProfileReducer';
import { message } from 'antd';

interface IModalReference {
  openModalReference: boolean;
  setOpenModalReference: React.Dispatch<React.SetStateAction<boolean>>;
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

const ModalReference: React.FC<IModalReference> = (props) => {
  const { openModalReference, setOpenModalReference, setReferenceValues } =
    props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [fullName, setFullName] = React.useState<any>('');

  const [description, setDescription] = React.useState<any>('');
  const [phone, setPhone] = React.useState<any>('');
  const [mail, setMail] = React.useState<any>('');

  const dispatch = useDispatch();

  const handleOnchangeFullName = (e: any) => {
    setFullName(e.target.value);
  };
  const handleOnchangeDescription = (e: any) => {
    setDescription(e.target.value);
  };
  const handleOnchangePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const handleOnchangeMail = (e: any) => {
    setMail(e.target.value);
  };

  const regexCheckPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validValue = () => {
    if (
      fullName?.trim() === ''
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Tên không được bỏ trống" :
          "Full name cannot be empty",
        checkForm: false,
      };
    }
    if (
      fullName?.trim().length > 255
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Tên không được vượt quá 255 ký tự" :
          "Full name cannot exceed 255 characters",
        checkForm: false,
      };
    }
    if (
      phone?.trim() === ''
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Số điện thoại không được bỏ trống" :
          "Phone cannot be empty",
        checkForm: false,
      };
    }
    if (
      regexCheckPhone.test(phone) === false
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Số điện thoại không đúng định dạng" :
          "The phone number is not in the correct format",
        checkForm: false,
      };
    }
    if (
      mail?.trim() === ''
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Email không được bỏ trống" :
          "Email cannot be empty",
        checkForm: false,
      };
    }
    if (
      regexCheckEmail.test(mail) === false
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Email không đúng định dạng" :
          "The Email is not in the correct format",
        checkForm: false,
      };
    }
    if (
      description?.trim() === ''
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Thông tin thêm không được bỏ trống" :
          "Additional information cannot be empty",
        checkForm: false,
      };
    }
    if (
      description?.trim().length > 1000
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Thông tin thêm không được vượt quá 1000 ký tự" :
          "Additional information cannot exceed 1000 characters",
        checkForm: false,
      };
    }

    return {
      messageError: '',
      checkForm: true,
    };
  };

  const handleSubmit = async () => {
    // setReferenceValues((prev: any) => [
    //     {
    //         fullName: fullName,
    //         company: company,
    //     },
    //     ...prev
    // ])
    const { messageError, checkForm } = validValue()
    try {
      if (checkForm) {
        const result = await apiCv.postProfileReference(
          fullName,
          phone,
          mail,
          description,
        );
        if (result) {
          const resultProfile = await profileApi.getProfileV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (resultProfile) {
            dispatch(setProfileV3(resultProfile));
            setFullName('');
            setDescription('');
            setPhone('');
            setMail('');
            setOpenModalReference(false);
            dispatch(setAlertSuccess(true));
          }
        }
      } else {
        message.error(messageError)
      }
    } catch (error) { }
  };

  const handleClose = () => {
    setOpenModalReference(false);
  };

  return (
    <Modal
      open={openModalReference}
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
            placeholder='example@gmail.com'
          // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            {language?.additional_information}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            // className={classes.textarea}
            value={description}
            onChange={handleOnchangeDescription}
            sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
            multiline
            rows={4}
            id="extraExp_info"
          // label="Một số đặc điểm nhận diện công ty"
          // placeholder={language?.profile_page?.place_additional_information}
          />
        </Box>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {language?.profile_page?.save_info}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalReference;
