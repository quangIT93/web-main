import React, { useContext, memo } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import './style.scss';
import { TabScrollButton } from '@mui/material';
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
import { RootState } from '../../../store/reducer';

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { IvalueJobChild } from 'context/HomeValueContextProvider';

import CategoryItem from './components/CategoryItem';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';

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
    childCateloriesArray,
    valueJobChild,
    setValueJobChild,
    setRefCatelories,
    setRefCatelory,
    navTouchCatelory,
    openCollapseFilter,
  }: {
    setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>;
    childCateloriesArray: number[];
    valueJobChild: IvalueJobChild;
    setValueJobChild: React.Dispatch<React.SetStateAction<IvalueJobChild>>;
    setRefCatelories: React.Dispatch<React.SetStateAction<number>>;
    setRefCatelory: React.Dispatch<React.SetStateAction<DivRef>>;
    navTouchCatelory: boolean;
    openCollapseFilter: boolean;
  } = useContext(HomeValueContext);

  const [value, setValue] = React.useState(0);
  const [categoryIdCookie, setCategorieIdCookie] = React.useState(0);
  // const positionRef = React.useRef(0)

  // const {height} = height

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { setPostNewest } = bindActionCreators(actionCreators, dispatch);

  const listRef = React.useRef<HTMLUListElement | null>(null);
  const refTab = React.useRef<HTMLUListElement | null>(null);

  const [categories, setCategories] = React.useState<AxiosResponse | null>(
    null,
  );

  // Set the cookie
  function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Get the cookie
  function getCookie(name: string): string | null {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  const handleChange = async (event: React.SyntheticEvent, newValue: any) => {
    try {
      setOpenBackdrop(true); // Mở backdrop
      window.scrollTo(0, 0);
      // window.scrollTo(0, 300)

      if (newValue === undefined || newValue === 1) {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.add('swiper-slide-clicked')
      } else {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.remove('swiper-slide-clicked')
      }

      let userSelected: UserSelected = {
        userSelectedId: newValue,
      };
      setCookie("userSelected", JSON.stringify(userSelected), 365);

      console.log(newValue);

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
          'categories-id': `${newValue == 1 ? 'all' : newValue}`,
        });
      } else {
        setSearchParams({
          'categories-id': `${newValue == 1 ? 'all' : newValue}`,
        });
      }
      var result;
      if (newValue == 1) {
        result = await postApi.getPostNewest(null, null, null, 19);
      } else {
        result = await postApi.getPostNewest(Number(newValue), null, null, 19);
      }

      if (result) {
        setPostNewest(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenBackdrop(false); // Đóng backdrop sau khi API call hoàn thành
    }
  };

  const getAllParentCategories = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories();
      if (result) {
        setCategories(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPostNewestByCategori = async () => {
    try {
      setOpenBackdrop(true);
      const themeId = searchParams.get('categories-id');
      var result;
      if (themeId == 'all') {
        result = await postApi.getPostNewest(null, null, null, 19);
      } else {
        result = await postApi.getPostNewest(Number(themeId), null, null, 19);
      }
      if (result) {
        setPostNewest(result);
        setOpenBackdrop(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNewstJobBycookie = async (userSelectedId: any) => {
    try {
      setOpenBackdrop(true);
      const themeId = userSelectedId;
      var result;
      if (themeId == 1) {
        result = await postApi.getPostNewest(null, null, null, 19);
      } else {
        result = await postApi.getPostNewest(Number(themeId), null, null, 19);
      }
      if (result) {
        setPostNewest(result);
        setOpenBackdrop(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getAllParentCategories();
    let storedSettings = JSON.parse(getCookie("userSelected") || "{}") as UserSelected;

    setTimeout(async () => {
      if (storedSettings.userSelectedId !== 1) {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.remove('swiper-slide-clicked');
      } else {
        const slide = document.querySelector('.swiper-slide');
        slide?.classList.add('swiper-slide-clicked');
      }

      getNewstJobBycookie(storedSettings.userSelectedId);
    }, 500)
  }, []);

  React.useEffect(() => {
    // Retrieve the user's settings from cookies
    let storedSettings = JSON.parse(getCookie("userSelected") || "{}") as UserSelected;
    setCategorieIdCookie(storedSettings.userSelectedId);
    if (storedSettings.userSelectedId !== 1) {
      const slide = document.querySelector('.swiper-slide');
      slide?.classList.remove('swiper-slide-clicked');
    }
  }, [value])

  React.useEffect(() => {
    setRefCatelory(listRef.current ? listRef : null);
  }, [listRef]);

  React.useEffect(() => {
    getPostNewestByCategori();
    setValue(Number(searchParams.get('categories-id')));
    setChildCateloriesArray([]);
  }, [searchParams.get('categories-id')]);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const handleOpen = () => {
    setOpenBackdrop(true);
  };

  const [startX, setStartX] = React.useState(0);
  const handleDragStart = (e: any) => {
    setStartX(e.clientX);
  };
  const handleDrop = (e: any) => {
    const scrollElement = refTab.current;
    const scrollAmount = e.clientX - startX;
    if (scrollElement) {
      scrollElement.scrollLeft += scrollAmount;
    }
  };

  console.log('category id: ', value);

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

      <Swiper
        // rewind={true}
        // slidesPerView={14}
        // spaceBetween={10}
        navigation={true}
        mousewheel={true}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 7,
          },
          868: {
            slidesPerView: 7,
          },
          963: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 9,
          },
          1440: {
            slidesPerView: 9,
          },
          1920: {
            slidesPerView: 14,
          },
          2560: {
            slidesPerView: 14,
          },
        }}
        modules={[Mousewheel, Navigation, Pagination]}
        className="mySwiper"
      >
        {categories?.data.map((item: CategoryItem, index: number) => {
          // console.log("id: ", item.id);
          return (
            <SwiperSlide
              key={index}
              onClick={(event) => {
                handleChange(event, item.id);
              }}
              style={{
                borderBottom: item.id === categoryIdCookie || item.id === value ? '2px solid #0d99ff' : 'none',
                backgroundColor: item.id === categoryIdCookie || item.id === value ? 'rgba(0, 0, 0, 0.1)' : '',
              }}
            >
              <CategoryItem
                content={item.name}
                imageLink={item.image}
                imageDescription={item.name}
              />
            </SwiperSlide>
          );
        })}
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

export default memo(CategoryCarousel);
