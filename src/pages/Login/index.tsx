import React, { useState, useEffect, useRef } from 'react';
import {
  CredentialResponse,
  googleLogout,
  useGoogleLogin,
  GoogleLogin,
  CodeResponse,
  TokenResponse,
} from '@react-oauth/google';

// npm chart
// import Chart from 'chart.js/auto';
import Chartjs from '#components/LogChart/Chartjs';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
// import GoogleButton from 'react-google-button'
import './style.scss';
import profileApi from 'api/profileApi';
import { DataLog, DataLogRecuiter } from 'pages/LogChart/typeChart';
import apiYoutubeShort from 'api/apiYoutubeShort';
import axios from 'axios';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Navigation, Mousewheel, Pagination, Autoplay, A11y } from 'swiper';
import { Mentions } from 'antd';
import { MentionsOptionProps } from 'antd/es/mentions';
declare global {
  interface Window { }
}
const Login = () => {
  const [dataLog, setDataLog] = useState<DataLog | undefined>(undefined);
  const [dataLogRecruiter, setDataLogRecruiter] = useState<
    DataLogRecuiter | undefined
  >(undefined);
  // useEffect(() => {
  //   // Load the Google API client library
  //   window.gapi.load('auth2', () => {
  //     window.gapi.auth2.init({
  //       client_id:
  //         '436273589347-ot9ec9jhm235q3irsvjpnltr8hsun5cp.apps.googleusercontent.com',
  //       scope:
  //         'email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
  //     });
  //   });
  // }, []);

  // const googleSignIn = async () => {
  //   try {
  //     console.log('login');
  //     console.log(window.gapi.auth2.getAuthInstance().signIn());

  //     window.gapi.auth2.getAuthInstance().signIn().then(onSignIn);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // // Callback function to handle successful Google Sign-In
  // const onSignIn = async (googleUser: any) => {
  //   // Get user information
  //   console.log('googleUser: ', googleUser);

  //   const result = await authApi.signInFacebook(googleUser.Oc.access_token);
  //   if (result) {
  //     fetchDataProfile(result.data, true);
  //   }
  //   // You can perform additional actions here, like sending the user's data to your server.
  // };

  // const fetchDataProfile = async (auth: any, isVerifyOtp?: boolean) => {
  //   if (isVerifyOtp) {
  //     // console.log('Xác thực OTP thành công', authState);
  //     // Thực hiện các hành động sau khi xác thực thành công
  //     localStorage.setItem(
  //       'accountId',
  //       auth && auth.accountId ? auth.accountId : '',
  //     );
  //     localStorage.setItem(
  //       'accessToken',
  //       auth && auth.accessToken ? auth.accessToken : '',
  //     );
  //     localStorage.setItem(
  //       'refreshToken',
  //       auth && auth.refreshToken ? auth.refreshToken : '',
  //     );

  //     const resultProfileV3 = await profileApi.getProfileInformationV3(
  //       languageRedux === 1 ? 'vi' : 'en',
  //     );

  //     if (resultProfileV3) {
  //       dispatch(setProfileMeInformationV3(resultProfileV3));
  //       window.open('/', '_parent');
  //     }
  //   } else {
  //     console.log('Lỗi xác thực ');
  //     // Thực hiện các hành động sau khi xác thực thất bại
  //   }
  // };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      // fetching userinfo can be done on the client or the server
      // const userInfo = await axios
      //   .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      //     headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      //   })
      //   .then((res) => res.data);
      // const result = await authApi.signInGoogle(codeResponse.access_token);
      // if (result) {
      //   console.log(result);
      //   // fetchDataProfile(result.data, true);
      // }
      // console.log(userInfo);
    },
    // flow: 'auth-code',
  });

  // ===========================
  useEffect(() => {
    // Load the Google One Tap API
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize the Google One Tap API
      (window as any).google.accounts.id.initialize({
        client_id:
          '436273589347-ot9ec9jhm235q3irsvjpnltr8hsun5cp.apps.googleusercontent.com',
        callback: (response: any) => {
          console.log('Google One Tap response:', response);

          // Add your logic for handling the signed-in user here
        },
        prompt_parent_id: 'google-login-button', // ID of your button container
      });

      // Render the Google One Tap button
      (window as any).google.accounts.id.renderButton(
        document.getElementById('google-login-button'), // ID of your button container
        { text: 'Sign up with Google', type: 'icon', shape: 'circle' },
      );
    };

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const dataChart = async () => {
    const result = await profileApi.activityLog();
    if (result) {
      setDataLog(result.data);
    }
  };

  useEffect(() => {
    dataChart();
  }, []);
  const [youtubeShorts, setYoutubeShorts] = useState<any>([]);

  const userkey = 'AIzaSyDkrJkIxMDQoN8z0UUrHf7IM8vCKThOsEg'
  const channel_id = 'UC7A7s5HsftARdOAriluA71Q'

  const isShort = async (videoId: any) => {
    const url = "https://www.youtube.com/shorts/" + videoId
    const res = await axios.head(url)
    console.log("isShort", res.status)
    // if it's a short it ends with "/shorts/videoId"
    // if it's NOT a short it ends "/watch?=videoId"
  }

  const getYouTubeShorts = async () => {
    try {
      const result = await apiYoutubeShort.getYoutubeShort(channel_id, userkey)
      if (result) {
        console.log("videos", result.data.items);
        const shortVideo = result.data.items.filter((item: any) => {
          return item?.snippet?.title.includes("#short")
        })
        setYoutubeShorts(shortVideo)
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }
  useEffect(() => {
    getYouTubeShorts();
    isShort('toi4pPmp8nc');
  }, []);
  const [mention, setMention] = useState<any>();

  const onChange = (value: string) => {
    console.log('Change:', value);
    setMention(value);
  };

  const onSelect = (option: MentionsOptionProps) => {
    console.log('select', option);
    setMention(option.value);
  };

  return (
    <>
      {/* <canvas
        ref={chartRef}
        style={{ cursor: 'pointer' }}
        // width={1000}
        // height={1000}
      ></canvas> */}
      {/* <Chartjs dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} /> */}
      <Swiper
        // rewind={true}
        // slidesPerView={14}
        // spaceBetween={10}
        navigation={true}
        // mousewheel={true}
        slidesPerView={5}
        // spaceBetween={25}
        // breakpoints={{
        //   320: {
        //     slidesPerView: 3,
        //   },
        //   640: {
        //     slidesPerView: 4,
        //   },
        //   768: {
        //     slidesPerView: 7,
        //   },
        //   868: {
        //     slidesPerView: 7,
        //   },
        //   963: {
        //     slidesPerView: 8,
        //   },
        //   1024: {
        //     slidesPerView: 9,
        //   },
        //   1440: {
        //     slidesPerView: 9,
        //   },
        //   1920: {
        //     slidesPerView: 14,
        //   },
        //   2560: {
        //     slidesPerView: 14,
        //   },
        // }}
        modules={[Mousewheel, Navigation, Pagination]}
        className="mySwiper"
      >
        {youtubeShorts?.map((item: any, index: number) => {
          return (
            <SwiperSlide
              key={index}
              // style={{ width: 'fit-content', marginLeft: '25px' }}
              className="item-swiperSlide"
            >
              <iframe key={index} width="257" height="457"
                style={{ borderRadius: '10px' }}
                src={`https://www.youtube.com/embed/${item?.id?.videoId}`}
                title={item?.snippet?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; 
    clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
              </iframe>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Mentions
        style={{ width: '100%' }}
        onChange={onChange}
        onSelect={onSelect}
        value={mention}
        options={[
          {
            value: 'afc163',
            label: 'afc163',
          },
          {
            value: 'zombieJ',
            label: 'zombieJ',
          },
          {
            value: 'yesmeck',
            label: 'yesmeck',
          },
        ]}
      />
    </>
  );
};

export default Login;
