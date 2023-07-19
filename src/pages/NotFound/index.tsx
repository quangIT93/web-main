import React from 'react';
// @ts-ignore
import { Navbar } from '#components';

import './style.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <Navbar />
      <div className="notFound-page">
        <strong>NotFound</strong>
      </div>
    </div>
  );
};

export default NotFound;
