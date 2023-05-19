import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../store/index'
import { RootState } from '../../../store/reducer'

import signInEmailApi from 'api/authApi'
import OtpInput from 'react-otp-input'

// import component
import CountdownTimer from './components/CountdownTimer'

// import component Material
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

// import icon
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'

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

const ModalVerifyLogin: React.FC<PropsModalLogin> = (props) => {
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return email.trim() !== '' && emailRegex.test(email)
  }

  const dispatch = useDispatch()
  const { ActionSignInEmail } = bindActionCreators(actionCreators, dispatch)
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
  const [resendCode, setResendCode] = useState(false)

  const handleClose = () => setOpenModalLogin(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prevData) => ({ ...prevData, [name]: value }))

    setIsValidEmail(isEmailValid(value))
  }

  const { auth } = useSelector((state: RootState) => state)

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Thực hiện xử lý đăng nhập, ví dụ: gửi dữ liệu đăng nhập đến server
    try {
      e.preventDefault()
      if (isValidEmail) {
        if (invalid) {
          setInvalid(false)
        } else {
          // Gửi dữ liệu hoặc thực hiện các xử lý khác

          const result = await signInEmailApi.signInEmail(loginData.email)
          if (result) {
            ActionSignInEmail(result)
            setIsEmailVerified(true)
            if (result.data.success) {
            } else {
              setInvalid(true)
              setTimeout(() => {
                setInvalid(false)
              }, 3000)
            }
          }
        }
      } else {
        setInvalid(true)
      }
    } catch (error: any) {
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

  const handleLoginOtp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault()

      if (isInputFilled) {
        // Thực hiện hành động khi button được click
        const result = await signInEmailApi.verifyOtp(loginData.email, otp)
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

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
              Mã xác nhận sẽ được gửi vào số điện thoại bạn đăng nhập.
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
            <div className="bnt-login_google bnt-login">
              <img
                src="loginLogo/facebookOriginal.png"
                alt=""
                width={30}
                height={30}
              />
              <p className="text-login ">Đăng nhập bằng tài khoản Facebook</p>
            </div>
            <div className="bnt-login_google bnt-login">
              <img
                src="loginLogo/googleOriginal.png"
                alt=""
                width={30}
                height={30}
              />
              <p className="text-login">Đăng nhập bằng tài khoản Google</p>
            </div>
            <div className="bnt-login_google bnt-login">
              <img
                src="loginLogo/logoApple.png"
                alt=""
                width={30}
                height={30}
              />
              <p className="text-login">Đăng nhập bằng tài khoản AppleID</p>
            </div>
          </form>
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
                renderInput={(props) => (
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
                <p className="resend-otp_countDown">(00:00)</p>
              ) : (
                <CountdownTimer
                  resendCode={resendCode}
                  setResendCode={setResendCode}
                />
              )}
            </div>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default ModalVerifyLogin
