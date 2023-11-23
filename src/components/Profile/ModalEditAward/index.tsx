import React from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// data
import { useDispatch } from 'react-redux';
import {
  setAlert,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';
// import { RootState } from 'store/reducer';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { message } from 'antd';

// import { Input } from 'antd';

import './style.scss';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';

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
  openModalEditAward: boolean;
  setOpenModalEditAward: React.Dispatch<React.SetStateAction<boolean>>;
  setAwardValues: React.Dispatch<React.SetStateAction<any>>;
  awardId: any;
  awardValue: any;
}
const ModalEditAward: React.FC<IModalActivity> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    openModalEditAward,
    setOpenModalEditAward,
    setAwardValues,
    awardId,
    awardValue,
  } = props;
  const [award, setAward] = React.useState({
    id: awardValue?.id,
    title: awardValue?.title,
    // company: '',
    description: awardValue?.description,
  });
  const dispatch = useDispatch();
  const handleClose = () => setOpenModalEditAward(false);

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
  // const handleOnchangeCompany = (e: any) => {
  //     setAward((prev: any) => {
  //         return {
  //             ...prev,
  //             company: e.target.value
  //         }
  //     })
  // }

  const validValue = () => {
    if (award.title.trim().length > 250 || award.title.trim().length === 0) {
      return {
        messageError:
          languageRedux === 1
            ? 'Độ dài tiêu đề phải lớn hơn 0 và nhỏ hơn 250'
            : 'Title length must be greater than 0 and less than 250',
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
            : 'Description length must be greater than 0 and less than 1000',
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
        const result = await apiCv.putProifileAwards(
          award.title.trim(),
          award.description.trim(),
          award.id,
        );
        if (result) {
          const resultProfile = await profileApi.getProfileInformationMoreV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );

          resultProfile &&
            dispatch(setProfileMeInformationMoreV3(resultProfile));
          // message.success(
          //   languageRedux === 1
          //     ? 'Cập nhật thông tin thành công !'
          //     : 'Update information successfully !',
          // );
          setOpenModalEditAward(false);
          dispatch(setAlertEditInfo(true));
        }
      } else {
        message.error(messageError);
        const profile_award_edit_title = document.getElementById(
          'profile_award_edit_title',
        ) as HTMLElement;
        const profile_award_edit_description = document.getElementById(
          'profile_award_edit_description',
        ) as HTMLElement;
        // console.log(idError);

        switch (idError) {
          case 1:
            profile_award_edit_title.focus();
            break;
          case 2:
            profile_award_edit_description.focus();
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
    // awardValue.splice(awardId, 1, award)
    // setAwardValues(awardValue)
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalEditAward}
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
            {languageRedux === 1 ? 'Sửa thông tin giải thưởng' : 'Edit Award'}
          </Typography>
          <Box sx={{ marginBottom: '12px' }}>
            <Typography
              // sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="nameProfile"
            >
              {languageRedux === 1 ? 'Tiêu đề giải thưởng' : 'Award Title'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_award_edit_title"
              name="skill"
              value={award.title}
              onChange={handleOnchangeTitle}
              size="small"
              sx={{ width: '100%', marginTop: '4px' }}
              placeholder={
                languageRedux === 1 ? 'Tiêu đề giải thưởng' : 'Award Title'
              }
              // error={titleError} // Đánh dấu lỗi
            />
            <div className="wrap-noti_input">
              {award.title && award.title.length > 255 ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề không được vượt quá 255 ký tự'
                    : 'Title cannot exceed 255 characters'}
                </span>
              ) : !award.title ? (
                <span className="helper-text">
                  {languageRedux === 1
                    ? 'Tiêu đề không được bỏ trống'
                    : 'Title cannot be empty'}
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
              {languageRedux === 1 ? 'Miêu tả' : 'Description'}{' '}
              <span className="color-asterisk">*</span>
            </Typography>
            <TextField
              type="text"
              id="profile_award_edit_description"
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
                  : 'Description your award'
              }
              // error={titleError} // Đánh dấu lỗi
            />
          </Box>
          <div className="wrap-noti_input">
            {award.description.length === 0 ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Thông tin thêm không được bỏ trống'
                  : 'Additional information cannot be empty'}
              </span>
            ) : award.description.length > 1000 ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Thông tin thêm không được vượt quá 1000 ký tự'
                  : 'Additional information cannot exceed 1000 characters'}
              </span>
            ) : (
              <></>
            )}
            <span className="number-text">{`${award.description.length}/1000`}</span>
          </div>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {language?.profile_page?.save_info}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalEditAward;
