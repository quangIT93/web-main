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
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  const [education, setEducation] = useState<IInfoEducation>({
    educationId: educationId,
    companyName: educationValue.company_name,
    major: educationValue.major,
    startDate: educationValue.start_date,
    endDate: educationValue.end_date,
    extraInformation: educationValue.extra_information,
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

  const validValue = () => {
    if (education.major === '') {
      return {
        message: 'Vui lòng nhập tên chuyên ngành',
        checkForm: false,
      };
    }

    if (education.companyName === '') {
      return {
        message: 'Vui lòng nhập tên trường/tổ chức',
        checkForm: false,
      };
    }

    if (education.extraInformation === '') {
      return {
        message: 'Vui lòng nhập thông tin bổ sung',
        checkForm: false,
      };
    }
    console.log('NaN', education.startDate);

    if (!education.startDate) {
      return {
        message: 'Vui lòng nhập ngày bắt đầu',
        checkForm: false,
      };
    }

    if (!education.endDate) {
      return {
        message: 'Vui lòng nhập Ngày kết thúc',
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
          const profile = await profileApi.getProfile();
          if (profile) {
            setProfileUser(profile.data);
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
        content: 'Vui lòng kiểm tra lại thông tin đã nhập',
      });
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && event.target.id !== 'extra-info') {
      handleSubmit();
    }
  };
  return (
    <Modal
      open={openModalEducationUpdate}
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
          Sửa thông tin trình độ học vấn
        </Typography>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Trường/Tổ chức <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={education.companyName}
            onChange={handleChangeSchool}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Nhập tên trường hoặc tổ chức"
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
            Chuyên ngành <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={education.major}
            onChange={handleChangeMajor}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Ngành"
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
                  value={
                    moment(education.startDate)
                    // && new Date().getTime()
                  }
                  defaultValue={moment(new Date().getTime())}
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
                  value={moment(education.endDate)}
                  defaultValue={moment(new Date().getTime())}
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
            Thông tin bổ sung <span className="color-asterisk">*</span>
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

export default React.memo(ModalProfileEducationUpdate);
