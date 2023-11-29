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
  openModalCourse: boolean;
  setOpenModalCourse: React.Dispatch<React.SetStateAction<boolean>>;
  setCourseValues: React.Dispatch<React.SetStateAction<any>>;
}
const ModalCourse: React.FC<IModalInternship> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { openModalCourse, setOpenModalCourse, setCourseValues } = props;
  const [course, setCourse] = React.useState({
    title: '',
    institution: '',
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
  });

  const handleClose = () => setOpenModalCourse(false);

  const handleOnchangeTitle = (e: any) => {
    setCourse((prev: any) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  const handleOnchangeInstitution = (e: any) => {
    setCourse((prev: any) => {
      return {
        ...prev,
        institution: e.target.value,
      };
    });
  };
  const handleOnchangeStartDate = (newValue: any, e: any) => {
    setCourse((prev: any) => {
      return {
        ...prev,
        startDate: new Date(newValue._d).getTime(),
      };
    });
  };
  const handleOnchangeEndDate = (newValue: any, e: any) => {
    setCourse((prev: any) => {
      return {
        ...prev,
        endDate: new Date(newValue._d).getTime(),
      };
    });
  };

  const handleSubmit = () => {
    setCourseValues((prev: any) => [course, ...prev]);
    setCourse({
      title: '',
      institution: '',
      startDate: new Date().getTime(),
      endDate: new Date().getTime(),
    });
    setOpenModalCourse(false);
  };

  return (
    <Modal
      open={openModalCourse}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-course-container"
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
            ? 'Thêm thông tin khóa học'
            : languageRedux === 2
              ? 'Add Course'
              : languageRedux === 3 && '코스 추가'}
        </Typography>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1
              ? 'Khóa học'
              : languageRedux === 2
                ? 'Course'
                : languageRedux === 3 && '코스'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={course.title}
            onChange={handleOnchangeTitle}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={
              languageRedux === 1
                ? 'Khóa học'
                : languageRedux === 2
                  ? 'Course'
                  : languageRedux === 3
                    ? '코스'
                    : 'Khóa học'
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
              ? 'Tổ chức'
              : languageRedux === 2
                ? 'Institution'
                : '정리'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={course.institution}
            onChange={handleOnchangeInstitution}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={
              languageRedux === 1
                ? 'Tên công ty'
                : languageRedux === 2
                  ? 'Company name'
                  : languageRedux === 3
                    ? '회사 이름'
                    : 'Tên công ty'
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
              <div className="course-time-wraper">
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
                  value={moment(course.startDate)}
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
              <div className="course-time-wraper">
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
                  value={moment(course.endDate)}
                  onChange={handleOnchangeEndDate}
                  views={['year', 'month']}
                  openTo="month"
                  format="MM/YYYY"
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
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

export default ModalCourse;
