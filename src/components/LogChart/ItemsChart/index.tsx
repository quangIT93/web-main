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
import { DataLog, DataLogRecuiter } from 'pages/LogChart/typeChart';
import { CustomSkeleton } from '#components/CustomSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type PropItemValue = {
  id: number;
  title: string;
  icon: JSX.Element;
  total: number | undefined;
};

const Box: React.FC<{
  ItemValue: PropItemValue;
}> = ({ ...props }) => {
  const { ItemValue } = props;
  return (
    <Col span={4} className={styles.col}>
      <div className={`${styles.col_left} col_left__itemsChart`}>
        {ItemValue.icon}
      </div>
      <div className={styles.col_right}>
        <div className={styles.col_right__top}>
          <span
            className={
              ItemValue.id === 3
                ? styles.col_right__topValue3
                : ItemValue.id === 2
                ? styles.col_right__topValue2
                : styles.col_right__topValue1
            }
          >
            {ItemValue ? ItemValue?.total : 0}
          </span>
          <div className={styles.border_button__right}>
            <RightChart />
          </div>
        </div>
        <div className={styles.col_right__bottom}>
          <p className={styles.col_right__bottomText}>{ItemValue.title}</p>
        </div>
      </div>
    </Col>
  );
};

const ItemsChart: React.FC<{
  dataLog: DataLog | undefined;
  dataLogRecruiter: DataLogRecuiter | undefined;
}> = (data) => {
  const { dataLog, dataLogRecruiter } = data;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const elements: React.ReactNode[] = Array.from({ length: 3 }, (_, index) => (
    <React.Fragment key={index} />
  ));

  const ItemValue: PropItemValue[] = [
    {
      id: 1,
      title: dataLog
        ? languageRedux === 1
          ? 'Việc làm đã ứng tuyển'
          : languageRedux === 2
          ? 'Applied job'
          : '지원한 채용공고'
        : languageRedux === 1
        ? 'Ứng viên đã tuyển dụng'
        : languageRedux === 2
        ? 'Recruited candidates'
        : '지원한 구직자',
      icon: <BagChart />,
      total: dataLog
        ? dataLog?.applyLogs.total
        : dataLogRecruiter?.applyLogs.total,
    },
    {
      id: 2,
      title: dataLog
        ? languageRedux === 1
          ? 'Việc làm đã xem qua'
          : languageRedux === 2
          ? 'Viewed job'
          : '본 채용공고'
        : languageRedux === 1
        ? 'Ứng viên đã xem qua'
        : languageRedux === 2
        ? 'Viewed candidates'
        : '본 구지자',
      icon: <EyeChart />,
      total: dataLog
        ? dataLog?.viewPostLogs.total
        : dataLogRecruiter?.viewCandidateLogs.total,
    },
    {
      id: 3,
      title: dataLog
        ? languageRedux === 1
          ? 'Lượt công ty xem hồ sơ'
          : languageRedux === 2
          ? 'Number of companies that viewed the profile'
          : '내 이력서를 본 회사 조회 수'
        : languageRedux === 1
        ? 'Ứng viên đã lưu lại'
        : languageRedux === 2
        ? 'Saved candidates'
        : '저장한 구직자',
      icon: <SearchedChart />,
      total: dataLog
        ? dataLog?.viewProfileLogs.total
        : dataLogRecruiter?.saveCandidateLogs.total,
    },
  ];

  return (
    <Row className={styles.row} align="top">
      {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
        ? ItemValue.map((value, index) => {
            return <Box key={index} ItemValue={value} />;
          })
        : elements.map((value, index: number) => (
            <CustomSkeleton key={index} />
          ))}
    </Row>
  );
};

export default ItemsChart;
