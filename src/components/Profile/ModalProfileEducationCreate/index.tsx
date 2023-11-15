import React, { useState } from 'react';
import { Box, TextField, Modal, Typography, MenuItem } from '@mui/material';
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
import { RootState } from '../../../store/reducer/index';
import { useDispatch, useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';
import { message } from 'antd';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import candidateSearch from 'api/apiCandidates';
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

interface IEducation {
  id: number | null;
  companyName: string;
  major: string;
  startDate: number;
  endDate: number;
  extraInformation: string;
  academicTypeId: number | null;
}

interface IModalProfileEducationCreate {
  openModalEducationCreate: boolean;
  setOpenModalEducationCreate: React.Dispatch<React.SetStateAction<boolean>>;
  typeItem: string;
  educations: IEducation[];
}

interface IInfoEducation {
  companyName: string;
  major: string;
  startDate: number;
  endDate: number;
  extraInformation: string;
  academicTypeId: number | null;
}

const ModalProfileEducationCreate: React.FC<IModalProfileEducationCreate> = (
  props,
) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    openModalEducationCreate,
    setOpenModalEducationCreate,
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
  const dispatch = useDispatch();
  const [education, setEducation] = useState<IInfoEducation>({
    companyName: '',
    major: '',
    startDate: new Date(2017, 4, 1, 0, 0).getTime(),
    endDate: new Date(2023, 4, 30, 0, 0).getTime(),
    extraInformation: '',
    academicTypeId: 8,
  });

  const [typeAcademic, setTypeAcademic] = React.useState([]);

  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? 'vi' : 'en',
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  React.useEffect(() => {
    // getlanguageApi();
    if (openModalEducationCreate) {
      getTypeAcademic();
    }
  }, [languageRedux, openModalEducationCreate]);

  const handleClose = () => setOpenModalEducationCreate(false);

  // school
  const handleChangeSchool = (e: any) => {
    setEducation((preValue) => {
      return { ...preValue, companyName: e.target.value };
    });
  };

  // time
  const handleChangeStartTime = (newValue: any, e: any) => {
    setEducation((preValue) => {
      return {
        ...preValue,
        startDate: new Date(newValue._d).getTime(),
      };
    });
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEducation((preValue) => {
      return {
        ...preValue,
        endDate: new Date(newValue._d).getTime(),
      };
    });
  };

  // major
  const handleChangeMajor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEducation((preValue) => {
      return { ...preValue, major: e.target.value };
    });
  };

  const handleChangeExtraInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEducation((preValue) => {
      return { ...preValue, extraInformation: e.target.value };
    });
  };

  // submit
  const validValue = () => {
    if (education?.companyName?.trim() === '') {
      return {
        messageError: language?.profile_page?.err_school,
        checkForm: false,
        idError: 1,
      };
    }
    if (education?.companyName?.trim().length > 50) {
      return {
        messageError:
          languageRedux === 1
            ? 'Trường học/Tổ chức không được vượt quá 50 ký tự'
            : 'School/Organization cannot exceed 50 characters',
        checkForm: false,
        idError: 1,
      };
    }
    if (education?.major?.trim() === '') {
      return {
        messageError: language?.profile_page?.err_major,
        checkForm: false,
        idError: 2,
      };
    }
    if (education?.major?.trim().length > 50) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên ngành không được vượt quá 50 ký tự'
            : 'Major cannot exceed 50 characters',
        checkForm: false,
        idError: 2,
      };
    }

    if (!education?.startDate) {
      return {
        messageError: language?.profile_page?.err_start_time,
        checkForm: false,
        idError: 3,
      };
    }
    if (
      new Date(education?.startDate).getFullYear() > new Date().getFullYear()
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm hiện tại'
            : 'The starting year cannot exceed the current year',
        checkForm: false,
        idError: 3,
      };
    }

    if (!education?.endDate) {
      return {
        messageError: language?.profile_page?.err_finish_time,
        checkForm: false,
        idError: 4,
      };
    }

    if (new Date(education?.endDate).getFullYear() > new Date().getFullYear()) {
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
      new Date(education?.startDate).getFullYear() >
      new Date(education?.endDate).getFullYear()
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm kết thúc'
            : 'The starting year cannot exceed the final year',
        checkForm: false,
        idError: 4,
      };
    }

    if (education?.extraInformation?.trim() === '') {
      return {
        messageError: language?.profile_page?.err_additional_information,
        checkForm: false,
        idError: 5,
      };
    }
    if (education?.extraInformation?.trim().length > 500) {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được vượt quá 500 ký tự'
            : 'Additional information cannot exceed 500 characters',
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
        const result = await profileApi.createProfileEducation(education);
        if (result) {
          const getProfileV3 = await profileApi.getProfileInformationMoreV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          await dispatch(setProfileMeInformationMoreV3(getProfileV3) as any);
          dispatch(setAlertSuccess(true));
          setOpenModalEducationCreate(false);
        }
      } else {
        message.error(messageError);
        const profile_education_school_organization = document.getElementById(
          'profile_education_school_organization',
        ) as HTMLElement;
        const profile_education_major = document.getElementById(
          'profile_education_major',
        ) as HTMLElement;
        const profile_education_additional_information =
          document.getElementById(
            'profile_education_additional_information',
          ) as HTMLElement;
        const profile_education_start_date = document.getElementById(
          'profile_education_start_date',
        ) as HTMLElement;
        const profile_education_end_date = document.getElementById(
          'profile_education_end_date',
        ) as HTMLElement;

        switch (idError) {
          case 1:
            profile_education_school_organization.focus();
            break;
          case 2:
            profile_education_major.focus();
            break;
          case 3:
            profile_education_start_date.focus();
            break;
          case 4:
            profile_education_end_date.focus();
            break;
          case 5:
            profile_education_additional_information.focus();
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

  const handleChangeAcademic = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEducation((preValue: any) => {
      return { ...preValue, academicTypeId: e.target.value };
    });
  };

  const getTypeAcademic = async () => {
    const result = await candidateSearch.getAcademicTypes(
      languageRedux === 1 ? 'vi' : 'en',
    );
    if (result) {
      setTypeAcademic(result.data);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalEducationCreate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={handleKeyDown}
      >
        <Box
          sx={style}
          className="Modal-personnal-info modal-person modal-educationProfileCreate"
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
            {language?.profile_page?.add_education}
          </Typography>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {language?.school_organization}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_education_school_organization"
              name="title"
              //   value={formValues.title}
              onChange={handleChangeSchool}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.profile_page?.place_school}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {education.companyName && education.companyName.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 50 ký tự.'
                    : 'You have entered more than 50 characters.'}
                </span>
              ) : !education.companyName ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Vui lòng nhập tên trường/tổ chức.'
                    : 'Please enter school/organization name.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                education.companyName ? education.companyName.length : '0'
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
              {language?.major} <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_education_major"
              name="title"
              //   value={formValues.title}
              onChange={handleChangeMajor}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.major}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {education.major.length > 50 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 50 ký tự.'
                    : 'You have entered more than 50 characters.'}
                </span>
              ) : education.major.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Vui lòng nhập tên chuyên ngành.'
                    : 'Please enter a major name.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${education.major.length}/50`}</span>
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
                    {language?.start_time}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    value={moment(education.startDate)}
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
                        id: 'profile_education_start_date',
                      },
                    }}
                  />
                  <div className="wrap-noti_input">
                    {education.startDate &&
                    new Date(education.startDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian bắt đầu không thể lớn hơn thời gian hiện tại.'
                          : 'The start time cannot be greater than the current time.'}
                      </span>
                    ) : !new Date(education.startDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập Thời gian bắt đầu.'
                          : 'Please enter start date.'}
                      </span>
                    ) : new Date(education.startDate).getFullYear() < 1900 ? (
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
                    value={moment(education.endDate)}
                    onChange={handleChangeEndTime}
                    views={['year', 'month']}
                    openTo="month"
                    minDate={moment(education.startDate)}
                    format="MM/YYYY"
                    sx={{
                      '& input': {
                        fontSize: '14px',
                        padding: '8.5px 14px',
                      },
                    }}
                    slotProps={{
                      textField: {
                        id: 'profile_education_end_date',
                      },
                    }}
                  />
                  <div className="wrap-noti_input">
                    {education.endDate &&
                    new Date(education.endDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Thời gian kết thúc không thể lớn hơn thời gian hiện tại.'
                          : 'The end time cannot be greater than the current time.'}
                      </span>
                    ) : !new Date(education.endDate).getFullYear() ? (
                      <span className="helper-text">
                        {languageRedux === 1
                          ? 'Vui lòng nhập Thời gian kết thúc.'
                          : 'Please enter End date.'}
                      </span>
                    ) : new Date(education.endDate).getFullYear() < 1900 ? (
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
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="startTime"
            >
              {languageRedux === 1 ? 'Trình độ học vấn ' : 'Academic level '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              select
              id="sex"
              value={education.academicTypeId}
              defaultValue={education.academicTypeId && 8}
              onChange={handleChangeAcademic}
              variant="outlined"
              placeholder={'Loại công việc'}
              size="small"
              sx={{ width: '100%' }}
              // error={!gender} // Đánh dấu lỗi
            >
              {typeAcademic?.map((value: any, index: number) => {
                return <MenuItem value={index + 1}>{value.data}</MenuItem>;
              })}
              {/* <MenuItem value={1}>
              {languageRedux === 1 ? 'Toàn thời gian' : 'Fulltime'}
            </MenuItem>
            <MenuItem value={2}>
              {languageRedux === 1 ? 'Bán thời gian' : 'Parttime'}
            </MenuItem>
            <MenuItem value={4}>
              {languageRedux === 1 ? 'Làm việc tự do' : 'Freelancer'}
            </MenuItem>
            <MenuItem value={7}>
              {languageRedux === 1 ? 'Thực tập' : 'Intern'}
            </MenuItem> */}
            </TextField>
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
              id="profile_education_additional_information"
            />
            <div className="wrap-noti_input">
              {education?.extraInformation &&
              education?.extraInformation.length > 500 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Bạn đã nhập quá 500 ký tự.'
                    : 'You have entered more than 500 characters.'}
                </span>
              ) : education?.extraInformation.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Vui lòng nhập thông tin bổ sung.'
                    : 'Please enter additional information.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                education?.extraInformation
                  ? education?.extraInformation.length
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

export default ModalProfileEducationCreate;
