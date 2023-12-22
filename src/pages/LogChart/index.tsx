import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import ItemsChart from '#components/LogChart/ItemsChart';
//@ts-ignore
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
  // console.log('youtubeShorts', youtubeShorts);

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
        <div>
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
