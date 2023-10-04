import React, { useState } from 'react';
import { Box, TextField, Modal, Typography } from '@mui/material';
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
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';
import { message } from 'antd';
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

interface IEducation {
  id: number | null;
  companyName: string;
  major: string;
  startDate: number;
  endDate: number;
  extraInformation: string;
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
}

const ModalProfileEducationCreate: React.FC<IModalProfileEducationCreate> = (
  props,
) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
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
  const [education, setEducation] = useState<IInfoEducation>({
    companyName: '',
    major: '',
    startDate: new Date(2017, 4, 1, 0, 0).getTime(),
    endDate: new Date(2023, 4, 30, 0, 0).getTime(),
    extraInformation: '',
  });

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
    if (
      education.companyName?.trim() === ''
    ) {
      return {
        messageError: language?.profile_page?.err_school,
        checkForm: false,
      };
    }
    if (
      education.companyName?.trim().length > 50
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Trường học/Tổ chức không được vượt quá 50 ký tự" :
          "School/Organization cannot exceed 50 characters",
        checkForm: false,
      };
    }
    if (
      education.major?.trim() === ''
    ) {
      return {
        messageError: language?.profile_page?.err_major,
        checkForm: false,
      };
    }
    if (
      education.major?.trim().length > 50
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Tên ngành không được vượt quá 50 ký tự" :
          "Major cannot exceed 50 characters",
        checkForm: false,
      };
    }
    if (
      education.extraInformation?.trim() === ''
    ) {
      return {
        messageError: language?.profile_page?.err_additional_information,
        checkForm: false,
      };
    }
    if (
      education.extraInformation?.trim().length > 50
    ) {
      return {
        messageError: languageRedux === 1 ?
          "Thông tin thêm không được vượt quá 50 ký tự" :
          "Additional information cannot exceed 50 characters",
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
        const result = await profileApi.createProfileEducation(education);
        if (result) {
          setOpenModalEducationCreate(false);
        }
      } else {
        message.error(messageError)
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
    <Modal
      open={openModalEducationCreate}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onKeyDown={handleKeyDown}
    >
      <Box sx={style}
        className="Modal-personnal-info"
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
          {
            language?.profile_page?.add_education
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
              language?.school_organization
            }{' '}
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
            placeholder={
              language?.profile_page?.place_school
            }
          // error={titleError} // Đánh dấu lỗi
          />
        </Box>

        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {
              language?.major
            }{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            //   value={formValues.title}
            onChange={handleChangeMajor}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={
              language?.major
            }
          // error={titleError} // Đánh dấu lỗi
          />
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
                  {
                    language?.start_time
                  }{' '}
                  <span className="color-asterisk">*</span>
                </Typography>
                <DatePicker
                  value={moment(education.startDate)}
                  onChange={handleChangeStartTime}
                  views={['year', 'month']}
                  openTo="month"
                  format="MM/YYYY"
                />
              </div>
              <div className="wrapTimeDay">
                <Typography
                  // sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="startTime"
                >
                  {
                    language?.finish_time
                  }{' '}
                  <span className="color-asterisk">*</span>
                </Typography>
                <DatePicker
                  value={moment(education.endDate)}
                  onChange={handleChangeEndTime}
                  views={['year', 'month']}
                  openTo="month"
                  minDate={moment(education.startDate)}
                  format="MM/YYYY"
                />
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
            {
              language?.additional_information
            }{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            // className={classes.textarea}
            onChange={handleChangeExtraInfo}
            sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
            multiline
            rows={4}
            // label="Một số đặc điểm nhận diện công ty"
            placeholder={
              language?.profile_page?.place_additional_information
            }

          />
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {
            language?.profile_page?.save_info
          }
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileEducationCreate;
