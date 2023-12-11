import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import ItemsChart from '#components/LogChart/ItemsChart';
import ItemsCompanyCareChart from '#components/LogChart/ItemsCompanyCareChart';

import profileApi from 'api/profileApi';

import styles from './style.module.scss';
// import { useSelector } from 'react-redux';
// import { RootState } from 'store';

import { DataLog } from './typeChart';
import Chartjs from '#components/LogChart/Chartjs';

const LogChart = () => {
  const [dataLog, setDataLog] = useState<DataLog | undefined>(undefined);

  const dataChart = async () => {
    const result = await profileApi.activityLog();
    if (result) {
      setDataLog(result.data);
    }
  };

  useEffect(() => {
    dataChart();
  }, []);

  return (
    <div className={styles.container_chart}>
      <div className={styles.chart}>
        <div className={styles.chart_itemsChart}>
          <h3 className={styles.title_chart}>Tổng quan công việc</h3>
          <ItemsChart dataLog={dataLog} />
        </div>
        <div className={styles.chart}>
          {dataLog !== undefined && (
            // <Chart dataLog={dataLog} setDataLog={setDataLog} />
            <Chartjs dataLog={dataLog} />
          )}
        </div>
        <div className={styles.chart_itemsCompanyCareChart}>
          <h3 className={styles.title_chart}>Công ty quan tâm đến bạn</h3>
          <ItemsCompanyCareChart />
        </div>
      </div>
    </div>
  );
};

export default LogChart;
