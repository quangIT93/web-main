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
    <div className="mt-20 max-w-full">
      <Navbar />
      <div className="grid grid-flow-col auto-rows-max gap-2">
        <div className="border-sky-500 border">01</div>
        <div className="border-sky-500 border">02</div>
        <div className="border-sky-500 border">03</div>
      </div>
      <Footer />
    </div>
  );
};

export default CV;
