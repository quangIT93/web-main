import React from 'react';
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
import { Radio, Tabs } from 'antd';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { RootState } from '../../../store/reducer';

import './style.scss';

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
  const [value, setValue] = React.useState<Number>(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);
  // get post by theme id when click theme item
  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    try {
      setValue(newValue);
      setIndex(newValue);
      setOpenBackdrop(!openBackdrop);
      const categoryId = searchParams.get('categories-id');
      if (categoryId) {
        setSearchParams({
          'theme-id': `${newValue}`,
          'categories-id': `${Number(categoryId) == 1 ? 'all' : categoryId}`,
        });
      } else {
        setSearchParams({ 'theme-id': `${newValue}` });
      }

      const result = await postApi.getPostByThemeId(newValue, 19, null);
      if (result) {
        setPostByTheme(result);
        // set backdrop
        setOpenBackdrop(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const getPostNewestByThemeId = async () => {
    try {
      const themeId = searchParams.get(`theme-id`)
        ? searchParams.get(`theme-id`)
        : listTheme?.data[0].id;

      var result;
      if (themeId) {
        setOpenBackdrop(true);
        result = await postApi.getPostByThemeId(Number(themeId), 19, null);
      }

      if (result) {
        setPostByTheme(result);
        setOpenBackdrop(false);
      }
    } catch (error) {
      console.error(error);
      setOpenBackdrop(false);
    }
  };
  React.useEffect(() => {
    getPostNewestByThemeId();
    setValue(Number(searchParams.get('theme-id')));
  }, [searchParams.get('theme-id')]);

  console.log(index);

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '28px',
      }}
    >
      {/* <Tabs
        value={value == 0 ? listTheme?.data[0].id : value}
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
        // rewind={true}
        slidesPerView={8}
        navigation={true}
        mousewheel={true}
        modules={[Mousewheel, Navigation, Pagination]}
        className="mySwiper"
      >
        {listTheme?.data.map((item: ItemTheme, index: number) => {
          // console.log("id: ", item.id);
          return (
            <SwiperSlide
              key={index}
              onClick={(event) => {
                handleChange(event, item.id);
              }}
              style={{
                borderBottom: item.id === value ? '2px solid #0d99ff' : 'none',
                backgroundColor: item.id === value ? 'rgba(0, 0, 0, 0.1)' : '',
              }}
            >
              <div className="slide-item">
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

export default ListCompanyCarousel;
