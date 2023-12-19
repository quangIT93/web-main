import * as React from 'react';

// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const CV: React.FC = () => {
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  if (
    profileV3.name !== 'Thái Minh Quang' &&
    !localStorage.getItem('accessToken')
  ) {
    window.open('/', '_parent');
  }
  return (
    <div className="cv-container">
      <Navbar />
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <div>Test web</div>
      <Footer />
    </div>
  );
};

export default CV;
