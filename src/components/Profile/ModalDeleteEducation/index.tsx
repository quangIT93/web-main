import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

// data
import profileApi from 'api/profileApi';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
// import { RootState } from 'store/reducer';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';
import languageApi from 'api/languageApi';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
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

interface IModalProfileDeleteEducation {
  openModalDeleteEducation: boolean;
  setOpenModalDeleteEducation: React.Dispatch<React.SetStateAction<boolean>>;
  educationId?: number | null;
}
const ModalDelete: React.FC<IModalProfileDeleteEducation> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { openModalDeleteEducation, setOpenModalDeleteEducation, educationId } =
    props;
  const dispatch = useDispatch();
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  // const [language, setLanguage] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguage(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);

  const handleClose = () => setOpenModalDeleteEducation(false);

  const handleSubmitDelete = async () => {
    try {
      const result = await profileApi.deleteProfileEducation(educationId);
      if (result) {
        // const profile = await profileApi.getProfile(
        //    languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        // );
        // if (profile) {
        //   setProfileUser(profile.data);
        // }
        const getProfileV3 = await profileApi.getProfileInformationMoreV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (getProfileV3) {
          await dispatch(setProfileMeInformationMoreV3(getProfileV3) as any);
          await dispatch(setAlert(true));
          setOpenModalDeleteEducation(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitRefuse = () => {
    setOpenModalDeleteEducation(false);
  };

  return (
    <Modal
      open={openModalDeleteEducation}
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

export default React.memo(ModalDelete);
