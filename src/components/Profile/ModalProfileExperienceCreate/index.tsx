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
            : 'Professional title cannot be empty',
        checkForm: false,
      };
    }
    if (experience.title?.trim().length > 50) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tiêu đề không được vượt quá 50 ký tự'
            : 'Professional title cannot exceed 50 characters',
        checkForm: false,
      };
    }
    if (experience.companyName?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên công ty không được bỏ trống'
            : 'Company names cannot be empty',
        checkForm: false,
      };
    }
    if (experience.companyName?.trim().length > 50) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên công ty không được vượt quá 50 ký tự'
            : 'Company names cannot exceed 50 characters',
        checkForm: false,
      };
    }
    if (experience.extraInformation?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được bỏ trống'
            : 'Additional information cannot be empty',
        checkForm: false,
      };
    }
    if (experience.extraInformation?.trim().length > 500) {
      return {
        messageError:
          languageRedux === 1
            ? 'Thông tin thêm không được vượt quá 500 ký tự'
            : 'Additional information cannot exceed 500 characters',
        checkForm: false,
      };
    }

    if (!experience.startDate) {
      return {
        messageError: language?.profile_page?.err_start_time,
        checkForm: false,
      };
    }

    if (
      new Date(experience.startDate).getFullYear() > new Date().getFullYear()
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm hiện tại'
            : 'The starting year cannot exceed the current year',
        checkForm: false,
      };
    }

    if (!experience.endDate) {
      return {
        messageError: language?.profile_page?.err_finish_time,
        checkForm: false,
      };
    }

    if (new Date(experience.endDate).getFullYear() > new Date().getFullYear()) {
      return {
        messageError:
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
        messageError:
          languageRedux === 1
            ? 'Năm bắt đầu không được vượt quá năm kết thúc'
            : 'The starting year cannot exceed the final year',
        checkForm: false,
      };
    }

    return {
      messageError: '',
      checkForm: true,
    };
  };

  const handleSubmit = async () => {
    const { messageError, checkForm } = validValue();
    try {
      if (checkForm) {
        const result = await profileApi.createProfileExperience(experience);
        if (result) {
          const getProfileV3 = await profileApi.getProfileInformationMoreV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (getProfileV3) {
            setOpenModalExperienceCreate(false);
            await dispatch(setProfileMeInformationMoreV3(getProfileV3) as any);
          }
        }
      } else {
        message.error(messageError);
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
              id="nameProfile"
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
                <span className="helper-text">Bạn đã nhập quá 50 ký tự</span>
              ) : experience.title.length === 0 ? (
                <span className="helper-text">Vui lòng nhập chức danh</span>
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
              id="nameProfile"
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
                <span className="helper-text">Bạn đã nhập quá 50 ký tự</span>
              ) : experience.companyName.length === 0 ? (
                <span className="helper-text">
                  Vui lòng nhập tên trường/tổ chức
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
              onChange={handleChangeExtraInfo}
              sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
              multiline
              rows={4}
              // label="Một số đặc điểm nhận diện công ty"
              placeholder={language?.profile_page?.place_additional_information}
            />
            <div className="wrap-noti_input">
              {experience.extraInformation &&
              experience.extraInformation.length > 500 ? (
                <span className="helper-text">Bạn đã nhập quá 500 ký tự</span>
              ) : experience.extraInformation.length === 0 ? (
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

export default ModalProfileExperienceCreate;
