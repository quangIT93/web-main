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
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

// import { setProfileV3 } from 'store/reducer/profileReducerV3';
import profileApi from 'api/profileApi';
import { message } from 'antd';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
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

  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
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

  useEffect(() => {
    setLanguage(openModalEditlanguages.name);
    setLevel(openModalEditlanguages.idLevel);
  }, [openModalEditlanguages]);

  const validValue = () => {
    if (language?.trim() === '') {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên ngôn ngữ không được bỏ trống'
            : languageRedux === 2
              ? 'Language names cannot be empty'
              : languageRedux === 3
                ? '언어 이름은 비워둘 수 없습니다.'
                : 'Tên ngôn ngữ không được bỏ trống',
        checkForm: false,
        idError: 1,
      };
    }
    if (language?.trim().length > 255) {
      return {
        messageError:
          languageRedux === 1
            ? 'Tên ngôn ngữ không được vượt quá 255 ký tự'
            : languageRedux === 2
              ? 'Language names cannot exceed 255 characters'
              : languageRedux === 3 &&
                '언어 이름은 255자를 초과할 수 없습니다.',
        checkForm: false,
        idError: 1,
      };
    }

    return {
      messageError: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleSubmit = async () => {
    const { messageError, checkForm, idError } = validValue();
    try {
      if (checkForm) {
        const result = await apiCv.putProfileLanguage(
          level,
          language,
          openModalEditlanguages.id,
        );
        if (result) {
          const resultProfile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );

          if (resultProfile) {
            setOpenModalEditlanguages({
              open: false,
              id: null,
              idLevel: null,
              name: '',
            });
            dispatch(setProfileMeInformationMoreV3(resultProfile));
            setLanguage('');
            setLevel(1);
            dispatch(setAlertEditInfo(true));
          }
        }
      } else {
        message.error(messageError);
        const profile_languages_edit_language_name = document.getElementById(
          'profile_languages_edit_language_name',
        ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_languages_edit_language_name.focus();
            break;

          default:
            break;
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
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalEditlanguages.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="Modal-personnal-info modal-person modal-languageProfile"
        >
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
              : languageRedux === 2
                ? 'Edit Languages'
                : languageRedux === 3 && '언어 편집'}
          </Typography>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Ngoại ngữ'
                : languageRedux === 2
                  ? 'Languages'
                  : languageRedux === 3 && '언어'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_languages_edit_language_name"
              name="skill"
              value={language}
              onChange={handleOnchangeSkill}
              defaultValue={openModalEditlanguages.name}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Ngoại ngữ'
                  : languageRedux === 2
                    ? 'Languages'
                    : languageRedux === 3
                      ? '언어'
                      : 'Ngoại ngữ'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {language && language.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên ngôn ngữ không được vượt quá 255 ký tự'
                    : languageRedux === 2
                      ? 'Language names cannot exceed 255 characters'
                      : languageRedux === 3 &&
                        '언어 이름은 255자를 초과할 수 없습니다.'}
                </span>
              ) : !language ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tên ngôn ngữ không được bỏ trống'
                    : languageRedux === 2
                      ? 'Language names cannot be empty'
                      : languageRedux === 3
                        ? '언어 이름은 비워둘 수 없습니다.'
                        : 'Tên ngôn ngữ không được bỏ trống'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                language ? language.length : '0'
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
              defaultValue={openModalEditlanguages.idLevel}
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
              sx={{ width: '100%' }}
              error={!level} // Đánh dấu lỗi
            >
              <MenuItem value={1}>
                {languageRedux === 1
                  ? 'Sơ cấp'
                  : languageRedux === 2
                    ? 'Primary'
                    : languageRedux === 3 && '초보자'}
              </MenuItem>
              <MenuItem value={2}>
                {languageRedux === 1
                  ? 'Trung cấp'
                  : languageRedux === 2
                    ? 'Intermediate level'
                    : languageRedux === 3 && '중급'}
              </MenuItem>
              <MenuItem value={3}>
                {languageRedux === 1
                  ? 'Trình độ cao'
                  : languageRedux === 2
                    ? 'High level'
                    : languageRedux === 3 && '고급'}
              </MenuItem>
              <MenuItem value={4}>
                {languageRedux === 1
                  ? 'Thành thạo'
                  : languageRedux === 2
                    ? 'Competently'
                    : languageRedux === 3 && '능통자'}
              </MenuItem>
            </TextField>
          </Box>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {languageRedux === 1
              ? 'Lưu thông tin'
              : languageRedux === 2
                ? 'Save information'
                : languageRedux === 3 && '정보 저장'}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalEditLanguages;
