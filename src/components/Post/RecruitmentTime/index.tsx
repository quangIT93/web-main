import React, { memo } from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Typography from '@mui/material/Typography';
import moment from 'moment';
// import { TextField } from '@mui/material';
import { Space } from 'antd';

import { styleLabel } from '../CssPost';
import './style.scss';

interface IRecruitmentTime {
  startDate: any;
  endDate: any;
  setStartDate: any;
  setEndDate: any;
}

const RecruitmentTime: React.FC<IRecruitmentTime> = (props) => {
  const { startDate, endDate, setStartDate, setEndDate } = props;

  const handleChangeStartTime = (newValue: any, e: any) => {
    setStartDate(new Date(newValue._d).getTime());
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEndDate(new Date(newValue._d).getTime());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Space
        direction="horizontal"
        wrap={true}
        size={[16, 8]}
        style={{ width: '100%' }}
        className="wrapper-time-day"
      >
        <div className="wrapTimeDay">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={startDate ? moment(startDate) : moment(new Date())}
            onChange={handleChangeStartTime}
            disablePast={true}
          />
        </div>
        <div className="connect">-</div>
        <div className="wrapTimeDay">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Ngày kết thúc <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={endDate ? moment(endDate) : moment(new Date())}
            onChange={handleChangeEndTime}
            // minDate={moment(startDate)}
            minDate={moment(startDate)}
            disablePast // Chặn việc chọn các ngày trong quá khứ
          />
        </div>
      </Space>
    </LocalizationProvider>
  );
};

export default memo(RecruitmentTime);
