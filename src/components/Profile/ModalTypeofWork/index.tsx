import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

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
};

interface ITypeofWork {
  openModalTypeofWork: boolean;
  setOpenModalTypeofWork: React.Dispatch<React.SetStateAction<boolean>>;
  jobTypeId: number;
}

const ModalTypeofWork: React.FC<ITypeofWork> = (props) => {
  const { setOpenModalTypeofWork, openModalTypeofWork, jobTypeId } = props;
  const [valueType, setValueType] = React.useState<number | null>(null);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModalTypeofWork(false);
  };

  const handleChange = (e: any) => {
    setValueType(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await profileApi.putProfileJobV3(valueType, null);
      if (result) {
        const resultProfileV3 = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        dispatch(setProfileV3(resultProfileV3));
        setOpenModalTypeofWork(false);
      }
    } catch (error) {}
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
          {/* {language?.working_location} */}
          Type of work
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
        <Box sx={styleChildBox}>
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
              {languageRedux === 1 ? 'Toàn thời gian' : 'Fulltime'}
            </MenuItem>
            <MenuItem value={2}>
              {languageRedux === 1 ? 'Bán thời gian' : 'Parttime'}
            </MenuItem>
            <MenuItem value={4}>
              {languageRedux === 1 ? 'Làm việc tự do' : 'Freelancer'}
            </MenuItem>
            <MenuItem value={7}>
              {languageRedux === 1 ? 'Thực tập' : 'Intern'}
            </MenuItem>
          </TextField>
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Lưu
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalTypeofWork;
