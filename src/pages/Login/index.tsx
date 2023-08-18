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

  const handleCredentialResponse = async (response: any) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    try {
      const result = await signInEmailApi.signInGoogle(response.credential);
      if (result) {
        console.log(result);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };
  React.useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: googleClient,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(document.getElementById('button'), {
      theme: 'outline',
      size: 'large',
    });
    window.google.accounts.id.prompt();
  }, []);
  React.useEffect(() => {
    console.log('Login');
  }, []);

  return (
    <div>
      <div id="button">Đăng nhập</div>
    </div>
  );
};

export default Login;
