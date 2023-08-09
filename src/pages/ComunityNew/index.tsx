import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box, Typography } from '@mui/material';
// import moment, { Moment } from 'moment';

import { Collapse } from 'antd';
import { Skeleton } from 'antd';
import { message } from 'antd';

// import component

import {
  EysIcon,
  CommentIcon,
  LikeIcon,
  EditComunity,
  FilterComunity,
} from '#components/Icons';

// @ts-ignore

import { Navbar } from '#components';

import './style.scss';

const { Panel } = Collapse;

const Comunity = () => {
  const [showText, setShowText] = React.useState('');
  const handleAddText = () => {
    setShowText('showText');
  };
  return (
    <div className="comunity-container">
      <Navbar />
      <div className="comunity-content">
        <div className="comunityPostNew">
          <div className="title-comunity">
            <h3>Hôm nay, HiJob có 10 bài viết mới</h3>
            <div className="title-comunity_icon">
              <EditComunity />
              <FilterComunity />
            </div>
          </div>

          <div className="comunitypostNew-wrap_content">
            <div className="comunityPostNew-content">
              <h3>Kinh nghiệm tìm việc nhà hàng</h3>
              <div className="comunityPostNew-content_info">
                <ul className={`text-content_postNew ${showText}`}>
                  Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                </ul>
                {!showText ? (
                  <span onClick={handleAddText}>Xem thêm...</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="comunitypostNew-wrap_status">
              <div className="status-item">
                <EysIcon />
                <p>123</p>
              </div>
              <div className="status-item">
                <LikeIcon />
                <p>2321</p>
              </div>
              <div className="status-item">
                <CommentIcon />
                <p>2321</p>
              </div>
            </div>

            <div className="comunitypostNew-wrap_actor">
              <div className="comunitypostNew-wrap">
                <img src="../images/banner.png" alt="anh loi" />

                <div className="info-actor_comunity">
                  <p>Tác giả</p>
                  <p>Trần Văn An</p>
                </div>
              </div>
              <p>2 tiếng trước</p>
            </div>
          </div>

          <div className="comunitypostNew-wrap_content">
            <div className="comunityPostNew-content">
              <h3>Kinh nghiệm tìm việc nhà hàng</h3>
              <div className="comunityPostNew-content_info">
                <ul className={`text-content_postNew ${showText}`}>
                  Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                </ul>
                {!showText ? (
                  <span onClick={handleAddText}>Xem thêm...</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="comunitypostNew-wrap_status">
              <div className="status-item">
                <EysIcon />
                <p>123</p>
              </div>
              <div className="status-item">
                <LikeIcon />
                <p>2321</p>
              </div>
              <div className="status-item">
                <CommentIcon />
                <p>2321</p>
              </div>
            </div>

            <div className="comunitypostNew-wrap_actor">
              <div className="comunitypostNew-wrap">
                <img src="../images/banner.png" alt="anh loi" />

                <div className="info-actor_comunity">
                  <p>Tác giả</p>
                  <p>Trần Văn An</p>
                </div>
              </div>
              <p>2 tiếng trước</p>
            </div>
          </div>

          <div className="comunitypostNew-wrap_content">
            <div className="comunityPostNew-content">
              <h3>Kinh nghiệm tìm việc nhà hàng</h3>
              <div className="comunityPostNew-content_info">
                <ul className={`text-content_postNew ${showText}`}>
                  Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                </ul>
                {!showText ? (
                  <span onClick={handleAddText}>Xem thêm...</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="comunitypostNew-wrap_status">
              <div className="status-item">
                <EysIcon />
                <p>123</p>
              </div>
              <div className="status-item">
                <LikeIcon />
                <p>2321</p>
              </div>
              <div className="status-item">
                <CommentIcon />
                <p>2321</p>
              </div>
            </div>

            <div className="comunitypostNew-wrap_actor">
              <div className="comunitypostNew-wrap">
                <img src="../images/banner.png" alt="anh loi" />

                <div className="info-actor_comunity">
                  <p>Tác giả</p>
                  <p>Trần Văn An</p>
                </div>
              </div>
              <p>2 tiếng trước</p>
            </div>
          </div>
          <div className="comunitypostNew-wrap_content">
            <div className="comunityPostNew-content">
              <h3>Kinh nghiệm tìm việc nhà hàng</h3>
              <div className="comunityPostNew-content_info">
                <ul className={`text-content_postNew ${showText}`}>
                  Kinh nghiệm phục vụ nhà hàng cho người mới bắt đầu:
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                  <li>Hiểu rõ công việc mình làm</li>
                  <li>Hiểu và tuân thủ những quy định về đồng phục</li>
                  <li>Hiểu thực đơn của nhà hàng</li>
                </ul>
                {!showText ? (
                  <span onClick={handleAddText}>Xem thêm...</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="comunitypostNew-wrap_status">
              <div className="status-item">
                <EysIcon />
                <p>123</p>
              </div>
              <div className="status-item">
                <LikeIcon />
                <p>2321</p>
              </div>
              <div className="status-item">
                <CommentIcon />
                <p>2321</p>
              </div>
            </div>

            <div className="comunitypostNew-wrap_actor">
              <div className="comunitypostNew-wrap">
                <img src="../images/banner.png" alt="anh loi" />

                <div className="info-actor_comunity">
                  <p>Tác giả</p>
                  <p>Trần Văn An</p>
                </div>
              </div>
              <p>2 tiếng trước</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comunity;
