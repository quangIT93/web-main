import React, { useState, useEffect } from 'react';
import {
  CredentialResponse,
  googleLogout,
  useGoogleLogin,
  GoogleLogin,
  CodeResponse,
  TokenResponse,
} from '@react-oauth/google';

import axios from 'axios';
// import signInEmailApi from '../../../api/authApi';
import authApi from '../../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import profileApi from 'api/profileApi';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
import { RootState } from 'store';
// import GoogleButton from 'react-google-button'
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DataZoomComponent,
  DataZoomComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
declare global {
  interface Window { }
}
const Login = () => {
  const dispatch = useDispatch();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
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
  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    DataZoomComponent
  ]);

  type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | LineSeriesOption
    | DataZoomComponentOption
  >;

  var chartDom = document.getElementById('main_echart') as HTMLElement;
  var myChart = chartDom && echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    // title: {
    //   text: 'Stacked Area Chart'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      type: 'scroll',
      data:
        profileV3.typeRoleDate === 0 ?
          [
            'Việc làm đã ứng tuyển',
            'Việc làm đã xem qua',
            'Việc làm đã tìm kiếm'
          ] :
          [
            'Ứng viên đã tuyển dụng',
            'Ứng viên đã xem qua',
            'Ứng viên đã lưu lại'
          ],
      // bottom: 0,
      icon: 'rect',
      itemWidth: 70,
      itemHeight: 10,
      itemGap: 70
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter'
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty'
      }
    ],
    xAxis: [
      {
        name: '2023',
        type: 'category',
        boundaryGap: false,
        data: [
          'Tháng 01',
          'Tháng 02',
          'Tháng 03',
          'Tháng 04',
          'Tháng 05', 'Tháng 06', 'Tháng 07',
          'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12',
        ]
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: profileV3.typeRoleDate === 0 ?
          'Việc làm đã ứng tuyển'
          :
          'Ứng viên đã tuyển dụng'
        ,
        type: 'line',
        stack: 'Total',
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(13, 153, 255, 1)'
            },
            {
              offset: 1,
              color: '#FFFFFF'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: profileV3.typeRoleDate === 0 ?
          'Việc làm đã xem qua'
          :
          'Ứng viên đã xem qua',
        type: 'line',
        stack: 'Total',
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(52, 168, 83, 1)'
            },
            {
              offset: 1,
              color: '#FFFFFF'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 182, 191, 234, 190, 330, 110]
      },
      {
        name: profileV3.typeRoleDate === 0 ?
          'Việc làm đã tìm kiếm'
          :
          'Ứng viên đã lưu lại',
        type: 'line',
        stack: 'Total',
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(251, 188, 4, 1)'
            },
            {
              offset: 1,
              color: '#FFFFFF'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 130, 110]
      }
    ],
  };

  option && myChart && myChart.setOption(option);
  (window as any).onresize = function () {
    myChart.resize();
  };
  return (
    <>
      <button onClick={() => login()}>Sign in with Google 🚀</button>;
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <div id="google-login-button"></div>
      <div id="main_echart" style={{
        height: '400px',
        width: '100%'
      }}></div>
    </>
  );
};

export default Login;
