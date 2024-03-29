import React, { useEffect, useState } from 'react';
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
    profile?.birthday
      ? moment(new Date(profile?.birthday))
      : moment(new Date('1/1/2000')),
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
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
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
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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

  // useEffect(() => {
  //   setOpenDatePicker(true)
  // }, [])

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntroduction(e.target.value);
  };

  const validValue = () => {
    if (name === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập họ tên'
            : languageRedux === 2
              ? 'Please enter your name'
              : '당신의 성명을 입력 해주세요',
        checkForm: false,
        idError: 1,
      };
    }
    if (name.trim().length > 90) {
      return {
        message:
          languageRedux === 1
            ? 'Tên không được vượt quá 90 ký tự'
            : languageRedux === 2
              ? 'Full name cannot exceed 90 characters'
              : languageRedux === 3 && '이름은 90자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }
    if (selectedProvince === '') {
      return {
        message:
          languageRedux === 1
            ? 'Địa chỉ không được bỏ trống'
            : languageRedux === 2
              ? 'Address cannot be empty'
              : languageRedux === 3 && '주소가 비어 있으면 안 됩니다.',
        checkForm: false,
        idError: 2,
      };
    }
    if (new Date(day).getFullYear() > new Date().getFullYear()) {
      return {
        message:
          languageRedux === 1
            ? 'Năm sinh không được vượt quá năm hiện tại'
            : languageRedux === 2
              ? 'Year of birth cannot exceed the current year'
              : languageRedux === 3 &&
              '출생 연도는 현재 연도를 초과할 수 없습니다.',
        checkForm: false,
        idError: 5,
      };
    }
    if (jobTypeName === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vị trí không được để trống'
            : languageRedux === 2
              ? 'The position cannot be left blank'
              : languageRedux === 3 && '해당 위치는 비워둘 수 없습니다.',
        checkForm: false,
        idError: 3,
      };
    }
    if (jobTypeName.trim().length > 100) {
      return {
        message:
          languageRedux === 1
            ? 'Vị trí không được vượt quá 100 ký tự'
            : languageRedux === 2
              ? 'Position cannot exceed 100 characters'
              : languageRedux === 3 && '위치는 100자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 3,
      };
    }

    if (introduction === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập mục tiêu nghề nghiệp'
            : languageRedux === 2
              ? 'Please enter career goals'
              : '경력 목표를 입력하세요.',
        checkForm: false,
        idError: 4,
      };
    }
    if (introduction.trim().length > 500) {
      return {
        message:
          languageRedux === 1
            ? 'Giới thiệu bản thân không được vượt quá 500 ký tự'
            : languageRedux === 2
              ? 'Introduce yourself cannot exceed 500 characters'
              : languageRedux === 3 && '자기소개는 500자를 넘지 않아야 합니다.',
        checkForm: false,
        idError: 4,
      };
    }
    if (new Date(day).getFullYear() < 1900) {
      return {
        message:
          languageRedux === 1
            ? 'Năm sinh không được nhỏ hơn 1900'
            : languageRedux === 2
              ? 'Year of birth cannot be less than 1900'
              : languageRedux === 3 && '생년월일은 1900년 이상이어야 합니다.',
        checkForm: false,
        idError: 5,
      };
    }

    return {
      message: '',
      checkForm: true,
      idError: 0,
    };
  };
  // handle update information user
  const handleSubmit = async () => {
    // const data = new Date(day.toString()).getTime()
    // console.log('ennter');
    const { message, checkForm, idError } = validValue();

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
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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

        const peronal_info_name = document.getElementById(
          'peronal_info_name',
        ) as HTMLElement;
        const peronal_info_provinces = document.getElementById(
          'peronal_info_provinces',
        ) as HTMLElement;
        const peronal_info_position = document.getElementById(
          'peronal_info_position',
        ) as HTMLElement;
        const peronal_info_introduction = document.getElementById(
          'peronal_info_introduction',
        ) as HTMLElement;
        const peronal_info_date = document.getElementById(
          'peronal_info_date',
        ) as HTMLElement;

        switch (idError) {
          case 1:
            peronal_info_name.focus();
            break;
          case 2:
            peronal_info_provinces.focus();
            break;
          case 3:
            peronal_info_position.focus();
            break;
          case 4:
            peronal_info_introduction.focus();
            break;
          case 5:
            peronal_info_date.focus();
            // setOpenDatePicker(true);
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content:
          languageRedux === 1
            ? 'Vui lòng kiểm tra lại thông tin đã nhập'
            : languageRedux === 2
              ? 'Please double check the information entered'
              : '입력한 정보를 다시 확인해 주세요.',
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
              {languageRedux === 1
                ? 'Thông tin cá nhân'
                : languageRedux === 2
                  ? 'Personal Information'
                  : '개인 정보'}
            </Typography>
            <Box sx={styleChildBox}>
              <Typography
                // sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="nameProfile"
              >
                {languageRedux === 1
                  ? 'Họ và tên'
                  : languageRedux === 2
                    ? 'Full name'
                    : '성명'}{' '}
                <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                type="text"
                id="peronal_info_name"
                name="title"
                value={name}
                onChange={handleSetFullName}
                size="small"
                sx={{ width: '100%', marginTop: '4px' }}
                placeholder={
                  languageRedux === 1
                    ? 'Họ và tên'
                    : languageRedux === 2
                      ? 'Full name'
                      : '성명'
                }
              // error={titleError} // Đánh dấu lỗi
              />
              <div className="wrap-noti_input">
                {name?.length > 90 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Tên không được vượt quá 90 ký tự'
                      : languageRedux === 2
                        ? 'Full name cannot exceed 90 characters'
                        : languageRedux === 3 &&
                        '이름은 90자를 초과할 수 없습니다.'}
                  </span>
                ) : name?.length === 0 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Tên không được để trống'
                      : languageRedux === 2
                        ? 'Full name cannot be blank'
                        : languageRedux === 3 && '이름은 비워둘 수 없습니다.'}
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
                {languageRedux === 1
                  ? 'Giới tính'
                  : languageRedux === 2
                    ? 'Gender'
                    : '성별'}{' '}
                <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                select
                id="outlined-select-currency"
                value={gender}
                // defaultValue={gender}
                onChange={handleChange}
                variant="outlined"
                placeholder={
                  languageRedux === 1
                    ? 'Giới tính'
                    : languageRedux === 2
                      ? 'Gender'
                      : '성별'
                }
                size="small"
                sx={{ width: '100%' }}
              >
                <MenuItem value={1}>
                  {languageRedux === 1
                    ? 'Nam'
                    : languageRedux === 2
                      ? 'Male'
                      : '남성'}
                </MenuItem>
                <MenuItem value={0}>
                  {languageRedux === 1
                    ? 'Nữ'
                    : languageRedux === 2
                      ? 'Female'
                      : '여성'}
                </MenuItem>
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
                    {languageRedux === 1
                      ? 'Ngày sinh'
                      : languageRedux === 2
                        ? 'Date of birth'
                        : '생년월일'}{' '}
                    <span className="color-asterisk">*</span>
                  </Typography>
                  <DatePicker
                    value={day}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        helperText: 'DD/MM/YYYY',
                        // onClick: () => setOpenDatePicker(true),
                        id: 'peronal_info_date',
                      },
                    }}
                  // open={openDatePicker}
                  // onAccept={() => setOpenDatePicker(false)}
                  // format="DD/MM/YYYY"
                  />
                </div>
                <div className="wrap-noti_input">
                  {new Date(day).getFullYear() > new Date().getFullYear() ? (
                    <span className="helper-text">
                      {languageRedux === 1
                        ? 'Năm sinh không được vượt quá năm hiện tại'
                        : languageRedux === 2
                          ? 'Year of birth cannot exceed the current year'
                          : languageRedux === 3 &&
                          '출생 연도는 현재 연도를 초과할 수 없습니다.'}
                    </span>
                  ) : !new Date(day).getFullYear() ? (
                    <span className="helper-text">
                      {languageRedux === 1
                        ? 'Vui lòng nhập ngày sinh'
                        : languageRedux === 2
                          ? 'Please enter date of birth'
                          : languageRedux === 3 && '생년월일을 입력해주세요'}
                    </span>
                  ) : new Date(day).getFullYear() < 1900 ? (
                    <span className="helper-text">
                      {languageRedux === 1
                        ? 'Năm sinh không được nhỏ hơn 1900'
                        : languageRedux === 2
                          ? 'Year of birth cannot be less than 1900'
                          : languageRedux === 3 &&
                          '생년월일은 1900년 이상이어야 합니다.'}
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
                {languageRedux === 1
                  ? 'Địa điểm'
                  : languageRedux === 2
                    ? 'Location'
                    : '주소'}{' '}
                <span className="color-asterisk">*</span>
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
                id="peronal_info_provinces"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      languageRedux === 1
                        ? 'Địa điểm'
                        : languageRedux === 2
                          ? 'Location'
                          : '주소'
                    }
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
                {languageRedux === 1
                  ? 'Vị trí ứng tuyển'
                  : languageRedux === 2
                    ? 'Position'
                    : languageRedux === 3 && '희망 직업'}{' '}
                <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                type="text"
                id="peronal_info_position"
                name="title"
                value={jobTypeName}
                onChange={handleJobTypeName}
                size="small"
                sx={{ width: '100%', marginTop: '4px' }}
                placeholder={
                  languageRedux === 1
                    ? 'Vị trí ứng tuyển'
                    : languageRedux === 2
                      ? 'Position'
                      : languageRedux === 3
                        ? '희망 직업'
                        : 'Vị trí ứng tuyển'
                }
              // error={titleError} // Đánh dấu lỗi
              />
              <div className="wrap-noti_input">
                {jobTypeName?.length > 100 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Vị trí không được vượt quá 100 ký tự'
                      : languageRedux === 2
                        ? 'Position cannot exceed 100 characters'
                        : languageRedux === 3 &&
                        '위치는 100자를 초과할 수 없습니다.'}
                  </span>
                ) : jobTypeName?.length === 0 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Vị trí không được để trống'
                      : languageRedux === 2
                        ? 'The position cannot be left blank'
                        : languageRedux === 3 &&
                        '해당 위치는 비워둘 수 없습니다.'}
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
                {languageRedux === 1
                  ? 'Mục tiêu nghề nghiệp'
                  : languageRedux === 2
                    ? 'Career goals'
                    : languageRedux === 3 && '경력 목표'}{' '}
                <span className="color-asterisk">*</span>
              </Typography>
              <TextField
                // className={classes.textarea}
                onChange={handleChangeDescription}
                sx={{ width: '100%', marginTop: '4px' }}
                multiline
                rows={4}
                value={introduction}
                id="peronal_info_introduction"
                // label="Một số đặc điểm nhận diện công ty"
                placeholder={
                  languageRedux === 1
                    ? 'Mục tiêu nghề nghiệp'
                    : languageRedux === 2
                      ? 'Career goals'
                      : '경력 목표'
                }
                error={introduction?.length > 500} // Đánh dấu lỗi
                inputRef={(input) => {
                  if (input?.length > 500) {
                    input.focus();
                  }
                }}
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
                      : languageRedux === 2
                        ? 'Career goals cannot be empty'
                        : languageRedux === 3 &&
                        '경력 목표는 비워둘 수 없습니다.'}
                  </span>
                ) : introduction?.length > 500 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Mục tiêu nghề nghiệp không được vượt quá 500 ký tự'
                      : languageRedux === 2
                        ? 'Career goals cannot exceed 500 characters'
                        : '경력 목표는 500자를 초과할 수 없습니다.'}
                  </span>
                ) : (
                  <></>
                )}
                <span className="number-text">{`${introduction?.length}/500`}</span>
              </div>
            </Box>
          </form>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {languageRedux === 1
              ? 'Lưu thông tin'
              : languageRedux === 2
                ? 'Save information'
                : languageRedux === 3 && '정보 저장'}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalProfileInfoPerson;
