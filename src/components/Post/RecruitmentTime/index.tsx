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
import { postEn } from 'validations/lang/en/post';
import { post } from 'validations/lang/vi/post';

interface IRecruitmentTime {
  startDate: any;
  endDate: any;
  setStartDate: any;
  setEndDate: any;
  language: any;
  languageRedux: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecruitmentTime: React.FC<IRecruitmentTime> = (props) => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    languageRedux,
    language,
    setIsValidSubmit,
  } = props;

  const handleChangeStartTime = (newValue: any, e: any) => {
    var newDate = new Date(newValue._d);
    var newDateTime = newDate.setHours(23, 59, 59, 999);

    setStartDate(newDateTime);
    setIsValidSubmit(false);
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    var newDate = new Date(newValue._d);
    var newDateTime = newDate.setHours(23, 59, 59, 999);

    setEndDate(newDateTime);
    setIsValidSubmit(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Space
        direction="horizontal"
        wrap={true}
        size={[16, 8]}
        style={{ width: '100%' }}
        className="wrapper-time-day modal-person"
      >
        <div className="wrapTimeDay">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            {
              languageRedux === 1
                ? "Ngày bắt đầu"
                : languageRedux === 2
                  ? "Start date"
                  : languageRedux === 3
                    ? '시작일'
                    : "Ngày bắt đầu"
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={startDate ? moment(startDate) : moment(new Date().getTime())}
            onChange={handleChangeStartTime}
            format="DD/MM/YYYY"
            disablePast={true}
            slotProps={{
              textField: {
                id: 'post_job_start_date',
              },
            }}
          />
          <div className="wrap-noti_input">
            {startDate > endDate ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Thời gian bắt đầu không được vượt quá Thời gian kết thúc'
                  : languageRedux === 2
                    ? 'The start date cannot exceed the end date'
                    : languageRedux === 3 &&
                    '시작 날짜는 종료 날짜를 초과할 수 없습니다.'}
              </span>
            ) : !new Date(startDate).getFullYear() ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng nhập thời gian bắt đầu'
                  : languageRedux === 2
                    ? 'Please enter start date'
                    : languageRedux === 3 && '시작일을 입력해 주세요'}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        {/* <div className="connect">-</div> */}
        <div className="wrapTimeDay">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            {
              languageRedux === 1
                ? "Ngày kết thúc"
                : languageRedux === 2
                  ? "End date"
                  : languageRedux === 3
                    ? '종료일'
                    : "Ngày kết thúc"
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={endDate ? moment(endDate) : moment(new Date().getTime())}
            onChange={handleChangeEndTime}
            // minDate={moment(startDate)}
            format="DD/MM/YYYY"
            minDate={moment(startDate)}
            disablePast // Chặn việc chọn các ngày trong quá khứ
            slotProps={{
              textField: {
                id: 'post_job_end_date',
              },
            }}
          />
          <div className="wrap-noti_input">
            {startDate > endDate ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Thời gian bắt đầu không được vượt quá Thời gian kết thúc'
                  : languageRedux === 2
                    ? 'The start date cannot exceed the end date'
                    : languageRedux === 3 &&
                    '시작 날짜는 종료 날짜를 초과할 수 없습니다.'}
              </span>
            ) : !new Date(endDate).getFullYear() ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng nhập ngày kết thúc'
                  : languageRedux === 2
                    ? 'Please enter end date'
                    : languageRedux === 3 && '종료일을 입력해 주세요'}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </Space>
    </LocalizationProvider>
  );
};

export default memo(RecruitmentTime);
