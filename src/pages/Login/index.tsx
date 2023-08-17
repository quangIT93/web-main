// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { login } from 'store/actions/auth'

// // Interface mô tả dữ liệu đăng nhập
// interface LoginData {
//   email: string
// }

// const LoginPage: React.FC = () => {
//   const dispatch = useDispatch()
//   const [loginData, setLoginData] = useState<LoginData>({
//     email: '',
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setLoginData((prevData) => ({ ...prevData, [name]: value }))
//   }

//   const handleLogin = () => {
//     // Thực hiện xử lý đăng nhập, ví dụ: gửi dữ liệu đăng nhập đến server
//     console.log(loginData)
//     // dispatch(login(loginData))
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={loginData.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={loginData.otp}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="button" onClick={handleLogin}>
//           Login
//         </button>
//       </form>
//     </div>
//   )
// }

// export default LoginPage

import React from 'react';

import signInEmailApi from 'api/authApi';

declare global {
  interface Window {
    google: any;
    gapi: any; // Thay 'any' bằng kiểu dữ liệu chính xác nếu có thể
  }
}

declare global {
  interface Window {}
}

const Login = () => {
  const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_ID
    ? process.env.REACT_APP_GOOGLE_CLIENT_ID
    : '';

  const handleClickLogin = async () => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id:
        '436273589347-ot9ec9jhm235q3irsvjpnltr8hsun5cp.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      callback: async (response: any) => {
        console.log('response: ' + response.access_token);
        console.log('tokenID: ' + response.tokenID);
        console.log(JSON.stringify(response, null, 2));
        try {
          if (response.access_token) {
            const result = await signInEmailApi.signInGoogle(
              response.access_token,
            );

            if (result) {
              console.log('Result: ' + result);
            }
          }
        } catch (error) {
          console.log('error: ', error);
        }
      },
    });
    client.requestAccessToken();
  };

  return (
    <div>
      <div id="button" onClick={handleClickLogin}>
        Đăng nhập
      </div>
    </div>
  );
};

export default Login;
