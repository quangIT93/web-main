import React from 'react';
import { Col, Row } from 'antd';
import {
  EyeChart,
  BagChart,
  SearchedChart,
  RightChart,
  ChartCompanyView,
  ChartCompanySave,
  ChartPostSave,
  ChartPostCreate,
} from '#components/Icons';
import styles from './style.module.scss';
const ItemsCompanyCareChart = () => {
  return (
    <div className={styles.container}>
      <Row className={styles.row} align="top">
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartCompanyView />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>
                Lượt công ty xem hồ sơ
              </p>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartCompanySave />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>
                Lượt công ty lưu hồ sơ
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className={styles.row} align="top">
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartPostSave />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>Bài viết đã lưu</p>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={`${styles.col_left} col_left__itemsChart`}>
            <ChartPostCreate />
          </div>
          <div className={styles.col_right}>
            <div className={styles.col_right__top}>
              <span className={styles.col_right__topValue1}>15</span>
              <div className={styles.border_button__right}>
                <RightChart />
              </div>
            </div>
            <div className={styles.col_right__bottom}>
              <p className={styles.col_right__bottomText}>
                Bài viết đã tạo trên HiJob
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ItemsCompanyCareChart;
