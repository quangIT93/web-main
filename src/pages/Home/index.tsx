import React, { memo, useEffect } from 'react';
// @ts-ignore
import { Navbar } from '#components';

// @ts-ignore
import { Breadcrumbs } from '#components';
// @ts-ignore
import { Carousel } from '#components';
// @ts-ignore
import { NewJobs } from '#components';
// @ts-ignore
import { ThemesJob } from '#components';
// @ts-ignore
import { CategoryCarousel } from '#components';

import HotJob from '#components/Home/HotJob';

import RollTop from '#components/RollTop';

// import ModalLogin from '#components/Home/ModalLogin'
// import { useHomeState } from './HomeState'
import './style.scss';
import Footer from '../../components/Footer/Footer';

import { getAnalytics, logEvent } from 'firebase/analytics';

// import context
// import { HomeValueContext } from 'context/HomeValueContextProvider'
// import { HomeContext } from 'context/HomeContextProvider'

// import { IvalueJobChild } from 'context/HomeValueContextProvider'

const Home: React.FC = () => {
  const analytics: any = getAnalytics();

  useEffect(() => {
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: 'HiJob - Tìm việc làm, tuyển dụng',
      // screen_class: 'HomeScreen',
      page_title: '/web_home',
    });
  }, []);

  return (
    <div className="home">
      <Navbar />

      {/* <Carousel /> */}

      <div className="home__main">
        <CategoryCarousel />
        <Breadcrumbs />

        <NewJobs />
        <HotJob />
        <ThemesJob />
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default memo(Home);
