import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { ChatIcon, PhoneIcon, EmailIcon } from '#components';
import './style.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <span className="footer__title">LIÊN HỆ VỚI CHÚNG TÔI:</span>
      <div className="footer-desktop">
        <button className="footer__btn">
          <Link to="/chat" target="_parent">
            <ChatIcon width={21} height={21} />
            <span>Chat trực tuyến</span>
          </Link>
        </button>
        <button className="footer__btn">
          <Link to="/email">
            <EmailIcon />
            <span>aiworks@support.com</span>
          </Link>
        </button>
        <button className="footer__btn">
          <Link to="/phone">
            <PhoneIcon />
            <span>1900 909090</span>
          </Link>
        </button>
      </div>
      <div className="footer-mobile">
        <button className="footer__btn">
          <Link to="/chat">
            <ChatIcon width={24} height={24} />
          </Link>
        </button>
        <button className="footer__btn">
          <Link to="/email">
            <EmailIcon />
          </Link>
        </button>
        <button className="footer__btn">
          <Link to="/phone">
            <PhoneIcon />
          </Link>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
