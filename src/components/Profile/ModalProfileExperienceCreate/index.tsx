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

import { RootState } from '../../../store/reducer/index';
import { useDispatch, useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';

// data
import profileApi from 'api/profileApi';
import { message } from 'antd';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import './style.scss';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
import { setAlertSuccess } from 'store/reducer/profileReducer/alertProfileReducer';
// import { useDispatch } from 'react-redux';
// import {
//   getProfile,
//   resetProfileState,
// } from 'store/reducer/profileReducer/getProfileReducer';

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
  },
});

interface IExperience {
  id: number | null;
  companyName: string;
  title: string;
  startDate: number;
  endDate: number;
  extraInformation: string;
}

interface IModalProfileExperienceCreate {
  openModalExperienceCreate: boolean;
  setOpenModalExperienceCreate: React.Dispatch<React.SetStateAction<boolean>>;
  typeItem: string;
  educations: IExperience[];
}

interface IInfoExperience {
  companyName: string;
  title: string;
  startDate: number;
  endDate: number;
  extraInformation: string;
}

const ModalProfileExperienceCreate: React.FC<IModalProfileExperienceCreate> = (
  props,
) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    openModalExperienceCreate,
    setOpenModalExperienceCreate,
    // typeItem,
    // educations,
  } = props;
  // console.log('typeItem', typeItem)
  // const dispatch = useDispatch();
  // const [companyName, setCompanyName] = useState<string>('')
  // const [startDate, setStartDate] = React.useState<any>(
  //   new Date(2023, 4, 30, 0, 0).getTime()
  // )
  // const [endDate, setEndDate] = React.useState<any>(
  //   new Date(2023, 4, 30, 0, 0).getTime()
  // )
  // const [major, setMajor] = useState<string>('')
  // const [extraInformation, setExtraInformation] = useState<string>('')
  const [experience, setExperience] = useState<IInfoExperience>({
    companyName: '',
    title: '',
    startDate: new Date(2017, 4, 1, 0, 0).getTime(),
    endDate: new Date(2023, 4, 30, 0, 0).getTime(),
    extraInformation: '',
  });
  // const [language, setLanguageState] = React.useState<any>();
  const dispatch = useDispatch();
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

  // console.log('endDate', endDate)

  const handleClose = () => setOpenModalExperienceCreate(false);

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
    if (experience.title?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Tiêu đề không được bỏ trống'
            : languageRedux === 2
              ? 'Title cannot be empty'
              : languageRedux === 3 && '제목은 비워둘 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (experience.title?.trim().length > 50) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tiêu đề không được vượt quá 50 ký tự'
            : languageRedux === 2
              ? 'Professional title cannot exceed 50 characters'
              : languageRedux === 3 && '제목은 50자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (experience.companyName?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên công ty không được bỏ trống'
            : languageRedux === 2
              ? 'Company Name cannot be empty'
              : languageRedux === 3 && '회사 이름은 비워 둘 수 없습니다.',
        checkForm: false,
        idError: 2,
      };
    }
    if (experience.companyName?.trim().length > 50) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên công ty không được vượt quá 50 ký tự'
            : languageRedux === 2
              ? 'Company names cannot exceed 50 characters'
              : languageRedux === 3 && '회사 이름은 50자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 2,
      };
    }

    if (!experience.startDate) {
      return {
        messageError: language?.profile_page?.err_start_time,
        checkForm: false,
        idError: 3,
      };
    }

    if (
      new Date(experience.startDate).getFullYear() > new Date().getFullYear()
    ) {
      return {
        messageError:
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
        messageError: language?.profile_page?.err_finish_time,
        checkForm: false,
        idError: 4,
      };
    }

    if (new Date(experience.endDate).getFullYear() > new Date().getFullYear()) {
      return {
        messageError:
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
        messageError:
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

    if (experience.extraInformation?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được bỏ trống'
            : languageRedux === 2
              ? 'Additional information cannot be empty'
              : languageRedux === 3 && '추가 정보는 비워둘 수 없습니다.',
        checkForm: false,
        idError: 5,
      };
    }
    if (experience.extraInformation?.trim().length > 500) {
      return {
        messageError:
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
    return {
      messageError: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleSubmit = async () => {
    const { messageError, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        const result = await profileApi.createProfileExperience(experience);
        if (result) {
          const getProfileV3 = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );
          if (getProfileV3) {
            setOpenModalExperienceCreate(false);
            await dispatch(setProfileMeInformationMoreV3(getProfileV3) as any);
            dispatch(setAlertSuccess(true));
          }
        }
      } else {
        message.error(messageError);
        const profile_experience_professional_titles = document.getElementById(
          'profile_experience_professional_titles',
        ) as HTMLElement;
        const profile_experience_company_organization = document.getElementById(
          'profile_experience_company_organization',
        ) as HTMLElement;
        const profile_experience_additional_information =
          document.getElementById(
            'profile_experience_additional_information',
          ) as HTMLElement;
        const profile_experience_start_date = document.getElementById(
          'profile_experience_start_date',
        ) as HTMLElement;
        const profile_experience_end_date = document.getElementById(
          'profile_experience_end_date',
        ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_experience_professional_titles.focus();
            break;
          case 2:
            profile_experience_company_organization.focus();
            break;
          case 3:
            profile_experience_start_date.focus();
            break;
          case 4:
            profile_experience_end_date.focus();
            break;
          case 5:
            profile_experience_additional_information.focus();
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalExperienceCreate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={handleKeyDown}
      >
        <Box
          sx={style}
          className="Modal-personnal-info modal-person modal-expProfileCreate"
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
            {language?.profile_page?.add_working_experience}
          </Typography>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {language?.professional_titles}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_experience_professional_titles"
              name="title"
              //   value={formValues.title}
              onChange={handleChangeTitle}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.professional_titles}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {experience.title.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 50 ký tự.'
                    : languageRedux === 2
                      ? 'You have entered more than 50 characters.'
                      : languageRedux === 3 && '50자를 초과하여 입력했습니다.'}
                </span>
              ) : experience.title.length === 0 ? (
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
              <span className="number-text">{`${experience.title.length}/50`}</span>
            </div>
          </Box>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {language?.company_organization}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_experience_company_organization"
              name="title"
              //   value={formValues.title}
              onChange={handleChangeSchool}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.company_organization}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {experience.companyName.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 50 ký tự.'
                    : languageRedux === 2
                      ? 'You have entered more than 50 characters.'
                      : languageRedux === 3 && '50자를 초과하여 입력했습니다.'}
                </span>
              ) : experience.companyName.length === 0 ? (
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
              <span className="number-text">{`${experience.companyName.length}/50`}</span>
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
                    {language?.start_time}{' '}
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
                        id: 'profile_experience_start_date',
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
                    {language?.finish_time}{' '}
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
                        id: 'profile_experience_end_date',
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
              {language?.additional_information}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              // className={classes.textarea}
              onChange={handleChangeExtraInfo}
              sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
              multiline
              rows={4}
              // label="Một số đặc điểm nhận diện công ty"
              placeholder={language?.profile_page?.place_additional_information}
              id="profile_experience_additional_information"
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
              ) : experience.extraInformation.length === 0 ? (
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
              <span className="number-text">{`${
                experience.extraInformation
                  ? experience.extraInformation.length
                  : '0'
              }/500`}</span>
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

export default ModalProfileExperienceCreate;
