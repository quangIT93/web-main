import React, { memo, useEffect } from 'react';
// @ts-ignore
import { Navbar } from '#components';

// @ts-ignore
import { Breadcrumbs } from '#components';
// @ts-ignore
// import { Carousel } from '#components';
// @ts-ignore
import AppliedPostedJob from '#components/Home/AppliedPostedJob';
// @ts-ignore
import { NewJobs } from '#components';
// @ts-ignore
import { ThemesJob } from '#components';
// @ts-ignore
import { CategoryCarousel } from '#components';
// @ts-ignore
import { SuggestJob } from '#components';

import HotJob from '#components/Home/HotJob';

import RollTop from '#components/RollTop';

import Box from '@mui/material/Box';

// import ModalLogin from '#components/Home/ModalLogin'
// import { useHomeState } from './HomeState'
import './style.scss';

import { getAnalytics, logEvent } from 'firebase/analytics';

// import context
// import { HomeValueContext } from 'context/HomeValueContextProvider'
// import { HomeContext } from 'context/HomeContextProvider'

// import { IvalueJobChild } from 'context/HomeValueContextProvider'

// component
import Community from '#components/Home/Community';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import languageApi from 'api/languageApi';

const Home: React.FC = () => {
  const analytics: any = getAnalytics();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [language, setLanguage] = React.useState<any>();
  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setLanguage(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi();
  }, [languageRedux]);

  useEffect(() => {
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: 'HiJob - Tìm việc làm, tuyển dụng',
      // screen_class: 'HomeScreen',
      page_title: '/web_home',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    document.title =
      languageRedux === 1
        ? 'HiJob - Tìm việc làm, tuyển dụng'
        : 'HiJob - Find a job, recruit';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_hotJob' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);
  const [reachedEndShowSubjectJob, setReachedEndShowSubjectJob] =
    React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setReachedEndShowSubjectJob(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const communityDiv = localStorage.getItem('community');

    if (communityDiv) {
      setReachedEndShowSubjectJob(true);
      document.querySelector('.community-container')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
    localStorage.removeItem('community');
  }, []);

  return (
    <div className="home">
      <Navbar />

      {/* <Carousel /> */}
      <h1 style={{ visibility: 'hidden', display: 'none' }}>
        Trang tìm việc làm chất lượng nhất, 10,000 công việc tại Việt Nam được
        cập nhật mỗi ngày - Tìm việc làm nhanh chóng trên toàn quốc, tiện lợi –
        Đa dạng ngành nghề, mức lương hấp dẫn
      </h1>
      <div className="home__main">
        <Box
          sx={{
            marginTop: '15rem',
          }}
        ></Box>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8881781217169539"
          crossOrigin="anonymous"
        ></script>
        <CategoryCarousel />
        <Breadcrumbs />
        <AppliedPostedJob />
        <HotJob />
        <NewJobs />
        {reachedEndShowSubjectJob ? (
          <>
            <SuggestJob />
            <ThemesJob />
            <Community />
          </>
        ) : (
          <></>
        )}
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default memo(Home);
