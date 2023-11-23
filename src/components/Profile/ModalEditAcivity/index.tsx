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
            : 'Title length must be greater than 0 and less than 255',
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
            : 'Employer length must be greater than 0 and less than 255',
        checkForm: false,
        idError: 2,
      };
    }

    if (new Date(activity.startDate).getFullYear() > new Date().getFullYear()) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm hiện tại'
            : 'The starting year cannot exceed the current year',
        checkForm: false,
        idError: 3,
      };
    }

    if (new Date(activity.endDate).getFullYear() > new Date().getFullYear()) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm kết thúc không được vượt quá năm hiện tại'
            : 'The final year cannot exceed the current year',
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
            : 'The starting year cannot exceed the final year',
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
            : 'Description length must be greater than 0 and less than 1000',
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
            {languageRedux === 1 ? 'Sửa thông tin hoạt động' : 'Edit Activity'}
          </Typography>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1 ? 'Tiêu đề hoạt động' : 'Function Title'}{' '}
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
                languageRedux === 1 ? 'Tiêu đề hoạt động' : 'Function Title'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {activity.title && activity.title.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề hoạt động không được vượt quá 255 ký tự'
                    : 'Function title cannot exceed 255 characters'}
                </span>
              ) : !activity.title ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề hoạt động không được bỏ trống'
                    : 'Function title cannot be empty'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                activity.title ? activity.title.length : '0'
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
              {languageRedux === 1 ? 'Nhà tuyển dụng' : 'Employer'}{' '}
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
              placeholder={languageRedux === 1 ? 'Nhà tuyển dụng' : 'Employer'}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {activity.organization && activity.organization.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Nhà tuyển dụng không được vượt quá 255 ký tự'
                    : 'Recruitment must not exceed 255 characters'}
                </span>
              ) : !activity.organization ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Nhà tuyển dụng không được bỏ trống'
                    : 'Recruitment cannot be empty'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                activity.organization ? activity.organization.length : '0'
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
                    {languageRedux === 1 ? 'Ngày bắt đầu' : 'Start date'}{' '}
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
                          : 'The start time cannot be greater than the current time.'}
                      </span>
                    ) : !new Date(activity.startDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập Thời gian bắt đầu.'
                          : 'Please enter start date.'}
                      </span>
                    ) : new Date(activity.startDate).getFullYear() < 1900 ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian bắt đầu không thể nhỏ hơn 1900.'
                          : 'The start time cannot be less than 1900.'}
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
                    {languageRedux === 1 ? 'Ngày kết thúc' : 'End date'}{' '}
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
                          : 'The end time cannot be greater than the current time.'}
                      </span>
                    ) : !new Date(activity.endDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập Thời gian kết thúc.'
                          : 'Please enter End date.'}
                      </span>
                    ) : new Date(activity.endDate).getFullYear() < 1900 ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian kết thúc không thể nhỏ hơn 1900.'
                          : 'The end time cannot be less than 1900.'}
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
              {languageRedux === 1 ? 'Mô tả' : 'Description'}{' '}
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
                  : 'Description your activity'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {activity.description.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được bỏ trống'
                    : 'Additional information cannot be empty'}
                </span>
              ) : activity.description.length > 1000 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được vượt quá 1000 ký tự'
                    : 'Additional information cannot exceed 1000 characters'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${activity.description.length}/1000`}</span>
            </div>
          </Box>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {language?.profile_page?.save_info}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalEditActivity;
