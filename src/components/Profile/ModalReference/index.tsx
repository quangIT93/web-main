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
import { setAlertSuccess } from 'store/reducer/profileReducer/alertProfileReducer';
import { message } from 'antd';

import './style.scss';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
});

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
    if (fullName?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên không được bỏ trống'
            : languageRedux === 2
              ? 'Full name cannot be empty'
              : languageRedux === 3 && '이름은 비워둘 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (fullName?.trim().length > 255) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên không được vượt quá 255 ký tự'
            : languageRedux === 2
              ? 'Full name cannot exceed 255 characters'
              : languageRedux === 3 && '이름은 255자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (phone?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không được bỏ trống'
            : languageRedux === 2
              ? 'Phone cannot be empty'
              : languageRedux === 3 && '전화는 비워 둘 수 없습니다.',
        checkForm: false,
        idError: 2,
      };
    }
    if (regexCheckPhone.test(phone) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không đúng định dạng'
            : languageRedux === 2
              ? 'The phone number is not in the correct format'
              : languageRedux === 3 && '전화 번호의 형식이 올바르지 않습니다.',
        checkForm: false,
        idError: 2,
      };
    }
    if (mail?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không được bỏ trống'
            : languageRedux === 2
              ? 'Email cannot be empty'
              : languageRedux === 3 && '이메일이 비어 있지 않습니다',
        checkForm: false,
        idError: 3,
      };
    }
    if (regexCheckEmail.test(mail) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không đúng định dạng'
            : languageRedux === 2
              ? 'The Email is not in the correct format'
              : languageRedux === 3 && '이메일의 형식이 올바르지 않습니다.',
        checkForm: false,
        idError: 3,
      };
    }
    if (description?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được bỏ trống'
            : languageRedux === 2
              ? 'Additional information cannot be empty'
              : languageRedux === 3 && '추가 정보는 비워둘 수 없습니다.',
        checkForm: false,
        idError: 4,
      };
    }
    if (description?.trim().length > 1000) {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được vượt quá 1000 ký tự'
            : languageRedux === 2
              ? 'Additional information cannot exceed 1000 characters'
              : languageRedux === 3 &&
                '추가 정보는 1000자를 초과할 수 없습니다.',
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
    // setReferenceValues((prev: any) => [
    //     {
    //         fullName: fullName,
    //         company: company,
    //     },
    //     ...prev
    // ])
    const { messageError, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        const result = await apiCv.postProfileReference(
          fullName,
          phone,
          mail,
          description,
        );
        if (result) {
          const resultProfile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );
          if (resultProfile) {
            dispatch(setProfileMeInformationMoreV3(resultProfile));
            setFullName('');
            setDescription('');
            setPhone('');
            setMail('');
            setOpenModalReference(false);
            dispatch(setAlertSuccess(true));
          }
        }
      } else {
        message.error(messageError);
        const profile_reference_full_name = document.getElementById(
          'profile_reference_full_name',
        ) as HTMLElement;
        const profile_reference_phone = document.getElementById(
          'profile_reference_phone',
        ) as HTMLElement;
        const profile_reference_email = document.getElementById(
          'profile_reference_email',
        ) as HTMLElement;
        const profile_reference_additional_information =
          document.getElementById(
            'profile_reference_additional_information',
          ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_reference_full_name.focus();
            break;
          case 2:
            profile_reference_phone.focus();
            break;
          case 3:
            profile_reference_email.focus();
            break;
          case 4:
            profile_reference_additional_information.focus();
            break;

          default:
            break;
        }
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setOpenModalReference(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalReference}
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
            {languageRedux === 1
              ? 'Thêm người giới thiệu'
              : languageRedux === 2
                ? 'Add Reference'
                : languageRedux && '리퍼러 추가'}
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
                : languageRedux === 2
                  ? 'Reference’s Full name'
                  : languageRedux === 3
                    ? '참고인의 성명'
                    : 'Họ và tên của người tham khảo'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_reference_full_name"
              name="skill"
              value={fullName}
              onChange={handleOnchangeFullName}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Họ và tên'
                  : languageRedux === 2
                    ? 'Full name'
                    : languageRedux === 3
                      ? '성명'
                      : 'Họ và tên'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {fullName && fullName.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên kỹ năng không được vượt quá 255 ký tự'
                    : languageRedux === 2
                      ? 'Skill names cannot exceed 255 characters'
                      : languageRedux === 3
                        ? '스킬 이름은 255자를 초과할 수 없습니다.'
                        : 'Tên kỹ năng không được vượt quá 255 ký tự'}
                </span>
              ) : !fullName ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên kỹ năng không được bỏ trống'
                    : languageRedux === 2
                      ? 'Skill names cannot be empty'
                      : languageRedux === 3
                        ? '스킬 이름은 비워둘 수 없습니다.'
                        : 'Tên kỹ năng không được bỏ trống.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                fullName ? fullName.length : '0'
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
              {languageRedux === 1
                ? 'Số điện thoại'
                : languageRedux === 2
                  ? 'Phone number'
                  : languageRedux === 3
                    ? '전화 번호'
                    : 'Số điện thoại'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="number"
              id="profile_reference_phone"
              name="skill"
              value={phone}
              onChange={handleOnchangePhone}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Số điện thoại'
                  : languageRedux === 2
                    ? 'Phone number'
                    : languageRedux === 3
                      ? '전화 번호'
                      : 'Số điện thoại'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {regexCheckPhone.test(phone) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Số điện thoại không đúng định dạng'
                    : languageRedux === 2
                      ? 'The phone number is not in the correct format'
                      : languageRedux === 3 &&
                        '전화 번호의 형식이 올바르지 않습니다.'}
                </span>
              ) : phone.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Số điện thoại không được bỏ trống'
                    : languageRedux === 2
                      ? 'Phone cannot be empty'
                      : languageRedux === 3 && '전화는 비워 둘 수 없습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${phone.length}/10`}</span>
            </div>
          </Box>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Email'
                : languageRedux === 2
                  ? 'Email'
                  : languageRedux === 3
                    ? '이메일'
                    : 'Email'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_reference_email"
              name="skill"
              value={mail}
              onChange={handleOnchangeMail}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder="example@gmail.com"
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {regexCheckEmail.test(mail) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không đúng định dạng'
                    : languageRedux === 2
                      ? 'The Email is not in the correct format'
                      : languageRedux === 3 &&
                        '이메일의 형식이 올바르지 않습니다.'}
                </span>
              ) : mail.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không được bỏ trống'
                    : languageRedux === 2
                      ? 'Email cannot be empty'
                      : languageRedux === 3 && '이메일이 비어 있지 않습니다'}
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
              {languageRedux === 1
                ? 'Thông tin bổ sung'
                : languageRedux === 2
                  ? 'Additional information'
                  : '추가 정보'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              // className={classes.textarea}
              value={description}
              onChange={handleOnchangeDescription}
              sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
              multiline
              rows={4}
              id="profile_reference_additional_information"
              // label="Một số đặc điểm nhận diện công ty"
              placeholder={
                languageRedux === 1
                  ? 'Thông tin bổ sung'
                  : languageRedux === 2
                    ? 'Additional information'
                    : '추가 정보'
              }
            />
            <div className="wrap-noti_input">
              {description.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được bỏ trống'
                    : languageRedux === 2
                      ? 'Additional information cannot be empty'
                      : languageRedux === 3 &&
                        '추가 정보는 비워둘 수 없습니다.'}
                </span>
              ) : description.length > 1000 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được vượt quá 1000 ký tự'
                    : languageRedux === 2
                      ? 'Additional information cannot exceed 1000 characters'
                      : languageRedux === 3 &&
                        '추가 정보는 1000자를 초과할 수 없습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${description.length}/1000`}</span>
            </div>
          </Box>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {languageRedux === 1
              ? 'Lưu thông tin'
              : languageRedux === 2
                ? 'Save information'
                : languageRedux === 3 && '정보 저장'}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalReference;
