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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';

import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';
import languageApi from 'api/languageApi';
import { message } from 'antd';

import './style.scss';
import candidateSearch from 'api/apiCandidates';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

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
  display: 'flex',
  flexDirection: 'column',
};

// style MUI
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

// interface IEducation {
//   id?: number | null;
//   company_name?: string;
//   major?: string;
//   start_date?: number;
//   end_date?: number;
//   extra_information?: string;
//   title?: string;
// }

interface IModalProfileEducationUpdate {
  openModalEducationUpdate: boolean;
  setOpenModalEducationUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  typeItem: string;
  educationId?: number | null;
  educationValue: any;
}

interface IInfoEducation {
  educationId?: number | null;
  companyName: string;
  major: string;
  startDate: number;
  endDate: number;
  extraInformation: string;
  academicTypeId: any;
}

const ModalProfileEducationUpdate: React.FC<IModalProfileEducationUpdate> = (
  props,
) => {
  const {
    openModalEducationUpdate,
    setOpenModalEducationUpdate,
    educationId,
    educationValue,
  } = props;
  // console.log('typeItem', typeItem)
  const dispatch = useDispatch();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);
  // const [language, setLanguageState] = React.useState<any>();
  const [typeAcademic, setTypeAcademic] = React.useState([]);
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
    if (openModalEducationUpdate) {
      getTypeAcademic();
    }
  }, [languageRedux, openModalEducationUpdate]);

  const [education, setEducation] = useState<IInfoEducation>({
    educationId: educationId,
    companyName: educationValue.companyName,
    major: educationValue.major,
    startDate: educationValue.startDate,
    endDate: educationValue.endDate,
    extraInformation: educationValue.extraInformation,
    academicTypeId: educationValue.academicTypeId,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const handleClose = () => setOpenModalEducationUpdate(false);

  // school
  const handleChangeSchool = (e: any) => {
    setEducation((preValue) => {
      return { ...preValue, companyName: e.target.value };
    });
  };

  // time
  const handleChangeStartTime = (newValue: any, e: any) => {
    if (newValue) {
      setEducation((preValue) => {
        return { ...preValue, startDate: new Date(newValue._d).getTime() };
      });
    } else {
      setEducation((preValue) => {
        return { ...preValue, startDate: NaN };
      });
    }
  };

  const handleChangeEndTime = (newValue: any, e: any) => {
    if (newValue) {
      setEducation((preValue) => {
        return {
          ...preValue,
          endDate: new Date(newValue._d).getTime(),
        };
      });
    } else {
      setEducation((preValue) => {
        return {
          ...preValue,
          endDate: NaN,
        };
      });
    }
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
  // console.log(education.extraInformation.length);

  const validValue = () => {
    if (education.major === '') {
      return {
        message: language?.profile_page?.err_major,
        checkForm: false,
      };
    }
    if (education.major?.trim().length > 50) {
      return {
        message:
          languageRedux === 1
            ? 'Tên ngành không được vượt quá 50 ký tự'
            : 'Major cannot exceed 50 characters',
        checkForm: false,
      };
    }

    if (education.companyName === '') {
      return {
        message: language?.profile_page?.err_school,
        checkForm: false,
      };
    }

    if (education.companyName?.trim().length > 50) {
      return {
        message:
          languageRedux === 1
            ? 'Trường học/Tổ chức không được vượt quá 50 ký tự'
            : 'School/Organization cannot exceed 50 characters',
        checkForm: false,
      };
    }

    if (education.extraInformation === '') {
      return {
        message: language?.profile_page?.err_additional_information,
        checkForm: false,
      };
    }

    if (education.extraInformation.length > 500) {
      return {
        message:
          languageRedux === 1
            ? 'Thông tin thêm không được vượt quá 500 ký tự'
            : 'Additional information cannot exceed 500 characters',
        checkForm: false,
      };
    }
    // console.log('NaN', education.startDate);

    if (!education.startDate) {
      return {
        message: language?.profile_page?.err_start_time,
        checkForm: false,
      };
    }
    if (
      new Date(education.startDate).getFullYear() > new Date().getFullYear()
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm hiện tại'
            : 'The starting year cannot exceed the current year',
        checkForm: false,
      };
    }

    if (!education.endDate) {
      return {
        message: language?.profile_page?.err_finish_time,
        checkForm: false,
      };
    }

    if (new Date(education.endDate).getFullYear() > new Date().getFullYear()) {
      return {
        message:
          languageRedux === 1
            ? 'Năm kết thúc không được vượt quá năm hiện tại'
            : 'The final year cannot exceed the current year',
        checkForm: false,
      };
    }

    if (
      new Date(education.startDate).getFullYear() >
      new Date(education.endDate).getFullYear()
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm kết thúc'
            : 'The starting year cannot exceed the final year',
        checkForm: false,
      };
    }

    // if (education.endDate > education.startDate) {
    //   return {
    //     message: 'Ngày bắt đầu không thể lớn hơn ngày kết thúc',
    //     checkForm: false,
    //   };
    // }

    return {
      message: '',
      checkForm: true,
    };
  };

  const handleSubmit = async () => {
    const { message, checkForm } = validValue();
    try {
      if (checkForm) {
        const result = await profileApi.updateProfileEducation(education);
        if (result) {
          const profile = await profileApi.getProfileV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (profile) {
            dispatch(setProfileV3(profile));
          }
          setOpenModalEducationUpdate(false);
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
    } catch (error) {
      console.log('error', error);
      messageApi.open({
        type: 'error',
        content: language?.profile_page?.check_info_please,
      });
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && event.target.id !== 'extra-info') {
      handleSubmit();
    }
  };

  const getTypeAcademic = async () => {
    const result = await candidateSearch.getAcademicTypes(
      languageRedux === 1 ? 'vi' : 'en',
    );
    if (result) {
      setTypeAcademic(result.data);
    }
  };

  const handleChangeAcademic = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEducation((preValue: any) => {
      return { ...preValue, academicTypeId: e.target.value };
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalEducationUpdate}
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
            {language?.profile_page?.edit_education}
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
              id="nameProfile"
              name="title"
              value={education.companyName}
              onChange={handleChangeSchool}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.profile_page?.place_school}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {education.companyName && education.companyName.length > 50 ? (
                <span className="helper-text">Bạn đã nhập quá 50 ký tự</span>
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
              id="nameProfile"
              name="title"
              value={education.major}
              onChange={handleChangeMajor}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.major}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {education.major && education.major.length > 50 ? (
                <span className="helper-text">Bạn đã nhập quá 50 ký tự</span>
              ) : !education.major ? (
                <span className="helper-text">Vui lòng nhập chuyên ngành</span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                education.major ? education.major.length : '0'
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
                    {language?.start_time}{' '}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    value={
                      moment(education.startDate)
                      // && new Date().getTime()
                    }
                    defaultValue={moment(new Date().getTime())}
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
                  />
                  <div className="wrap-noti_input">
                    {education.startDate &&
                    new Date(education.startDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        Thời gian bắt đầu không thể lớn hơn thời gian hiện tại
                      </span>
                    ) : !new Date(education.startDate).getFullYear() ? (
                      <span className="helper-text">
                        Vui lòng nhập Thời gian bắt đầu
                      </span>
                    ) : new Date(education.startDate).getFullYear() < 1900 ? (
                      <span className="helper-text">
                        Thời gian bắt đầu không thể nhỏ hơn 1900
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
                    defaultValue={moment(new Date().getTime())}
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
                  />
                  <div className="wrap-noti_input">
                    {education.endDate &&
                    new Date(education.endDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        Thời gian kết thúc không thể lớn hơn thời gian hiện tại
                      </span>
                    ) : !new Date(education.endDate).getFullYear() ? (
                      <span className="helper-text">
                        Vui lòng nhập Thời gian kết thúc
                      </span>
                    ) : new Date(education.endDate).getFullYear() < 1900 ? (
                      <span className="helper-text">
                        Thời gian kết thúc không thể nhỏ hơn 1900
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
              value={education.extraInformation}
              onChange={handleChangeExtraInfo}
              sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
              multiline
              rows={4}
              id="extra-info"
              // label="Một số đặc điểm nhận diện công ty"
              placeholder={language?.profile_page?.place_additional_information}
            />
            <div className="wrap-noti_input">
              {education.extraInformation &&
              education.extraInformation.length > 500 ? (
                <span className="helper-text">Bạn đã nhập quá 500 ký tự</span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                education.extraInformation
                  ? education.extraInformation.length
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

export default React.memo(ModalProfileEducationUpdate);
