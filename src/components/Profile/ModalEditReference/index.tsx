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
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setAlertEditInfo } from 'store/reducer/profileReducer/alertProfileReducer';
import { message } from 'antd';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';

interface IModalReference {
  openModalEditReference: {
    open: boolean;
    name: string;
    email: string;
    phone: string;
    id: null | number;
    description: string;
  };
  setOpenModalEditReference: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      name: string;
      email: string;
      phone: string;
      id: null | number;
      description: string;
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

// Style Mui
const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: '14px',
        },
        h6: {
          fontSize: '20px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            fontSize: '14px',
          },
        },
      },
    },
  },
});

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

  // const profileV3 = useSelector((state: RootState) => state.dataProfileInformationV3.data);

  const [fullName, setFullName] = React.useState<any>('');
  const [description, setDescription] = React.useState<any>('');
  const [phone, setPhone] = React.useState<any>('');
  const [mail, setMail] = React.useState<any>('');

  React.useEffect(() => {
    setPhone(openModalEditReference.phone);
    setFullName(openModalEditReference.name);
    setMail(openModalEditReference.email);
    setDescription(openModalEditReference.description);
  }, [openModalEditReference]);

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
    if (fullName?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên không được bỏ trống'
            : 'Full name cannot be empty',
        checkForm: false,
        idError: 1,
      };
    }
    if (fullName?.trim().length > 255) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên không được vượt quá 255 ký tự'
            : 'Full name cannot exceed 255 characters',
        checkForm: false,
        idError: 1,
      };
    }
    if (phone?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không được bỏ trống'
            : 'Phone cannot be empty',
        checkForm: false,
        idError: 2,
      };
    }
    if (regexCheckPhone.test(phone) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không đúng định dạng'
            : 'The phone number is not in the correct format',
        checkForm: false,
        idError: 2,
      };
    }
    if (mail?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không được bỏ trống'
            : 'Email cannot be empty',
        checkForm: false,
        idError: 3,
      };
    }
    if (regexCheckEmail.test(mail) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không đúng định dạng'
            : 'The Email is not in the correct format',
        checkForm: false,
        idError: 3,
      };
    }
    if (description?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được bỏ trống'
            : 'Additional information cannot be empty',
        checkForm: false,
        idError: 4,
      };
    }
    if (description?.trim().length > 1000) {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được vượt quá 1000 ký tự'
            : 'Additional information cannot exceed 1000 characters',
        checkForm: false,
        idError: 4,
      };
    }

    return {
      messageError: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleSubmit = async () => {
    const { messageError, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        const result = await apiCv.putProfileReference(
          fullName,
          phone,
          mail,
          description,
          openModalEditReference.id,
        );
        if (result) {
          const resultProfile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (resultProfile) {
            dispatch(setProfileMeInformationMoreV3(resultProfile));
            dispatch(setAlertEditInfo(true));
          }

          setFullName('');
          setDescription('');
          setPhone('');
          setMail('');
          setOpenModalEditReference({
            open: false,
            name: '',
            email: '',
            phone: '',
            id: null,
            description: '',
          });
        }
      } else {
        message.error(messageError);
        const profile_reference_edit_full_name = document.getElementById('profile_reference_edit_full_name') as HTMLElement;
        const profile_reference_edit_phone = document.getElementById('profile_reference_edit_phone') as HTMLElement;
        const profile_reference_edit_email = document.getElementById('profile_reference_edit_email') as HTMLElement;
        const profile_reference_edit_additional_information = document.getElementById('profile_reference_edit_additional_information') as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_reference_edit_full_name.focus();
            break;
          case 2:
            profile_reference_edit_phone.focus();
            break;
          case 3:
            profile_reference_edit_email.focus();
            break;
          case 4:
            profile_reference_edit_additional_information.focus();
            break;

          default:
            break;
        }
      }
    } catch (error) { }
    // setReferenceValues((prev: any) => [
    //   {
    //     fullName: fullName,
    //     company: company,
    //   },
    //   ...prev,
    // ]);
  };

  const handleClose = () => {
    setOpenModalEditReference({
      open: false,
      name: '',
      email: '',
      phone: '',
      id: null,
      description: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalEditReference.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="Modal-personnal-info modal-person modal-refProfile"
        >
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
            {languageRedux === 1 ? 'Sửa người giới thiệu' : 'Edit Reference'}
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
              id="profile_reference_edit_full_name"
              name="skill"
              value={fullName}
              onChange={handleOnchangeFullName}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={languageRedux === 1 ? 'Họ và tên' : 'Full name'}
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {fullName && fullName.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên kỹ năng không được vượt quá 255 ký tự'
                    : 'Skill names cannot exceed 255 characters'}
                </span>
              ) : !fullName ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên kỹ năng không được bỏ trống'
                    : 'Skill names cannot be empty'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${fullName ? fullName.length : '0'
                }/255`}</span>
            </div>
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
              id="profile_reference_edit_phone"
              name="skill"
              value={phone}
              onChange={handleOnchangePhone}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1 ? 'Số điện thoại' : 'Phone number'
              }
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {regexCheckPhone.test(phone) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Số điện thoại không đúng định dạng'
                    : 'The phone number is not in the correct format'}
                </span>
              ) : phone.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Số điện thoại không được bỏ trống'
                    : 'Phone cannot be empty'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${phone.length}/11`}</span>
            </div>
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
              id="profile_reference_edit_email"
              name="skill"
              value={mail}
              onChange={handleOnchangeMail}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={languageRedux === 1 ? 'Email' : 'Email'}
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {regexCheckEmail.test(mail) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không đúng định dạng'
                    : 'The Email is not in the correct format'}
                </span>
              ) : mail.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không được bỏ trống'
                    : 'Email cannot be empty'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${phone.length}/50`}</span>
            </div>
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
              id="profile_reference_edit_additional_information"
            // label="Một số đặc điểm nhận diện công ty"
            // placeholder={language?.profile_page?.place_additional_information}
            />
            <div className="wrap-noti_input">
              {description.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được bỏ trống'
                    : 'Additional information cannot be empty'}
                </span>
              ) : description.length > 1000 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được vượt quá 1000 ký tự'
                    : 'Additional information cannot exceed 1000 characters'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${description.length}/1000`}</span>
            </div>
          </Box>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {language?.profile_page?.save_info}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalEditReference;
