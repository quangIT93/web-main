import React, { memo, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

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

// @ts-ignore
import { NewestGigWorker } from '#components';

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

import { RootState } from '../../store/reducer';
import { setCookie } from 'cookies';
import ModalSelectRole from '#components/Home/ModalSelectRole';
import ModalUpdateInfo from '#components/Home/ModalUpdateInfo';
import { setIsNew } from 'store/reducer/isNewReducer';
import CategoryDropdown from '#components/CategoryDropdown';

const Home: React.FC = () => {
  const analytics: any = getAnalytics();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [openModalSelectRole, setOpenModalSelectRole] = React.useState(
    // roleRedux >= 0 ? false : true,
    false,
  );
  const [openModalUpdateInfo, setOpenModalUpdateInfo] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (profileV3 && profileV3.typeRoleData === null) {
      // dispatch<any>(setIsNew(false));
      setOpenModalSelectRole(true);
      // localStorage.setItem('isNew', 'false');
    }
    // else if (!newUser && roleRedux === 0) {
    //   setOpenModalSelectRole(false);
    //   dispatch<any>(setIsNew(false));
    // } else if (!newUser && roleRedux === 1) {
    //   setOpenModalSelectRole(false);
    //   dispatch<any>(setIsNew(false));
    // }
    // else {
    //   dispatch<any>(setIsNew(false));
    //   setOpenModalSelectRole(false);
    // }
  }, [profileV3]);

  // console.log('openModalSelectRole', openModalSelectRole);

  // const [role, setRole] = React.useState<any>()
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
  // const [reachedEndShowSubjectJob, setReachedEndShowSubjectJob] =
  //   React.useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       setReachedEndShowSubjectJob(true);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const handleScrollIntoViewDiv = (id: string) => {
    setTimeout(() => {
      const div = document.getElementById(id);
      let newJobOffsetTop = 0;
      if (div) {
        newJobOffsetTop = document.getElementById(id) ? div.offsetTop : 0;
        window.scrollTo(0, newJobOffsetTop - 140);
      }
    }, 1800);
  };

  useEffect(() => {
    const communityDiv = localStorage.getItem('community');
    const newJob = localStorage.getItem('home');

    switch (newJob) {
      case 'new':
        handleScrollIntoViewDiv('new-job');
        break;
      case 'hot':
        handleScrollIntoViewDiv('hot-job-container');
        break;
      case 'place':
        handleScrollIntoViewDiv('job-by-hot-place');
        break;
      case 'suggested':
        handleScrollIntoViewDiv('box-suggestedJob');
        break;

      default:
        break;
    }

    if (communityDiv) {
      // setReachedEndShowSubjectJob(true);
      document.querySelector('.community-container')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
    localStorage.removeItem('community');
    localStorage.removeItem('home');
    setCookie('workingId', '0', 1);
    setCookie('hijobId', '0', 1);
    // document.cookie = `hijobId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // document.cookie = `workingId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // window.scrollTo(0, 0);
  }, []);

  // Lưu vị trí cuộn trước đó
  // let lastScrollTop = 0;

  // var prevHeight = 300;
  // const handleScroll = () => {
  //   const tabs = document.querySelector('.tabs') as HTMLElement;

  //   const breadCrumb = document.querySelector(
  //     '.bread-crumb-container',
  //   ) as HTMLElement;
  //   var currentHeight = window.scrollY;
  //   // console.log('prevHeight=', prevHeight);
  //   // console.log('currentHeight=', currentHeight);

  //   // Lấy vị trí cuộn hiện tại

  //   if (
  //     currentHeight >= prevHeight &&
  //     currentHeight > 100 &&
  //     tabs !== null &&
  //     breadCrumb !== null
  //   ) {
  //     tabs.style.top = '-70px';
  //     breadCrumb.style.marginTop = '-192px';
  //     // setTimeout(() => {
  //     //   currentHeight = 0;
  //     //   tabs.style.top = '70px';
  //     //   breadCrumb.style.marginTop = '192px';
  //     // }, 500);
  //   } else if (currentHeight === 0) {
  //     tabs.style.top = '70px';
  //     breadCrumb.style.marginTop = '192px';
  //   } else {
  //     if (tabs !== null && breadCrumb !== null) {
  //       tabs.style.top = '70px';
  //       breadCrumb.style.marginTop = '192px';
  //     }
  //   }
  //   prevHeight = currentHeight;
  // };

  // window.addEventListener('scroll', handleScroll);

  return (
    <div className="home">
      <Navbar />
      <CategoryDropdown />
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8881781217169539"
        crossOrigin="anonymous"
      ></script> */}
      {/* <Carousel /> */}
      <h1 style={{ visibility: 'hidden', display: 'none' }}>
        Trang tìm việc làm chất lượng nhất, 10,000 công việc tại Việt Nam được
        cập nhật mỗi ngày - Tìm việc làm nhanh chóng trên toàn quốc, tiện lợi –
        Đa dạng ngành nghề, mức lương hấp dẫn
      </h1>
      <div className="home__main">
        {/* <CategoryCarousel />
        <Breadcrumbs /> */}
        <AppliedPostedJob />
        <HotJob />
        <NewJobs />
        <NewestGigWorker />
        <SuggestJob />
        <ThemesJob />
        <Community />
        {/* {reachedEndShowSubjectJob ? (
          <>
          </>
        ) : (
          <></>
        )} */}
      </div>
      <ModalSelectRole
        openModalSelectRole={openModalSelectRole}
        setOpenModalSelectRole={setOpenModalSelectRole}
        setOpenModalUpdateInfo={setOpenModalUpdateInfo}
      // setRole={setRole}
      />
      <ModalUpdateInfo
        openModalUpdateInfo={openModalUpdateInfo}
        setOpenModalUpdateInfo={setOpenModalUpdateInfo}
      // role={role}
      />
      <RollTop />
      <Footer />
    </div>
  );
};

export default memo(Home);
