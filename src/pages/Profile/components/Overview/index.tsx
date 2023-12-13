import React from 'react';

import { OverviewIcon } from '#components/Icons';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Overview = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  return (
    <Link to="/profile-chart" className={style.overview}>
      <OverviewIcon />
      <p className={style.overview_text}>
        {languageRedux === 1
          ? 'Tổng quan'
          : languageRedux === 2
          ? 'Overview'
          : '대시보드'}
      </p>
    </Link>
  );
};

export default Overview;
