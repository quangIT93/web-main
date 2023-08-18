// import React, { useState, useEffect } from 'react';
// // import { Spinner } from "react-bootstrap";
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// import './login.scss';

// const Login = () => {
//   const dispatch = useDispatch();

//   const [spin, setSpin] = useState(false);
//   const [err, setErr] = useState(false);
//   const [success, setSuccess] = useState(false);

//   function handleCredentialResponse(response: any) {
//     console.log('Encoded JWT ID token: ' + response.credential);
//   }
//   useEffect(() => {
//     /* global google */
//     window.google.accounts.id.initialize({
//       client_id:
//         '1052278186382-vh3u5k4l30rci9toilu8tp5gi4e9ej77.apps.googleusercontent.com',
//       callback: handleCredentialResponse,
//     });
//     window.google.accounts.id.renderButton(
//       document.getElementById('google-login'),
//       {
//         theme: 'outline',
//         size: 'large',
//       },
//     );
//     window.google.accounts.id.prompt();
//   }, []);
//   React.useEffect(() => {
//     console.log('Login');
//   }, []);

//   // Facebook login function
//   function checkLoginState() {
//     window.FB.getLoginStatus(function (response) {
//       statusChangeCallback(response);
//     });
//   }

//   function statusChangeCallback(response) {
//     // Called with the results from FB.getLoginStatus().
//     console.log('statusChangeCallback');
//     console.log(response); // The current login status of the person.
//     if (response.status === 'connected') {
//       // Logged into your webpage and Facebook.
//       console.log('Logged in (from statusChangeCallback)');
//     } else {
//       // Not logged into your webpage or we are unable to tell.
//       document.getElementById('status').innerHTML =
//         'Please log ' + 'into this webpage.';
//     }
//   }

//   window.fbAsyncInit = function () {
//     window.FB.init({
//       appId: '714866233454451',
//       cookie: true,
//       xfbml: true,
//       version: 'v16.0',
//     });
//     // FB.AppEvents.logPageView();

//     window.FB.getLoginStatus(function (response) {
//       statusChangeCallback(response);
//     });
//   };

//   (function (d, s, id) {
//     var js,
//       fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {
//       return;
//     }
//     js = d.createElement(s);
//     js.id = id;
//     js.src = 'https://connect.facebook.net/en_US/sdk.js';
//     fjs.parentNode.insertBefore(js, fjs);
//   })(document, 'script', 'facebook-jssdk');

//   return (
//     <>
//       <div className="article__left">
//         <Phone />
//       </div>
//       <div className="article__right">
//         <div>
//           <div className="form">
//             <Logo className="logo-login" />
//             <form className="form__input">
//               <Input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 className="my-input"
//                 id="username"
//               />
//               <Input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className="my-input"
//                 id="password"
//               />
//               <button
//                 id="login-btn"
//                 className={`button my-button`}
//                 onClick={onClick}
//                 type="button"
//                 disabled={false}
//               >
//                 {spin && (
//                   <Spinner
//                     style={{ marginRight: '10px' }}
//                     variant="secondary"
//                     animation="border"
//                     as="span"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                   />
//                 )}

//                 <span>Login</span>
//               </button>
//             </form>

//             <div
//               className="fb-login-button"
//               data-width=""
//               data-size="large"
//               data-button-type="login_with"
//               data-layout="default"
//               data-auto-logout-link="false"
//               data-use-continue-as="false"
//             ></div>

//             <button id="google-login">
//               <div
//                 id="g_id_onload"
//                 data-client_id="1052278186382-vh3u5k4l30rci9toilu8tp5gi4e9ej77.apps.googleusercontent.com"
//                 data-context="signin"
//                 data-ux_mode="popup"
//                 data-login_uri="http://10.42.0.27:5500/api/google/accounts/login"
//                 data-auto_prompt="false"
//               ></div>

//               <div
//                 className="g_id_signin"
//                 data-type="standard"
//                 data-shape="rectangular"
//                 data-theme="outline"
//                 data-text="signin_with"
//                 data-size="large"
//                 data-logo_alignment="left"
//               ></div>
//             </button>

//             {err && (
//               <div className="err">
//                 <span>{err}</span>
//               </div>
//             )}
//             {success && (
//               <div className="success">
//                 <span>Login success</span>
//               </div>
//             )}
//             <a className="forgot-password" href="/accounts/password/reset">
//               <span>Forgot password?</span>
//             </a>
//           </div>
//         </div>
//         <div className="form__footer">
//           <div className="">
//             <span>Don't have an account?</span>
//             <Link to="/accounts/register">Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React from 'react';

const index = () => {
  return <div>index</div>;
};

export default index;
