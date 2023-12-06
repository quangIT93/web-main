import React from 'react';
import { Col, Row } from 'antd';
import styles from './style.module.scss';
import {
  EyeChart,
  BagChart,
  SearchedChart,
  RightChart,
} from '#components/Icons';
const ItemsChart = () => {
  return (
    <Row className={styles.row}>
      <Col span={8} className={styles.col}>
        <div className={styles.col_left}>
          <SearchedChart />
        </div>
        <div className={styles.col_right}>
          <div className={styles.col_right__}>
            <span>15</span>
            <div>
              <RightChart />
            </div>
          </div>
          <div>
            <p>Việc làm đã tìm kiếm</p>
          </div>
        </div>
      </Col>
      <Col span={8} className={styles.col}></Col>
      <Col span={8} className={styles.col}></Col>
    </Row>
  );
};

export default ItemsChart;
