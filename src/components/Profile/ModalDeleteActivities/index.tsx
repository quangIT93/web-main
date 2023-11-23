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
import { setProfileV3 } from 'store/reducer/profileReducerV3';
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
  openModalDeleteActivities: boolean;
  setOpenModalDeleteActivities: React.Dispatch<React.SetStateAction<boolean>>;
  activitiesId: any;
  activityValue: any | null;
  deleteAll: boolean;
}
const ModalDeleteActivities: React.FC<IModalProfileDelete> = (props) => {
  const {
    openModalDeleteActivities,
    setOpenModalDeleteActivities,
    activitiesId,
    activityValue,
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

  const handleClose = () => setOpenModalDeleteActivities(false);

  const handleSubmitDelete = async () => {
    try {
      const result = await apiCv.deleteProfileActivities(
        // activitiesId?.length > 1 ?
        //     activitiesId :
        //     [activitiesId]
        activitiesId,
      );
      if (result) {
        const resultProfile = await profileApi.getProfileInformationMoreV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );

        resultProfile && dispatch(setProfileMeInformationMoreV3(resultProfile));
        // message.success(
        //   deleteAll
        //     ? languageRedux === 1
        //       ? 'Đã xóa tất cả các hoạt động'
        //       : 'Deleted all activities'
        //     : languageRedux === 1
        //     ? `Bạn đã xóa hoạt động "${activityValue?.title}" thành công`
        //     : `You deleted the activity "${activityValue?.title}" successfully !`,
        // );

        setOpenModalDeleteActivities(false);
        dispatch(setAlert(true));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitRefuse = () => {
    setOpenModalDeleteActivities(false);
  };

  return (
    <Modal
      open={openModalDeleteActivities}
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
          {language?.profile_page?.alert_delete_info}
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
              ? 'Nếu thực hiện chức năng này, tất cả các hoạt động của bạn sẽ bị xóa'
              : 'If you perform this function, all your activities will be deleted'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '100px' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmitDelete}
            color="error"
          >
            {language?.profile_page?.delete}
          </Button>

          <Button variant="contained" fullWidth onClick={handleSubmitRefuse}>
            {language?.profile_page?.return}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalDeleteActivities);
