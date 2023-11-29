import React from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';

// data
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
// import { RootState } from 'store/reducer';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { Input } from 'antd';

import './style.scss';

// const { TextArea } = Input;

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

// const styleChildBox = {
//   marginBottom: '12px',
// };

interface IModalInternship {
  openModalInternship: boolean;
  setOpenModalInternship: React.Dispatch<React.SetStateAction<boolean>>;
  setInternshipValues: React.Dispatch<React.SetStateAction<any>>;
}
const ModalInternship: React.FC<IModalInternship> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { openModalInternship, setOpenModalInternship, setInternshipValues } =
    props;
  const [internship, setIntership] = React.useState({
    title: '',
    employer: '',
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
    description: '',
  });

  const handleClose = () => setOpenModalInternship(false);

  const handleOnchangeTitle = (e: any) => {
    setIntership((prev: any) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };
  const handleOnchangeDescription = (e: any) => {
    setIntership((prev: any) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };
  const handleOnchangeEmployer = (e: any) => {
    setIntership((prev: any) => {
      return {
        ...prev,
        employer: e.target.value,
      };
    });
  };
  const handleOnchangeStartDate = (newValue: any, e: any) => {
    setIntership((prev: any) => {
      return {
        ...prev,
        startDate: new Date(newValue._d).getTime(),
      };
    });
  };
  const handleOnchangeEndDate = (newValue: any, e: any) => {
    setIntership((prev: any) => {
      return {
        ...prev,
        endDate: new Date(newValue._d).getTime(),
      };
    });
  };

  const handleSubmit = () => {
    setInternshipValues((prev: any) => [internship, ...prev]);
    setIntership({
      title: '',
      employer: '',
      startDate: new Date().getTime(),
      endDate: new Date().getTime(),
      description: '',
    });
    setOpenModalInternship(false);
  };

  return (
    <Modal
      open={openModalInternship}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-internship-container"
    >
      <Box sx={style} className="Modal-personnal-info">
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
            ? 'Thêm thông tin thực tập'
            : languageRedux === 2
              ? 'Add Internship'
              : languageRedux && '더 많은 인턴십 정보'}
        </Typography>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1
              ? 'Tiêu đề công việc'
              : languageRedux === 2
                ? 'Job Title'
                : languageRedux === 3
                  ? '직업 제목'
                  : 'Tiêu đề công việc'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={internship.title}
            onChange={handleOnchangeTitle}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={
              languageRedux === 1
                ? 'Tiêu đề công việc'
                : languageRedux === 2
                  ? 'Job Title'
                  : languageRedux === 3
                    ? '직업 제목'
                    : 'Tiêu đề công việc'
            }
          // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1
              ? 'Nhà tuyển dụng'
              : languageRedux === 2
                ? 'Employer'
                : languageRedux === 3
                  ? '고용주'
                  : 'Nhà tuyển dụng'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={internship.employer}
            onChange={handleOnchangeEmployer}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={
              languageRedux === 1
                ? 'Nhà tuyển dụng'
                : languageRedux === 2
                  ? 'Employer'
                  : languageRedux === 3
                    ? '고용주'
                    : 'Nhà tuyển dụng'
            }
          // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer
              components={['DatePicker']}
            //   sx={{ display: 'flex' }}
            >
              <div className="internship-time-wraper">
                <Typography
                  // sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="nameProfile"
                >
                  {languageRedux === 1
                    ? 'Ngày bắt đầu'
                    : languageRedux === 2
                      ? 'Start date'
                      : languageRedux === 3 && '시작일'}{' '}
                  <span className="color-asterisk">*</span>
                </Typography>
                <DatePicker
                  value={moment(internship.startDate)}
                  onChange={handleOnchangeStartDate}
                  views={['year', 'month']}
                  openTo="month"
                  format="MM/YYYY"
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer
              components={['DatePicker']}
            //   sx={{ display: 'flex' }}
            >
              <div className="internship-time-wraper">
                <Typography
                  // sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="nameProfile"
                >
                  {languageRedux === 1
                    ? 'Ngày kết thúc'
                    : languageRedux === 2
                      ? 'End date'
                      : languageRedux === 3 && '종료일'}{' '}
                  <span className="color-asterisk">*</span>
                </Typography>
                <DatePicker
                  value={moment(internship.endDate)}
                  onChange={handleOnchangeEndDate}
                  views={['year', 'month']}
                  openTo="month"
                  format="MM/YYYY"
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1
              ? 'Mô tả'
              : languageRedux === 2
                ? 'Describe'
                : languageRedux === 3 && '설명'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={internship.description}
            onChange={handleOnchangeDescription}
            // onKeyDown={(e: any) => handleKeyPress(e)}
            // onPressEnter={(e: any) => handleKeyPress(e)}
            multiline
            rows={6}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={
              languageRedux === 1
                ? 'Mô tả quá trình thực tập của bạn'
                : languageRedux === 2
                  ? 'Description your activity'
                  : languageRedux === 3
                    ? '당신의 활동을 설명하십시오'
                    : 'Mô tả quá trình thực tập của bạn'
            }
          // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {languageRedux === 1
            ? 'Lưu thông tin'
            : languageRedux === 2
              ? 'Save information'
              : languageRedux === 3 &&
              '정보 저장'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalInternship;
