import React, { useState, memo } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { TextField } from '@mui/material';
import { Space } from 'antd';

import { styleLabel } from '../CssEditPost';
import './style.scss';

interface IEditRecruitmentTime {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>;
  editDataPosted: any;
}

const EditRecruitmentTime: React.FC<IEditRecruitmentTime> = (props) => {
  const { setEditDataPosted, editDataPosted } = props;

  const handleChangeStartTime = (newValue: any, e: any) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      startDate: new Date(newValue._d).getTime(),
    }));
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      endDate: new Date(newValue._d).getTime(),
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Space
        direction="horizontal"
        wrap={true}
        size={[16, 8]}
        style={{ width: '100%' }}
        className="EditRecruitmentTime"
      >
        <div className="wrap-editPost_time">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={
              editDataPosted.startDate
                ? moment(editDataPosted.startDate)
                : moment(new Date())
            }
            onChange={handleChangeStartTime}
          />
        </div>
        {/* <div className="connect">-</div> */}
        <div className="wrap-editPost_time">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Ngày kết thúc <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={
              editDataPosted.endDate
                ? moment(editDataPosted.endDate)
                : moment(new Date())
            }
            onChange={handleChangeEndTime}
          />
        </div>
      </Space>
    </LocalizationProvider>
  );
};

export default memo(EditRecruitmentTime);
