import React, { memo } from 'react';
// import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { styleLabel } from '../CssEditPost';
import Typography from '@mui/material/Typography';
import moment from 'moment';
// import { SwapRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './style.scss';
interface IEditPostTime {
  editDataPosted: any;
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>;
  language: any;
  languageRedux: any;
}

const EditPostTime: React.FC<IEditPostTime> = (props) => {
  const { editDataPosted, setEditDataPosted, language, languageRedux } = props;

  const handleChangeStartTime = (newValue: any, e: any) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      startTime: new Date(newValue._d).getTime(),
    }));
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      endTime: new Date(newValue._d).getTime(),
    }));
  };

  return editDataPosted ? (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div className="wrap-editTime_left">
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
              defaultValue={moment(new Date(editDataPosted.startTime))}
              //sx={{ width: '80%' }}
              onChange={handleChangeStartTime}
              value={moment(new Date(editDataPosted.startTime))}
            />

            <TimePicker
              // ampm={false}
              ampmInClock={false}
              defaultValue={moment(new Date(editDataPosted.endTime))}
              //sx={{ width: '80%' }}
              value={moment(new Date(editDataPosted.endTime))}
              onChange={handleChangeEndTime}
            />
          </Space>
        </div>
      </DemoContainer>
    </LocalizationProvider>
  ) : (
    <></>
  );
};

export default memo(EditPostTime);
