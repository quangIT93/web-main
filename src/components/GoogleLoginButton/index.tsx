import React, { useEffect } from 'react';

const GoogleLoginButton: React.FC = () => {
  const handleGoogleLoginSuccess = (credential: any) => {
    // Xử lý thành công khi đăng nhập bằng Gmail
    // console.log('Logged in with Google:', credential)
  };

  const handleGoogleLoginFailure = (error: any) => {
    // Xử lý khi đăng nhập bằng Gmail thất bại
    console.error('Google login failed:', error);
  };

  useEffect(() => {
    // Khởi tạo Google Sign-In API
    (window as any).google.accounts.id.initialize({
      client_id: '', // Thay YOUR_CLIENT_ID bằng Client ID của bạn
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
