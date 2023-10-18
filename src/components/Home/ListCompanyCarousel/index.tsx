import React from 'react';
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'

import Box from '@mui/material/Box';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { AxiosResponse } from 'axios';
// import api
import postApi from 'api/postApi';

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
import { useLocation, useSearchParams } from 'react-router-dom';

import { Space } from 'antd';

// import redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
// import { RootState } from '../../../store/reducer';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

import './style.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { setPalceId } from 'store/reducer/placeIdReducer';
import { getCookie, setCookie } from 'cookies';

interface ItemTheme {
  id: number;
  title: string;
  image: string;
  number_of_posts: number;
}

interface PropsThemesType {
  setThemeId?: (value: number) => void;
  listTheme: AxiosResponse | null;
}
const ListCompanyCarousel: React.FC<PropsThemesType> = ({ listTheme }) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [value, setValue] = React.useState<Number>(0);
  // const [openBackdrop, setOpenBackdrop] = React.useState(false);
  // const [index, setIndex] = React.useState(0);
  const placeIdRedux = useSelector((state: RootState) => state.placeIdReducer.placeId)
  // const [addressIdCookie, setAddressIdCookie] = React.useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);
  // get post by theme id when click theme item
  const [placeIdCookie, setPlaceIdCookie] = React.useState(0);
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  // Set the cookie
  // function setCookie(name: string, value: string, days: number) {
  //   let expires = '';
  //   if (days) {
  //     let date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     expires = '; expires=' + date.toUTCString();
  //   }
  //   document.cookie = name + '=' + (value || '') + expires + '; path=/';
  // }

  // Get the cookie
  // function getCookie(name: string): string | null {
  //   let nameEQ = name + '=';
  //   let ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1, c.length);
  //     }
  //     if (c.indexOf(nameEQ) === 0) {
  //       return c.substring(nameEQ.length, c.length);
  //     }
  //   }
  //   return null;
  // }
  const location = useLocation()
  React.useEffect(() => {
    // Retrieve the user's settings from cookies
    let storedSettings = JSON.parse(
      getCookie('hotPlaceId') || '{}',
    )
    setSelectedItemIndex(storedSettings.id);
    setPlaceIdCookie(storedSettings.placeId);
    if (storedSettings.userSelectedId !== 1) {
      const slide = document.querySelector('.swiper-slide');
      slide?.classList.remove('swiper-slide-clicked');
    }
  }, [value]);


  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    try {
      setValue(newValue);
      // setIndex(newValue);
      // setOpenBackdrop(!openBackdrop);
      const categoryId = searchParams.get('categories-id');
      // if (categoryId) {
      //   setSearchParams({
      //     'theme-id': `${newValue}`,
      //     'categories-id': `${Number(categoryId) === 1 ? 'all' : categoryId}`,
      //   });
      // } else {
      //   setSearchParams({ 'theme-id': `${newValue}` });
      // }

      // if (location.pathname === '/') {
      //   const result = await postApi.getPostByThemeId(
      //     newValue,
      //     9,
      //     0,
      //     languageRedux === 1 ? 'vi' : 'en',
      //   );
      //   if (result) {
      //     setPostByTheme(result);
      //     // set backdrop
      //     // setOpenBackdrop(false);
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };
  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };
  const getPostNewestByThemeId = async () => {
    let storedSettings = JSON.parse(
      getCookie('hotPlaceId') || '{}',
    )
    try {
      // const themeId = searchParams.get(`theme-id`)
      //   ? searchParams.get(`theme-id`)
      //   : listTheme?.data[0]?.id;

      // var result;
      // if (themeId) {
      // setOpenBackdrop(true);
      const result = await postApi.getPostByThemeId(
        storedSettings?.placeId ? storedSettings?.placeId : listTheme?.data[0]?.id,
        9,
        0,
        languageRedux === 1 ? 'vi' : 'en',
      );
      // }

      if (result) {
        setPostByTheme(result);
        // setOpenBackdrop(false);
      }
    } catch (error) {
      console.error(error);
      // setOpenBackdrop(false);
    }
  };
  React.useEffect(() => {
    getPostNewestByThemeId();
    // setValue(Number(searchParams.get('theme-id')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, value]);

  // console.log('value', value);
  // console.log('listTheme', listTheme);
  console.log('selectedItemIndex', selectedItemIndex);

  return (
    <Box
      sx={{
        // maxWidth: { xs: 320, sm: 480 },
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '16px',
      }}
      className="hot-place-container"
    >
      {/* <Tabs
        value={value === 0 ? listTheme?.data[0].id : value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="secondary"
        aria-label="simple tabs example"
        className="tabThemeJob"
      >
        {listTheme?.data.map((item: ItemTheme, index: number) => (
          <Tab
            key={index}
            value={item.id}
            label={
              <div style={{}}>
                <img
                  src={item.image}
                  alt="amhr bị lỗi"
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
                <div className="div-info-themes-item">
                  <Space size={3} direction={'vertical'} style={{ width: 150 }}>
                    <h5>{item.title}</h5>
                    <h6>{`${item.number_of_posts} việc làm`}</h6>
                  </Space>
                </div>
              </div>
            }
          />
        ))}
      </Tabs> */}

      <Swiper
        navigation={true}
        // mousewheel={true}
        spaceBetween={24}
        slidesPerView="auto"
        // initialSlide={selectedItemIndex}
        initialSlide={
          JSON.parse(
            getCookie('hotPlaceId') || '{}',
          ).id ?
            JSON.parse(
              getCookie('hotPlaceId') || '{}',
            ).id - 1 : 0
        }
        // breakpoints={{
        //   320: {
        //     slidesPerView: 3,
        //     spaceBetween: 24
        //   },
        //   640: {
        //     slidesPerView: 5,
        //     spaceBetween: 24
        //   },
        //   768: {
        //     slidesPerView: 4,
        //     spaceBetween: 24
        //   },
        //   769: {
        //     slidesPerView: 5,
        //     spaceBetween: 24
        //   },
        //   1025: {
        //     slidesPerView: 6,
        //     spaceBetween: 24
        //   },
        //   1723: {
        //     slidesPerView: 8,
        //     spaceBetween: 24
        //   },
        //   2560: {
        //     slidesPerView: 10,
        //     spaceBetween: 24
        //   }
        // }}
        modules={[Mousewheel, Navigation, Pagination]}
        className="mySwiper"
      >
        {listTheme?.data.map((item: ItemTheme, index: number) => {
          return (
            <SwiperSlide
              key={index}
              onClick={(event) => {
                const analytics: any = getAnalytics();

                // logEvent(analytics, 'screen_view' as string, {
                //   // screen_name: screenName as string,
                //   page_title: `/web_click_place_category` as string,
                // });
                // console.log('item', item);

                logEvent(analytics, 'event_web_click_HiJob' as string, {
                  // screen_name: screenName as string,
                  web_page_home: `/place_category_${item.title}` as string,
                });
                console.log('item', item);

                dispatch<any>(setPalceId(item.id));
                setCookie('hotPlaceId', JSON.stringify({
                  id: index,
                  placeId: item.id,
                }), 365)

                // localStorage.setItem(
                //   'job_by_place',
                //   `place--${item.id}--${item.number_of_posts}--${item.title}--${item.image}`,
                // );

                handleChange(event, item.id);
              }}
              style={{
                borderBottom:
                  item.id === placeIdCookie
                    ? '2px solid #0d99ff'
                    : index === 0 && placeIdCookie === undefined
                      ? '2px solid #0d99ff'
                      : '',
              }}
            >
              <div className="slide-item">
                <img
                  src={item.image}
                  alt={language?.err_none_img}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
                <div className="div-info-themes-item">
                  <Space size={3} direction={'vertical'} style={{ width: 150 }}>
                    <h5>{item.title}</h5>
                    <h6>
                      {/* {languageRedux === 1
                        ? `${item.number_of_posts} việc làm`
                        : `${item.number_of_posts} jobs`} */}
                      {`${item.number_of_posts} `}
                      {language?.home_page?.x_jobs}
                    </h6>
                  </Space>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
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

export default ListCompanyCarousel;
