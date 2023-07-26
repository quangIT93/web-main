import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Logo: React.FC = () => {
  return (
    <Link to="/" reloadDocument>
      <div className="logo">
        <img src="/OfficialLogo_beta-01.png" width={50} height={50} />
      </div>
    </Link>
  );
};

export default Logo;
