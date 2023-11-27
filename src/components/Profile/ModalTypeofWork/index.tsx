import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import {
  MenuItem,
  TextField,
  Modal,
  Typography,
  Button,
  Box,
} from '@mui/material';

import { CloseOutlined } from '@ant-design/icons';
import profileApi from 'api/profileApi';
import { RootState } from '../../../store/reducer';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
import { setAlertEditInfo } from 'store/reducer/profileReducer/alertProfileReducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '840px',
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
  marginTop: '12px',
};

interface ITypeofWork {
  openModalTypeofWork: boolean;
  setOpenModalTypeofWork: React.Dispatch<React.SetStateAction<boolean>>;
  jobTypeId: number;
}

const ModalTypeofWork: React.FC<ITypeofWork> = (props) => {
  const { setOpenModalTypeofWork, openModalTypeofWork, jobTypeId } = props;
  const [valueType, setValueType] = React.useState<number | null>(jobTypeId);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setValueType(jobTypeId);
  }, [jobTypeId]);

  const handleClose = () => {
    setOpenModalTypeofWork(false);
    handleSubmit();
  };

  const handleChange = (e: any) => {
    setValueType(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await profileApi.putProfileJobV3(valueType, null);
      if (result) {
        const resultProfileV3 = await profileApi.getProfileInformationMoreV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        dispatch(setProfileMeInformationMoreV3(resultProfileV3));
        dispatch(setAlertEditInfo(true));
        setOpenModalTypeofWork(false);
      }
    } catch (error) { }
  };

  return (
    <Modal
      open={openModalTypeofWork}
      //   open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
        >
          {/* {languageRedux === 1
              ? 'Khu vực làm việc'
              : languageRedux === 2
                ? 'Working location'
                : languageRedux === 3 &&
                '근무 위치'} */}
          {languageRedux === 1
            ? 'Loại hình công việc'
            : languageRedux === 2
              ? 'Type of work'
              : languageRedux === 3 && '일의 종류'}
        </Typography>

        {/* <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="sex"
          >
            {language?.sex} <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            select
            id="sex"
            value={gender}
            // defaultValue={gender}
            onChange={handleChange}
            variant="outlined"
            placeholder={language?.sex}
            size="small"
            sx={{ width: '100%' }}
            error={!gender} // Đánh dấu lỗi
          >
            <MenuItem value="Nam">{language?.male}</MenuItem>
            <MenuItem value="Nữ">{language?.female}</MenuItem>
          </TextField>
        </Box> */}
        <Box sx={styleChildBox} className="type-of-work-select-input">
          <TextField
            select
            id="sex"
            value={valueType}
            defaultValue={valueType && 1}
            onChange={handleChange}
            variant="outlined"
            placeholder={'Loại công việc'}
            size="small"
            sx={{ width: '100%' }}
          // error={!gender} // Đánh dấu lỗi
          >
            <MenuItem value={1}>
              {languageRedux === 1
                ? 'Toàn thời gian'
                : languageRedux === 2
                  ? 'Fulltime'
                  : languageRedux === 3 && '풀 타임'}
            </MenuItem>
            <MenuItem value={2}>
              {languageRedux === 1
                ? 'Bán thời gian'
                : languageRedux === 2
                  ? 'Part time'
                  : languageRedux === 3 && '파트타임'}
            </MenuItem>
            <MenuItem value={4}>
              {languageRedux === 1
                ? 'Làm việc tự do'
                : languageRedux === 2
                  ? 'Freelancer'
                  : languageRedux === 3 && '자유롭게 일하세요'}
            </MenuItem>
            <MenuItem value={7}>
              {languageRedux === 1
                ? 'Thực tập'
                : languageRedux === 2
                  ? 'Intern'
                  : languageRedux === 3 && '인턴'}
            </MenuItem>
          </TextField>
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {languageRedux === 1
            ? 'Lưu'
            : languageRedux === 2
              ? 'Save'
              : languageRedux === 3 && '구하다'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalTypeofWork;
