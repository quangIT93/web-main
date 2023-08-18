import React, { useState } from 'react';
import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
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

interface IModalProfileInfoPerson {
  openModelPersonalInfo: boolean;
  setOpenModalPersonalInfo: React.Dispatch<React.SetStateAction<boolean>>;
  profile: any;
}
interface IInfoPersonal {
  name: string;
  birthday: number;
  gender: number;
  address: number;
  introduction: string;
}

const ModalProfileInfoPerson: React.FC<IModalProfileInfoPerson> = (props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const { openModelPersonalInfo, setOpenModalPersonalInfo, profile } = props;
  const [gender, setGender] = React.useState(
    profile?.gender != null ? (profile.gender === 1 ?
      "Nam" :
      "Nữ") : null,
  );
  const [day, setDay] = useState(
    profile?.birthday ? moment(new Date(profile?.birthday)) : moment(),
  ); // Giá trị mặc định là ngày hiện tại
  const [dataProvinces, setDataProvinces] = useState<any>();
  const [selectedProvince, setSelectedProvince] = useState<any>(
    profile?.address ? profile?.address : null,
  );
  const [name, setName] = useState(profile?.name);
  const [introduction, setIntroduction] = useState(profile?.introduction);

  const [messageApi, contextHolder] = message.useMessage();

  const [language, setLanguageState] = React.useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setLanguageState(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi()
  }, [languageRedux])

  const dispatch = useDispatch();
  // const dataProfile = useSelector((state: RootState) => state.profile.profile);

  const handleSetFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const getAllProvinces = async () => {
    try {
      const allLocation = await locationApi.getAllLocation(
        languageRedux === 1 ? "vi" : "en"
      );

      if (allLocation) {
        setDataProvinces(allLocation.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllProvinces();
    // getAllLocations()
    // delete param when back to page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleDateChange = (date: any) => {
    setDay(moment(date._d));
  };
  const handleClose = () => setOpenModalPersonalInfo(false);

  const handleChange = (event: any) => {
    setGender(event.target.value);
    //  console.log(event.target.value)
  };

  const handleProvinceChange = (event: any, value: any) => {
    setSelectedProvince(value);
    // console.log("value: ", value)
  };

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

    if (introduction === '') {
      return {
        message: language?.profile_page?.err_intro,
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
          gender: gender === 'Nam' ? 1 : 0,
          address: selectedProvince.id,
          introduction: introduction,
        };
        const result = await profileApi.putProfilePersonal(info);
        if (result) {
          await dispatch(getProfile() as any);
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
    <Modal
      open={openModelPersonalInfo}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onKeyDown={handleKeyDown}
      sx={{ minWidth: "300px" }}
    >
      <Box sx={style}
        className="Modal-personnal-info"
      >
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
            {
              language?.personal_information
            }
          </Typography>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {
                language?.full_name
              }{' '}
              <span className="color-asterisk">*</span>
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
          </Box>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="sex"
            >
              {
                language?.sex
              }{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              select
              id="sex"
              value={gender}
              // defaultValue={gender}
              onChange={handleChange}
              variant="outlined"
              placeholder={
                language?.sex
              }
              size="small"
              sx={{ width: '100%' }}
              error={!gender} // Đánh dấu lỗi
            >
              <MenuItem value="Nam">
                {
                  language?.male
                }
              </MenuItem>
              <MenuItem value="Nữ">
                {
                  language?.female
                }
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
                  {
                    language?.date_of_birth
                  }{' '}
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
            </LocalizationProvider>
          </Box>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="jobTitle"
            >
              {
                language?.location
              }{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <Autocomplete
              options={dataProvinces ? dataProvinces : []}
              getOptionLabel={(option: any) => option?.province_fullName || ''}
              value={
                selectedProvince
                  ? dataProvinces?.find(
                    (province: any) => province.province_id === selectedProvince.id,
                  )
                  : null
              }
              defaultValue={dataProvinces}
              onChange={handleProvinceChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    language?.profile_page?.place_address
                  }
                  size="small"
                  error={!selectedProvince}
                />
              )}
            />
          </Box>
          <Box sx={styleChildBox}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="startTime"
            >
              {
                language?.self_describtion
              }{' '}
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
              placeholder={
                language?.introduce_yourself_to_the_recruiter
              }
              error={!introduction} // Đánh dấu lỗi
            // onKeyDown={(event) => {
            //   // if (event.key === 'Enter') {
            //   //   event.preventDefault();
            //   // }
            //   console.log(event.target);
            // }}
            />
          </Box>
        </form>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {
            language?.profile_page?.save_info
          }
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileInfoPerson;
