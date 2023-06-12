import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../store/index'
import { RootState } from '../../../store/reducer'
import { getProfile } from 'store/reducer/profileReducer/getProfileReducer'

import {
  signInEmail,
  verifyOtp,
} from '../../../store/reducer/authReducer/signGmailReducer'

import signInEmailApi from 'api/authApi'
//@ts-ignore
import OtpInput from 'react-otp-input'
//@ts-ignore
import FacebookLogin from '@greatsumini/react-facebook-login'
import { FacebookLoginClient } from '@greatsumini/react-facebook-login'
import GoogleLogin from '@leecheuk/react-google-login'

import { gapi } from 'gapi-script'

// import component
import CountdownTimer from './components/CountdownTimer'

// import component Material
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

// import icon
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'

//import api
import authApi from '../../../api/authApi'
import profileApi from '../../../api/profileApi'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// import login from action

import './style.scss'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '576px',
  // height: '568px',
  bgcolor: '#ffffff',
  borderRadius: '20px',
  // border: '2px solid #000',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
  p: 4,
}

interface LoginData {
  email: string
}

interface PropsModalLogin {
  openModalLogin: boolean
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>
}
interface AuthReponse {
  accountId: string | null
  accessToken: string | null
  refreshToken: string | null
}

const ModalVerifyLogin: React.FC<PropsModalLogin> = (props) => {
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return email.trim() !== '' && emailRegex.test(email)
  }
  // app id facebook
  const appId = process.env.REACT_APP_FACEBOOK_APP_ID
    ? process.env.REACT_APP_FACEBOOK_APP_ID
    : ''
  // id google client
  const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_ID
    ? process.env.REACT_APP_GOOGLE_CLIENT_ID
    : ''

  const dispatch = useDispatch()
  const { ActionSignInEmail, setProfileUser } = bindActionCreators(actionCreators, dispatch)
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
  })
  const { openModalLogin, setOpenModalLogin } = props
  // check entered the correct gmail
  // xác nhận xem email có đúng cú pháp hay không
  const [isValidEmail, setIsValidEmail] = useState(false)
  // error input gmail
  const [invalid, setInvalid] = useState(false)
  // isvalid otp isInputFilled if entered miss
  const [isInputFilled, setIsInputFilled] = useState(false)
  //
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [otp, setOTP] = useState('')
  const [resendCode, setResendCode] = useState(true)
  const [openBackdrop, setOpenBackdrop] = React.useState(false)

  const handleClose = () => setOpenModalLogin(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prevData) => ({ ...prevData, [name]: value }))

    setIsValidEmail(isEmailValid(value))
  }

  const authState = useSelector((state: RootState) => state.auth)
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault()
      if (isValidEmail) {
        if (invalid) {
          setInvalid(false)
        } else {
          await dispatch(signInEmail(loginData.email) as any)
          setIsEmailVerified(true)
          // Gửi yêu cầu đăng nhập và chờ kết quả trả về
        }
      } else {
        setInvalid(true)
      }
    } catch (error: any) {
      console.log(error.response?.data)
      if (!error.response?.data.success) {
        setInvalid(true)
        setTimeout(() => {
          setInvalid(false)
        }, 3000)
      }
    }
  }

  // ENTER OTP
  const handleOtpChange = (otpValue: string) => {
    setOTP(otpValue)

    setIsInputFilled(otpValue.length > 5)
  }

  const handleBackLogin = () => {
    setIsEmailVerified(false)
    setResendCode(false)
  }

  const handleBackOtp = () => {
    setIsEmailVerified(true)
    // setResendCode(false)
  }

  const handleCloseBackDrop = () => {
    setOpenBackdrop(false)
  }

  const handleLoginOtp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault()

      if (isInputFilled) {
        // Thực hiện hành động khi button được click
        //  console.log('isInputFilled', isInputFilled)
        await dispatch(verifyOtp({ email: loginData.email, otp }) as any)
        setOpenModalLogin(false)
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  // handle login facebook
  const responseFacebook = async (response: any) => {
    try {
      setOpenBackdrop(true)
      if (response.userID) {
        const result = await authApi.signInFacebook(response.accessToken)
        if (result) {
          fetchDataProfile(result.data, true)
        }
      }
    } catch (error) { }

    console.log('facebook', response)
  }

  // check response failed from facebook and google
  const responseFailFacebookAndGoogle = () => {
    setOpenBackdrop(false)
  }

  // handle login google
  const responseGoogle = async (response: any) => {
    try {
      setOpenBackdrop(true)
      if (response.tokenId) {
        console.log('response.tokenID', response.tokenId)
        const result = await authApi.signInGoogle(response.tokenObj.id_token)
        console.log(result)
        if (result) {
          fetchDataProfile(result.data, true)
        }
      }
    } catch (error) {
      console.log(error)
      setOpenBackdrop(false)
    }

    console.log('gg', response)
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của authState.isLoggedIn
  useEffect(() => {
    if (authState.isLoggedIn) {
      console.log('Xác thực nhận email thành công', authState)
      // Thực hiện các hành động sau khi xác thực thành công
      setIsEmailVerified(true)
    } else {
      console.log('Lỗi xác nhận email thành công', authState)
      // Thực hiện các hành động sau khi xác thực thất bại
    }
  }, [authState.isLoggedIn])

  // isVerifiedOtp facebook and google =true
  const fetchDataProfile = async (auth: AuthReponse, isVerifyOtp?: boolean) => {

    if (isVerifyOtp) {
      console.log('Xác thực OTP thành công', authState)
      // Thực hiện các hành động sau khi xác thực thành công
      localStorage.setItem(
        'accountId',
        auth && auth.accountId ? auth.accountId : ''
      )
      localStorage.setItem(
        'accessToken',
        auth && auth.accessToken ? auth.accessToken : ''
      )
      localStorage.setItem(
        'refreshToken',
        auth && auth.refreshToken ? auth.refreshToken : ''
      )

      await dispatch(getProfile() as any)
      const result = await profileApi.getProfile()
      if (result) {
        setProfileUser(result.data)
      }
      setOpenModalLogin(false)
      setOpenBackdrop(false)
      window.location.reload()

    } else {
      console.log('Lỗi xác thực ', authState)
      // Thực hiện các hành động sau khi xác thực thất bại
    }
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của authState.isLoggedIn
  useEffect(() => {
    fetchDataProfile(authState, authState.isverifyOtp)
  }, [authState.isverifyOtp])

  useEffect(() => {

    const start = () => {
      gapi.client.init({
        clientId: googleClient,
        scope: '',
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const handleResendCode = () => {
    setResendCode(true)
  }

  return (
    <Modal
      open={openModalLogin}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
          sx={{
            fontWeight: '700',
            fontSize: '24px',
            lineHeight: '24px',
            color: '#001424',
            margin: '12px 0',
          }}
        >
          Đăng nhập
        </Typography>
        {!isEmailVerified && (
          <>
            <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
                fontWeight: '300',
              }}
              onClick={handleBackOtp}
            />
            <form>
              <div className="wrapLogin">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email của bạn..."
                />
                <small className={!invalid ? 'alert' : 'alert error'}>
                  Email không đúng cú pháp vui lòng nhập lại
                </small>
              </div>
              <p className="text-sent_otp">
                Mã xác nhận sẽ được gửi vào email bạn đăng nhập.
              </p>
              <button
                type="button"
                onClick={handleLogin}
                className="button-login"
              >
                Login
              </button>
              <div className="line-with-text">
                <span className="line"></span>
                <span className="text">Hoặc</span>
                <span className="line"></span>
              </div>

              <FacebookLogin
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
                      alt=""
                      width={30}
                      height={30}
                    />
                    <p className="text-login ">
                      Đăng nhập bằng tài khoản Facebook
                    </p>
                  </div>
                )}
              />
              <GoogleLogin
                clientId={googleClient}
                scope="profile email"
                render={(renderProps) => (
                  <div
                    className="bnt-login_google bnt-login"
                    onClick={renderProps.onClick}
                  >
                    <img
                      src="loginLogo/googleOriginal.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <p className="text-login">
                      Đăng nhập bằng tài khoản Google
                    </p>
                  </div>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseFailFacebookAndGoogle}
              // cookiePolicy={'single_host_origin'}
              />

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
            <p className="textOpt">Bạn hãy nhập mã OTP được gửi đến email:</p>
            <p className="textOpt-email">{loginData.email}</p>
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
              Xác nhận email
            </button>
            <div className="wrap-countDown">
              <p className="resend-otp" onClick={handleResendCode}>
                Gửi lại mã{' '}
              </p>
              {!resendCode ? (
                <p className="resend-otp_countDown"></p>
              ) : (
                <CountdownTimer
                  resendCode={resendCode}
                  setResendCode={setResendCode}
                />
              )}
            </div>
          </div>
        )}
        <Backdrop
          sx={{
            color: '#0d99ff ',
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={openBackdrop}
          onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  )
}

export default ModalVerifyLogin
