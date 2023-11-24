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
  openModalDeleteAwards: boolean;
  setOpenModalDeleteAwards: React.Dispatch<React.SetStateAction<boolean>>;
  awardsId?: any;
  awardValue: any | null;
  deleteAll: boolean;
}
const ModalDeleteAwards: React.FC<IModalProfileDelete> = (props) => {
  const {
    openModalDeleteAwards,
    setOpenModalDeleteAwards,
    awardsId,
    awardValue,
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

  const handleClose = () => setOpenModalDeleteAwards(false);

  const handleSubmitDelete = async () => {
    try {
      const result = await apiCv.deleteProfileAwards(
        // awardsId?.length > 1 ?
        //     awardsId :
        //     [awardsId]
        awardsId,
      );
      if (result) {
        const resultProfile = await profileApi.getProfileInformationMoreV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );

        resultProfile && dispatch(setProfileMeInformationMoreV3(resultProfile));
        // message.success(
        //   deleteAll
        //     ? languageRedux === 1
        //       ? 'Đã xóa tất cả các giải thưởng'
        //       : 'Deleted all awards'
        //     : languageRedux === 1
        //     ? `Bạn đã xóa giải thưởng "${awardValue?.title}" thành công`
        //     : `You deleted the award "${awardValue?.title}" successfully !`,
        // );

        setOpenModalDeleteAwards(false);
        dispatch(setAlert(true));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitRefuse = () => {
    setOpenModalDeleteAwards(false);
  };

  return (
    <Modal
      open={openModalDeleteAwards}
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

export default React.memo(ModalDeleteAwards);
