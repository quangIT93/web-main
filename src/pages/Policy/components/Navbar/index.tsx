import React from 'react';
import './style.scss';
// @ts-ignore
import { Logo } from '#components';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Logo />
      <div className="navbar__bar-decoration"></div>
      <span className="navbar__quote">ĐIỀU KHOẢN & DỊCH VỤ</span>
    </nav>
  );
};

export default Navbar;
