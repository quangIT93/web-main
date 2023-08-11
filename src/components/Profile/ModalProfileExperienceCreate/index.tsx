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

import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';

// data
import profileApi from 'api/profileApi';
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
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
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

  const handleSubmit = async () => {
    try {
      const result = await profileApi.createProfileExperience(experience);
      if (result) {
        setOpenModalExperienceCreate(false);
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
      open={openModalExperienceCreate}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onKeyDown={handleKeyDown}
    >
      <Box sx={style}>
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
            languageRedux === 1 ?
              profileVi.add_working_experience :
              profileEn.add_working_experience
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
              language?.professional_titles
            }{' '}
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
            placeholder={
              language?.professional_titles
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
              language?.company_organization
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
              languageRedux === 1 ?
                profileVi.place_company_organization :
                profileEn.place_company_organization
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
                  value={moment(experience.startDate)}
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
                  value={moment(experience.endDate)}
                  onChange={handleChangeEndTime}
                  views={['year', 'month']}
                  openTo="month"
                  minDate={moment(experience.startDate)}
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
              languageRedux === 1 ?
                profileVi.place_additional_information :
                profileEn.place_additional_information
            }
          />
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {
            languageRedux === 1 ?
              profileVi.save_info :
              profileEn.save_info
          }
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileExperienceCreate;
