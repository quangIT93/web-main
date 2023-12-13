import React from 'react';

import { OverviewIcon } from '#components/Icons';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <Link to="/profile-chart" className={style.overview}>
      <OverviewIcon />
      <p className={style.overview_text}>Tổng quan</p>
    </Link>
  );
};

export default Overview;
