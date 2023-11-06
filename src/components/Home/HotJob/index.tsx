import React from 'react';
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import { Radio, Tabs } from 'antd';
import Box from '@mui/material/Box';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import { AxiosResponse } from 'axios';
// import api
// import postApi from 'api/postApi';
import hotJobApi from 'api/hotJobApi';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import 'swiper/css/pagination';
// import required modules
import { Navigation, Mousewheel, Grid, Pagination } from 'swiper';

// @ts-ignore
// import { useSearchParams } from 'react-router-dom';

// import { Space } from 'antd';

// import redux
// import { useDispatch } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../../store/index';
// import { RootState } from '../../../store/reducer';

import {
  FireIcon,
  BagIcon,
  IconBriefCase,
  ArrowrightIcon,
} from '#components/Icons';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// import { dataImageHotJob } from './dataImagehotJob';

import './style.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
// import { home } from 'validations/lang/vi/home';
// import { homeEn } from 'validations/lang/en/home';

import { setCookie } from 'cookies';
import { Skeleton } from 'antd';

// interface ItemTheme {
//   id: number;
//   title: string;
//   img: string;
//   author: string;
// }

const HotJob: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [hotjob, setHotJob] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<any>(false);

  // const dispatch = useDispatch();
  // const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

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

    console.log('query', query);
    console.log('keyOfQuery', keyOfQuery);
    console.log('api', api);
    console.log('total', total);
    console.log('type', type);
    console.log('id', id);
    setCookie('hotjobTotal', JSON.stringify(total), 365);
    localStorage.setItem('hotjobApi', url);
    window.open(`/hotjobs?hotjob-id=${id}&hotjob-type=${type}`, '_self');
  };

  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };

  const getHotJob = async () => {
    try {
      setLoading(true);
      const result = await hotJobApi.getHotJobTheme(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setHotJob(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getHotJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

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

  const handleMoveToMoreJob = () => {
    localStorage.setItem('job-type', 'hot-job');
    window.open('/more-jobs', '_parent');
  };

  const handleMoveToHotJobPage = (item: any, event: any) => {
    const analytics: any = getAnalytics();

    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: `/web_click_hotJob_${item.title}` as string,
    });

    logEvent(analytics, 'event_web_click_HiJob' as string, {
      // screen_name: screenName as string,
      web_page_home: `/hotJob_${item?.title}` as string,
    });

    handleClickItem(
      event,
      item.id,
      item.themeId,
      item.count,
      item.api,
      item.query,
    );
  };
  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '28px',
      }}
      className="hot-job-container"
      id="hot-job-container"
    >
      <div className="title-container">
        <div className="title">
          <FireIcon width={25} height={25} />
          <h2>{languageRedux === 1 ? 'Công việc nổi bật' : 'Hot Jobs'}</h2>
        </div>
        {/* <div className="view-all" onClick={handleMoveToMoreJob}>
          <p>{language?.home_page?.view_all}</p>
          <ArrowrightIcon width={20} height={20} />
        </div> */}
      </div>
      <Skeleton loading={loading} active>
        <div className="hotjob-content">
          {hotjob &&
            hotjob.map((item: any, index: number) => {
              return (
                <div
                  className="slide-hotjob-item"
                  key={index}
                  onClick={(event) => {
                    const analytics: any = getAnalytics();

                    logEvent(analytics, 'screen_view' as string, {
                      // screen_name: screenName as string,
                      page_title: `/web_click_hotJob_${item.title}` as string,
                    });

                    logEvent(analytics, 'event_web_click_HiJob' as string, {
                      // screen_name: screenName as string,
                      web_page_home: `/hotJob_${item?.title}` as string,
                    });
                    handleClickItem(
                      event,
                      item.id,
                      item.themeId,
                      item.count,
                      item.api,
                      item.query,
                    );
                  }}
                >
                  <div className="div-img-themes-item">
                    <img src={item?.image} alt={language?.err_none_img} />
                  </div>
                  <div className="div-info-themes-item">
                    <div className="div-info-themes-item_top">
                      <h5>{item?.title}</h5>
                    </div>
                    <div className="div-info-themes-item_bot">
                      <IconBriefCase />
                      <h6>{item?.count}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="view-all-down" onClick={handleMoveToMoreJob}
          style={{
            display: !hotjob || hotjob.length === 0 ? 'none' : 'flex'
          }}
        >
          <p>{language?.home_page?.view_all}</p>
          <ArrowrightIcon width={20} height={20} />
        </div>
      </Skeleton>

      {/* <Swiper
        navigation={true}
        // mousewheel={true}
        slidesPerView={5}
        spaceBetween={24}
        grid={{
          rows: 2,
        }}
        modules={[Mousewheel, Grid, Navigation, Pagination]}
        className="hotjob-content-responsive"
      >
        {new Array(10).fill(undefined).map((item: any, index: number) => {
          // console.log("id: ", item.id);
          return (
            <SwiperSlide
              key={index}
              onClick={(event) => {
                const analytics: any = getAnalytics();

                // logEvent(analytics, 'screen_view' as string, {
                //   // screen_name: screenName as string,
                //   page_title: `/web_click_hotJob_${item.title}` as string,
                // });

                logEvent(analytics, 'event_web_click_HiJob' as string, {
                  // screen_name: screenName as string,
                  web_page_home: `/hotJob_${item?.title}` as string,
                });
                // handleClickItem(
                //   event,
                //   item.id,
                //   item.type,
                //   item.count,
                //   item.api,
                //   item.query,
                // );
              }}
            >
              <div className="slide-item">
                <img
                  src={item?.image}
                  alt={language?.err_none_img}
                  style={{
                    // width: '160px',
                    // height: '160px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                  }}
                />
                <div className="div-info-themes-item">
                  <div className="div-info-themes-item_left">
                    <h5>{item?.title}</h5>
                  </div>
                  <div className="div-info-themes-item_right">
                    <BagIcon />
                    <h6>{`${index}`}</h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
      {/* <Backdrop
        sx={{
          color: '#0d99ff ',
          backgroundColor: 'transparent',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Box>
  );
};

export default HotJob;
