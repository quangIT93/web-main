import CategoryDropdown from '#components/CategoryDropdown';
// import Footer from '#components/Footer/Footer';

import Navbar from '#components/Navbar';
import React, { useEffect } from 'react';
import './style.scss';
import RollTop from '#components/RollTop';
import Footer from '#components/Footer/Footer';
// import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileUser } from 'store/actions';
import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';
import authApi from '../../../src/api/authApi';
import { RootState } from 'store';
import {
  useGoogleOneTapLogin,
  PromptMomentNotification,
} from '@react-oauth/google';
import profileApi from 'api/profileApi';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const dispatch = useDispatch();

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const fetchDataProfile = async (auth: any, isVerifyOtp?: boolean) => {
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
        languageRedux === 3
          ? 'ko'
          : languageRedux === 2
            ? 'en'
            : languageRedux === 1
              ? 'vi'
              : 'vi',
      );
      if (result) {
        await dispatch(setProfileMeInformationV3(result) as any);
        window.location.reload();
      }

      // const result = await profileApi.getProfile('vi');
    } else {
      // console.log('Lỗi xác thực ', authState)
      // Thực hiện các hành động sau khi xác thực thất bại
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    console.log(response);
    const result = await authApi.signInGoogle(response.credential);
    if (result) {
      fetchDataProfile(result.data, true);
      console.log(result.data);
    }
  };
  useEffect(() => {
    // Khởi tạo Google Sign-In API

    (window as any).google?.accounts?.id?.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Thay YOUR_CLIENT_ID bằng Client ID của bạn
      scope: '',
      callback: handleGoogleLoginSuccess,
      prompt_parent_id: 'g_id_onload'
      // cancel_on_tap_outside: false,
    });

    (window as any).google?.accounts?.id?.cancel((notification: any) =>
      console.log(notification),
    );

    if (!localStorage.getItem('accessToken')) {
      (window as any).google?.accounts?.id?.prompt((notification: any) =>
        console.log(notification),
      );
      document.cookie =
        'g_state' + '=; Max-Age=-9999999999999999999999999999999';
    }

    // Xử lý lỗi khi đăng nhập bằng Gmail
    // window.onerror = (message, source, lineno, colno, error) => {
    //   handleGoogleLoginFailure(error);
    // };
  }, []);

  // useGoogleOneTapLogin({
  //   onSuccess: () => {},
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  //   promptMomentNotification: (notification: PromptMomentNotification) => {
  //     console.log('notification', notification);
  //   },
  // });

  // useEffect(() => {
  //   if (localStorage.getItem('accessToken')) {
  //     document.cookie = 'g_state' + '=; Max-Age=0';
  //   }
  // }, []);

  return (
    <>
      <div id="g_id_onload"
        data-prompt_parent_id="g_id_onload"
        data-cancel_on_tap_outside="false"
        style={{
          position: "absolute",
          left: "50%",
          top: "124px",
          width: "0",
          height: "0",
          zIndex: "1001",
        }}>
      </div>
      <Navbar />
      <CategoryDropdown />
      <div className="childrenContainer">{children}</div>
      <RollTop />
      <Footer />
    </>
  );
};

export default MainLayout;
