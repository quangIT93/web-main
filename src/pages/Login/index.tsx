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

import React from 'react'

const Login = () => {
  return <div>Login</div>
}

export default Login
