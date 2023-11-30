import React from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// data
import { useDispatch } from 'react-redux';
import {
  setAlert,
  setAlertSuccess,
} from 'store/reducer/profileReducer/alertProfileReducer';
// import { RootState } from 'store/reducer';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { message } from 'antd';
import './style.scss';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
// import { Input } from 'antd';

// import './style.scss';

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
  },
});

// const styleChildBox = {
//   marginBottom: '12px',
// };

interface IModalActivity {
  openModalAward: boolean;
  setOpenModalAward: React.Dispatch<React.SetStateAction<boolean>>;
  setAwardValues: React.Dispatch<React.SetStateAction<any>>;
}
const ModalAward: React.FC<IModalActivity> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { openModalAward, setOpenModalAward, setAwardValues } = props;
  const [award, setAward] = React.useState({
    title: '',
    company: '',
    description: '',
  });
  const dispatch = useDispatch();
  const handleClose = () => setOpenModalAward(false);

  const handleOnchangeTitle = (e: any) => {
    setAward((prev: any) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };
  const handleOnchangeDescription = (e: any) => {
    setAward((prev: any) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };
  const handleOnchangeCompany = (e: any) => {
    setAward((prev: any) => {
      return {
        ...prev,
        company: e.target.value,
      };
    });
  };

  const validValue = () => {
    if (award.title.trim().length > 255 || award.title.trim().length === 0) {
      return {
        messageError:
          languageRedux === 1
            ? 'Độ dài tiêu đề phải lớn hơn 0 và nhỏ hơn 255'
            : languageRedux === 2
              ? 'Title length must be greater than 0 and less than 255'
              : languageRedux === 3 &&
                '제목 길이는 0보다 크고 255보다 작아야 합니다.',
        checkForm: false,
        idError: 1,
      };
    }

    if (
      award.description.trim().length > 1000 ||
      award.description.trim().length === 0
    ) {
      return {
        messageError:
          languageRedux === 1
            ? 'Độ dài mô tả phải lớn hơn 0 và nhỏ hơn 1000'
            : languageRedux === 2
              ? 'Description length must be greater than 0 and less than 1000'
              : languageRedux === 3 &&
                '설명 길이는 0보다 크고 1000보다 작아야 합니다.',
        checkForm: false,
        idError: 2,
      };
    }

    return {
      messageError: '',
      checkForm: true,
      idError: 0,
    };
  };

  const handleSubmit = async () => {
    try {
      const { messageError, checkForm, idError } = validValue();
      if (checkForm) {
        const result = await apiCv.postProfileAwards(
          award.title.trim(),
          award.description.trim(),
        );
        if (result) {
          const resultProfile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );

          resultProfile &&
            dispatch(setProfileMeInformationMoreV3(resultProfile));
          //   message.success(
          //     languageRedux === 1
          //       ? `Thêm mới giải thưởng "${award.title}" thành công`
          //       : `Added award "${award.title}" successfully`,
          //   );
          setAward({
            title: '',
            company: '',
            description: '',
          });
          setOpenModalAward(false);
          dispatch(setAlertSuccess(true));
        }
      } else {
        message.error(messageError);
        const profile_award_title = document.getElementById(
          'profile_award_title',
        ) as HTMLElement;
        const profile_award_description = document.getElementById(
          'profile_award_description',
        ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_award_title.focus();
            break;
          case 2:
            profile_award_description.focus();
            break;

          default:
            break;
        }
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalAward}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-award-container"
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
              ? 'Thêm thông tin giải thưởng'
              : languageRedux === 2
                ? 'Add Award'
                : languageRedux === 3 && '더 많은 수상 정보'}
          </Typography>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1
                ? 'Tiêu đề giải thưởng'
                : languageRedux === 2
                  ? 'Award Title'
                  : languageRedux === 3 && '수상명'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_award_title"
              name="skill"
              value={award.title}
              onChange={handleOnchangeTitle}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Tiêu đề giải thưởng'
                  : languageRedux === 2
                    ? 'Award Title'
                    : languageRedux === 3
                      ? '수상명'
                      : 'Tiêu đề giải thưởng'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {award.title && award.title.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề không được vượt quá 255 ký tự'
                    : languageRedux === 2
                      ? 'Title cannot exceed 255 characters'
                      : languageRedux === 3 &&
                        '제목은 255자를 초과할 수 없습니다.'}
                </span>
              ) : !award.title ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề không được bỏ trống'
                    : languageRedux === 2
                      ? 'Title cannot be empty'
                      : languageRedux === 3 && '제목은 비워둘 수 없습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${
                award.title ? award.title.length : '0'
              }/255`}</span>
            </div>
          </Box>
          {/* <Box sx={{ marginBottom: '12px' }}>
                    <Typography
                        // sx={styleLabel}
                        variant="body1"
                        component="label"
                        htmlFor="nameProfile"
                    >
                        {
                            languageRedux === 1 ?
                                "Tên công ty" : "Company"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={award.company}
                        onChange={handleOnchangeCompany}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1 ?
                                "Tên công ty" : "Company"
                        }
                    // error={titleError} // Đánh dấu lỗi
                    />
                </Box> */}
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
                  ? 'Description'
                  : languageRedux === 3 && '묘사'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_award_description"
              name="skill"
              value={award.description}
              onChange={handleOnchangeDescription}
              // onKeyDown={(e: any) => handleKeyPress(e)}
              // onPressEnter={(e: any) => handleKeyPress(e)}
              multiline
              rows={6}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1
                  ? 'Mô tả giải thưởng của bạn'
                  : languageRedux === 2
                    ? 'Description your award'
                    : languageRedux === 3
                      ? '수상 경력을 설명하세요.'
                      : 'Mô tả giải thưởng của bạn'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {award.description.length === 0 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được bỏ trống'
                    : languageRedux === 2
                      ? 'Additional information cannot be empty'
                      : languageRedux === 3 &&
                        '추가 정보는 비워둘 수 없습니다.'}
                </span>
              ) : award.description.length > 1000 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Thông tin thêm không được vượt quá 1000 ký tự'
                    : languageRedux === 2
                      ? 'Additional information cannot exceed 1000 characters'
                      : languageRedux === 3 &&
                        '추가 정보는 1000자를 초과할 수 없습니다.'}
                </span>
              ) : (
                <></>
              )}
              <span className="number-text">{`${award.description.length}/1000`}</span>
            </div>
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

export default ModalAward;
