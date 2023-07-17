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
import hotJobApi from 'api/hotJobApi';

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

import { FireIcon, BagIcon } from '#components/Icons';

import { dataImageHotJob } from './dataImagehotJob';

import './style.scss';

interface ItemTheme {
    id: number;
    title: string;
    img: string;
    author: string;
}


const HotJob: React.FC = () => {
    const [value, setValue] = React.useState<Number>(0);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [listTheme, setListTheme] = React.useState<ItemTheme[]>([]);;
    const [hotjob, setHotJob] = React.useState<any>([]);;

    const [addressIdCookie, setAddressIdCookie] = React.useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { setPostByTheme } = bindActionCreators(actionCreators, dispatch);

    const handleClickItem = (event: any, id: number, type: number) => {
        window.open(`/hotjobs?hotjob-id=${id}&hotjob-type=${type}`);
    };

    // handle close backdrop
    const handleClose = () => {
        setOpenBackdrop(false);
    };

    const getHotJob = async () => {
        try {
            const result = await hotJobApi.getHotJobTheme();
            if (result) {
                setHotJob(result.data);
            }
        } catch (error) {
            console.log(error);

        }
    }

    React.useEffect(() => {
        getHotJob()
    }, [])

    console.log(hotjob);

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

    console.log(index);

    return (
        <Box
            sx={{
                maxWidth: { xs: 320, sm: 480 },
                bgcolor: 'background.paper',
                position: 'relative',
                paddingBottom: '28px',
            }}
            className="hot-job-container"
        >
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <FireIcon width={25} height={25} />
                <h2>Công việc nổi bật</h2>
            </div>
            <Swiper
                navigation={true}
                mousewheel={true}
                breakpoints={{
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    1440: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    1920: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    2560: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    }
                }}
                modules={[Mousewheel, Navigation, Pagination]}
                className="mySwiper"
            >
                {hotjob?.map((item: any, index: number) => {
                    // console.log("id: ", item.id);
                    return (
                        <SwiperSlide
                            key={index}
                            onClick={(event) => { handleClickItem(event, item.id, item.type) }}
                        >
                            <div className="slide-item">
                                <img
                                    src={item.image}
                                    alt="anh bị lỗi"
                                    style={{
                                        width: '160px',
                                        height: '160px',
                                        borderRadius: '10px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <div className="div-info-themes-item">
                                    <div className="div-info-themes-item_left">
                                        <h5>{item.title}</h5>
                                    </div>
                                    <div className="div-info-themes-item_right">
                                        <BagIcon />
                                        <h6>{`${item.count} `}</h6>
                                    </div>
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

export default HotJob;
