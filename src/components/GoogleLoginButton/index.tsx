import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import signInEmailApi from 'api/authApi';
import profileApi from 'api/profileApi';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';

import { RootState } from '../../store/index';

interface AuthReponse {
  accountId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface PropsModalLogin {
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleLoginButton: React.FC<PropsModalLogin> = (props) => {
  const { openModalLogin, setOpenModalLogin } = props;
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const dispatch = useDispatch();
  const {
    // ActionSignInEmail,
    setProfileUser,
  } = bindActionCreators(actionCreators, dispatch);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

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

      await dispatch(getProfile() as any);

      try {
        if (localStorage.getItem('accessToken')) {
          const result = await profileApi.getProfile(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );

          // console.log('result: ', result);

          if (result) {
            setProfileUser(result.data);
          }
        }
      } catch (error) {
        console.log('error: ', error);
      }
      setOpenModalLogin(false);
      setOpenBackdrop(false);
      window.location.reload();
    } else {
      // console.log('Lỗi xác thực ', authState)
      // Thực hiện các hành động sau khi xác thực thất bại
      // console.log("lấy thông tin proffile ko được", );
    }
  };

  const handleGoogleLoginSuccess = async (credential: any) => {
    // Xử lý thành công khi đăng nhập bằng Gmail
    // console.log('Logged in with Google:', credential);

    const result = await signInEmailApi.signInGoogle(credential.credential);
    try {
      if (result) {
        // console.log('result: ', result.data);

        fetchDataProfile(result.data, true);
      }
    } catch (error) {}
  };

  const handleGoogleLoginFailure = (error: any) => {
    // Xử lý khi đăng nhập bằng Gmail thất bại
    console.error('Google login failed:', error);
  };

  useEffect(() => {
    // Khởi tạo Google Sign-In API
    (window as any).google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Thay YOUR_CLIENT_ID bằng Client ID của bạn
      scope: '',
      callback: handleGoogleLoginSuccess,
      cancel_on_tap_outside: false,
    });

    // Xử lý lỗi khi đăng nhập bằng Gmail
    window.onerror = (message, source, lineno, colno, error) => {
      handleGoogleLoginFailure(error);
    };
  }, []);

  const handleGoogleButtonClick = () => {
    // Gọi hàm đăng nhập bằng Google
    (window as any).google.accounts.id.prompt();
  };

  return (
    <div>
      <h2>Login with Gmail</h2>
      <button onClick={handleGoogleButtonClick}>Login with Google</button>
    </div>
  );
};

export default GoogleLoginButton;
