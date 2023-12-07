import React from 'react';
import { Col, Row } from 'antd';
import styles from './style.module.scss';
import './style.scss';
import {
  EyeChart,
  BagChart,
  SearchedChart,
  RightChart,
} from '#components/Icons';

const Box: React.FC<{
  children: React.ReactNode;
  width: number;
  height: number;
}> = (props) => (
  <p
    className={`height-${props.height}`}
    style={{
      height: `${props.height}px`,
      width: `${props.width}px`,
      display: 'flex',
    }}
  >
    {props.children}
  </p>
);

const ItemsChart = () => {
  return (
    <Row className={styles.row} align="top">
      <Col span={4} className={styles.col}>
        <div className={`${styles.col_left} col_left__itemsChart`}>
          <BagChart />
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
              Việc làm đã ứng tuyển việc làm
            </p>
          </div>
        </div>
      </Col>
      <Col span={4} className={styles.col}>
        <div className={`${styles.col_left} col_left__itemsChart`}>
          <EyeChart />
        </div>
        <div className={styles.col_right}>
          <div className={styles.col_right__top}>
            <span className={styles.col_right__topValue2}>15</span>
            <div className={styles.border_button__right}>
              <RightChart />
            </div>
          </div>
          <div className={styles.col_right__bottom}>
            <p className={styles.col_right__bottomText}>Việc làm đã xem qua</p>
          </div>
        </div>
      </Col>
      <Col span={4} className={styles.col}>
        <div className={`${styles.col_left} col_left__itemsChart`}>
          <SearchedChart />
        </div>
        <div className={styles.col_right}>
          <div className={styles.col_right__top}>
            <span className={styles.col_right__topValue3}>15</span>
            <div className={styles.border_button__right}>
              <RightChart />
            </div>
          </div>
          <div className={styles.col_right__bottom}>
            <p className={styles.col_right__bottomText}>Việc làm đã tìm kiếm</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ItemsChart;
