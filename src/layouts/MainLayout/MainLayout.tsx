import CategoryDropdown from '#components/CategoryDropdown';
// import Footer from '#components/Footer/Footer';

import Navbar from '#components/Navbar';
import React, { useEffect } from 'react';
import './style.scss';
import RollTop from '#components/RollTop';
import Footer from '#components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileUser } from 'store/actions';
import { getProfile } from 'store/reducer/profileReducer/getProfileReducer';
import authApi from '../../../src/api/authApi'
import { RootState } from 'store';
interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {

  const dispatch = useDispatch();
  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  const profileV3 = useSelector((state: RootState) => state.dataProfileInformationV3.data);
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

      await dispatch(getProfile() as any);
      // const result = await profileApi.getProfile('vi');
      if (dataProfile) {
        setProfileUser(dataProfile.data);
      }
      window.location.reload();
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
  }
  useEffect(() => {
    // Khởi tạo Google Sign-In API
    (window as any).google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Thay YOUR_CLIENT_ID bằng Client ID của bạn
      scope: '',
      callback: handleGoogleLoginSuccess,
      // cancel_on_tap_outside: false,
    });
    if (profileV3?.length === 0) {
      (window as any).google.accounts.id.cancel((notification: any) =>
        console.log(notification));
    } else {
      (window as any).google.accounts.id.prompt((notification: any) =>
        console.log(notification)
      );
    }
    // Xử lý lỗi khi đăng nhập bằng Gmail
    // window.onerror = (message, source, lineno, colno, error) => {
    //   handleGoogleLoginFailure(error);
    // };
  }, []);

  return (
    <>
      <Navbar />
      <CategoryDropdown />
      <div className="childrenContainer">{children}</div>
      <RollTop />
      <Footer />
    </>
  );
};

export default MainLayout;
