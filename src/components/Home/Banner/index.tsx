import React, { useEffect } from 'react';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper';
import bannersApi from 'api/apiBanner';
import { Skeleton } from 'antd';
import ModalNotiValidateCompany from '#components/Post/ModalNotiValidateCompany';
import ModalNoteCreateCompany from '#components/Post/ModalNoteCreateCompany';

const Banner = () => {
    const profile = useSelector(
        (state: RootState) => state.dataProfileInformationV3.data,
    );
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const [banner, setBanner] = React.useState<any>([]);
    const [openModalNoteValidateCompany, setOpenModalNoteValidateCompany] = React.useState<any>(false);
    const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] = React.useState(false);

    const getBannerRoleUser = async () => {
        try {
            const result = await bannersApi.getBannersApi(
                languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
                null,
            );
            if (result) {
                setBanner(result.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getBannerRoleUser();
    }, []);

    return (
        <div className="banner-container">
            {
                localStorage.getItem('accessToken') ?
                    <div className="banner-content">
                        {profile.length !== 0 ? (
                            profile?.typeRoleData === 0 ? (
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: true }}
                                    modules={[Autoplay, Pagination]}
                                    className="banner-rescruit-swiper"
                                    loop={true}
                                    style={{ height: '100%' }}
                                >
                                    {banner?.map((value: any, index: number) => {
                                        if (value?.order === 1) {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        onClick={() => {
                                                            window.open(value?.redirect_url, '_parent');
                                                        }}
                                                        src={value?.image}
                                                        alt=""
                                                    />
                                                </SwiperSlide>
                                            );
                                        } else {
                                            return <React.Fragment key={index}></React.Fragment>;
                                        }
                                    })}
                                </Swiper>
                            ) : (
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={true}
                                    // navigation={true}
                                    modules={[Autoplay, Navigation, Pagination]}
                                    className="banner-rescruit-swiper"
                                    loop={true}
                                >
                                    {banner?.map((value: any, index: number) => {
                                        if (value?.order === 2) {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        onClick={() => {
                                                            if (
                                                                profile?.companyInfo &&
                                                                profile?.companyInfo?.status === 0 &&
                                                                value?.redirect_url ===
                                                                'https://hijob.site/post'
                                                            ) {
                                                                setOpenModalNoteValidateCompany(true);
                                                            } else if (
                                                                profile?.companyInfo === null &&
                                                                value?.redirect_url ===
                                                                'https://hijob.site/post'
                                                            ) {
                                                                setOpenModalNoteCreateCompany(true);
                                                            } else {
                                                                window.open(value?.redirect_url, '_parent');
                                                            }
                                                        }}
                                                        src={value?.image}
                                                        alt="errorimg"
                                                    />
                                                </SwiperSlide>
                                            );
                                        } else {
                                            return <React.Fragment key={index}></React.Fragment>;
                                        }
                                    })}
                                </Swiper>
                            )
                        ) : (
                            <Skeleton.Button
                                style={{ height: '301px' }}
                                active={true}
                                block={true}
                            />
                        )}
                        <ModalNotiValidateCompany
                            openModalNoteValidateCompany={openModalNoteValidateCompany}
                            setOpenModalNoteValidateCompany={setOpenModalNoteValidateCompany}
                        />
                        <ModalNoteCreateCompany
                            openModalNoteCreateCompany={openModalNoteCreateCompany}
                            setOpenModalNoteCreateCompany={setOpenModalNoteCreateCompany}
                        />
                    </div>
                    :
                    <div className="banner-content">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            // navigation={true}
                            pagination={true}
                            modules={[Autoplay, Pagination]}
                            className="banner-rescruit-swiper"
                            loop={true}
                        >
                            {banner?.map((value: any, index: number) => {
                                if (value?.order === 1) {
                                    return (
                                        <SwiperSlide key={index}>
                                            <img
                                                onClick={() => {
                                                    window.open(value?.redirect_url, '_parent');
                                                }}
                                                src={value?.image}
                                                alt=""
                                            />
                                        </SwiperSlide>
                                    );
                                } else {
                                    return <React.Fragment key={index}></React.Fragment>;
                                }
                            })}
                        </Swiper>
                    </div>

            }
        </div>
    )

}

export default Banner;