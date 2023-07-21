import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Logo: React.FC = () => {
  return (
    <Link to="/" reloadDocument>
      <div className="logo">
        <img src="/logo-hijob.png" width={40} height={40} />
      </div>
    </Link>
  );
};

export default Logo;
