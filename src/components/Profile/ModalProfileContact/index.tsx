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
  //       languageRedux === 1 ? 'vi' : 'en',
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
    console.log('string', str);

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
            : 'Phone number cannot be empty',
        checkForm: false,
      };
    }
    if (regexCheckPhone.test(phone) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Số điện thoại không đúng định dạng'
            : 'The phone number is not in the correct format',
        checkForm: false,
      };
    }
    if (email?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không được bỏ trống'
            : 'Email cannot be empty',
        checkForm: false,
      };
    }
    if (regexCheckEmail.test(email) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Email không đúng định dạng'
            : 'The Email is not in the correct format',
        checkForm: false,
      };
    }

    if (validURL(fb) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Facebook không đúng định dạng'
            : 'The Facebook link is not in the correct format',
        checkForm: false,
      };
    }
    if (validURL(linkIn) === false) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Linkedin không đúng định dạng'
            : 'The Linkedin link is not in the correct format',
        checkForm: false,
      };
    }

    if (fb.length > 100) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Facebook không được vượt quá 100 ký tự'
            : 'The Facebook link cannot exceed 100 characters',
        checkForm: false,
      };
    }
    if (linkIn.length > 100) {
      return {
        messageError:
          languageRedux === 1
            ? 'Link Linkedin không được vượt quá 100 ký tự'
            : 'The Linkedin link cannot exceed 100 characters',
        checkForm: false,
      };
    }

    return {
      messageError: '',
      checkForm: true,
    };
  };

  // handle update information contact
  const handleSubmit = async () => {
    const { messageError, checkForm } = validValue();
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
          const getProfileV3 = await profileApi.getProfileV3(
            languageRedux === 1 ? 'vi' : 'en',
          );

          if (getProfileV3) {
            dispatch(setProfileV3(getProfileV3));
          }
          setOpenModalContact(false);
        }
      } else {
        message.error(messageError);
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
            {language?.contact_information}
          </Typography>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {language?.phone_number} <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="tel"
              id="nameProfile"
              name="title"
              value={phone}
              onChange={handleSetPhone}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.phone_number}
              inputMode="numeric"
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

          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              Email <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="nameProfile"
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
                    : 'Email cannot be empty'}
                </span>
              ) : email.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không được bỏ trống'
                    : 'Email cannot exceed 50 characters'}
                </span>
              ) : regexCheckEmail.test(email) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Email không đúng định dạng'
                    : 'The Email is not in the correct format'}
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
              Link Facebook
            </Typography>
            <TextField
              type="text"
              id="nameProfile"
              name="title"
              value={fb}
              onChange={handleSetFB}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder="Facebook"
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {fb.length > 100 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Facebook không được vượt quá 100 ký tự'
                    : 'The Facebook link cannot exceed 100 characters'}
                </span>
              ) : validURL(fb) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Facebook không đúng định dạng'
                    : 'The Facebook link is not in the correct format'}
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
              Link Linkedin
            </Typography>
            <TextField
              type="text"
              id="nameProfile"
              name="title"
              value={linkIn}
              onChange={handleLinkIn}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder="Linkedin"
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {linkIn.length > 100 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Linkedin không được vượt quá 100 ký tự'
                    : 'The Linkedin link cannot exceed 100 characters'}
                </span>
              ) : validURL(linkIn) === false ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Link Linkedin không đúng định dạng'
                    : 'The Linkedin link is not in the correct format'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${linkIn.length}/100`}</span>
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

export default ModalProfileContact;
