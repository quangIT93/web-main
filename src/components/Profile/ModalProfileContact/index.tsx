import React, { useState } from 'react';
import { Box, TextField, Modal, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
// data
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { useDispatch } from 'react-redux';
// import { RootState } from '../../../store/reducer/index';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from 'store/index';
import { CloseOutlined } from '@ant-design/icons';

// import {
//   getProfile,
//   resetProfileState,
// } from 'store/reducer/profileReducer/getProfileReducer';
import './style.scss';

import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';
import { message } from 'antd';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
import { setAlertEditInfo } from 'store/reducer/profileReducer/alertProfileReducer';
interface InfoContact {
  phone: string;
  email: string;
  facebook: string;
  linkedin: string;
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

const styleChildBox = {
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

// STyle MUI
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
      styleOverrides: {},
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

interface IModalProfileContact {
  openModalContact: boolean;
  setOpenModalContact: React.Dispatch<React.SetStateAction<boolean>>;
  profile: any;
}

const ModalProfileContact: React.FC<IModalProfileContact> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { openModalContact, setOpenModalContact, profile } = props;
  const [phone, setPhone] = useState(profile?.phone ? profile?.phone : '');
  const [email, setEmail] = useState(profile?.email ? profile?.email : '');
  const [ValidEmail, setValidEmail] = useState(false);
  const [fb, setFB] = useState(profile?.facebook ? profile?.facebook : '');
  const [linkIn, setLinkIn] = useState(
    profile?.linkedin ? profile?.linkedin : '',
  );
  // const [language, setLanguageState] = React.useState<any>();

  const dispatch = useDispatch();
  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);

  const handleClose = () => setOpenModalContact(false);
  // const dispatch = useDispatch();
  // const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  const handleSetPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^[0-9-]*$/.test(e.target.value)) {
      e.preventDefault();
    } else {
      setPhone(e.target.value);
    }
  };

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSetFB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFB(e.target.value);
  };

  const handleLinkIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkIn(e.target.value);
  };

  const validURL = (str: string) => {
    if (str.length < 50) {
      // var pattern = new RegExp(
      //   '^(https?:\\/\\/)?' + // protocol
      //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      //     '(\\#[-a-z\\d_]*)?$',
      //   'i',
      // ); // fragment locator
      var pattern = new RegExp(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
      ); // fragment locator

      return !!pattern.test(str);
    }
  };

  const regexCheckPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validValue = () => {
    if (phone?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không được bỏ trống'
            : languageRedux === 2
              ? 'Phone cannot be empty'
              : languageRedux === 3 && '전화는 비워 둘 수 없습니다.',
        checkForm: false,
        idError: 1,
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
        idError: 1,
      };
    }
    if (email?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không được bỏ trống'
            : languageRedux === 2
              ? 'Email cannot be empty'
              : languageRedux === 3 && '이메일이 비어 있지 않습니다',
        checkForm: false,
        idError: 2,
      };
    }
    if (regexCheckEmail.test(email) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không đúng định dạng'
            : languageRedux === 2
              ? 'The Email is not in the correct format'
              : languageRedux === 3 && '이메일의 형식이 올바르지 않습니다.',
        checkForm: false,
        idError: 2,
      };
    }

    if (fb.trim() !== '' && validURL(fb) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Facebook không đúng định dạng'
            : languageRedux === 2
              ? 'The Facebook link is not in the correct format'
              : languageRedux === 3 &&
              'Facebook 링크의 형식이 올바르지 않습니다.',
        checkForm: false,
        idError: 3,
      };
    }
    if (linkIn.trim() !== '' && validURL(linkIn) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Linkedin không đúng định dạng'
            : languageRedux === 2
              ? 'The Linkedin link is not in the correct format'
              : languageRedux === 3 &&
              'Linkedin 링크가 올바른 형식이 아닙니다.',
        checkForm: false,
        idError: 4,
      };
    }

    if (fb.trim() !== '' && fb.trim().length > 100) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Facebook không được vượt quá 100 ký tự'
            : languageRedux === 2
              ? 'The Facebook link cannot exceed 100 characters'
              : languageRedux === 3 &&
              'Facebook 링크는 100자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 3,
      };
    }
    if (linkIn.trim() !== '' && linkIn.trim().length > 100) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Linkedin không được vượt quá 100 ký tự'
            : languageRedux === 2
              ? 'The Linkedin link cannot exceed 100 characters'
              : languageRedux === 3 &&
              'Linkedin 링크는 100자를 초과할 수 없습니다.',
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

  // handle update information contact
  const handleSubmit = async () => {
    const { messageError, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        const info: InfoContact = {
          phone: phone,
          email: email,
          facebook: fb,
          linkedin: linkIn,
        };

        const result = await profileApi.updateContact(info);
        if (result) {
          const getProfileV3 = await profileApi.getProfileInformationV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );

          if (getProfileV3) {
            dispatch(setProfileMeInformationV3(getProfileV3));
            dispatch(setAlertEditInfo(true));
          }
          setOpenModalContact(false);
        }
      } else {
        message.error(messageError);
        const contact_info_phone = document.getElementById(
          'contact_info_phone',
        ) as HTMLElement;
        const contact_info_email = document.getElementById(
          'contact_info_email',
        ) as HTMLElement;
        const contact_info_fb = document.getElementById(
          'contact_info_fb',
        ) as HTMLElement;
        const contact_info_linkedin = document.getElementById(
          'contact_info_linkedin',
        ) as HTMLElement;

        switch (idError) {
          case 1:
            contact_info_phone.focus();
            break;
          case 2:
            contact_info_email.focus();
            break;
          case 3:
            contact_info_fb.focus();
            break;
          case 4:
            contact_info_linkedin.focus();
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalContact}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={handleKeyDown}
      >
        <Box sx={style} className="modal-person">
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
              ? 'Thông tin liên hệ'
              : languageRedux === 2
                ? 'Contact information'
                : languageRedux === 3
                  ? '연락처'
                  : 'Thông tin liên hệ'}
          </Typography>
          <Box sx={styleChildBox}>
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
                  : '전화 번호'} <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="tel"
              id="contact_info_phone"
              name="title"
              value={phone}
              onChange={handleSetPhone}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={languageRedux === 1
                ? 'Số điện thoại'
                : languageRedux === 2
                  ? 'Phone number'
                  : '전화 번호'}
              inputMode="numeric"
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

          <Box sx={styleChildBox}>
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
                  : '이메일'} <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="contact_info_email"
              name="title"
              value={email}
              onChange={handleSetEmail}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder="example@.gamil.com"
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {email.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không được bỏ trống'
                    : languageRedux === 2
                      ? 'Email cannot be empty'
                      : languageRedux === 3 && '이메일이 비어 있지 않습니다'}
                </span>
              ) : email.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không được vượt quá 50 ký tự'
                    : languageRedux === 2
                      ? 'Email cannot exceed 50 characters'
                      : languageRedux === 3 &&
                      '이메일은 50자를 초과할 수 없습니다.'}
                </span>
              ) : regexCheckEmail.test(email) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không đúng định dạng'
                    : languageRedux === 2
                      ? 'The Email is not in the correct format'
                      : languageRedux === 3 &&
                      '이메일의 형식이 올바르지 않습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${email.length}/50`}</span>
            </div>
          </Box>

          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Link Facebook'
                : languageRedux === 2
                  ? 'Link Facebook'
                  : '페이스북'}
            </Typography>
            <TextField
              type="text"
              id="contact_info_fb"
              name="title"
              value={fb}
              onChange={handleSetFB}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={languageRedux === 1
                ? 'Link Facebook'
                : languageRedux === 2
                  ? 'Link Facebook'
                  : '페이스북'}
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {fb.trim() !== '' && fb.length > 100 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Facebook không được vượt quá 100 ký tự'
                    : languageRedux === 2
                      ? 'The Facebook link cannot exceed 100 characters'
                      : languageRedux === 3 &&
                      'Facebook 링크는 100자를 초과할 수 없습니다.'}
                </span>
              ) : fb.trim() !== '' && validURL(fb) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Facebook không đúng định dạng'
                    : languageRedux === 2
                      ? 'The Facebook link is not in the correct format'
                      : languageRedux === 3 &&
                      'Facebook 링크의 형식이 올바르지 않습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${fb.length}/100`}</span>
            </div>
          </Box>

          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {
                languageRedux === 1
                  ? 'Link LinkedIn'
                  : languageRedux === 2
                    ? 'Link LinkedIn'
                    : '링크드인'
              }
            </Typography>
            <TextField
              type="text"
              id="contact_info_linkedin"
              name="title"
              value={linkIn}
              onChange={handleLinkIn}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Link LinkedIn'
                  : languageRedux === 2
                    ? 'Link LinkedIn'
                    : '링크드인'
              }
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {linkIn.trim() !== '' && linkIn.length > 100 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Linkedin không được vượt quá 100 ký tự'
                    : languageRedux === 2
                      ? 'The Linkedin link cannot exceed 100 characters'
                      : languageRedux === 3 &&
                      'Linkedin 링크는 100자를 초과할 수 없습니다.'}
                </span>
              ) : linkIn.trim() !== '' && validURL(linkIn) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Linkedin không đúng định dạng'
                    : languageRedux === 2
                      ? 'The Linkedin link is not in the correct format'
                      : languageRedux === 3 &&
                      'Linkedin 링크가 올바른 형식이 아닙니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${linkIn.length}/100`}</span>
            </div>
          </Box>

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {languageRedux === 1
              ? 'Lưu thông tin'
              : languageRedux === 2
                ? 'Save information'
                : languageRedux === 3 &&
                '정보 저장'}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalProfileContact;
