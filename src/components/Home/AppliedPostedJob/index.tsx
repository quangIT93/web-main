import React from 'react';
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import { Radio, Tabs } from 'antd';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Skeleton } from 'antd';
// import { AxiosResponse } from 'axios';
// import api
import applitedPostedApi from 'api/apiAppliedPosted';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';

// @ts-ignore
// import { useSearchParams } from 'react-router-dom';

import { Button } from 'antd';
// import { Skeleton } from 'antd';

// import redux
// import { useDispatch } from 'react-redux';

// import { RootState } from '../../../store/reducer';

import {
  AppliedPostedIcon,
  // DoubleArrowIcon,
  LoginArrowIcon,
  Advertisement,
} from '#components/Icons';

import AppliedPostedJobCard from './Components/AppliedPostedJobCard';

import './styles.scss';

import ModalLogin from '../../../components/Home/ModalLogin';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';
import { number } from 'yargs';

// interface ItemTheme {
//   id: number;
//   title: string;
//   img: string;
//   author: string;
// }

const AppliedPostedJob: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [isLogined, setIslogined] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  // const [index, setIndex] = React.useState(0);
  const [appliedPostedJob, setAppliedPostedJob] = React.useState<any>([]);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const dispatch = useDispatch();
  // const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);

  const handleClickItem = (
    event: any,
    id: number,
    type: number,
    total: number,
    api: string,
    query: any,
  ) => {
    const queyObj = query[0];
    let keyOfQuery = Object.keys(queyObj)[0];
    let url =
      api.replace('/api', '') + '?' + keyOfQuery + '=' + queyObj[keyOfQuery];

    localStorage.setItem('hotjobApi', url);
    window.open(
      `/hotjobs?appliedPostedJob-id=${id}&appliedPostedJob-type=${type}&appliedPostedJob-total=${total}`,
      '_parent',
    );
  };

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  const getAppliedPostedJobs = async () => {
    try {
      setloading(true);
      const result = await applitedPostedApi.getAllApplitedPostedApi(
        0,
        languageRedux == 1 ? 'vi' : 'en',
      );
      if (result) {
        localStorage.setItem('numberAppliedPostedJobs', result.data.length);
        setTimeout(() => {
          setloading(false);
        }, 1000);
        setAppliedPostedJob(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAppliedPostedJobs();
    localStorage.getItem('accessToken') && setIslogined(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const slidesPerView = windowWidth <= 576 ? 1 : 'auto';

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const slidesPerView = windowWidth <= 576 ? 1 : 'auto';

  // const getPostNewestByThemeId = async () => {
  //     try {
  //         const themeId = searchParams.get(`theme-id`)
  //             ? searchParams.get(`theme-id`)
  //             : listTheme?.data[0].id;

  //         var result;
  //         if (themeId) {
  //             setOpenBackdrop(true);
  //             result = await postApi.getPostByThemeId(Number(themeId), 19, null);
  //         }

  //         if (result) {
  //             setPostByTheme(result);
  //             setOpenBackdrop(false);
  //         }
  //     } catch (error) {
  //         console.error(error);
  //         setOpenBackdrop(false);
  //     }
  // };
  // React.useEffect(() => {
  //     getPostNewestByThemeId();
  //     setValue(Number(searchParams.get('theme-id')));
  // }, [searchParams.get('theme-id')]);

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '24px',
        flexDirection: 'column',
      }}
      className="applied-posted-jobs-container"
    >
      <Skeleton loading={false} active>
        <div
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}
        >
          <AppliedPostedIcon width={30} height={30} />
          <h2>
            {languageRedux === 1
              ? 'Công việc đã Ứng tuyển/ Đăng tuyển'
              : 'Applied / Posted Job'}
          </h2>
        </div>

        {/* <div
          className="applied-posted-job-not-loging"
          style={{ display: !isLogined ? 'flex' : 'none' }}
        >
          <div className="applied-posted-job-not-loging_left">
            <p>
              {languageRedux == 1
                ? 'Đăng nhập để đăng ký việc làm miễn phí.'
                : 'Sign in to apply for free jobs.'}
            </p>
          </div>
          <div className="applied-posted-job-not-loging_right">
            <Button
              type="primary"
              onClick={() => {
                setOpenModalLogin(true);
              }}
            >
              <LoginArrowIcon />
              {languageRedux == 1 ? home.sign_in : homeEn.sign_in}
            </Button>
          </div>
        </div> */}

        <div
          className="advertisement-job-not-loging"
          style={{ display: !isLogined ? 'flex' : 'none' }}
        >
          {/* <Advertisement /> */}
          {/* <img
            src="../images/absHijob.png"
            alt="Ảnh lỗi"
            className="img-advertisement-job-not-loging"
            // style={{ width: '50%', height: '350px', borderRadius: '20px' }}
          /> */}
          <Advertisement />
          <div className="advertisement-job-not-loging-content">
            <h3>Bạn có phải là nhà tuyển dụng không?</h3>
            <p style={{ marginBottom: '12px' }}>
              Đăng tuyển ngay, bài đăng của bạn sẽ xuất hiện trên đầu trang hoàn
              toàn miễn phí.
            </p>
            <h3>Bạn đang tìm kiếm việc làm?</h3>
            <p>Ở đây chúng tôi có mọi việc làm tại Việt Nam</p>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setOpenModalLogin(true);
            }}
          >
            <LoginArrowIcon />
            {languageRedux == 1 ? home.sign_in : homeEn.sign_in}
          </Button>
        </div>

        <Swiper
          navigation={true}
          // mousewheel={true}
          // slidesPerView={1}
          slidesPerView={slidesPerView}
          spaceBetween={24}
          modules={[Mousewheel, Navigation, Pagination]}
          className="applied-posted-jobs_swiper"
          style={{
            display: isLogined && appliedPostedJob.length > 0 ? 'flex' : 'none',
          }}
        >
          {appliedPostedJob?.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              onClick={(event) => {
                handleClickItem(
                  event,
                  item.id,
                  item.type,
                  item.count,
                  item.api,
                  item.query,
                );
              }}
            >
              <AppliedPostedJobCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Skeleton>

      <Backdrop
        sx={{
          color: '#0d99ff ',
          backgroundColor: 'transparent',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </Box>
  );
};

export default AppliedPostedJob;
