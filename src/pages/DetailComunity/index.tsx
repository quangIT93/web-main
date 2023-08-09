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
        <div className="comunity-detail_post">
          <div className="title-comunity">
            <h3>Hôm nay, HiJob có 10 bài viết mới</h3>
            <div className="title-comunity_icon">
              <EditComunity />
              <FilterComunity />
            </div>
          </div>

          <div className="comunityDetail-wrap_content">
            <div className="comunityDetail-content">
              <ul>
                <li>ajhlkahvfklahvflkhf làljlqjlqjl</li>
                <li>ajhlkahvfklahvflkhf làljlqjlqjl</li>
                <li>ajhlkahvfklahvflkhf làljlqjlqjl</li>
                <li>ajhlkahvfklahvflkhf làljlqjlqjl</li>
                <li>ajhlkahvfklahvflkhf làljlqjlqjl</li>
                <li>ajhlkahvfklahvflkhf làljlqjlqjl</li>
              </ul>
            </div>
          </div>
          <div className="comunityDetail-wrap_img">
            <img src="../images/banner.png" alt="" />
          </div>
          <div className="comunityDetail-wrap_status">
            <div className="comunitypostNew-status_item">
              <EysIcon />
              <p>123</p>
            </div>
            <div className="comunitypostNew-status_item">
              <LikeIcon />
              <p>2321</p>
            </div>
            <div className="comunitypostNew-status_item">
              <CommentIcon />
              <p>2321</p>
            </div>
          </div>
          <div className="comunityDetail-wrap_actor">
            <div className="comunityDetail-wrap">
              <img src="../images/banner.png" alt="anh loi" />

              <div className="info-actor_comunityDetail">
                <p>Tác giả</p>
                <p>Trần Văn An</p>
              </div>
            </div>
            <p>2 tiếng trước</p>
          </div>

          <div className="comunityDetail-wrap_comment">
            <div className="comunityDetail-comment_chater">
              <img
                src="../images/banner.png"
                alt=""
                style={{ width: '50px', height: '50px' }}
              />
              <input type="text" multiple />
            </div>
            <div className="comunityDetail-list_comment">
              <img
                src="../images/banner.png"
                alt=""
                style={{ width: '50px', height: '50px' }}
              />

              <div className="comunityDetail-comment">
                <div className="comunityDetail-comment_top">
                  <h3>Nguyễn Thị Anh</h3>
                  <h3>|</h3>
                  <p>2 tiếng trước</p>
                </div>
                <div className="comunityDetail-comment_bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comunity;
