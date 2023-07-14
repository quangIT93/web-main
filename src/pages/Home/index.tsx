import React, { memo } from 'react';
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

import RollTop from '#components/RollTop';

// import ModalLogin from '#components/Home/ModalLogin'
// import { useHomeState } from './HomeState'
import './style.scss';
import Footer from '../../components/Footer/Footer';

import siteApi from 'api/siteApi';

// import context
// import { HomeValueContext } from 'context/HomeValueContextProvider'
// import { HomeContext } from 'context/HomeContextProvider'

// import { IvalueJobChild } from 'context/HomeValueContextProvider'

const Home: React.FC = () => {
  const [titleFirebase, setTitleFirebase] = React.useState<string>('');
  const [site, SetSite] = React.useState<any>(null);

  const getPost = async () => {
    try {
      const result = await siteApi.getSalaryType();
      if (result) {
        SetSite(result);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    getPost();
  }, []);

  React.useEffect(() => {
    if (site?.data) {
      setTitleFirebase('HiJob - Tìm việc làm, tuyển dụng');
    }
  }, [site]);

  React.useEffect(() => {
    document.title = titleFirebase ? titleFirebase : 'web-home';
  }, [titleFirebase]);

  new Promise((resolve, reject) => {
    document.title = site ? titleFirebase : 'web-home';
  });

  return (
    <div className="home">
      <Navbar />

      {/* <Carousel /> */}

      <div className="home__main">
        <CategoryCarousel />
        <Breadcrumbs />

        <NewJobs />
        <ThemesJob />
      </div>
      <RollTop />
      <Footer />
    </div>
  );
};

export default memo(Home);
