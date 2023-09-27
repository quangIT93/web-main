import React from 'react';
// @ts-ignore
import { Navbar } from '#components';

import { IconArrowLeft } from '#components/Icons';

import './style.scss';

const PageCv = () => {
  return (
    <div className="wrap-page_Cv">
      <Navbar />
      <div className="wrap-item_pageCv">
        <div className="item-update_profile item-page_Cv">
          <h5>Tạo vào lưu nhiều mẫu</h5>
          <h3>Cv trên Hijob</h3>
          <p>
            Chức năng tạo và lưu được nhiều CV giúp bạn có nhiều lựa chọn CV để
            ứng tuyển công việc phù hợp hoặc chia sẻ CV của bạn với các Nhà
            tuyển dụng!
          </p>
          <div className="button-update_profile">Cập nhật hồ sơ</div>
        </div>
        <div className="item-imageCv_banner item-page_Cv">
          <img src="./images/pageCv/CV 1.png" alt="" />
        </div>
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
            <div className="wrap-bnt_bannerShow">
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
            <div className="wrap-cvchange_login">
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
              Sau khi đăng nhập bạn có thể tạo CV với những thông tin được điền
              tự động từ hồ sơ có sẵn của bạn trên HiJob và sử dụng để tìm việc
              ngay.
            </p>
            <div className="wrap-cvchange_login">
              <p className="cv-change_login">
                <span>Đăng nhập ngay</span>
                <IconArrowLeft />
              </p>
            </div>
          </div>
        </div>

        <div className="item-imageCv_index item-page_Cv">
          <div className="banner-show_title">
            <h3>Mục lục</h3>
            <ul>
              <li>Cv là gì? Những điều bạn cần lưu ý khi viết CV xin việc</li>
              <li>Cách viết CV xin việc chuẩn</li>
              <li>Cách tạo mẫu CV xin việc đơn giản</li>
              <li>Một số lưu ý khi viết CV và nộp CV bạn nên nắm rõ</li>
              <li>Cách gửi CV qua email</li>
            </ul>
          </div>
          <div className="wrap-img_index">
            <img src="./images/pageCv/web 5 1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCv;
