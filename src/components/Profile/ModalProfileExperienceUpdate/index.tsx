import React, { useState } from 'react';
import { Box, TextField, Modal, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
// import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { CloseOutlined } from '@ant-design/icons';

// data
import profileApi from 'api/profileApi';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';

import { message } from 'antd';

import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

import './style.scss';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
import { setAlertEditInfo } from 'store/reducer/profileReducer/alertProfileReducer';

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

const styleChildBox = {
  marginBottom: '12px',
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
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          fontSize: '14px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
});

// interface IExperience {
//   id: number | null;
//   companyName: string;
//   title: string;
//   startDate: number;
//   endDate: number;
//   extraInformation: string;
// }

interface IModalProfileExperienceUpdate {
  openModalExperienceUpdate: boolean;
  setOpenModalExperienceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  typeItem: string;
  experienceId?: number | null;
  experienceValue: any;
}

interface IInfoExperience {
  experienceId?: number | null;
  companyName: string;
  title: string;
  startDate: number;
  endDate: number;
  extraInformation: string;
}

const ModalProfileExperienceUpdate: React.FC<IModalProfileExperienceUpdate> = (
  props,
) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    openModalExperienceUpdate,
    setOpenModalExperienceUpdate,
    experienceId,
    experienceValue,
  } = props;
  // console.log('typeItem', typeItem)
  const dispatch = useDispatch();

  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  const [messageApi, contextHolder] = message.useMessage();

  const [experience, setExperience] = useState<IInfoExperience>({
    experienceId,
    companyName: experienceValue.companyName,
    title: experienceValue.title,
    startDate: experienceValue.startDate,
    endDate: experienceValue.endDate,
    extraInformation: experienceValue.extraInformation,
  });

  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);

  const handleClose = () => setOpenModalExperienceUpdate(false);

  // school
  const handleChangeSchool = (e: any) => {
    setExperience((preValue) => {
      return { ...preValue, companyName: e.target.value };
    });
  };

  // time
  const handleChangeStartTime = (newValue: any, e: any) => {
    setExperience((preValue) => {
      return {
        ...preValue,
        startDate: new Date(newValue._d).getTime(),
      };
    });
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    // console.log(
    //   'new Date(newValue.$d).getTime()',
    //   new Date(newValue.$d).getTime()
    // )

    setExperience((preValue) => {
      return {
        ...preValue,
        endDate: new Date(newValue._d).getTime(),
      };
    });
  };

  // major
  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setExperience((preValue) => {
      return { ...preValue, title: e.target.value };
    });
  };

  const handleChangeExtraInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setExperience((preValue) => {
      return { ...preValue, extraInformation: e.target.value };
    });
  };

  // submit
  const validValue = () => {
    if (experience.title === '') {
      return {
        message: language?.profile_page?.err_professional,
        checkForm: false,
        idError: 1,
      };
    }
    if (experience.title?.trim().length > 50) {
      return {
        message:
          languageRedux === 1
            ? 'Tiêu đề không được vượt quá 50 ký tự'
            : languageRedux === 2
              ? 'Professional title cannot exceed 50 characters'
              : languageRedux === 3 && '제목은 50자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }

    if (experience.companyName === '') {
      return {
        message: language?.profile_page?.err_company,
        checkForm: false,
        idError: 2,
      };
    }
    if (experience.companyName?.trim().length > 50) {
      return {
        message:
          languageRedux === 1
            ? 'Tên công ty không được vượt quá 50 ký tự'
            : languageRedux === 2
              ? 'Company names cannot exceed 50 characters'
              : languageRedux === 3 && '회사 이름은 50자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 2,
      };
    }
    // console.log('NaN', experience.startDate);

    if (!experience.startDate) {
      return {
        message: language?.profile_page?.err_start_time,
        checkForm: false,
        idError: 3,
      };
    }

    if (
      new Date(experience.startDate).getFullYear() > new Date().getFullYear()
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm hiện tại'
            : languageRedux === 2
              ? 'The starting year cannot exceed the current year'
              : languageRedux === 3
                ? '시작 연도는 현재 연도를 초과할 수 없습니다.'
                : 'Năm bắt đầu không được vượt quá năm hiện tại',
        checkForm: false,
        idError: 3,
      };
    }

    if (!experience.endDate) {
      return {
        message: language?.profile_page?.err_finish_time,
        checkForm: false,
        idError: 4,
      };
    }

    if (new Date(experience.endDate).getFullYear() > new Date().getFullYear()) {
      return {
        message:
          languageRedux === 1
            ? 'Năm kết thúc không được vượt quá năm hiện tại'
            : languageRedux === 2
              ? 'The final year cannot exceed the current year'
              : '종료 연도는 현재 연도를 초과할 수 없습니다.',
        checkForm: false,
        idError: 4,
      };
    }

    if (
      new Date(experience.startDate).getFullYear() >
      new Date(experience.endDate).getFullYear()
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm kết thúc'
            : languageRedux === 2
              ? 'The starting year cannot exceed the final year'
              : languageRedux === 3
                ? '시작 연도는 종료 연도를 초과할 수 없습니다.'
                : 'Năm bắt đầu không được vượt quá năm kết thúc',
        checkForm: false,
        idError: 4,
      };
    }

    if (experience.extraInformation === '') {
      return {
        message: languageRedux === 1
          ? 'Vui lòng nhập thông tin bổ sung'
          : languageRedux === 2
            ? 'Please enter additional information'
            : '추가 정보를 입력해주세요',
        checkForm: false,
        idError: 5,
      };
    }
    if (experience.extraInformation?.trim().length > 500) {
      return {
        message:
          languageRedux === 1
            ? 'Thông tin bố sung không được vượt quá 500 ký tự'
            : languageRedux === 2
              ? 'Additional information cannot exceed 500 characters'
              : languageRedux === 3 &&
              '추가 정보는 500자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 5,
      };
    }
    // if (experience.endDate > experience.startDate) {
    //   return {
    //     message: 'Ngày bắt đầu không thể lớn hơn ngày kết thúc',
    //     checkForm: false,
    //   };
    // }

    return {
      message: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleSubmit = async () => {
    const { message, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        const result = await profileApi.updateProfileExperience(experience);
        if (result) {
          const profile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );
          if (profile) {
            dispatch(setProfileMeInformationMoreV3(profile));
            dispatch(setAlertEditInfo(true));
          }
          setOpenModalExperienceUpdate(false);
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
        const profile_experience_edit_professional_titles =
          document.getElementById(
            'profile_experience_edit_professional_titles',
          ) as HTMLElement;
        const profile_experience_edit_company_organization =
          document.getElementById(
            'profile_experience_edit_company_organization',
          ) as HTMLElement;
        const profile_experience_edit_additional_information =
          document.getElementById(
            'profile_experience_edit_additional_information',
          ) as HTMLElement;
        const profile_experience_edit_start_date = document.getElementById(
          'profile_experience_edit_start_date',
        ) as HTMLElement;
        const profile_experience_edit_end_date = document.getElementById(
          'profile_experience_edit_end_date',
        ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_experience_edit_professional_titles.focus();
            break;
          case 2:
            profile_experience_edit_company_organization.focus();
            break;
          case 3:
            profile_experience_edit_start_date.focus();
            break;
          case 4:
            profile_experience_edit_end_date.focus();
            break;
          case 5:
            profile_experience_edit_additional_information.focus();
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: languageRedux === 1
          ? 'Vui lòng kiểm tra lại thông tin đã nhập'
          : languageRedux === 2
            ? 'Please check the information entered again'
            : '입력한 정보를 다시 확인해 주세요.',
      });
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && event.target.id !== 'extraExp_info') {
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalExperienceUpdate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={handleKeyDown}
      >
        <Box
          sx={style}
          className="Modal-personnal-info modal-person modal-educationProfileUpdate"
        >
          {contextHolder}
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
            {
              languageRedux === 1
                ? 'Sửa thông tin kinh nghiệm làm việc'
                : languageRedux === 2
                  ? 'Edit working experience'
                  : '경력 정보 편집'
            }
          </Typography>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Chức danh'
                : languageRedux === 2
                  ? 'Professional titles'
                  : '제목'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_experience_edit_professional_titles"
              name="title"
              value={experience.title}
              onChange={handleChangeTitle}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={languageRedux === 1
                ? 'Chức danh'
                : languageRedux === 2
                  ? 'Professional titles'
                  : '제목'}
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {experience.title && experience.title.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 50 ký tự.'
                    : languageRedux === 2
                      ? 'You have entered more than 50 characters.'
                      : languageRedux === 3 && '50자를 초과하여 입력했습니다.'}
                </span>
              ) : !experience.title ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Vui lòng nhập chức danh.'
                    : languageRedux === 2
                      ? 'Please enter your title.'
                      : languageRedux === 3 && '당신의 직함을 입력해 주세요'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${experience.title ? experience.title.length : '0'
                }/50`}</span>
            </div>
          </Box>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Công ty/Tổ chức'
                : languageRedux === 2
                  ? 'Company/Organization'
                  : '회사/조직'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_experience_edit_company_organization"
              name="title"
              value={experience.companyName}
              onChange={handleChangeSchool}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={languageRedux === 1
                ? 'Công ty/Tổ chức'
                : languageRedux === 2
                  ? 'Company/Organization'
                  : '회사/조직'}
            // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {experience.companyName && experience.companyName.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 50 ký tự.'
                    : languageRedux === 2
                      ? 'You have entered more than 50 characters.'
                      : languageRedux === 3 && '50자를 초과하여 입력했습니다.'}
                </span>
              ) : !experience.companyName ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Vui lòng nhập tên trường/tổ chức.'
                    : languageRedux === 2
                      ? 'Please enter school/organization.'
                      : languageRedux === 3 && '학교/기관명을 입력해주세요.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${experience.companyName ? experience.companyName.length : '0'
                }/50`}</span>
            </div>
          </Box>

          <Box sx={styleChildBox}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer
                components={['DatePicker', 'DatePicker']}
                sx={{ display: 'flex' }}
              >
                <div className="wrapTimeDay">
                  <Typography
                    // sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="startTime"
                  >
                    {languageRedux === 1
                      ? 'Thời gian bắt đầu'
                      : languageRedux === 2
                        ? 'Start time'
                        : '시작 시간'}{' '}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    value={moment(experience.startDate)}
                    onChange={handleChangeStartTime}
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
                        id: 'profile_experience_edit_start_date',
                      },
                    }}
                  />
                  <div className="wrap-noti_input">
                    {experience.startDate &&
                      new Date(experience.startDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian bắt đầu không thể lớn hơn thời gian hiện tại.'
                          : languageRedux === 2
                            ? 'The start time cannot be greater than the current time.'
                            : languageRedux === 3 &&
                            '시작 시간은 현재 시간보다 클 수 없습니다.'}
                      </span>
                    ) : !new Date(experience.startDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập thời gian bắt đầu'
                          : languageRedux === 2
                            ? 'Please enter start date'
                            : languageRedux === 3 && '시작일을 입력해 주세요'}
                      </span>
                    ) : new Date(experience.startDate).getFullYear() < 1900 ? (
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
                <div className="wrapTimeDay" style={{ marginTop: '0px' }}>
                  <Typography
                    // sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="startTime"
                  >
                    {languageRedux === 1
                      ? 'Thời gian kết thúc'
                      : languageRedux === 2
                        ? 'End time'
                        : '종료 시간'}{' '}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    value={moment(experience.endDate)}
                    onChange={handleChangeEndTime}
                    views={['year', 'month']}
                    openTo="month"
                    minDate={moment(experience.startDate)}
                    format="MM/YYYY"
                    sx={{
                      '& input': {
                        fontSize: '14px',
                        padding: '8.5px 14px',
                      },
                    }}
                    slotProps={{
                      textField: {
                        id: 'profile_experience_edit_end_date',
                      },
                    }}
                  />
                  <div className="wrap-noti_input">
                    {experience.endDate &&
                      new Date(experience.endDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian kết thúc không thể lớn hơn thời gian hiện tại.'
                          : languageRedux === 2
                            ? 'The end time cannot be greater than the current time.'
                            : languageRedux === 3 &&
                            '종료 시간은 현재 시간보다 클 수 없습니다.'}
                      </span>
                    ) : !new Date(experience.endDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập Thời gian kết thúc.'
                          : languageRedux === 2
                            ? 'Please enter End date.'
                            : languageRedux === 3 && '종료 시간을 입력하세요.'}
                      </span>
                    ) : new Date(experience.endDate).getFullYear() < 1900 ? (
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
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="startTime"
            >
              {languageRedux === 1
                ? 'Thông tin bổ sung'
                : languageRedux === 2
                  ? 'Additional information'
                  : '추가 정보'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              // className={classes.textarea}
              value={experience.extraInformation}
              onChange={handleChangeExtraInfo}
              sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
              multiline
              rows={4}
              id="profile_experience_edit_additional_information"
              // label="Một số đặc điểm nhận diện công ty"
              placeholder={languageRedux === 1
                ? 'Thông tin bổ sung'
                : languageRedux === 2
                  ? 'Additional information'
                  : '추가 정보'}
            />
            <div className="wrap-noti_input">
              {experience.extraInformation &&
                experience.extraInformation.length > 500 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 500 ký tự.'
                    : languageRedux === 2
                      ? 'You have entered more than 500 characters.'
                      : languageRedux === 3 && '500자를 초과하여 입력했습니다.'}
                </span>
              ) : !experience.extraInformation ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Vui lòng nhập thông tin bổ sung.'
                    : languageRedux === 2
                      ? 'Please enter additional information.'
                      : languageRedux === 3 && '추가 정보를 입력해주세요'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${experience.extraInformation
                ? experience.extraInformation.length
                : '0'
                }/500`}</span>
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

export default ModalProfileExperienceUpdate;
