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

import { Avatar, Badge, Space } from 'antd';

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
import { getCookie } from 'cookies';
import themesApi from 'api/themesApi';

interface ItemTheme {
    id: number;
    title: string;
    image: string;
    number_of_posts: number;
}

const JobStory = () => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const [value, setValue] = React.useState<Number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);
    const location = useLocation();
    const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null);
    const postNewestV3: any = useSelector((state: RootState) => {
        // console.log('state', state);
        return state.newWestReducerV3;
    });

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                paddingBottom: '16px',
            }}
            className="job-story-container"
        >
            <Swiper
                navigation={true}
                spaceBetween={24}
                slidesPerView="auto"
                modules={[Mousewheel, Navigation, Pagination]}
                className="job-story-swiper"
            >
                {postNewestV3 &&
                    postNewestV3?.data.map((item: any, index: number) => {
                        return (
                            <SwiperSlide
                                key={index}
                                onClick={() => {
                                    window.open(`post-detail?post-id=${item?.id}`);
                                }}
                            >
                                <div className="job-story-slide-item">
                                    <img
                                        src={item?.image}
                                        alt={languageRedux === 1
                                            ? 'Hình ảnh bị lỗi'
                                            : languageRedux === 2
                                                ? 'Image is corrupted'
                                                : '이미지가 손상되었습니다'}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '10px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <div className="job-story-info">
                                        <Badge dot status="success" offset={[-5, 33]}>
                                            <Avatar src={item?.companyResourceData?.logo} size="large" />
                                        </Badge>
                                        <Space size={3} direction={'vertical'}>
                                            <h5>{item.title}</h5>
                                            <h6>
                                                {item.companyName}
                                            </h6>
                                        </Space>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </Box>
    );
};

export default JobStory;
