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
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const LogChart = () => {
  const [dataLog, setDataLog] = useState<DataLog | undefined>(undefined);
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const profileV3 = useSelector((state: RootState) => state.dataProfileInformationV3.data);
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
          <h3 className={styles.title_chart}>
            {
              languageRedux === 1 ?
                "Tổng quan hoạt động" :
                languageRedux === 2 ?
                  "Activity overview" :
                  "활동 대시보드"
            }
          </h3>
          <ItemsChart dataLog={dataLog} />
        </div>
        <div className={styles.chart}>
          {dataLog !== undefined && (
            // <Chart dataLog={dataLog} setDataLog={setDataLog} />
            <Chartjs dataLog={dataLog} />
          )}
        </div>
        <div className={styles.chart_itemsCompanyCareChart}>
          <h3 className={styles.title_chart}>
            {
              profileV3.typeRoleData === 0 ?
                languageRedux === 1 ?
                  "Công ty quan tâm đến bạn" :
                  languageRedux === 2 ?
                    "The company cares about you" :
                    "나를 관심하는 회사"
                :
                languageRedux === 1 ?
                  "Ứng viên theo dõi công ty của bạn" :
                  languageRedux === 2 ?
                    "Candidates follow your company" :
                    "내 회사를 관심하는 구직자"
            }
          </h3>
          <ItemsCompanyCareChart />
        </div>
      </div>
    </div>
  );
};

export default LogChart;
