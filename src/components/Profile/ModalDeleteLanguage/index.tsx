import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

// data
import profileApi from 'api/profileApi';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';

import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';
import languageApi from 'api/languageApi';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import apiCv from 'api/apiCv';
// import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { message } from 'antd';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';

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

interface IModalProfileDelete {
  openModalDeleteLanguage: boolean;
  setOpenModalDeleteLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  languageId: any;
  languageValue: any | null;
  deleteAll: boolean;
}
const ModalDeleteLanguage: React.FC<IModalProfileDelete> = (props) => {
  const {
    openModalDeleteLanguage,
    setOpenModalDeleteLanguage,
    languageId,
    languageValue,
    deleteAll,
  } = props;

  const dispatch = useDispatch();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  // const [language, setLanguage] = React.useState<any>();

  // const getlanguageApi = async () => {
  //     try {
  //         const result = await languageApi.getLanguage(
  //              languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //         );
  //         if (result) {
  //             setLanguage(result.data);
  //             // setUser(result);
  //         }
  //     } catch (error) {
  //         // setLoading(false);
  //     }
  // };

  // React.useEffect(() => {
  //     getlanguageApi();
  // }, [languageRedux]);

  const handleClose = () => setOpenModalDeleteLanguage(false);

  const handleSubmitDelete = async () => {
    try {
      const result = await apiCv.deleteProfileLanguage(
        // languageId?.length > 1 ?
        //     languageId :
        //     [languageId]
        languageId,
      );
      if (result) {
        const resultProfile = await profileApi.getProfileInformationMoreV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );

        resultProfile && dispatch(setProfileMeInformationMoreV3(resultProfile));
        // message.success(
        //     deleteAll
        //         ? languageRedux === 1
        //             ? 'Đã xóa tất cả các ngôn ngữ'
        //             : 'Deleted all languages'
        //         : languageRedux === 1
        //             ? `Bạn đã xóa ngôn ngữ "${languageValue}" thành công`
        //             : `You deleted the language "${languageValue}" successfully !`,
        // );

        setOpenModalDeleteLanguage(false);
        dispatch(setAlert(true));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitRefuse = () => {
    setOpenModalDeleteLanguage(false);
  };

  return (
    <Modal
      open={openModalDeleteLanguage}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{ marginBottom: '12px' }}
        >
          {languageRedux === 1
            ? 'Bạn có chắc muốn xóa thông tin này chứ?'
            : languageRedux === 2
              ? 'Are you sure you want to delete this information?'
              : '이 정보를 삭제하시겠습니까?'}
        </Typography>
        <Box sx={{ display: deleteAll ? 'block' : 'none' }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="p"
            align="center"
            sx={{ marginBottom: '12px' }}
          >
            {languageRedux === 1
              ? 'Nếu thực hiện chức năng này, tất cả các thông tin của bạn sẽ bị xóa'
              : languageRedux === 2
                ? 'If you perform this function, all your information will be deleted'
                : languageRedux === 3 &&
                '이 기능을 수행하면 모든 정보가 삭제됩니다'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '100px' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmitDelete}
            color="error"
          >
            {languageRedux === 1
              ? 'Xóa'
              : languageRedux === 2
                ? 'Delete'
                : '삭제'}
          </Button>

          <Button variant="contained" fullWidth onClick={handleSubmitRefuse}>
            {languageRedux === 1
              ? 'Trở về'
              : languageRedux === 2
                ? 'Return'
                : '반품'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalDeleteLanguage);
