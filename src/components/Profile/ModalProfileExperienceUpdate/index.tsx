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
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';

import { message } from 'antd';

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
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
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
    companyName: experienceValue.company_name,
    title: experienceValue.title,
    startDate: experienceValue.start_date,
    endDate: experienceValue.end_date,
    extraInformation: experienceValue.extra_information,
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
        message: languageRedux === 1 ?
          profileVi.err_professional :
          profileEn.err_professional,
        checkForm: false,
      };
    }

    if (experience.companyName === '') {
      return {
        message: languageRedux === 1 ?
          profileVi.err_company :
          profileEn.err_company,
        checkForm: false,
      };
    }

    if (experience.extraInformation === '') {
      return {
        message: languageRedux === 1 ?
          profileVi.err_additional_information :
          profileEn.err_additional_information,
        checkForm: false,
      };
    }
    // console.log('NaN', experience.startDate);

    if (!experience.startDate) {
      return {
        message: languageRedux === 1 ?
          profileVi.err_start_time :
          profileEn.err_start_time,
        checkForm: false,
      };
    }

    if (!experience.endDate) {
      return {
        message: languageRedux === 1 ?
          profileVi.err_finish_time :
          profileEn.err_finish_time,
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
          const profile = await profileApi.getProfile(
            languageRedux === 1 ? "vi" : "en"
          );
          if (profile) {
            setProfileUser(profile.data);
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
        content: languageRedux === 1 ?
          profileVi.check_info_please :
          profileEn.check_info_please,
      });
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && event.target.id !== 'extraExp_info') {
      handleSubmit();
    }
  };

  return (
    <Modal
      open={openModalExperienceUpdate}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onKeyDown={handleKeyDown}
    >
      <Box sx={style}>
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
          {
            languageRedux === 1 ?
              profileVi.edit_working_experience :
              profileEn.edit_working_experience
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
            value={experience.title}
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
              languageRedux === 1 ?
                profileVi.company_organization :
                profileEn.company_organization
            }{' '}
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
            value={experience.extraInformation}
            onChange={handleChangeExtraInfo}
            sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
            multiline
            rows={4}
            id="extraExp_info"
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

export default ModalProfileExperienceUpdate;
