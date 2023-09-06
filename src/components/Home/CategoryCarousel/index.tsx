import React, { useContext, memo, useEffect } from 'react';

import Box from '@mui/material/Box';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';

import './style.scss';
import './components/categoryItem.scss';

// import { categories } from './dataCategory'
import { AxiosResponse } from 'axios';

// import api
import postApi from 'api/postApi';
import categoriesApi from '../../../api/categoriesApi';

// @ts-ignore
import { useSearchParams } from 'react-router-dom';

// import redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';

// import { setPostNewestApi } from 'store/reducer/postReducerV3/newWestReducer';
// import { setPostNewest } from 'store/actions';
// import { RootState } from '../../../store/reducer';

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { IvalueJobChild } from 'context/HomeValueContextProvider';

// import CategoryItem from './components/CategoryItem';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';

import { Skeleton } from 'antd';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import { RootState } from '../../../store/reducer';
// import { homeEn } from 'validations/lang/en/home';
// import { home } from 'validations/lang/vi/home';
import languageApi from 'api/languageApi';
import { setPostNewestApiV3 } from 'store/reducer/postReducerV3/newWestReducer';
import { getCookie } from 'cookies';

type DivRef = React.RefObject<HTMLUListElement> | null;

// interface item category
interface CategoryItem {
  id: number;
  name: string;
  default_post_image: string;
  image: string;
}

interface UserSelected {
  userSelectedId: any;
}

const CategoryCarousel: React.FC = () => {
  // Contexts
  const {
    setChildCateloriesArray,
    // childCateloriesArray,
    // valueJobChild,
    setValueJobChild,
    // setRefCatelories,
    setRefCatelory,
    navTouchCatelory,
  }: // openCollapseFilter,
  {
    setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>;
    childCateloriesArray: number[];
    valueJobChild: IvalueJobChild;
    setValueJobChild: React.Dispatch<React.SetStateAction<IvalueJobChild>>;
    setRefCatelories: React.Dispatch<React.SetStateAction<number>>;
    setRefCatelory: React.Dispatch<React.SetStateAction<DivRef>>;
    navTouchCatelory: boolean;
    openCollapseFilter: boolean;
  } = useContext(HomeValueContext);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [value, setValue] = React.useState(0);
  const [categoryIdCookie, setCategorieIdCookie] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  // const positionRef = React.useRef(0)

  // const {height} = height

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { setPostNewest } = bindActionCreators(actionCreators, dispatch);

  const listRef = React.useRef<HTMLUListElement | null>(null);
  // const refTab = React.useRef<HTMLUListElement | null>(null);

  const [categories, setCategories] = React.useState<AxiosResponse | null>(
    null,
  );

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  // Set the cookie
  function setCookie(name: string, value: string, days: number) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie =
      name + '=' + (value || '') + expires + '; path=/; SameSite=None; Secure';
  }

  // Get the cookie
  function ư(name: string): string | null {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  const handleChange = async (event: React.SyntheticEvent, newValue: any) => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const tabs = document.querySelector('.tabs') as HTMLElement;
    const breadCrumb = document.querySelector(
      '.bread-crumb-container',
    ) as HTMLElement;
    if (tabs !== null && breadCrumb !== null) {
      tabs.style.top = '70px';
      breadCrumb.style.marginTop = '192px';
    }

    // const sectionToNavigate = document.getElementById('new-job');
    if (windowWidth > 519 && localStorage.getItem('accessToken')) {
      window.scrollTo(0, 530);

      // sectionToNavigate?.scrollIntoView();
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      // document.create;
    } else if (windowWidth <= 519 && localStorage.getItem('accessToken')) {
      window.scrollTo(0, 560);
    } else if (windowWidth > 519) {
      window.scrollTo(0, 530);
    } else if (windowWidth <= 519) {
      window.scrollTo(0, 800);
    }

    try {
      // setOpenBackdrop(true); // Mở backdrop

      // Lấy chiều cao của màn hình

      // const element = document.getElementById('new-job');
      // element?.scrollIntoView();

      // window.scrollTo(0, 300)

      if (newValue === undefined || newValue === 1) {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.add('swiper-slide-clicked');
      } else {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.remove('swiper-slide-clicked');
      }

      let userSelected: UserSelected = {
        userSelectedId: newValue,
      };

      setCookie('userSelected', JSON.stringify(userSelected), 365);

      const selectedCategory = categories?.data.find(
        (item: any) => item.id === newValue,
      );
      if (selectedCategory) {
        const { id, name } = selectedCategory;
        setValue(id);
        setValueJobChild({
          parentName: name,
          id,
        });
      }
      const themeId = searchParams.get('theme-id');
      if (themeId) {
        setSearchParams({
          'theme-id': `${themeId}`,
          'categories-id': `${newValue === 1 ? 'all' : newValue}`,
        });
      } else {
        setSearchParams({
          'categories-id': `${newValue === 1 ? 'all' : newValue}`,
        });
      }
      // var result;
      var resultV3;

      // console.log('newValue: ' + newValue);

      if (newValue === 1) {
        // result = await postApi.getPostNewest(
        //   null,
        //   null,
        //   null,
        //   19,
        //   null,
        //   languageRedux === 1 ? 'vi' : 'en',
        // );

        resultV3 = await postApi.getPostNewestV3(
          null,
          null,
          null,
          null,
          20,
          null,
          languageRedux === 1 ? 'vi' : 'en',
        );
      } else {
        // result = await postApi.getPostNewest(
        //   Number(newValue),
        //   null,
        //   null,
        //   19,
        //   null,
        //   languageRedux === 1 ? 'vi' : 'en',
        // );

        resultV3 = await postApi.getPostNewestV3(
          null,
          Number(newValue),
          null,
          null,
          20,
          null,
          languageRedux === 1 ? 'vi' : 'en',
        );
      }

      // if (result) {
      //   setPostNewest(result);
      //   // dispatch(setPostNewestApi(result));
      // }

      if (resultV3) {
        dispatch(setPostNewestApiV3(resultV3));
        // dispatch(setPostNewestApi(result));
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setOpenBackdrop(false); // Đóng backdrop sau khi API call hoàn thành
    }
  };

  useEffect(() => {
    if (JSON.parse(getCookie('userSelected') as any)) {
      const userSelected = Number(
        JSON.parse(getCookie('userSelected') || '').userSelectedId,
      );
      setCookie(
        'userSelected',
        JSON.stringify({ userSelectedId: userSelected }),
        365,
      );
    } else {
      setCookie('userSelected', JSON.stringify({ userSelectedId: 1 }), 365);
    }
  }, []);

  const getAllParentCategories = async () => {
    try {
      setLoading(true);
      const result = await categoriesApi.getAllParentCategories(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setCategories(result);

        let storedSettings = JSON.parse(
          getCookie('userSelected') || '{}',
        ) as UserSelected;

        const selectedCategory = result?.data.find(
          (item: any) => item.id === storedSettings.userSelectedId,
        );
        if (selectedCategory) {
          const { id, name } = selectedCategory;
          setValue(id);
          setValueJobChild({
            parentName: name,
            id,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const getPostNewestByCategori = async () => {
  //   try {
  //     // setOpenBackdrop(true);
  //     const themeId = searchParams.get('categories-id');
  //     var result;
  //     if (themeId === 'all') {
  //       result = await postApi.getPostNewest(
  //         null,
  //         null,
  //         null,
  //         19,
  //         null,
  //         languageRedux === 1 ? 'vi' : 'en',
  //       );

  //       // result = await postApi.getPostNewestV3(
  //       //   null,
  //       //   null,
  //       //   null,
  //       //   null,
  //       //   20,
  //       //   null,
  //       //   languageRedux === 1 ? 'vi' : 'en',
  //       // );
  //     } else {
  //       result = await postApi.getPostNewest(
  //         Number(themeId),
  //         null,
  //         null,
  //         19,
  //         null,
  //         languageRedux === 1 ? 'vi' : 'en',
  //       );

  //       // result = await postApi.getPostNewestV3(
  //       //   null,
  //       //   Number(themeId),
  //       //   null,
  //       //   null,
  //       //   20,
  //       //   null,
  //       //   languageRedux === 1 ? 'vi' : 'en',
  //       // );
  //     }
  //     if (result) {
  //       // setPostNewest(result);
  //       // dispatch(setPostNewestApi(result));
  //       // setOpenBackdrop(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getNewstJobBycookie = async (userSelectedId: any) => {
    try {
      // setOpenBackdrop(true);
      const themeId = userSelectedId;
      var result;
      var resultV3;
      if (themeId === 1) {
        result = await postApi.getPostNewest(
          null,
          null,
          null,
          19,
          null,
          languageRedux === 1 ? 'vi' : 'en',
        );

        resultV3 = await postApi.getPostNewestV3(
          null,
          null,
          null,
          null,
          20,
          null,
          languageRedux === 1 ? 'vi' : 'en',
        );
      } else {
        result = await postApi.getPostNewest(
          Number(themeId),
          null,
          null,
          19,
          null,
          languageRedux === 1 ? 'vi' : 'en',
        );

        resultV3 = await postApi.getPostNewestV3(
          null,
          Number(themeId),
          null,
          null,
          20,
          null,
          languageRedux === 1 ? 'vi' : 'en',
        );

        // result = await postApi.getPostNewestV3(
        //   null,
        //   Number(themeId),
        //   null,
        //   null,
        //   20,
        //   null,
        //   languageRedux === 1 ? 'vi' : 'en',
        // );
      }
      if (result) {
        // setPostNewest(result);
        // dispatch(setPostNewestApi(result));
        // setOpenBackdrop(false);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  React.useEffect(() => {
    getAllParentCategories();
    let storedSettings = JSON.parse(
      getCookie('userSelected') || '{}',
    ) as UserSelected;

    const accessToken = localStorage.getItem('accessToken');
    accessToken && setIsLogin(true);
    setSelectedItemIndex(storedSettings.userSelectedId);

    setTimeout(async () => {
      if (storedSettings.userSelectedId !== 1) {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.remove('swiper-slide-clicked');
      } else {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.add('swiper-slide-clicked');
      }

      // getNewstJobBycookie(storedSettings.userSelectedId);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  React.useEffect(() => {
    // Retrieve the user's settings from cookies
    let storedSettings = JSON.parse(
      getCookie('userSelected') || '{}',
    ) as UserSelected;
    setSelectedItemIndex(storedSettings.userSelectedId);
    setCategorieIdCookie(storedSettings.userSelectedId);
    if (storedSettings.userSelectedId !== 1) {
      const slide = document.querySelector('.swiper-slide');
      slide?.classList.remove('swiper-slide-clicked');
    }
  }, [value]);

  React.useEffect(() => {
    setRefCatelory(listRef.current ? listRef : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef]);

  React.useEffect(() => {
    // getPostNewestByCategori();
    setValue(Number(searchParams.get('categories-id')));
    setChildCateloriesArray([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('categories-id')]);

  // const [openBackdrop, setOpenBackdrop] = React.useState(false);
  // const handleClose = () => {
  //   setOpenBackdrop(false);
  // };
  // const handleOpen = () => {
  //   setOpenBackdrop(true);
  // };

  // const [startX, setStartX] = React.useState(0);
  // const handleDragStart = (e: any) => {
  //   setStartX(e.clientX);
  // };
  // const handleDrop = (e: any) => {
  //   const scrollElement = refTab.current;
  //   const scrollAmount = e.clientX - startX;
  //   if (scrollElement) {
  //     scrollElement.scrollLeft += scrollAmount;
  //   }
  // };

  // scroll

  return (
    <Box
      ref={listRef}
      sx={{
        maxWidth: { xs: 320, sm: 480, lg: 1320, xl: 1420, md: 720 },

        // position: navTouchCatelory ? 'fixed' : '',
        // top:
        //   navTouchCatelory && !openCollapseFilter
        //     ? '71px'
        //     : navTouchCatelory && openCollapseFilter
        //     ? '283px'
        //     : '',
        // zIndex: navTouchCatelory ? ' 2' : '',
        // margin: navTouchCatelory ? '0 180px' : '0',
        // right: 0,
        // left: 0,
        // background: '#ffffff',

        position: 'fixed',

        // position: navTouchCatelory ? 'fixed' : '',
        // top: '71px',
        // top:
        //   navTouchCatelory && !openCollapseFilter
        //     ? '71px'
        //     : navTouchCatelory && openCollapseFilter
        //     ? '283px'
        //     : '',

        top: '70px',
        zIndex: 2,
        // margin: '0 180px',
        // zIndex: navTouchCatelory ? ' 2' : '',
        padding: navTouchCatelory ? '0 180px' : '0px 180px 0 180px',
        right: 0,
        left: 0,
        background: '#ffffff',
      }}
      // sx={{
      //   maxWidth: { xs: 320, sm: 480, lg: 1320, xl: 1420, md: 720 },
      //   bgcolor: 'white',
      //   // position:
      //   //   height > 60 && !windowWidth ? `fixed` : hideSlider ? 'fixed' : '',
      //   position: hideSlider ? 'fixed' : '',
      //   top:
      //     height > 60 && !windowWidth
      //       ? `${height + 121}px`
      //       : hideSlider
      //       ? '71px'
      //       : '',
      //   margin:
      //     height > 60 && !windowWidth
      //       ? '0 180px'
      //       : hideSlider
      //       ? '0 180px'
      //       : '0',

      //   paddingTop:
      //     height > 60 && !windowWidth
      //       ? '0px'
      //       : height > 60 && windowWidth && !hideSlider
      //       ? '71px'
      //       : hideSlider
      //       ? '0'
      //       : '',

      //   right: 0,
      //   left: 0,
      //   zIndex: 2,
      //   border: 'none',
      //   // borderBottom: '1px solid #aaa',
      //   // boxShadow: '0px 1px 2px #aaa',
      //   // transition: 'top 0.5s',
      // }}
      className="tabs"
    >
      <Skeleton loading={loading} active>
        <Swiper
          // rewind={true}
          // slidesPerView={14}
          // spaceBetween={10}
          navigation={true}
          // mousewheel={true}
          slidesPerView="auto"
          // spaceBetween={25}
          // breakpoints={{
          //   320: {
          //     slidesPerView: 3,
          //   },
          //   640: {
          //     slidesPerView: 4,
          //   },
          //   768: {
          //     slidesPerView: 7,
          //   },
          //   868: {
          //     slidesPerView: 7,
          //   },
          //   963: {
          //     slidesPerView: 8,
          //   },
          //   1024: {
          //     slidesPerView: 9,
          //   },
          //   1440: {
          //     slidesPerView: 9,
          //   },
          //   1920: {
          //     slidesPerView: 14,
          //   },
          //   2560: {
          //     slidesPerView: 14,
          //   },
          // }}
          modules={[Mousewheel, Navigation, Pagination]}
          className="mySwiper"
          initialSlide={selectedItemIndex - 1}
        >
          {categories?.data.map((item: CategoryItem, index: number) => {
            return (
              <SwiperSlide
                key={index}
                onClick={(event) => {
                  const analytics: any = getAnalytics();
                  logEvent(analytics, 'event_web_click_HiJob' as string, {
                    // screen_name: screenName as string,
                    web_page_home: `/category_${item.name}` as string,
                  });

                  handleChange(event, item.id);
                }}
                // style={{ width: 'fit-content', marginLeft: '25px' }}
                className="item-swiperSlide"
              >
                {/* <CategoryItem
                  content={item.name}
                  imageLink={item.image}
                  imageDescription={item.name}
                  isSelected={}
                /> */}
                {/* <Skeleton loading={loading} active> */}
                <div className="category-item-container">
                  <div className="category-item-body">
                    <img
                      className="category-item-image"
                      src={item.image}
                      alt={item.name}
                    />
                    <span
                      className="category-item-title"
                      style={
                        item.id === categoryIdCookie
                          ? { color: 'black' }
                          : { color: '' }
                      }
                    >
                      {isLogin && item.id === 1
                        ? // ? language?.home_page?.suggested_work
                          languageRedux === 1
                          ? 'Công việc gợi ý'
                          : 'Suggested'
                        : item.name}
                    </span>
                  </div>
                  <div
                    className="border-selected"
                    style={{
                      backgroundColor:
                        item.id === categoryIdCookie || item.id === value
                          ? '#0d99ff'
                          : 'white',
                    }}
                  ></div>
                </div>
                {/* </Skeleton> */}
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
        {/* <Tabs
        value={value === 0 ? categories?.data[0].id : value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        allowScrollButtonsMobile
        orientation="horizontal"
        ref={refTab as any}
        className="cateloryItemFilter"
        sx={{ overflowX: 'hidden', scroll: 'auto', marginTop: '12px' }}
      >
        {categories?.data.map((item: CategoryItem, index: number) => {
          return (
            <Tab
              key={index}
              value={item.id}
              label={
                <CategoryItem content={item.name} imageLink={item.image} />
              }
              sx={{
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                maxWidth: '120px',
                borderRadius: '5px',
              }}
            />
          );
        })}
      </Tabs> */}
      </Skeleton>
    </Box>
  );
};

export default memo(CategoryCarousel);
