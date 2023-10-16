import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Navbar } from '#components';

import { IconArrowLeft } from '#components/Icons';
// @ts-ignore
// import Carousel, { CarouselItem } from '#components/PageCv/Carousel';
import PageCv2 from './../PageCv2';
import './style.scss';
import Footer from '#components/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import ModalLogin from '#components/Home/ModalLogin';

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
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="wrap-page_Cv">
      <Navbar />
      <div className="wrap-item_pageCv">
        <div className="item-update_profile item-page_Cv">
          <h5>
            {languageRedux === 1
              ? 'Tạo và lưu nhiều mẫu'
              : 'Create and save multiple templates'}
          </h5>
          <h3>{languageRedux === 1 ? `CV trên Hijob` : 'CV on Hijob'}</h3>
          <p>
            {languageRedux === 1
              ? ' Chức năng tạo và lưu được nhiều CV giúp bạn có nhiều lựa chọn CV để ứng tuyển công việc phù hợp hoặc chia sẻ CV của bạn với các Nhà tuyển dụng!'
              : 'The function to create and save multiple CVs gives you many CV options to choose from Apply for suitable jobs or share your CV with Houses recruitment!'}
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
        <PageCv2 />

        <div className="item-imageCv_bannerShow item-page_Cv">
          <div className="wrap-img_bannerShow">
            <img src="./images/pageCv/web 2 1.png" alt="" />
          </div>
          <div className="banner-show_title">
            <h3>Tạo và tải CV online nhanh chóng</h3>
            <p>
              Chỉ với vài thao tác đơn giản, bạn đã có thể tạo ngay cho mình một
              bản CV chuyên nghiệp để tạo ấn tượng tốt với Nhà tuyển dụng.
            </p>
            <div
              className="wrap-bnt_bannerShow"
              onClick={() => window.open('/profile-cv', '_parent')}
            >
              <span className="btn-bannerShow">Xem các mẫu CV</span>
            </div>
          </div>
        </div>

        <div className="item-imageCv_loggin1 item-page_Cv">
          <div className="banner-show_title">
            <h3>Đa dạng mẫu CV</h3>
            <p>
              Tổng hợp danh sách mẫu CV xin việc làm online phù hợp với nhiều vị
              trí ngành nghề hiện nay.
            </p>
            <div
              className="wrap-cvchange_login"
              style={{ display: isLogin ? 'none' : 'block' }}
              onClick={() => setOpenModalLogin(true)}
            >
              <p className="cv-change_login">
                <span>Đăng nhập ngay</span>
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
            <h3>Tạo và tải CV online nhanh chóng</h3>
            <p>
              {languageRedux === 1
                ? `Sau khi đăng nhập bạn có thể tạo CV với những thông tin được điền
                tự động từ hồ sơ có sẵn của bạn trên HiJob và sử dụng để tìm việc
                ngay.`
                : `After logging in, you can create a CV with information automatically filled in from your existing profile on HiJob and use it to find a job immediately.`}
            </p>
            <div
              className="wrap-cvchange_login"
              style={{ display: isLogin ? 'none' : 'block' }}
              onClick={() => setOpenModalLogin(true)}
            >
              <p className="cv-change_login">
                <span>Đăng nhập ngay</span>
                <IconArrowLeft />
              </p>
            </div>
          </div>
        </div>

        <div className="item-imageCv_index item-page_Cv">
          <div className="banner-show_title">
            <h3>{languageRedux === 1 ? 'Mục lục' : 'Table of contents'}</h3>
            <ul>
              <li>
                {languageRedux === 1
                  ? `CV là gì? Những điều bạn cần lưu ý khi viết CV xin việc`
                  : `What is CV? Things you need to keep in mind when writing your CV`}
              </li>
              <li>
                {languageRedux === 1
                  ? `Cách viết CV xin việc chuẩn`
                  : `How to write a standard job application CV`}
              </li>
              <li>
                {languageRedux === 1
                  ? `Cách tạo mẫu CV xin việc đơn giản`
                  : `How to create a simple CV template?`}
              </li>
              <li>
                {languageRedux === 1
                  ? `Một số lưu ý khi viết CV và nộp CV bạn nên nắm rõ`
                  : `Some notes when writing and submitting CV for you`}
              </li>
              <li>
                {languageRedux === 1
                  ? `Cách gửi CV qua email`
                  : `How to send CV via email`}
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
      <Footer />
    </div>
  );
};

export default PageCv;
