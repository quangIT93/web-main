import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  Box,
  TextField,
  Modal,
  Typography,
  MenuItem,
  Button,
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import apiCv from 'api/apiCv';

import {
  setAlertSuccess,
  setAlert,
  setAlertLackInfo,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';

import { setProfileV3 } from 'store/reducer/profileReducerV3';
import profileApi from 'api/profileApi';
interface IModalSkills {
  openModalEditlanguages: {
    open: boolean;
    id: null | number;
    name: string;
    idLevel: number | null;
  };
  setOpenModalEditlanguages: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: null | number;
      name: string;
      idLevel: number | null;
    }>
  >;
  setLanguageValues: React.Dispatch<React.SetStateAction<any>>;
  type: string;
}

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

const ModalEditLanguages: React.FC<IModalSkills> = (props) => {
  const {
    openModalEditlanguages,
    setOpenModalEditlanguages,
    setLanguageValues,
    type,
  } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const languageData = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const [language, setLanguage] = React.useState<any>();
  const [level, setLevel] = React.useState<any>(openModalEditlanguages.idLevel);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const handleOnchangeSkill = (e: any) => {
    setLanguage(e.target.value);
  };
  const handleOnchangeLevel = (e: any) => {
    setLevel(e.target.value);
  };
  console.log('openModalEditLanguages', openModalEditlanguages);
  useEffect(() => {
    setLanguage(openModalEditlanguages.name);
    setLevel(openModalEditlanguages.idLevel);
  }, [openModalEditlanguages]);

  const handleSubmit = async () => {
    try {
      const result = await apiCv.putProfileLanguage(
        level,
        language,
        openModalEditlanguages.id,
      );
      if (result) {
        const resultProfile = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );

        if (resultProfile) {
          setOpenModalEditlanguages({
            open: false,
            id: null,
            idLevel: null,
            name: '',
          });
          dispatch(setProfileV3(resultProfile));
          setLanguage('');
          setLevel(1);
          dispatch(setAlertEditInfo(true));
        }
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setOpenModalEditlanguages({
      open: false,
      id: null,
      idLevel: null,
      name: '',
    });
  };

  return (
    <Modal
      open={openModalEditlanguages.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
            ? 'Sửa ngoại ngữ'
            : languageRedux === 0
            ? 'Edit Languages'
            : ''}
        </Typography>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1 ? 'Ngoại ngữ' : 'Languages'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={language}
            onChange={handleOnchangeSkill}
            defaultValue={openModalEditlanguages.name}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={languageRedux === 1 ? 'Ngoại ngữ' : 'Languages'}
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="sex"
          >
            {languageRedux === 1 ? 'Cấp độ' : 'Level'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            select
            id="level"
            value={level}
            defaultValue={openModalEditlanguages.idLevel}
            onChange={handleOnchangeLevel}
            variant="outlined"
            placeholder={languageRedux === 1 ? 'Tháng/ Năm' : 'Month/ Year'}
            size="small"
            sx={{ width: '100%' }}
            error={!level} // Đánh dấu lỗi
          >
            <MenuItem value={1}>
              {languageRedux === 1 ? 'Sơ cấp' : 'Primary'}
            </MenuItem>
            <MenuItem value={2}>
              {languageRedux === 1 ? 'Trung cấp' : 'Intermediate'}
            </MenuItem>
            <MenuItem value={3}>
              {languageRedux === 1 ? 'Trình độ cao' : 'High - level'}
            </MenuItem>
            <MenuItem value={4}>
              {languageRedux === 1 ? 'Thành thạo' : 'Native'}
            </MenuItem>
          </TextField>
        </Box>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {languageData?.profile_page?.save_info}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEditLanguages;
