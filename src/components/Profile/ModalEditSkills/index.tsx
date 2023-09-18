import React from 'react';
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

import { setProfileV3 } from 'store/reducer/profileReducerV3';
import profileApi from 'api/profileApi';
import apiCv from 'api/apiCv';

interface IModalSkills {
  openModalEditSkills: {
    open: boolean;
    id: null | number;
    name: string;
    idLevel: number | null;
  };
  setOpenModalEditSkills: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: null | number;
      name: string;
      idLevel: number | null;
    }>
  >;
  setSkillValues: React.Dispatch<React.SetStateAction<any>>;
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

const ModalEditSkills: React.FC<IModalSkills> = (props) => {
  const { openModalEditSkills, setOpenModalEditSkills, setSkillValues } = props;
  const dispatch = useDispatch();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [skill, setSkill] = React.useState<any>();
  const [level, setLevel] = React.useState<any>(1);

  const handleOnchangeSkill = (e: any) => {
    setSkill(e.target.value);
  };
  const handleOnchangeLevel = (e: any) => {
    setLevel(e.target.value);
  };

  React.useEffect(() => {
    setSkill(openModalEditSkills.name);
    setLevel(openModalEditSkills.idLevel);
  }, [openModalEditSkills]);

  const handleSubmit = async () => {
    try {
      const result = await apiCv.putProfileSkill(
        level,
        skill,
        openModalEditSkills.id,
      );
      if (result) {
        const resultProfile = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (resultProfile) {
          setOpenModalEditSkills({
            open: false,
            id: openModalEditSkills.id,
            idLevel: level,
            name: skill,
          });
          setSkill('');
          setLevel(1);
          dispatch(setProfileV3(resultProfile));
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClose = () => {
    setOpenModalEditSkills({ open: false, id: null, idLevel: null, name: '' });
  };

  return (
    <Modal
      open={openModalEditSkills.open}
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
          {languageRedux === 1 ? 'Sửa kỹ năng' : 'Edit Skills'}
        </Typography>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            {languageRedux === 1 ? 'Kỹ năng' : 'Skill'}{' '}
            <span className="color-asterisk">*</span>
          </Typography>
          <TextField
            type="text"
            id="skill"
            name="skill"
            value={skill}
            onChange={handleOnchangeSkill}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder={languageRedux === 1 ? 'Kỹ năng' : 'Skill'}
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
            defaultValue={1}
            onChange={handleOnchangeLevel}
            variant="outlined"
            placeholder={languageRedux === 1 ? 'Tháng/ Năm' : 'Month/ Year'}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            error={!level} // Đánh dấu lỗi
          >
            <MenuItem value={1}>
              {languageRedux === 1 ? 'Người mới' : 'Novice'}
            </MenuItem>
            <MenuItem value={2}>
              {languageRedux === 1 ? 'Người bắt đầu' : 'Beginner'}
            </MenuItem>
            <MenuItem value={3}>
              {languageRedux === 1 ? 'Khéo léo' : 'Skillful'}
            </MenuItem>
            <MenuItem value={4}>
              {languageRedux === 1 ? 'Có kinh nghiệm' : 'Experienced'}
            </MenuItem>
            <MenuItem value={5}>
              {languageRedux === 1 ? 'Chuyên gia' : 'Expert'}
            </MenuItem>
          </TextField>
        </Box>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {language?.profile_page?.save_info}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEditSkills;
