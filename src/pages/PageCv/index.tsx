import React, { useEffect, useState } from 'react';
// @ts-ignore

import { IconArrowLeft } from '#components/Icons';
// @ts-ignore
// import Carousel, { CarouselItem } from '#components/PageCv/Carousel';
import PageCv2 from './../PageCv2';
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import ModalLogin from '#components/Home/ModalLogin';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper';
import apiCv from 'api/apiCv';
// const Slide = ({ number }: any) => (
//   <div>
//     <img src="./images/pageCv/CV 1.png" alt={number} />
//   </div>
// );

const PageCv = () => {
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [isLogin, setIsLogin] = useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const profileMoreV3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);
  const [getThemeCv, setGetThemeCv] = React.useState<any>([]);
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const getTheme = async () => {
    try {
      const result = await apiCv.getThemeCv();
      if (result) {
        setGetThemeCv(result.data);
      }
    } catch (error) { }
  };
  useEffect(() => {
    getTheme();
    // Lấy danh sách các phần tử .slick-active trong Slider
  }, [profileMoreV3]);

  return (
    <div className="wrap-page_Cv">
      {/* <Navbar /> */}
      <div className="wrap-item_pageCv">
        <div className="top-page-cv-content">
          <div className="top-left-page-cv-content">

            <div className="item-update_profile item-page_Cv">
              <h5>
                {languageRedux === 1
                  ? 'Nổi bật với Nhà tuyển dụng với một CV tùy chỉnh, chuyên nghiệp'
                  : 'Stand out to Employers with a custom, professional CV'}
              </h5>
              <p>
                {languageRedux === 1
                  ? 'Tại HiJob bạn dễ dàng tạo CV Online và Download với vô vàn mẫu CV chuyên nghiệp giúp gây ấn tượng cho nhà tuyển dụng và giúp bạn tăng hiệu quả tìm việc.'
                  : 'At HiJob you can easily create a CV Online and Download it with countless options Professinal CV templates help impress employers and help you increase yout job search efficiency.'}
              </p>
              <div
                className="button-update_profile"
                onClick={() => {
                  if (!localStorage.getItem('accessToken')) {
                    setOpenModalLogin(true);
                    return;
                  } else {
                    window.open('/profile', '_parent');
                  }
                }}
              >
                {languageRedux === 1 ? ' Cập nhật hồ sơ' : 'Update Profile'}
              </div>
            </div>
            {/* <PageCv2 /> */}
            <div className="page-cv-list-swiper">
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={3}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                className="page-cv-list-swiper-list"
              >
                {getThemeCv ? (
                  getThemeCv.map((item: any, index: number) => {
                    return (
                      <SwiperSlide
                        className="div-job-img-swipper_item"
                        key={index}
                      >
                        <img src={item.image} alt={item.name} />
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <SwiperSlide className="div-job-img-swipper_item">
                    <img
                      src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/no-image.png"
                      alt={language?.err_none_img}
                      style={{ objectFit: 'cover' }}
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
          <div className="top-right-page-cv-content">
            <div className="square-1"></div>
            <div className="square-2"></div>
            <div className="square-3"></div>
            <div className="square-4"></div>
            <Swiper
              style={{
                // '--swiper-navigation-color': '#fff',
                // '--swiper-pagination-color': '#fff',
              }}
              loop={true}
              spaceBetween={10}
              // navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {getThemeCv ? (
                getThemeCv.map((item: any, index: number) => {
                  return (
                    <SwiperSlide
                      className="div-job-img-swipper_item"
                      key={index}
                    >
                      <img src={item.image} alt={item.name} />
                    </SwiperSlide>
                  );
                })
              ) : (
                <SwiperSlide className="div-job-img-swipper_item">
                  <img
                    src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/web/public/no-image.png"
                    alt={language?.err_none_img}
                    style={{ objectFit: 'cover' }}
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
        {/* <div className="item-imageCv_banner item-page_Cv">
          <img src="./images/pageCv/CV 1.png" alt="" />
        </div> */}
        {/* carousel */}
        {/* <Carousel>
          <CarouselItem>
            <Slide number={1} />
          </CarouselItem>
          <CarouselItem>
            <Slide number={2} />
          </CarouselItem>
          <CarouselItem>
            <Slide number={3} />
          </CarouselItem>
          <CarouselItem>
            <Slide number={4} />
          </CarouselItem>
          <CarouselItem>
            <Slide number={5} />
          </CarouselItem>
          <CarouselItem>
            <Slide number={6} />
          </CarouselItem>
          <CarouselItem>
            <Slide number={7} />
          </CarouselItem>
        </Carousel> */}


        <div className="item-imageCv_bannerShow item-page_Cv">
          <div className="wrap-img_bannerShow">
            <img src="./images/pageCv/web 2 1.png" alt="" />
          </div>
          <div className="banner-show_title">
            <h3>
              {
                languageRedux === 1 ?
                  "Tạo CV độc đáo một cách nhanh chóng" :
                  "Create a unique CV quickly "
              }
            </h3>
            <p>
              {
                languageRedux === 1 ?
                  "Tại HiJob bạn dễ dàng tạo CV Online và Download với vô vàn mẫu CV chuyên nghiệp giúp gây ấn tượng cho nhà tuyển dụng và giúp bạn tăng hiệu quả tìm việc." :
                  "At HiJob you can easily create a CV Online and Download with countless professional CV templates to help make an impression for employers and help you increase your job search efficiency."
              }
            </p>
            <div
              className="wrap-bnt_bannerShow"
              onClick={() => window.open('/profile-cv', '_parent')}
            >
              <span className="btn-bannerShow">
                {
                  languageRedux === 1 ?
                    "Xem các mẫu CV" : "See CV templates"
                }
              </span>
            </div>
          </div>
        </div>

        <div className="item-imageCv_loggin1 item-page_Cv">
          <div className="banner-show_title">
            <h3>
              {
                languageRedux === 1 ?
                  "Dễ dàng gửi và lưu CV của bạn" :
                  "Easily send and save Your CV"
              }
            </h3>
            <p>
              {
                languageRedux === 1 ?
                  "Bạn có thể tải xuống CV của mình dưới dạng PDF và gửi trực tiếp qua email. Hoặc lưu CV đại điện để gửi vào tin tuyển dụng trên HiJob." :
                  "You can download your CV as PDF and send directly via email. Or save your representative CV to send go to the job posting on HiJob."
              }
            </p>
            <div
              className="wrap-cvchange_login"
              style={{ display: isLogin ? 'none' : 'block' }}
              onClick={() => setOpenModalLogin(true)}
            >
              <p className="cv-change_login">
                <span>
                  {
                    languageRedux === 1 ?
                      "Đăng nhập ngay hijob.site" :
                      "Login now hijob.site"
                  }
                </span>
                <IconArrowLeft />
              </p>
            </div>
          </div>
          <div className="wrap-img_loggin1">
            <img src="./images/pageCv/cv trang 3 1.png" alt="" />
          </div>
        </div>

        <div className="item-imageCv_loggin2 item-page_Cv">
          <div className="wrap-img_loggin2">
            <img src="./images/pageCv/web 4 1.png" alt="" />
          </div>
          <div className="banner-show_title">
            <h3>
              {
                languageRedux === 1 ?
                  "Hướng dẫn tạo CV trên HiJob" :
                  "Instruct create CV on HiJob"
              }
            </h3>
            <ul>
              <li>
                {
                  languageRedux === 1 ?
                    "CV càng chi tiết và đầy đủ sẽ thu hút được NTD uy tín hơn chủ động kết nối và gửi đến bạn những cơ hội việc làm hấp dẫn nhất" :
                    "The more detailed and complete your CV will be, the more attractive it will be more reputable NTDs proactively connect and send to you the most attractive job opportunities."
                }
              </li>
              <li>
                {
                  languageRedux === 1 ?
                    "Điền đầy đủ thông tin của bạn trong trang hồ sơ" :
                    "Fill in your information completely profile page"
                }
              </li>
              <li>
                {
                  languageRedux === 1 ?
                    "HiJob sẽ tự động điền thông tin từ hồ sơ của bạn. Xem và chọn mẫu CV bạn ưng ý" :
                    "HiJob will automatically fill in your information from your profile. View and choose the CV template you like."
                }
              </li>
              <li>
                {
                  languageRedux === 1 ?
                    "Sau khi hoàn thành, hãy lưu ngay trong hồ sơ tìm việc của bạn trên HiJob (Tối đa 10 mẫu CV), hoặc tải xuống miễn phí dưới dạng PDF." :
                    "Once completed, save it  immediately in the lake your job search resume on HiJob (maximum 10 templates CV), or download for free as PDF."
                }
              </li>
            </ul>
            <div
              className="wrap-bnt_bannerShow"
              onClick={() => window.open('/profile-cv', '_parent')}
            >
              <span className="btn-bannerShow">
                {
                  languageRedux === 1 ?
                    "Xem các mẫu CV" : "See CV templates"
                }
              </span>
            </div>
          </div>
        </div>

        <div className="item-imageCv_index item-page_Cv">
          <div className="banner-show_title">
            <h3>{languageRedux === 1 ? 'Mục lục' : 'Table of contents'}</h3>
            <ul>
              <li>
                {languageRedux === 1
                  ? `1. CV là gì? Những điều bạn cần lưu ý khi viết CV xin việc`
                  : `1. What is CV? Things you need to keep in mind when writing your CV`}
              </li>
              <li>
                {languageRedux === 1
                  ? `2. Cách viết CV xin việc chuẩn`
                  : `2. How to write a standard job application CV`}
              </li>
              <li>
                {languageRedux === 1
                  ? `3. Cách tạo mẫu CV xin việc đơn giản`
                  : `3. How to create a simple CV template?`}
              </li>
              <li>
                {languageRedux === 1
                  ? `4. Một số lưu ý khi viết CV và nộp CV bạn nên nắm rõ`
                  : `4. Some notes when writing and submitting CV for you`}
              </li>
              <li>
                {languageRedux === 1
                  ? `5. Cách gửi CV qua email`
                  : `5. How to send CV via email`}
              </li>
            </ul>
          </div>
          <div className="wrap-img_index">
            <img src="./images/pageCv/web 5 1.png" alt="" />
          </div>
        </div>
      </div>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
      {/* <Footer /> */}
    </div>
  );
};

export default PageCv;
