import React, { useState } from 'react';
import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { CloseOutlined } from '@ant-design/icons';

// data
import profileApi from 'api/profileApi';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';

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
  const {
    openModalExperienceUpdate,
    setOpenModalExperienceUpdate,
    experienceId,
    experienceValue,
  } = props;
  // console.log('typeItem', typeItem)
  const dispatch = useDispatch();

  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  const [experience, setExperience] = useState<IInfoExperience>({
    experienceId,
    companyName: experienceValue.company_name,
    title: experienceValue.title,
    startDate: experienceValue.start_date,
    endDate: experienceValue.end_date,
    extraInformation: experienceValue.extra_information,
  });

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

  const handleSubmit = async () => {
    try {
      const result = await profileApi.updateProfileExperience(experience);
      if (result) {
        const profile = await profileApi.getProfile();
        if (profile) {
          setProfileUser(profile.data);
        }
        setOpenModalExperienceUpdate(false);
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
      open={openModalExperienceUpdate}
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
          Sửa thông tin kinh nghiệm làm việc
        </Typography>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Chức danh <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={experience.title}
            onChange={handleChangeTitle}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Chức danh"
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
            Công ty/Tổ chức <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={experience.companyName}
            onChange={handleChangeSchool}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Nhập tên công ty hoặc tổ chức"
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
                  Thời gian bắt đầu <span className="color-asterisk">*</span>
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
                  Thời gian kết thúc <span className="color-asterisk">*</span>
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
            Thông tin bổ sung <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            // className={classes.textarea}
            value={experience.extraInformation}
            onChange={handleChangeExtraInfo}
            sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
            multiline
            rows={4}
            // label="Một số đặc điểm nhận diện công ty"
            placeholder="Để được nhà tuyển dụng quan tâm và tăng cơ hội ứng tuyển vào công ty mong muốn. Hẫy nhập thông tin bổ sung của bạn vào đây!"
          />
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileExperienceUpdate;
