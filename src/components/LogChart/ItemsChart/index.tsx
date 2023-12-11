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
import { DataLog } from 'pages/LogChart/typeChart';
import CustomSkeleton from '#components/CustomSkeleton';

const Box: React.FC<{
  ItemValue: {
    title: string;
    icon: JSX.Element;
    id: number;
    total: number | undefined;
  };
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

const ItemsChart: React.FC<{ dataLog: DataLog | undefined }> = (data) => {
  const { dataLog } = data;

  const elements: React.ReactNode[] = Array.from({ length: 3 }, (_, index) => (
    <React.Fragment key={index} />
  ));

  const ItemValue: {
    title: string;
    icon: JSX.Element;
    id: number;
    total: number | undefined;
  }[] = [
    {
      id: 1,
      title: 'Việc làm đã ứng tuyển việc làm',
      icon: <BagChart />,
      total: dataLog?.applyLogs.total,
    },
    {
      id: 2,
      title: 'Việc làm đã xem qua',
      icon: <EyeChart />,
      total: dataLog?.viewPostLogs.total,
    },
    {
      id: 3,
      title: 'Việc làm đã tìm kiếm',
      icon: <SearchedChart />,
      total: dataLog?.searchLogs.total,
    },
  ];

  return (
    <Row className={styles.row} align="top">
      {dataLog
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
