import React from 'react';
// @ts-ignore
import { Navbar } from '#components';
import Footer from '#components/Footer/Footer';
import './style.scss';

const NotFound: React.FC = () => {
  window.open(`/`, '_parent');

  return (
    <div className="not-found">
      <Navbar />
      <div className="notFound-page">
        {/* <strong>NotFound</strong> */}
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
