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
import { Button } from 'antd';
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
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
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
    } catch (error) {}
  };
  useEffect(() => {
    getTheme();
    // Lấy danh sách các phần tử .slick-active trong Slider
  }, [profileMoreV3]);

  const handleMoveToCreateCv = (id: any, name: any) => {
    window.open('/templates-cv', '_parent');
    localStorage.setItem('cv-id', id);
    localStorage.setItem('nameCv', `${profileV3.name} - ${name}`);
  };

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
                  : languageRedux === 2
                    ? 'Stand out to Employers with a custom, professional CV'
                    : languageRedux === 3 &&
                      '맞춤형 전문 CV로 고용주의 눈에 띄세요'}
              </h5>
              <p>
                {languageRedux === 1
                  ? 'Tại HiJob bạn dễ dàng tạo CV Online và Download với vô vàn mẫu CV chuyên nghiệp giúp gây ấn tượng cho nhà tuyển dụng và giúp bạn tăng hiệu quả tìm việc.'
                  : languageRedux === 2
                    ? 'At HiJob you can easily create a CV Online and Download it with countless options Professinal CV templates help impress employers and help you increase yout job search efficiency.'
                    : 'HiJob에서는 고용주에게 깊은 인상을 남기고 구직 효율성을 높이는 데 도움이 되는 수많은 전문 CV 템플릿을 사용하여 온라인으로 쉽게 CV를 만들고 다운로드할 수 있습니다.'}
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
                {languageRedux === 1
                  ? 'Cập nhật hồ sơ'
                  : languageRedux === 2
                    ? 'Update profile'
                    : languageRedux === 3 && '프로필 업데이트'}
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
              style={
                {
                  // '--swiper-navigation-color': '#fff',
                  // '--swiper-pagination-color': '#fff',
                }
              }
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
                      <Button
                        type="primary"
                        shape="round"
                        onClick={() => handleMoveToCreateCv(item.id, item.name)}
                      >
                        {languageRedux === 1
                          ? 'Xem trước'
                          : languageRedux === 2
                            ? 'Preview'
                            : languageRedux === 3 && '시사'}
                      </Button>
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
              {languageRedux === 1
                ? 'Tạo CV độc đáo một cách nhanh chóng'
                : languageRedux === 2
                  ? 'Create a unique CV quickly '
                  : languageRedux === 3 && '독특한 CV를 빠르게 생성하세요'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Tại HiJob bạn dễ dàng tạo CV Online và Download với vô vàn mẫu CV chuyên nghiệp giúp gây ấn tượng cho nhà tuyển dụng và giúp bạn tăng hiệu quả tìm việc.'
                : languageRedux === 2
                  ? 'At HiJob you can easily create a CV Online and Download with countless professional CV templates to help make an impression for employers and help you increase your job search efficiency.'
                  : languageRedux === 3 &&
                    'HiJob에서는 고용주에게 깊은 인상을 남기고 구직 효율성을 높이는 데 도움이 되는 수많은 전문 CV 템플릿을 사용하여 온라인으로 쉽게 이력서를 만들고 다운로드할 수 있습니다.'}
            </p>
            <div
              className="wrap-bnt_bannerShow"
              onClick={() => window.open('/profile-cv', '_parent')}
            >
              <span className="btn-bannerShow">
                {languageRedux === 1
                  ? 'Xem các mẫu CV'
                  : languageRedux === 2
                    ? 'See CV templates'
                    : languageRedux === 3 && 'CV 샘플 보기'}
              </span>
            </div>
          </div>
        </div>

        <div className="item-imageCv_loggin1 item-page_Cv">
          <div className="banner-show_title">
            <h3>
              {languageRedux === 1
                ? 'Dễ dàng gửi và lưu CV của bạn'
                : languageRedux === 2
                  ? 'Easily send and save Your CV'
                  : languageRedux === 3 && 'Dễ dàng gửi và lưu CV của bạn'}
            </h3>
            <p>
              {languageRedux === 1
                ? 'Bạn có thể tải xuống CV của mình dưới dạng PDF và gửi trực tiếp qua email. Hoặc lưu CV đại điện để gửi vào tin tuyển dụng trên HiJob.'
                : languageRedux === 2
                  ? 'You can download your CV as PDF and send directly via email. Or save your representative CV to send go to the job posting on HiJob.'
                  : languageRedux === 3 &&
                    'CV를 PDF로 다운로드하여 이메일로 직접 보낼 수 있습니다. 또는 담당자의 CV를 저장하여 HiJob의 채용 소식으로 보내세요.'}
            </p>
            <div
              className="wrap-cvchange_login"
              style={{ display: isLogin ? 'none' : 'block' }}
              onClick={() => setOpenModalLogin(true)}
            >
              <p className="cv-change_login">
                <span>
                  {languageRedux === 1
                    ? 'Đăng nhập ngay hijob.site'
                    : languageRedux === 2
                      ? 'Login now hijob.site'
                      : languageRedux === 3 &&
                        '지금 hijob.site에 로그인하세요.'}
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
              {languageRedux === 1
                ? 'Hướng dẫn tạo CV trên HiJob'
                : languageRedux === 2
                  ? 'Instructions for creating a CV on HiJob'
                  : languageRedux === 3 && 'HiJob에서 이력서 작성 지침'}
            </h3>
            <ul>
              <li>
                {languageRedux === 1
                  ? 'CV càng chi tiết và đầy đủ sẽ thu hút được NTD uy tín hơn chủ động kết nối và gửi đến bạn những cơ hội việc làm hấp dẫn nhất'
                  : languageRedux === 2
                    ? 'The more detailed and complete your CV will be, the more attractive it will be more reputable NTDs proactively connect and send to you the most attractive job opportunities.'
                    : languageRedux === 3 &&
                      'CV가 더 자세하고 완전할수록 평판이 좋은 고용주가 적극적으로 연결하여 가장 매력적인 취업 기회를 보내줄 것입니다.'}
              </li>
              <li>
                {languageRedux === 1
                  ? 'Điền đầy đủ thông tin của bạn trong trang Hồ sơ.'
                  : languageRedux === 2
                    ? 'Fill in your information in the Profile page.'
                    : '프로필 페이지에 정보를 입력하세요.'}
              </li>
              <li>
                {languageRedux === 1
                  ? 'HiJob sẽ tự động điền thông tin từ hồ sơ của bạn. Xem và chọn mẫu CV bạn ưng ý'
                  : languageRedux === 2
                    ? 'HiJob will automatically fill in your information from your profile. View and choose the CV template you like.'
                    : languageRedux === 3 &&
                      'HiJob은 귀하의 프로필 정보를 자동으로 입력합니다. 마음에 드는 이력서 템플릿을 보고 선택하세요.'}
              </li>
              <li>
                {languageRedux === 1
                  ? 'Sau khi hoàn thành, hãy lưu ngay trong hồ sơ tìm việc của bạn trên HiJob (tối đa 10 mẫu CV), hoặc tải xuống miễn phí dưới dạng PDF.'
                  : languageRedux === 2
                    ? 'Once completed, immediately save your job search resume on HiJob (up to 10 CV templates), or download it for free as PDF.'
                    : languageRedux === 3 &&
                      '완료되면 즉시 HiJob의 구직 프로필에 저장하거나(최대 10개의 이력서 템플릿) PDF로 무료로 다운로드하세요.'}
              </li>
            </ul>
            <div
              className="wrap-bnt_bannerShow"
              onClick={() => window.open('/profile-cv', '_parent')}
            >
              <span className="btn-bannerShow">
                {languageRedux === 1
                  ? 'Xem các mẫu CV'
                  : languageRedux === 2
                    ? 'See CV templates'
                    : languageRedux === 3 && 'CV 샘플 보기'}
              </span>
            </div>
          </div>
        </div>

        <div className="item-imageCv_index item-page_Cv">
          <div className="banner-show_title">
            <h3>
              {languageRedux === 1
                ? 'Mục lục'
                : languageRedux === 2
                  ? 'Table of contents'
                  : languageRedux === 3 && '목차'}
            </h3>
            <ul>
              <li>
                {languageRedux === 1
                  ? `1. CV là gì? Những điều bạn cần lưu ý khi viết CV xin việc`
                  : languageRedux === 2
                    ? `1. What is CV? Things you need to keep in mind when writing your CV`
                    : languageRedux === 3 &&
                      '1. CV란 무엇입니까? CV를 작성할 때 염두에 두어야 할 사항'}
              </li>
              <li>
                {languageRedux === 1
                  ? `2. Cách viết CV xin việc chuẩn`
                  : languageRedux === 2
                    ? `2. How to write a standard job application CV`
                    : languageRedux === 3 && '2. Cách viết CV chuẩn'}
              </li>
              <li>
                {languageRedux === 1
                  ? `3. Cách tạo mẫu CV xin việc đơn giản`
                  : languageRedux === 2
                    ? `3. How to create a simple CV template?`
                    : languageRedux === 3 &&
                      '3. 간단한 CV 템플릿을 만드는 방법'}
              </li>
              <li>
                {languageRedux === 1
                  ? `4. Một số lưu ý khi viết CV và nộp CV bạn nên nắm rõ`
                  : languageRedux === 2
                    ? `4. Some notes when writing and submitting CV for you`
                    : languageRedux === 3 &&
                      '4. CV 작성 및 제출 시 반드시 이해해야 할 사항'}
              </li>
              <li>
                {languageRedux === 1
                  ? `5. Cách gửi CV qua email`
                  : languageRedux === 2
                    ? `5. How to send CV via email`
                    : languageRedux === 3 && '5. 이메일로 CV 보내는 방법`'}
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
