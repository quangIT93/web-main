import React from 'react';
import { Col, Row } from 'antd';

import Chart from './chart';
import ItemsChart from '#components/LogChart/ItemsChart/ItemsChart';

const index = () => {
  return (
    <div>
      <div>
        <ItemsChart />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default index;
