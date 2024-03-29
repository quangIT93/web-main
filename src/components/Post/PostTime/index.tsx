import React, { memo } from 'react';
// import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { styleLabel } from '../CssPost';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import './style.scss';
// import { SwapRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
interface IPostTime {
  startTime: any;
  endTime: any;
  setStartTime: any;
  setEndTime: any;
  language: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  languageRedux: any
}
const PostTime: React.FC<IPostTime> = (props) => {
  const { startTime,
    endTime,
    setStartTime,
    setEndTime,
    language,
    setIsValidSubmit,
    languageRedux } = props;

  // const [startTime, setStartTime] = React.useState<any>(
  //   new Date(1970, 0, 2, 7, 0).getTime(),
  // );

  // const [endTime, setEndTime] = React.useState<any>(
  //   new Date(1970, 0, 2, 17, 0).getTime(),
  // );
  const handleChangeStartTime = (newValue: any, e: any) => {
    setStartTime(new Date(newValue._d).getTime());
    setIsValidSubmit(false)
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEndTime(new Date(newValue._d).getTime());
    setIsValidSubmit(false)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div className="wrap-time_left">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            {
              languageRedux === 1
                ? "Giờ làm việc"
                : languageRedux === 2
                  ? "Working hours"
                  : languageRedux === 3
                    ? '근무시간'
                    : "Giờ làm việc"
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Space
            direction="horizontal"
            wrap={true}
            size={[16, 8]}
            style={{ width: '100%' }}
          >
            <TimePicker
              // ampm={false}
              ampmInClock={false}
              defaultValue={moment(new Date(startTime))}
              //sx={{ width: '80%' }}
              onChange={handleChangeStartTime}
              value={moment(new Date(startTime))}
            />
            <div className="connect">-</div>
            {/* <SwapRightOutlined className="icon-time" style={{ fontSize: 35 }} /> */}
            <TimePicker
              // ampm={false}
              ampmInClock={false}
              defaultValue={moment(new Date(endTime))}
              // sx={{ width: '30%' }}
              value={moment(new Date(endTime))}
              onChange={handleChangeEndTime}
            />
          </Space>
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default memo(PostTime);
