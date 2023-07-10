import React from 'react';
import { Link } from 'react-router-dom';

import '../navBar/style.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navibar">
      <a href="#" className="logoTitle">
        neoworks
      </a>

      <div className="div-space"></div>
      <ul className="navbar-links">
        <li className="links__item">
          <Link to="/home">Trang chủ</Link>
        </li>
        <li className="links__item links">
          <a href="#us">Về chúng tôi</a>
        </li>
        <li className="links__item links">
          <a href="#career"> Neoworks Career </a>
        </li>
      </ul>

      {/* <div className="navbar__actions">
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
      </div> */}
    </nav>
  );
};

export default Navbar;
