import React, { useEffect } from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// data
import { useDispatch } from 'react-redux';
import {
  setAlert,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';
// import { RootState } from 'store/reducer';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { Input } from 'antd';

import './style.scss';
import apiCv from 'api/apiCv';
import { message } from 'antd';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';

// const { TextArea } = Input;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 840,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
  '@media (max-width: 399px)': {
    width: 360,
  },
  '@media (max-width: 375px)': {
    width: 300,
  },

  '@media (min-width: 400px) and (max-width: 639px)': {
    width: 410,
  },

  '@media (min-width: 640px) and (max-width: 839px)': {
    width: 640,
  },
};

// Style Mui
const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: '14px',
        },
        h6: {
          fontSize: '20px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            fontSize: '14px',
          },
        },
      },
    },
  },
});

// const styleChildBox = {
//   marginBottom: '12px',
// };

interface IModalInternship {
  openModalEditActivity: boolean;
  setOpenModalEditActiviy: React.Dispatch<React.SetStateAction<boolean>>;
  setActivityValues: React.Dispatch<React.SetStateAction<any>>;
  activityId: any;
  activityValue: any;
}
const ModalEditActivity: React.FC<IModalInternship> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    openModalEditActivity,
    setOpenModalEditActiviy,
    setActivityValues,
    activityId,
    activityValue,
  } = props;
  const [activity, setActivity] = React.useState({
    id: activityValue?.id,
    title: activityValue?.title,
    organization: activityValue?.organization,
    startDate: activityValue?.startDate,
    endDate: activityValue?.endDate,
    description: activityValue?.description,
  });

  const dispatch = useDispatch();

  const handleClose = () => setOpenModalEditActiviy(false);

  const handleOnchangeTitle = (e: any) => {
    setActivity((prev: any) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };
  const handleOnchangeDescription = (e: any) => {
    setActivity((prev: any) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };
  const handleOnchangeEmployer = (e: any) => {
    setActivity((prev: any) => {
      return {
        ...prev,
        organization: e.target.value,
      };
    });
  };
  const handleOnchangeStartDate = (newValue: any, e: any) => {
    setActivity((prev: any) => {
      return {
        ...prev,
        startDate: new Date(newValue._d).getTime(),
      };
    });
  };
  const handleOnchangeEndDate = (newValue: any, e: any) => {
    setActivity((prev: any) => {
      return {
        ...prev,
        endDate: new Date(newValue._d).getTime(),
      };
    });
  };

  const validValue = () => {
    if (
      activity.title.trim().length > 255 ||
      activity.title.trim().length === 0
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Độ dài tiêu đề phải lớn hơn 0 và nhỏ hơn 255'
            : languageRedux === 2
              ? 'Title length must be greater than 0 and less than 255'
              : '제목 길이는 0보다 크고 255자보다 작아야 합니다.',
        checkForm: false,
        idError: 1,
      };
    }

    if (
      activity.organization.trim().length > 255 ||
      activity.organization.trim().length === 0
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Độ dài nhà tuyển dụng phải lớn hơn 0 và nhỏ hơn 255'
            : languageRedux === 2
              ? 'Employer length must be greater than 0 and less than 255'
              : languageRedux === 3
                ? '고용주 길이는 0보다 크고 255자보다 작아야 합니다.'
                : 'Độ dài nhà tuyển dụng phải lớn hơn 0 và nhỏ hơn 255',
        checkForm: false,
        idError: 2,
      };
    }

    if (new Date(activity.startDate).getFullYear() > new Date().getFullYear()) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm hiện tại'
            : languageRedux === 2
              ? 'The starting year cannot exceed the current year'
              : '시작 연도는 현재 연도를 초과할 수 없습니다.',
        checkForm: false,
        idError: 3,
      };
    }

    if (new Date(activity.endDate).getFullYear() > new Date().getFullYear()) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm kết thúc không được vượt quá năm hiện tại'
            : languageRedux === 2
              ? 'The final year cannot exceed the current year'
              : languageRedux === 3
                ? '종료 연도는 현재 연도를 초과할 수 없습니다.'
                : 'Năm kết thúc không được vượt quá năm hiện tại',
        checkForm: false,
        idError: 4,
      };
    }

    if (
      new Date(activity.startDate).getFullYear() >
      new Date(activity.endDate).getFullYear()
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm kết thúc'
            : languageRedux === 2
              ? 'The starting year cannot exceed the final year'
              : languageRedux === 3
                ? '시작 연도는 종료 연도를 초과할 수 없습니다.'
                : 'Năm bắt đầu không được vượt quá năm kết thúc',
        checkForm: false,
        idError: 3,
      };
    }

    if (
      activity.description.trim().length > 1000 ||
      activity.description.trim().length === 0
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Độ dài mô tả phải lớn hơn 0 và nhỏ hơn 1000'
            : languageRedux === 2
              ? 'Description length must be greater than 0 and less than 1000'
              : languageRedux === 3
                ? '설명 길이는 0보다 크고 1000보다 작아야 합니다.'
                : 'Độ dài mô tả phải lớn hơn 0 và nhỏ hơn 1000',
        checkForm: false,
        idError: 5,
      };
    }
    return {
      messageError: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleSubmit = async () => {
    try {
      const { messageError, checkForm, idError } = validValue();
      if (checkForm) {
        const result = await apiCv.putProifileActivities(
          activity.title.trim(),
          activity.organization.trim(),
          activity.description.trim(),
          activity.startDate,
          activity.endDate,
          activity.id,
        );
        if (result) {
          const resultProfile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );

          resultProfile &&
            dispatch(setProfileMeInformationMoreV3(resultProfile));
          //   message.success(
          //     languageRedux === 1
          //       ? 'Cập nhật thông tin thành công !'
          //       : 'Update information successfully !',
          //   );
          // activityValue.splice(activityId, 1, activity)
          // setActivityValues(activityValue)
          setOpenModalEditActiviy(false);
          dispatch(setAlertEditInfo(true));
        }
      } else {
        message.error(messageError);
        const profile_activity_edit_title = document.getElementById(
          'profile_activity_edit_title',
        ) as HTMLElement;
        const profile_activity_edit_employer = document.getElementById(
          'profile_activity_edit_employer',
        ) as HTMLElement;
        const profile_activity_edit_description = document.getElementById(
          'profile_activity_edit_description',
        ) as HTMLElement;
        const profile_activity_edit_start_date = document.getElementById(
          'profile_activity_edit_start_date',
        ) as HTMLElement;
        const profile_activity_edit_end_date = document.getElementById(
          'profile_activity_edit_end_date',
        ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_activity_edit_title.focus();
            break;
          case 2:
            profile_activity_edit_employer.focus();
            break;
          case 3:
            profile_activity_edit_start_date.focus();
            break;
          case 4:
            profile_activity_edit_end_date.focus();
            break;
          case 5:
            profile_activity_edit_description.focus();
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalEditActivity}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-activity-container"
      >
        <Box
          sx={style}
          className="Modal-personnal-info modal-person modal-actProfile"
        >
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
              // border: '1px solid',
              borderRadius: '50%',
              padding: '1px',
            }}
            onClick={handleClose}
          >
            <CloseOutlined style={{ fontSize: '30px' }} />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            sx={{ marginBottom: '12px' }}
          >
            {languageRedux === 1
              ? 'Sửa thông tin hoạt động'
              : languageRedux === 2
                ? 'Edit Activity'
                : languageRedux === 3 && '활동 정보 편집'}
          </Typography>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Tiêu đề hoạt động'
                : languageRedux === 2
                  ? 'Function Title'
                  : languageRedux === 3 && '활성 제목'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_activity_edit_title"
              name="skill"
              value={activity.title}
              onChange={handleOnchangeTitle}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Tiêu đề hoạt động'
                  : languageRedux === 2
                    ? 'Function Title'
                    : languageRedux === 3
                      ? '활성 제목'
                      : 'Tiêu đề hoạt động'
              }
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {activity.title && activity.title.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề hoạt động không được vượt quá 255 ký tự'
                    : languageRedux === 2
                      ? 'Function title cannot exceed 255 characters'
                      : languageRedux === 3 &&
                      '활동 제목은 255자를 초과할 수 없습니다.'}
                </span>
              ) : !activity.title ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề hoạt động không được bỏ trống'
                    : languageRedux === 2
                      ? 'Function title cannot be empty'
                      : languageRedux === 3 &&
                      '활동 제목은 비워둘 수 없습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${activity.title ? activity.title.length : '0'
                }/255`}</span>
            </div>
          </Box>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Nhà tuyển dụng'
                : languageRedux === 2
                  ? 'Employer'
                  : languageRedux === 3 && '고용주'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_activity_edit_employer"
              name="skill"
              value={activity.organization}
              onChange={handleOnchangeEmployer}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Nhà tuyển dụng'
                  : languageRedux === 2
                    ? 'Employer'
                    : languageRedux === 3
                      ? '고용주'
                      : 'Nhà tuyển dụng'
              }
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {activity.organization && activity.organization.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Nhà tuyển dụng không được vượt quá 255 ký tự'
                    : languageRedux === 2
                      ? 'Recruitment must not exceed 255 characters'
                      : languageRedux === 3 &&
                      '고용주는 255자를 초과할 수 없습니다.'}
                </span>
              ) : !activity.organization ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Nhà tuyển dụng không được bỏ trống'
                    : languageRedux === 2
                      ? 'Recruitment cannot be empty'
                      : languageRedux === 3 && '고용주는 비워둘 수 없습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${activity.organization ? activity.organization.length : '0'
                }/255`}</span>
            </div>
          </Box>
          <Box sx={{ marginBottom: '12px' }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer
                components={['DatePicker']}
              //   sx={{ display: 'flex' }}
              >
                <div className="activity-time-wraper">
                  <Typography
                    // sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="nameProfile"
                  >
                    {languageRedux === 1
                      ? 'Ngày bắt đầu'
                      : languageRedux === 2
                        ? 'Start date'
                        : languageRedux === 3 && '시작일'}{' '}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    value={moment(activity.startDate)}
                    onChange={handleOnchangeStartDate}
                    views={['year', 'month']}
                    openTo="month"
                    format="MM/YYYY"
                    sx={{
                      '& input': {
                        fontSize: '14px',
                        padding: '8.5px 14px',
                      },
                    }}
                    slotProps={{
                      textField: {
                        id: 'profile_activity_edit_start_date',
                      },
                    }}
                  />
                  <div className="wrap-noti_input">
                    {activity.endDate &&
                      new Date(activity.startDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian bắt đầu không thể lớn hơn thời gian hiện tại.'
                          : languageRedux === 2
                            ? 'The start time cannot be greater than the current time.'
                            : languageRedux === 3 &&
                            '시작 시간은 현재 시간보다 클 수 없습니다.'}
                      </span>
                    ) : !new Date(activity.startDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập thời gian bắt đầu'
                          : languageRedux === 2
                            ? 'Please enter start date'
                            : languageRedux === 3 && '시작일을 입력해 주세요'}
                      </span>
                    ) : new Date(activity.startDate).getFullYear() < 1900 ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian bắt đầu không thể nhỏ hơn 1900.'
                          : languageRedux === 2
                            ? 'The start time cannot be less than 1900.'
                            : languageRedux === 3 &&
                            '시작 시간은 1900보다 작을 수 없습니다.'}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ marginBottom: '12px' }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer
                components={['DatePicker']}
              //   sx={{ display: 'flex' }}
              >
                <div className="activity-time-wraper">
                  <Typography
                    // sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="nameProfile"
                  >
                    {languageRedux === 1
                      ? 'Ngày kết thúc'
                      : languageRedux === 2
                        ? 'End date'
                        : languageRedux === 3 && '종료일'}{' '}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    // slots={{
                    //   id: 'your-datepicker-id',
                    // }}
                    value={moment(activity.endDate)}
                    onChange={handleOnchangeEndDate}
                    views={['year', 'month']}
                    openTo="month"
                    format="MM/YYYY"
                    sx={{
                      '& input': {
                        fontSize: '14px',
                        padding: '8.5px 14px',
                      },
                    }}
                    slotProps={{
                      textField: {
                        id: 'profile_activity_edit_end_date',
                      },
                    }}
                  />
                  <div className="wrap-noti_input">
                    {activity.endDate &&
                      new Date(activity.endDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian kết thúc không thể lớn hơn thời gian hiện tại.'
                          : languageRedux === 2
                            ? 'The end time cannot be greater than the current time.'
                            : languageRedux === 3 &&
                            '종료 시간은 현재 시간보다 클 수 없습니다.'}
                      </span>
                    ) : !new Date(activity.endDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập Thời gian kết thúc.'
                          : languageRedux === 2
                            ? 'Please enter End date.'
                            : languageRedux === 3 && '종료 시간을 입력하세요.'}
                      </span>
                    ) : new Date(activity.endDate).getFullYear() < 1900 ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian kết thúc không thể nhỏ hơn 1900.'
                          : languageRedux === 2
                            ? 'The end time cannot be less than 1900.'
                            : languageRedux === 3 &&
                            '종료 시간은 1900보다 작을 수 없습니다.'}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Mô tả'
                : languageRedux === 2
                  ? 'Description'
                  : languageRedux === 3 && '회사설명'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_activity_edit_description"
              name="skill"
              value={activity.description}
              onChange={handleOnchangeDescription}
              // onKeyDown={(e: any) => handleKeyPress(e)}
              // onPressEnter={(e: any) => handleKeyPress(e)}
              multiline
              rows={6}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Mô tả quá trình thực tập của bạn'
                  : languageRedux === 2
                    ? 'Description your activity'
                    : languageRedux === 3
                      ? '당신의 활동을 설명하십시오'
                      : 'Mô tả quá trình thực tập của bạn'
              }
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {activity.description.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được bỏ trống'
                    : languageRedux === 2
                      ? 'Additional information cannot be empty'
                      : languageRedux === 3 &&
                      '추가 정보는 비워둘 수 없습니다.'}
                </span>
              ) : activity.description.length > 1000 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được vượt quá 1000 ký tự'
                    : languageRedux === 2
                      ? 'Additional information cannot exceed 1000 characters'
                      : languageRedux === 3 &&
                      '추가 정보는 1000자를 초과할 수 없습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${activity.description.length}/1000`}</span>
            </div>
          </Box>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {languageRedux === 1
              ? 'Lưu thông tin'
              : languageRedux === 2
                ? 'Save information'
                : languageRedux === 3 &&
                '정보 저장'}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalEditActivity;
