import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import ItemsChart from '#components/LogChart/ItemsChart';
import ItemsOtherChart from '#components/LogChart/ItemsOtherChart';

import profileApi from 'api/profileApi';

import styles from './style.module.scss';
// import { useSelector } from 'react-redux';
// import { RootState } from 'store';

import { DataLog, DataLogRecuiter } from './typeChart';
import Chartjs from '#components/LogChart/Chartjs';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  CustomSkeleton,
  ImageChangeSkeleton,
} from '#components/CustomSkeleton';

const LogChart = () => {
  const [dataLog, setDataLog] = useState<DataLog | undefined>(undefined);
  const [dataLogRecruiter, setDataLogRecruiter] = useState<
    DataLogRecuiter | undefined
  >(undefined);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const elements: React.ReactNode[] = Array.from({ length: 3 }, (_, index) => (
    <React.Fragment key={index} />
  ));
  const dataChart = async () => {
    const result = await profileApi.activityLog();
    if (result) {
      setDataLog({ type: 'Normal', ...result.data });
      setDataLogRecruiter(undefined);
    }
  };

  const dataChartRecruiter = async () => {
    const result = await profileApi.activityLogRecruiter();
    if (result) {
      setDataLogRecruiter({ type: 'Recuiter', ...result.data });
      setDataLog(undefined);
    }
  };

  useEffect(() => {
    if (profileV3 && profileV3.typeRoleData === 0) {
      dataChart();
    } else {
      dataChartRecruiter();
    }
  }, []);

  return (
    <div className={styles.container_chart}>
      <div className={styles.chart}>
        <div className={styles.chart_itemsChart}>
          <h3 className={styles.title_chart}>
            {languageRedux === 1
              ? 'Tổng quan hoạt động'
              : languageRedux === 2
              ? 'Activity overview'
              : '활동 대시보드'}
          </h3>

          {dataLog ? (
            <ItemsChart dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : dataLogRecruiter ? (
            <ItemsChart dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : (
            <Row className={styles.row}>
              {elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
            </Row>
          )}
        </div>
        <div className={styles.chart}>
          {dataLog ? (
            <Chartjs dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : dataLogRecruiter ? (
            <Chartjs dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : (
            <div
              style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #aaa',
                borderRadius: '12px',
                backgroundColor: '#edebeb',
              }}
            >
              <ImageChangeSkeleton />
            </div>
          )}
        </div>
        <div className={styles.chart_itemsCompanyCareChart}>
          <h3 className={styles.title_chart}>
            {profileV3.typeRoleData === 0
              ? languageRedux === 1
                ? 'Công ty quan tâm đến bạn'
                : languageRedux === 2
                ? 'The company cares about you'
                : '나를 관심하는 회사'
              : languageRedux === 1
              ? 'Ứng viên theo dõi công ty của bạn'
              : languageRedux === 2
              ? 'Candidates follow your company'
              : '내 회사를 관심하는 구직자'}
          </h3>
          <ItemsOtherChart
            dataLog={dataLog}
            dataLogRecruiter={dataLogRecruiter}
          />
        </div>
      </div>
    </div>
  );
};

export default LogChart;
