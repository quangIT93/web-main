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
import { useSearchParams } from 'react-router-dom';

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

  // const [addressIdCookie, setAddressIdCookie] = React.useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);
  // get post by theme id when click theme item

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

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    try {
      setValue(newValue);
      // setIndex(newValue);
      // setOpenBackdrop(!openBackdrop);
      const categoryId = searchParams.get('categories-id');
      if (categoryId) {
        setSearchParams({
          'theme-id': `${newValue}`,
          'categories-id': `${Number(categoryId) === 1 ? 'all' : categoryId}`,
        });
      } else {
        setSearchParams({ 'theme-id': `${newValue}` });
      }

      const result = await postApi.getPostByThemeId(
        newValue,
        19,
        null,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setPostByTheme(result);
        // set backdrop
        // setOpenBackdrop(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handle close backdrop
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };
  const getPostNewestByThemeId = async () => {
    try {
      const themeId = searchParams.get(`theme-id`)
        ? searchParams.get(`theme-id`)
        : listTheme?.data[0].id;

      var result;
      if (themeId) {
        // setOpenBackdrop(true);
        result = await postApi.getPostByThemeId(
          Number(themeId),
          19,
          null,
          languageRedux === 1 ? 'vi' : 'en',
        );
      }

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
    setValue(Number(searchParams.get('theme-id')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, languageRedux]);

  // console.log('value', value);

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
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

                handleChange(event, item.id);
              }}
              style={{
                borderBottom:
                  item.id === value
                    ? '2px solid #0d99ff'
                    : index === 0 && value === 0
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
