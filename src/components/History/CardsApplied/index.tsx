import React, { useEffect, useState, useMemo } from 'react';
// import moment, { Moment } from 'moment'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import { Space, Tooltip } from 'antd'
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
// import ImageListItem from '@mui/material/ImageListItem'
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
// import { Box, Typography, MenuItem, TextField, Button } from '@mui/material'
// import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons'

// import { Skeleton } from 'antd'
// import { Col, Row } from 'antd'

// import data
// import historyApplicator from 'api/historyApplicator'

// import component
import CardsAppliedAll from '../CardsAppliedAll';
import CardsAppliedApproved from '../CardsAppliedApproved';
import CardsAppliedPending from '../CardsAppliedPending';

interface ICardsApplied {
  activeChild: string;
}

const CardsApplied: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props;

  const AppliedAll = useMemo(() => {
    if (activeChild === '0-0') {
      return <CardsAppliedAll activeChild={activeChild} />;
    }
  }, [activeChild]);

  const AppliedPending = useMemo(() => {
    if (activeChild === '0-2') {
      return <CardsAppliedPending activeChild={activeChild} />;
    }
    return null;
  }, [activeChild]);

  const AppliedApproved = useMemo(() => {
    if (activeChild === '0-1') {
      return <CardsAppliedApproved activeChild={activeChild} />;
    }
    return null;
  }, [activeChild]);

  return (
    <>
      <>
        {AppliedAll}
        {AppliedApproved}
        {AppliedPending}
      </>
    </>
  );
};

export default CardsApplied;
