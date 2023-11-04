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
      };
    }
    if (experience.title?.trim().length > 50) {
      return {
        message:
          languageRedux === 1
            ? 'Tiêu đề không được vượt quá 50 ký tự'
            : 'Professional title cannot exceed 50 characters',
        checkForm: false,
      };
    }

    if (experience.companyName === '') {
      return {
        message: language?.profile_page?.err_company,
        checkForm: false,
      };
    }
    if (experience.companyName?.trim().length > 50) {
      return {
        message:
          languageRedux === 1
            ? 'Tên công ty không được vượt quá 50 ký tự'
            : 'Company names cannot exceed 50 characters',
        checkForm: false,
      };
    }

    if (experience.extraInformation === '') {
      return {
        message: language?.profile_page?.err_additional_information,
        checkForm: false,
      };
    }
    if (experience.extraInformation?.trim().length > 500) {
      return {
        message:
          languageRedux === 1
            ? 'Thông tin thêm không được vượt quá 500 ký tự'
            : 'Additional information cannot exceed 500 characters',
        checkForm: false,
      };
    }
    // console.log('NaN', experience.startDate);

    if (!experience.startDate) {
      return {
        message: language?.profile_page?.err_start_time,
        checkForm: false,
      };
    }

    if (
      new Date(experience.startDate).getFullYear() > new Date().getFullYear()
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm hiện tại'
            : 'The starting year cannot exceed the current year',
        checkForm: false,
      };
    }

    if (!experience.endDate) {
      return {
        message: language?.profile_page?.err_finish_time,
        checkForm: false,
      };
    }

    if (new Date(experience.endDate).getFullYear() > new Date().getFullYear()) {
      return {
        message:
          languageRedux === 1
            ? 'Năm kết thúc không được vượt quá năm hiện tại'
            : 'The final year cannot exceed the current year',
        checkForm: false,
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
            : 'The starting year cannot exceed the final year',
        checkForm: false,
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
    };
  };

  const handleSubmit = async () => {
    const { message, checkForm } = validValue();
    try {
      if (checkForm) {
        const result = await profileApi.updateProfileExperience(experience);
        if (result) {
          const profile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (profile) {
            dispatch(setProfileMeInformationMoreV3(profile));
          }
          setOpenModalExperienceUpdate(false);
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: language?.profile_page?.check_info_please,
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
            {language?.profile_page?.edit_working_experience}
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
              id="nameProfile"
              name="title"
              value={experience.title}
              onChange={handleChangeTitle}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.professional_titles}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {experience.title && experience.title.length > 50 ? (
                <span className="helper-text">Bạn đã nhập quá 50 ký tự</span>
              ) : !experience.title ? (
                <span className="helper-text">Vui lòng nhập chức danh</span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                experience.title ? experience.title.length : '0'
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
              {language?.company_organization}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="nameProfile"
              name="title"
              value={experience.companyName}
              onChange={handleChangeSchool}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={language?.company_organization}
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {experience.companyName && experience.companyName.length > 50 ? (
                <span className="helper-text">Bạn đã nhập quá 50 ký tự</span>
              ) : !experience.companyName ? (
                <span className="helper-text">
                  Vui lòng nhập tên trường/tổ chức
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                experience.companyName ? experience.companyName.length : '0'
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
                  />
                  <div className="wrap-noti_input">
                    {experience.startDate &&
                    new Date(experience.startDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        Thời gian bắt đầu không thể lớn hơn thời gian hiện tại
                      </span>
                    ) : !new Date(experience.startDate).getFullYear() ? (
                      <span className="helper-text">
                        Vui lòng nhập Thời gian bắt đầu
                      </span>
                    ) : new Date(experience.startDate).getFullYear() < 1900 ? (
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
                  />
                  <div className="wrap-noti_input">
                    {experience.endDate &&
                    new Date(experience.endDate).getFullYear() >
                      new Date().getFullYear() ? (
                      <span className="helper-text">
                        Thời gian bắt đầu không thể lớn hơn thời gian hiện tại
                      </span>
                    ) : !new Date(experience.endDate).getFullYear() ? (
                      <span className="helper-text">
                        Vui lòng nhập Thời gian bắt đầu
                      </span>
                    ) : new Date(experience.endDate).getFullYear() < 1900 ? (
                      <span className="helper-text">
                        Thời gian bắt đầu không thể nhỏ hơn 1900
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
              value={experience.extraInformation}
              onChange={handleChangeExtraInfo}
              sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
              multiline
              rows={4}
              id="extraExp_info"
              // label="Một số đặc điểm nhận diện công ty"
              placeholder={language?.profile_page?.place_additional_information}
            />
            <div className="wrap-noti_input">
              {experience.extraInformation &&
              experience.extraInformation.length > 500 ? (
                <span className="helper-text">Bạn đã nhập quá 500 ký tự</span>
              ) : !experience.extraInformation ? (
                <span className="helper-text">
                  Vui lòng nhập thông tin bổ sung
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

export default ModalProfileExperienceUpdate;
