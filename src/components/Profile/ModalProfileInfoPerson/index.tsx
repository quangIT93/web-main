import React, { useState } from 'react';
import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { DatePicker } from '@mui/lab'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { CloseOutlined } from '@ant-design/icons';

import { message } from 'antd';

// data
import locationApi from '../../../api/locationApi';
import { useDispatch } from 'react-redux';
// import { RootState } from '../../../store/reducer/index';

import {
  getProfile,
  // resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer';

import './style.scss';
import profileApi from 'api/profileApi';

import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';
import { provinces } from 'pages/Post/data/data';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
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
  component: 'form',
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
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

interface IModalProfileInfoPerson {
  openModelPersonalInfo: boolean;
  setOpenModalPersonalInfo: React.Dispatch<React.SetStateAction<boolean>>;
  profile: any;
}
interface IInfoPersonal {
  name: string;
  birthday: number;
  gender: number | null;
  address: number;
  introduction: string;
  jobTypeName: string;
}

const ModalProfileInfoPerson: React.FC<IModalProfileInfoPerson> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModelPersonalInfo, setOpenModalPersonalInfo, profile } = props;
  const [gender, setGender] = React.useState(profile.gender === 1 ? 1 : 0);
  const [day, setDay] = useState<any>(
    profile?.birthday ? moment(new Date(profile?.birthday)) : moment(),
  ); // Giá trị mặc định là ngày hiện tại
  // const [dataProvinces, setDataProvinces] = useState<any>();
  const [selectedProvince, setSelectedProvince] = useState<any>(
    profile?.addressText
      ? {
          province_id: profile?.addressText?.id,
          province_fullName: profile?.addressText.fullName,
        }
      : null,
  );

  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const [name, setName] = useState(profile?.name !== null ? profile?.name : '');
  const [jobTypeName, setJobTypeName] = useState(
    profile?.jobTypeName === null ? '' : profile?.jobTypeName,
  );
  const [introduction, setIntroduction] = useState(
    profile?.introduction === null ? '' : profile?.introduction,
  );

  const [messageApi, contextHolder] = message.useMessage();
  const dataProvinces = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
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

  const dispatch = useDispatch();
  // const dataProfile = useSelector((state: RootState) => state.profile.profile);

  const handleSetFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleJobTypeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTypeName(e.target.value);
  };

  // const getAllProvinces = async () => {
  //   try {
  //     const allLocation = await locationApi.getAllLocation(
  //       languageRedux === 1 ? 'vi' : 'en',
  //     );

  //     if (allLocation) {
  //       setDataProvinces(allLocation.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  // getAllProvinces();
  // getAllLocations()
  // delete param when back to page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [languageRedux]);

  const handleDateChange = (date: any) => {
    setDay(moment(date._d));
  };
  const handleClose = () => setOpenModalPersonalInfo(false);

  const handleChange = (event: any) => {
    setGender(event.target.value);
    //  console.log(event.target.value)
  };

  const handleProvinceChange = (event: any, value: any) => {
    setSelectedProvince({
      province_id: value.province_id,
      province_fullName: value.province_fullName,
    });
  };

  console.log('new Date(day).getFullYear()', new Date(day).getFullYear());

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntroduction(e.target.value);
  };

  const validValue = () => {
    if (name === '') {
      return {
        message: language?.profile_page?.err_name,
        checkForm: false,
      };
    }
    if (name.trim().length > 90) {
      return {
        message:
          languageRedux === 1
            ? 'Tên không được vượt quá 90 ký tự'
            : 'Full name cannot exceed 90 characters',
        checkForm: false,
      };
    }
    if (selectedProvince === '') {
      return {
        message:
          languageRedux === 1
            ? 'Địa chỉ không được bỏ trống'
            : 'Location cannot be left blank',
        checkForm: false,
      };
    }
    if (new Date(day).getFullYear() > new Date().getFullYear()) {
      return {
        message:
          languageRedux === 1
            ? 'Năm sinh không được vượt quá năm hiện tại'
            : 'Year of birth cannot exceed the current year',
        checkForm: false,
      };
    }
    if (jobTypeName === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vị trí không được để trống'
            : 'The position cannot be left blank',
        checkForm: false,
      };
    }
    if (jobTypeName.trim().length > 100) {
      return {
        message:
          languageRedux === 1
            ? 'Vị trí không được vượt quá 100 ký tự'
            : 'Position cannot exceed 100 characters',
        checkForm: false,
      };
    }

    if (introduction === '') {
      return {
        message: language?.profile_page?.err_intro,
        checkForm: false,
      };
    }
    if (introduction.trim().length > 500) {
      return {
        message:
          languageRedux === 1
            ? 'Giới thiệu bản thân không được vượt quá 500 ký tự'
            : 'Introduce yourself cannot exceed 500 characters',
        checkForm: false,
      };
    }

    return {
      message: '',
      checkForm: true,
    };
  };
  // handle update information user
  const handleSubmit = async () => {
    // const data = new Date(day.toString()).getTime()
    // console.log('ennter');
    const { message, checkForm } = validValue();

    try {
      if (checkForm) {
        const info: IInfoPersonal = {
          name: name,
          birthday: new Date(day.toString()).getTime(),
          gender: gender,
          address: selectedProvince.province_id.toString(),
          introduction: introduction,
          jobTypeName: jobTypeName,
        };
        const result = await profileApi.putProfilePersonal(info);
        if (result) {
          await dispatch(getProfile() as any);
          const profileV3Api = await profileApi.getProfileInformationV3(
            languageRedux === 1 ? 'vi' : 'en',
          );

          if (profileV3Api) {
            await dispatch(setProfileMeInformationV3(profileV3Api) as any);
            dispatch(setAlertEditInfo(true));
          }
          setOpenModalPersonalInfo(false);
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
    if (event.key === 'Enter' && event.target.id !== 'profile-introduction') {
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModelPersonalInfo}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={handleKeyDown}
        sx={{ minWidth: '300px' }}
      >
        <Box sx={style} className="Modal-personnal-info modal-person">
          {contextHolder}
          <form action="">
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
              {language?.personal_information}
            </Typography>
            <Box sx={styleChildBox}>
              <Typography
                // sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="nameProfile"
              >
                {language?.full_name} <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                type="text"
                id="nameProfile"
                name="title"
                value={name}
                onChange={handleSetFullName}
                size="small"
                sx={{ width: '100%', marginTop: '4px' }}
                placeholder="Họ và tên"
                // error={titleError} // Đánh dấu lỗi
              />
              <div className="wrap-noti_input">
                {name?.length > 90 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Tên không được vượt quá 90 ký tự'
                      : 'Full name cannot exceed 90 characters'}
                  </span>
                ) : name?.length === 0 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Tên không được để trống'
                      : 'Full name cannot be blank'}
                  </span>
                ) : (
                  <></>
                )}
                <span className="number-text">{`${name?.length}/90`}</span>
              </div>
            </Box>
            <Box sx={styleChildBox}>
              <Typography
                // sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="outlined-select-currency"
              >
                {language?.sex} <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                select
                id="outlined-select-currency"
                value={gender}
                // defaultValue={gender}
                onChange={handleChange}
                variant="outlined"
                placeholder={language?.sex}
                size="small"
                sx={{ width: '100%' }}
              >
                <MenuItem value={1}>{language?.male}</MenuItem>
                <MenuItem value={0}>{language?.female}</MenuItem>
              </TextField>
            </Box>
            <Box sx={styleChildBox}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <div className="wrapModalBirth">
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="startTime"
                  >
                    {language?.date_of_birth}{' '}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    value={day}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        helperText: 'DD/MM/YYYY',
                      },
                    }}
                    // format="DD/MM/YYYY"
                  />
                </div>
                <div className="wrap-noti_input">
                  {new Date(day).getFullYear() > new Date().getFullYear() ? (
                    <span className="helper-text">
                      {languageRedux === 1
                        ? 'Năm sinh không được vượt quá năm hiện tại'
                        : 'Year of birth cannot exceed the current year'}
                    </span>
                  ) : !new Date(day).getFullYear() ? (
                    <span className="helper-text">
                      {languageRedux === 1
                        ? 'Vui lòng nhập ngày sinh'
                        : 'Please enter date of birth'}
                    </span>
                  ) : new Date(day).getFullYear() < 1900 ? (
                    <span className="helper-text">
                      {languageRedux === 1
                        ? 'Năm sinh không được nhỏ hơn 1900'
                        : 'Year of birth cannot be less than 1900'}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </LocalizationProvider>
            </Box>
            <Box sx={styleChildBox}>
              <Typography
                // sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="jobTitle"
              >
                {language?.location} <span className="color-asterisk">*</span>
              </Typography>
              <Autocomplete
                options={dataProvinces ? dataProvinces : []}
                getOptionLabel={(option: any) =>
                  option?.province_fullName || ''
                }
                value={
                  selectedProvince && dataProvinces?.length > 0
                    ? dataProvinces?.find(
                        (province: any) =>
                          province.province_id === selectedProvince.province_id,
                      )
                    : null
                }
                defaultValue={selectedProvince}
                onChange={handleProvinceChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={language?.profile_page?.place_address}
                    size="small"
                    // error={!selectedProvince}
                  />
                )}
              />
            </Box>
            <Box sx={styleChildBox}>
              <Typography
                // sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="nameProfile"
              >
                {languageRedux === 1 ? 'Vị trí ứng tuyển' : 'Position'}{' '}
                <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                type="text"
                id="nameProfile"
                name="title"
                value={jobTypeName}
                onChange={handleJobTypeName}
                size="small"
                sx={{ width: '100%', marginTop: '4px' }}
                placeholder={
                  languageRedux === 1 ? 'Vị trí ứng tuyển' : 'Position'
                }
                // error={titleError} // Đánh dấu lỗi
              />
              <div className="wrap-noti_input">
                {jobTypeName?.length > 100 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Vị trí không được vượt quá 100 ký tự'
                      : 'Position cannot exceed 100 characters'}
                  </span>
                ) : jobTypeName?.length === 0 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Vị trí không được vượt quá 100 ký tự'
                      : 'Position cannot exceed 100 characters'}
                  </span>
                ) : (
                  <></>
                )}
                <span className="number-text">{`${jobTypeName?.length}/100`}</span>
              </div>
            </Box>
            <Box sx={styleChildBox}>
              <Typography
                // sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="startTime"
              >
                {languageRedux === 1 ? 'Mục tiêu nghề nghiệp' : 'Career goals'}{' '}
                <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                // className={classes.textarea}
                onChange={handleChangeDescription}
                sx={{ width: '100%', marginTop: '4px' }}
                multiline
                rows={4}
                value={introduction}
                id="profile-introduction"
                // label="Một số đặc điểm nhận diện công ty"
                placeholder={language?.introduce_yourself_to_the_recruiter}
                error={introduction?.length > 500} // Đánh dấu lỗi
                // onKeyDown={(event) => {
                //   // if (event.key === 'Enter') {
                //   //   event.preventDefault();
                //   // }
                //   console.log(event.target);
                // }}
              />
              <div className="wrap-noti_input">
                {introduction?.length === 0 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Mục tiêu nghề nghiệp không được bỏ trống'
                      : 'Career goals cannot be empty'}
                  </span>
                ) : introduction?.length > 500 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Mục tiêu nghề nghiệp không được vượt quá 500 ký tự'
                      : 'Career goals cannot exceed 500 characters'}
                  </span>
                ) : (
                  <></>
                )}
                <span className="number-text">{`${introduction?.length}/500`}</span>
              </div>
            </Box>
          </form>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {language?.profile_page?.save_info}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalProfileInfoPerson;
