import React from 'react'
import { Link } from 'react-router-dom'
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
  return (
    <nav style={navbarStyle} className="navbar">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="navbar-links">
        <li className="links__item">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="links__item links__item-dropdown">
          <Link to="/">Công việc</Link>
          <span>
            <ArrowdownIcon />
          </span>
        </li>
        <li className="links__item links__item-dropdown">
          <Link to="/">Lịch sử</Link>
          <span>
            <ArrowdownIcon />
          </span>
        </li>
      </ul>
      <div className="navbar__actions">
        <div className="actions-features">
          <div className="actions-features__icon">
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
          <Link to="">
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
              <span>Đăng nhập</span>
            </div>
            <div className="login__icon">
              <ArrowrightIcon />
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
