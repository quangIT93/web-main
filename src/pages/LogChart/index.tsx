import React from 'react';
import { Col, Row } from 'antd';

import Chart from '#components/LogChart/Chart';
import ItemsChart from '#components/LogChart/ItemsChart';
import ItemsCompanyCareChart from '#components/LogChart/ItemsCompanyCareChart';
import styles from './style.module.scss';

const index = () => {
  return (
    <div className={styles.container_chart}>
      <div className={styles.chart}>
        <div className={styles.chart_itemsChart}>
          <h3 className={styles.title_chart}>Tổng quan công việc</h3>
          <ItemsChart />
        </div>
        <div className={styles.chart}>
          <Chart />
        </div>
        <div className={styles.chart_itemsCompanyCareChart}>
          <h3 className={styles.title_chart}>Công ty quan tâm đến bạn</h3>
          <ItemsCompanyCareChart />
        </div>
      </div>
    </div>
  );
};

export default index;
