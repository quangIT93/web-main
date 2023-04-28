import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import NavLogin from './components/NavLogin'
import NavHistory from './components/NavHistory'
import NavWorks from './components/NavWorks'
import NavbarPost from './components/NavbarPost'

// @ts-ignore
import { Logo, ArrowdownIcon, ArrowrightIcon } from '#components'
// @ts-ignore
import { BellIcon, ChatIcon, SearchIcon, EditIcon } from '#components'
// @ts-ignore
import { AvatarIcon } from '#components'

import './style.scss'

const navbarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const Navbar: React.FC = () => {
  const [hidenNavPost, setHiddenNavPost] = useState('')
  const handleNavPost = () => {
    if (!hidenNavPost) {
      setHiddenNavPost('hidenNavPost')
      document.body.style.overflow = 'hidden'
    } else {
      setHiddenNavPost('')
      document.body.style.overflow = 'scroll'
    }
  }
  return (
    <nav style={navbarStyle} className="navbar">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="navbar-links">
        <li className="links__item links__item__homepage">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="links__item links__item-dropdown links__item__works">
          <Link to="/">Công việc</Link>
          <NavWorks />
          <span>
            <ArrowdownIcon />
          </span>
        </li>
        <li className="links__item links__item-dropdown links__item__history">
          <Link to="/">Lịch sử</Link>
          <NavHistory />
          <span>
            <ArrowdownIcon />
          </span>
        </li>
      </ul>
      <div className="navbar__actions">
        <div className="actions-features">
          <div className="actions-features__icon" onClick={handleNavPost}>
            <SearchIcon width={14} height={14} />
          </div>
          <div className="actions-features__icon">
            <ChatIcon width={16} height={16} />
          </div>
          <div className="actions-features__icon">
            <BellIcon width={14} height={14} />
          </div>
        </div>
        <div className="actions-post">
          <Link to="/post">
            <button className="btn btn__post">
              <EditIcon width={16} height={16} />
              <span>Đăng bài</span>
            </button>
          </Link>
        </div>
        <div className="actions-login">
          <button className="btn btn__login">
            <div>
              <div className="login__avatar">
                <AvatarIcon />
              </div>
              <div className="login__center">
                <span>Đăng nhập</span>
                <span>Chọn khu vực</span>
              </div>
            </div>
            <div className="login__icon">
              <ArrowrightIcon />
            </div>
          </button>
          <NavLogin />
        </div>
      </div>

      <div className={`navbar-post ${hidenNavPost}`}>
        <NavbarPost />
      </div>
    </nav>
  )
}

export default Navbar
