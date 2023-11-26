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
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';

// import { setProfileV3 } from 'store/reducer/profileReducerV3';
import profileApi from 'api/profileApi';
import apiCv from 'api/apiCv';

import {
  setAlertSuccess,
  setAlert,
  setAlertLackInfo,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';
import { message } from 'antd';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';

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

// Style Mui
const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: '14px',
        },
        h6: {
          fontSize: '20px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            fontSize: '14px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
});

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

  const [messageApi, contextHolder] = message.useMessage();
  const validValue = () => {
    if (skill?.trim() === '') {
      return {
        message:
          languageRedux === 1
            ? 'Tên kỹ năng không được bỏ trống'
            : languageRedux === 2
              ? 'Skill names cannot be empty'
              : languageRedux === 3
                ? '스킬 이름은 비워둘 수 없습니다.'
                : 'Tên kỹ năng không được bỏ trống.',
        checkForm: false,
        idError: 1,
      };
    }
    if (skill?.trim().length > 255) {
      return {
        message:
          languageRedux === 1
            ? 'Tên kỹ năng không được vượt quá 255 ký tự'
            : languageRedux === 2
              ? 'Skill names cannot exceed 255 characters'
              : languageRedux === 3
                ? '스킬 이름은 255자를 초과할 수 없습니다.'
                : 'Tên kỹ năng không được vượt quá 255 ký tự',
        checkForm: false,
        idError: 1,
      };
    }

    return {
      message: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleSubmit = async () => {
    const { message, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        const result = await apiCv.putProfileSkill(
          level,
          skill,
          openModalEditSkills.id,
        );
        if (result) {
          const resultProfile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
            dispatch(setProfileMeInformationMoreV3(resultProfile));
            dispatch(setAlertEditInfo(true));
          }
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
        const profile_skill_edit_skill_name = document.getElementById(
          'profile_skill_edit_skill_name',
        ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_skill_edit_skill_name.focus();
            break;

          default:
            break;
        }
      }
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const handleClose = () => {
    setOpenModalEditSkills({ open: false, id: null, idLevel: null, name: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalEditSkills.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="Modal-personnal-info modal-person modal-personSkill"
        >
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
            {languageRedux === 1
              ? 'Sửa kỹ năng'
              : languageRedux === 2
                ? 'Edit Skills'
                : languageRedux === 3 && '스킬 편집'}
          </Typography>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Kỹ năng'
                : languageRedux === 2
                  ? 'Skills'
                  : languageRedux === 3
                    ? '기술'
                    : 'Kỹ năng'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_skill_edit_skill_name"
              name="skill"
              value={skill}
              onChange={handleOnchangeSkill}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Kỹ năng'
                  : languageRedux === 2
                    ? 'Skills'
                    : languageRedux === 3
                      ? '기술'
                      : 'Kỹ năng'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {skill && skill.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên kỹ năng không được vượt quá 255 ký tự'
                    : languageRedux === 2
                      ? 'Skill names cannot exceed 255 characters'
                      : languageRedux === 3
                        ? '스킬 이름은 255자를 초과할 수 없습니다.'
                        : 'Tên kỹ năng không được vượt quá 255 ký tự'}
                </span>
              ) : !skill ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên kỹ năng không được bỏ trống'
                    : languageRedux === 2
                      ? 'Skill names cannot be empty'
                      : languageRedux === 3
                        ? '스킬 이름은 비워둘 수 없습니다.'
                        : 'Tên kỹ năng không được bỏ trống.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                skill ? skill.length : '0'
              }/255`}</span>
            </div>
          </Box>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="sex"
            >
              {languageRedux === 1
                ? 'Cấp độ'
                : languageRedux === 2
                  ? 'Level'
                  : languageRedux === 3 && '수준'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              select
              id="level"
              value={level}
              defaultValue={1}
              onChange={handleOnchangeLevel}
              variant="outlined"
              placeholder={
                languageRedux === 1
                  ? 'Tháng/ Năm'
                  : languageRedux === 2
                    ? 'Month/ Year'
                    : languageRedux === 3
                      ? '월/년'
                      : 'Tháng/ Năm'
              }
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              error={!level} // Đánh dấu lỗi
            >
              <MenuItem value={1}>
                {languageRedux === 1
                  ? 'Tập sự'
                  : languageRedux === 2
                    ? 'Novice'
                    : languageRedux === 3 && '초심자'}
              </MenuItem>
              <MenuItem value={2}>
                {languageRedux === 1
                  ? 'Sơ cấp'
                  : languageRedux === 2
                    ? 'Primary'
                    : languageRedux === 3 && '주요한'}
              </MenuItem>
              <MenuItem value={3}>
                {languageRedux === 1
                  ? 'Kinh nghiệm'
                  : languageRedux === 2
                    ? 'Experienced'
                    : languageRedux === 3 && '경험이 풍부한'}
              </MenuItem>
              <MenuItem value={4}>
                {languageRedux === 1
                  ? 'Thành thạo'
                  : languageRedux === 2
                    ? 'Competently'
                    : languageRedux === 3 && '유능하게'}
              </MenuItem>
              <MenuItem value={5}>
                {languageRedux === 1
                  ? 'Chuyên gia'
                  : languageRedux === 2
                    ? 'Expert'
                    : languageRedux === 3 && '전문가'}
              </MenuItem>
            </TextField>
          </Box>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {language?.profile_page?.save_info}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalEditSkills;
