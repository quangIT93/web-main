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

// import ModalLogin from '#components/Home/ModalLogin'
// import { useHomeState } from './HomeState'
import './style.scss';
import Footer from '../../components/Footer/Footer';

// import context
// import { HomeValueContext } from 'context/HomeValueContextProvider'
// import { HomeContext } from 'context/HomeContextProvider'

// import { IvalueJobChild } from 'context/HomeValueContextProvider'

const Home: React.FC = () => {
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
      <Footer />
    </div>
  );
};

export default memo(Home);
