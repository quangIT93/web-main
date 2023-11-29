import CategoryDropdown from '#components/CategoryDropdown';
// import Footer from '#components/Footer/Footer';

import Navbar from '#components/Navbar';
import React from 'react';
import './style.scss';
import RollTop from '#components/RollTop';
import Footer from '#components/Footer/Footer';
import { useGoogleOneTapLogin } from '@react-oauth/google';
interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <CategoryDropdown />
      <div className="childrenContainer">{children}</div>
      <RollTop />
      <Footer />
    </>
  );
};

export default MainLayout;
