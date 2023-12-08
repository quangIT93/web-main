import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';
import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';
import {
  CredentialResponse,
  googleLogout,
  useGoogleLogin,
  GoogleLogin,
  CodeResponse,
  useGoogleOneTapLogin,
  PromptMomentNotification,
} from '@react-oauth/google';

import {
  signInEmail,
  verifyOtp,
} from '../../../store/reducer/authReducer/signGmailReducer';

import signInEmailApi from '../../../api/authApi';

// import signInEmailApi from 'api/authApi';
//@ts-ignore
import OtpInput from 'react-otp-input';
//@ts-ignore
import FacebookLogin from '@greatsumini/react-facebook-login';
// import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
// import GoogleLogin from '@leecheuk/react-google-login';

// import { gapi } from 'gapi-script';

// import component
import CountdownTimer from './components/CountdownTimer';

// import component Material
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// import icon
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

//import api
import authApi from '../../../api/authApi';
import profileApi from '../../../api/profileApi';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// redux
import { setIsNew } from 'store/reducer/isNewReducer';

// import login from action

import './style.scss';
import { signin } from 'validations/lang/vi/signin';
import { signinEn } from 'validations/lang/en/signin';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';

//
// import { google } from 'googleapis';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '576px',
  // height: '568px',
  bgcolor: '#ffffff',
  borderRadius: '20px',
  border: 'none',
  outline: 'none',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
  p: 4,

  '@media (max-width: 600px)': {
    width: '400px',
  },

  '@media (max-width: 400px)': {
    width: '360px',
  },

  '@media (max-width: 280px)': {
    width: '280px',
  },
};

interface LoginData {
  email: string;
}

interface PropsModalLogin {
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthReponse {
  accountId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const ModalVerifyLogin: React.FC<PropsModalLogin> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email.trim() !== '' && emailRegex.test(email);
  };
  // app id facebook
  const appId = process.env.REACT_APP_FACEBOOK_APP_ID
    ? process.env.REACT_APP_FACEBOOK_APP_ID
    : '';
  // id google client

  const dispatch = useDispatch();
  const {
    // ActionSignInEmail,
    setProfileUser,
  } = bindActionCreators(actionCreators, dispatch);
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
  });
  const { openModalLogin, setOpenModalLogin } = props;
  // check entered the correct gmail
  // xác nhận xem email có đúng cú pháp hay không
  const [isValidEmail, setIsValidEmail] = useState(false);
  // error input gmail
  const [invalid, setInvalid] = useState(false);
  // isvalid otp isInputFilled if entered miss
  const [isInputFilled, setIsInputFilled] = useState(false);
  //
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOTP] = useState('');
  const [resendCode, setResendCode] = useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const newUser = useSelector((state: RootState) => state.isNew);

  const handleClose = () => setOpenModalLogin(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));

    setIsValidEmail(isEmailValid(value));
  };

  // const regexCheckMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const authState = useSelector((state: RootState) => state.auth);

  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const handleLogin = async (
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    e: any,
  ) => {
    try {
      e.preventDefault();
      if (isValidEmail) {
        if (invalid) {
          setInvalid(false);
        } else {
          await dispatch(signInEmail(loginData.email) as any);
          setIsEmailVerified(true);
          // Gửi yêu cầu đăng nhập và chờ kết quả trả về
        }
      } else {
        setInvalid(true);
      }
    } catch (error: any) {
      console.log(error.response?.data);
      if (!error.response?.data.success) {
        setInvalid(true);
        setTimeout(() => {
          setInvalid(false);
        }, 3000);
      }
    }
  };

  // ENTER OTP
  const handleOtpChange = (otpValue: string) => {
    setOTP(otpValue);

    setIsInputFilled(otpValue.length > 5);
  };

  const handleBackLogin = () => {
    setIsEmailVerified(false);
    setResendCode(false);
  };

  // const handleBackOtp = () => {
  //   setIsEmailVerified(true);
  //   // setResendCode(false)
  // };

  const handleCloseBackDrop = () => {
    setOpenBackdrop(false);
  };

  const handleLoginOtp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      e.preventDefault();

      if (isInputFilled) {
        // Thực hiện hành động khi button được click
        //  console.log('isInputFilled', isInputFilled)
        // await dispatch(verifyOtp({ email: loginData.email, otp }) as any);

        const result = await signInEmailApi.verifyOtp(loginData.email, otp);
        if (result) {
          fetchDataProfile(result.data, true);
          // dispatch(setIsNew(true));
          localStorage.setItem('isNew', 'true');
          setOpenModalLogin(false);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle login facebook
  const responseFacebook = async (response: any) => {
    try {
      setOpenBackdrop(true);
      if (response.userID) {
        const result = await authApi.signInFacebook(response.accessToken);
        if (result) {
          fetchDataProfile(result.data, true);
          setOpenBackdrop(false);
          // dispatch(setIsNew(true));
          setOpenModalLogin(false);
          localStorage.setItem('isNew', 'true');
        }
      }
    } catch (error) {
      setOpenBackdrop(false);
    }

    // console.log('facebook', response)
  };

  // check response failed from facebook and google
  const responseFailFacebookAndGoogle = () => {
    setOpenBackdrop(false);
  };

  // handle login google
  const responseGoogle = async (response: any) => {
    console.log('response', response);
    console.log('responsetokenId', response.clientId);

    try {
      setOpenBackdrop(true);
      if (response.clientId) {
        // console.log('response.tokenID', response.tokenId);

        const result = await authApi.signInGoogle(response.credential);
        if (result) {
          fetchDataProfile(result.data, true);
          setOpenBackdrop(false);
          setOpenModalLogin(false);
          // dispatch(setIsNew(true));
          localStorage.setItem('isNew', 'true');
        }
      }
    } catch (error) {
      console.log('error gg', error);
      setOpenBackdrop(false);
    }

    // console.log('gg', response)
  };

  // Sử dụng useEffect để theo dõi sự thay đổi của authState.isLoggedIn
  useEffect(() => {
    if (authState.isLoggedIn) {
      // console.log('Xác thực nhận email thành công', authState);
      // Thực hiện các hành động sau khi xác thực thành công
      setIsEmailVerified(true);
    } else {
      // console.log('Lỗi xác nhận email thành công', authState);
      // Thực hiện các hành động sau khi xác thực thất bại
    }
  }, [authState.isLoggedIn]);

  // isVerifiedOtp facebook and google =true
  const fetchDataProfile = async (auth: AuthReponse, isVerifyOtp?: boolean) => {
    if (isVerifyOtp) {
      // console.log('Xác thực OTP thành công', authState);
      // Thực hiện các hành động sau khi xác thực thành công
      localStorage.setItem(
        'accountId',
        auth && auth.accountId ? auth.accountId : '',
      );
      localStorage.setItem(
        'accessToken',
        auth && auth.accessToken ? auth.accessToken : '',
      );
      localStorage.setItem(
        'refreshToken',
        auth && auth.refreshToken ? auth.refreshToken : '',
      );

      const result = await profileApi.getProfileInformationV3(
        languageRedux === 1
          ? 'vi'
          : languageRedux === 2
          ? 'en'
          : languageRedux === 3
          ? 'ko'
          : 'vi',
      );

      // await dispatch(getProfile() as any);
      // const result = await profileApi.getProfile('vi');
      // if (dataProfile) {
      //   setProfileUser(dataProfile.data);
      // }

      if (result) {
        dispatch(setProfileMeInformationV3(result));
      }
      setOpenModalLogin(false);
      setOpenBackdrop(false);
      window.location.reload();
    } else {
      // console.log('Lỗi xác thực ', authState)
      // Thực hiện các hành động sau khi xác thực thất bại
    }
  };

  // Sử dụng useEffect để theo dõi sự thay đổi của authState.isLoggedIn
  useEffect(() => {
    fetchDataProfile(authState, authState.isverifyOtp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isverifyOtp]);

  // useEffect(() => {
  //   const start = () => {
  //     gapi.client.init({
  //       clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
  //         ? process.env.REACT_APP_GOOGLE_CLIENT_ID
  //         : '',
  //       scope:
  //         'email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
  //     });
  //   };
  //   gapi.load('client:auth2', start);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   // Load the Google API client library
  //   window.gapi.load('auth2', () => {
  //     window.gapi.auth2
  //       .init({
  //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
  //           ? process.env.REACT_APP_GOOGLE_CLIENT_ID
  //           : '',
  //         scope:
  //           'email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
  //       })
  //       .then(
  //         () => {
  //           // API initialization succeeded
  //         },
  //         (error: any) => {
  //           console.error('Error initializing Google API client:', error);
  //         },
  //       );
  //   });
  // }, []);

  const handleResendCode = () => {
    setResendCode(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };
  // -------------------------------------------------------------------------------------

  // const handleCredentialResponse = async (response: any) => {
  //   console.log('Encoded JWT ID token: ' + response);
  //   try {
  //     const result = await authApi.signInGoogle(response.credential);
  //     if (result) {
  //       console.log(result);
  //       fetchDataProfile(result.data, true);
  //     }
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // };

  // React.useEffect(() => {
  //   /* global google */
  //   window.google.accounts.id.initialize({
  //     client_id: googleClient,
  //     callback: handleCredentialResponse,
  //   });
  //   window.google.accounts.id.renderButton(document.getElementById('button'), {
  //     theme: 'outline',
  //     size: 'large',
  //   });
  //   window.google.accounts.id.prompt();
  // }, []);

  useEffect(() => {}, []);

  return (
    <Modal
      open={openModalLogin}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 100000 }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
          sx={{
            fontWeight: '700',
            fontSize: '24px !important',
            lineHeight: '24px',
            color: '#001424',
            margin: '12px 0',
            position: 'relative',
          }}
        >
          {languageRedux === 1
            ? 'Đăng nhập'
            : languageRedux === 2
            ? 'Login'
            : languageRedux === 3 && '로그인'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        {!isEmailVerified && (
          <>
            {/* <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
                fontWeight: '300',
              }}
              onClick={handleBackOtp}
            /> */}
            <form>
              {/* <div className="login-GF">
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  // type="icon"
                  shape="circle"
                />
                <p>
                  {languageRedux === 1
                    ? 'Đăng nhập bằng tài khoản Facebook'
                    : 'Sign in with Facebook account'}
                </p>
              </div> */}

              {/* <FacebookLogin
                appId={appId}
                autoLoad={false}
                onSuccess={responseFacebook}
                onFail={responseFailFacebookAndGoogle}
                render={(renderProps: any) => (
                  <div
                    className="bnt-login_google bnt-login"
                    onClick={renderProps.onClick}
                  >
                    <img
                      src="loginLogo/facebookOriginal.png"
                      alt={languageRedux === 1
                        ? 'Hình ảnh bị lỗi'
                        : languageRedux === 2
                          ? 'Image is corrupted'
                          : '이미지가 손상되었습니다'}
                      width={29}
                      height={30}
                    />
                    <p className="text-login ">
                      {
                        languageRedux === 1 ?
                          "Đăng nhập bằng tài khoản Facebook" :
                          languageRedux === 2 ?
                            "Sign in with Facebook account" :
                            languageRedux === 3 &&
                            "페이스북으로 그로인"
                      }
                    </p>
                  </div>
                )}
              />
              <GoogleLogin
                clientId={
                  process.env.REACT_APP_GOOGLE_CLIENT_ID
                    ? process.env.REACT_APP_GOOGLE_CLIENT_ID
                    : ''
                }
                scope="email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile"
                render={(renderProps) => (
                  <div
                    className="bnt-login_google bnt-login"
                    onClick={renderProps.onClick}
                    data-auto_select="true"
                  >
                    <img
                      src="loginLogo/googleOriginal.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <p className="text-login">
                      {
                        languageRedux === 1 ?
                          "Đăng nhập bằng tài khoản Google" :
                          languageRedux === 2 ?
                            "Sign in with Google account" :
                            languageRedux === 3 &&
                            "구글로 그로인"
                      }
                    </p>
                  </div>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseFailFacebookAndGoogle}
                cookiePolicy={'single_host_origin'}
                prompt="select_account"
                // isSignedIn={true}
                // loginHint="loginHint"
              /> */}

              <div className="wrapLogin">
                <label htmlFor="username">
                  {languageRedux === 1
                    ? 'Email'
                    : languageRedux === 2
                    ? 'Email'
                    : languageRedux === 3 && '이메일을'}
                </label>
                <input
                  type="text"
                  id="username"
                  name="email"
                  onKeyDown={handleKeyPress}
                  value={loginData.email}
                  onChange={handleInputChange}
                  placeholder={
                    languageRedux === 1
                      ? 'Nhập email của bạn...'
                      : languageRedux === 2
                      ? 'Enter your email...'
                      : languageRedux === 3
                      ? '이메일을 입력하세요...'
                      : ''
                  }
                />
                <small className={!invalid ? 'alert' : 'alert error'}>
                  {languageRedux === 1
                    ? 'Email không đúng cú pháp vui lòng nhập lại.'
                    : languageRedux === 2
                    ? 'The email is not syntactically correct, please re-enter.'
                    : languageRedux === 3 &&
                      '이메일이 잘못되었습니다. 다시 입력해 주세요.'}
                </small>
              </div>
              <p className="text-sent_otp">
                {languageRedux === 1
                  ? 'Mã xác nhận sẽ được gửi vào email bạn đăng nhập.'
                  : languageRedux === 2
                  ? 'Confirmation code will be sent to your login email'
                  : languageRedux === 3 &&
                    '코드는 로그인하신 이메일로 보내드립니다 '}
              </p>

              <div className="line-with-text">
                <span className="line"></span>
                <span className="text">
                  {languageRedux === 1
                    ? 'Đăng nhập nhanh'
                    : languageRedux === 2
                    ? 'Log in quickly'
                    : languageRedux === 3 && '빠르게 로그인하세요'}
                </span>
                <span className="line"></span>
              </div>
              <div className="login-GF">
                <div className="login-GF__fb">
                  <FacebookLogin
                    appId={appId}
                    autoLoad={false}
                    onSuccess={responseFacebook}
                    onFail={responseFailFacebookAndGoogle}
                    render={(renderProps: any) => {
                      console.log('renderProps', renderProps);

                      return (
                        <div
                          // className="bnt-login_google bnt-login"
                          onClick={renderProps.onClick}
                          className="icon-google"
                        >
                          <img
                            src="loginLogo/facebookOriginal.png"
                            alt={
                              languageRedux === 1
                                ? 'Hình ảnh bị lỗi'
                                : languageRedux === 2
                                ? 'Image is corrupted'
                                : '이미지가 손상되었습니다'
                            }
                            width={29}
                            height={30}
                          />
                          {/* <p className="text-login ">
                        {languageRedux === 1
                          ? 'Đăng nhập bằng tài khoản Facebook'
                          : languageRedux === 2
                            ? 'Sign in with Facebook account'
                            : languageRedux === 3 && '페이스북으로 그로인'}
                      </p> */}
                        </div>
                      );
                    }}
                    // style={{
                    //   backgroundColor: '#4267b2',
                    //   color: '#fff',
                    //   fontSize: '16px',
                    //   padding: '12px 24px',
                    //   border: 'none',
                    //   borderRadius: '4px',
                    // }}
                  />
                </div>
                <div className="login-GF__gg">
                  <div className="login-GF__ggImg">
                    <img
                      src="loginLogo/googleOriginal.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </div>
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    type="icon"
                    shape="circle"
                    size="large"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className="button-login"
              >
                {languageRedux === 1
                  ? 'Đăng nhập'
                  : languageRedux === 2
                  ? 'Login'
                  : languageRedux === 3 && '로그인'}
              </button>

              {/* <div
                className="bnt-login_google bnt-login"
                onClick={(e) => {
                  FacebookLoginClient.getLoginStatus((response) => {
                    console.log('logout completed!', response)
                  })
                }}
              >
                <img
                  src="loginLogo/logoApple.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <p className="text-login">Đăng nhập bằng tài khoản AppleID</p>
              </div> */}
            </form>
          </>
        )}

        {isEmailVerified && (
          <div className="wrap-otp">
            <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
                fontWeight: '300',
              }}
              onClick={handleBackLogin}
            />
            <p className="textOpt">
              {languageRedux === 1
                ? 'Bạn hãy nhập mã OTP được gửi đến email:'
                : languageRedux === 2
                ? 'Please enter the OTP sent to email'
                : languageRedux === 3 &&
                  '이메일에 발송된 OTP코드를 입력하십시오:'}
            </p>
            <p className="textOpt-email">{loginData.email}</p>
            <p className="textOpt-notice">
              {languageRedux === 1
                ? 'Nếu không nhận được mã OTP qua email, bạn vui lòng kiểm tra lại email đã nhập chính xác chưa hoặc kiểm tra trong thư mục spam.'
                : languageRedux === 2
                ? 'If you do not receive the OTP by email, please check whether the email is entered correctly or check in the spam folder.'
                : languageRedux === 3 &&
                  '이메일로 OTP 코드를 받지 못한 경우, 이메일이 올바르게 입력되었는지 확인하시거나 스팸메일함을 확인해 주세요.'}
            </p>
            <div className="otp-inputs">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                renderSeparator={<span style={{ marginLeft: '24px' }}></span>}
                inputStyle="otp-input"
                renderInput={(props: any) => (
                  <input {...props} className="otp-input" />
                )}
              />
            </div>
            <button
              type="button"
              className="button-login"
              style={{
                backgroundColor: isInputFilled ? '#0D99FF' : '#DCDCDC',
                cursor: isInputFilled ? 'pointer' : 'not-allowed',
              }}
              onClick={handleLoginOtp}
              disabled={!isInputFilled}
            >
              {languageRedux === 1
                ? 'Xác thực email'
                : languageRedux === 2
                ? 'Verify email'
                : languageRedux === 3 && '이메일을 확인'}
            </button>
            <div className="wrap-countDown">
              <p className="resend-otp" onClick={handleResendCode}>
                {languageRedux === 1
                  ? 'Gửi lại mã'
                  : languageRedux === 2
                  ? 'Resend code'
                  : languageRedux === 3 && '코드 다시 발송'}{' '}
              </p>
              {!resendCode ? (
                <p className="resend-otp_countDown"></p>
              ) : (
                <CountdownTimer
                  // resendCode={resendCode}
                  setResendCode={setResendCode}
                />
              )}
            </div>
          </div>
        )}
        <Backdrop
          sx={{
            color: '#0d99ff ',
            backgroundColor: 'transparent',
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={openBackdrop}
          onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default ModalVerifyLogin;
