import React from 'react';
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
import { Radio, Tabs } from 'antd';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosResponse } from 'axios';
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
import { useSearchParams } from 'react-router-dom';

import { Button, Space } from 'antd';
import { Skeleton } from 'antd';

// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';

import { AppliedPostedIcon } from '#components/Icons';

import AppliedPostedJobCard from './Components/AppliedPostedJobCard';

import './styles.scss';

interface ItemTheme {
  id: number;
  title: string;
  img: string;
  author: string;
}

const AppliedPostedJob: React.FC = () => {
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [isLogined, setIslogined] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [appliedPostedJob, setAppliedPostedJob] = React.useState<any>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);

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
    );
  };

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  const getAppliedPostedJobs = async () => {
    try {
      setloading(true);
      const result = await applitedPostedApi.getAllApplitedPostedApi(0);
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
  }, []);

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

  console.log(appliedPostedJob);

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '24px',
        display: isLogined && appliedPostedJob.length > 0 ? 'flex' : 'none',
        flexDirection: 'column',
      }}
      className="applied-posted-jobs-container"
    >
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <AppliedPostedIcon width={30} height={30} />
        <h2>Công việc đã Ứng tuyển/ Đăng tuyển</h2>
      </div>

      <Swiper
        navigation={true}
        // mousewheel={true}
        slidesPerView="auto"
        spaceBetween={24}
        modules={[Mousewheel, Navigation, Pagination]}
        className="applied-posted-jobs_swiper"
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
    </Box>
  );
};

export default AppliedPostedJob;
