import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className="logo">
        <img src="/images/logo.png" />
        <div className="logo__quote">
          <h2>Kết nối tài năng</h2>
          <p>Đưa tài năng của bạn đến với doanh nghiệp</p>
        </div>
      </div>
    </Link>
  )
}

export default Logo
