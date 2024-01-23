import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { CloseOutlined } from '@ant-design/icons';

import { TreeSelect } from 'antd';

import { message } from 'antd';

// data
import profileApi from 'api/profileApi';
import { useDispatch } from 'react-redux';

// data
import locationApi from '../../../api/locationApi';

import {
  getProfile,
  // resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer';

import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';

import './style.scss';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
import { setAlertEditInfo } from 'store/reducer/profileReducer/alertProfileReducer';
import CascaderFilter from './CascaderFilter';

const { SHOW_PARENT } = TreeSelect;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '840px',
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

interface IModalProfileLocation {
  openModalLocation: boolean;
  setOpenModalLocation: React.Dispatch<React.SetStateAction<boolean>>;
  locations: number[];
}

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const ModalProfileLocation: React.FC<IModalProfileLocation> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const { openModalLocation, setOpenModalLocation, locations } = props;

  const [listDis, setListDis] = React.useState<any>([]);

  const dispatch = useDispatch();

  const handleClose = () => {
    handleSubmit();
    setOpenModalLocation(false);
  };

  const handleSubmit = async () => {
    const provinceValues = listDis?.map((item: any) => item[0]);
    const uniqueArr = [...new Set(provinceValues)] as string[];

    try {
      if (uniqueArr.length > 3) {
        message.error(
          languageRedux === 1
            ? 'Chỉ có thể tối đa 3 khu vực'
            : languageRedux === 2
            ? 'Only up to 3 areas can be'
            : '영역은 최대 3개까지만 있을 수 있습니다.',
        );

        setListDis(locations?.map((v: any, i) => [v.province.id, v.id]));
        return;
      }
      const result = await profileApi.updateProfileLocation(
        listDis?.map((v: [string, string]) => v[1]),
        // locationId,
      );
      if (result) {
        const getProfileV3 = await profileApi.getProfileInformationV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        await dispatch(setProfileMeInformationV3(getProfileV3) as any);
        dispatch(setAlertEditInfo(true));
        setOpenModalLocation(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={openModalLocation}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
        >
          {languageRedux === 1
            ? 'Khu vực làm việc'
            : languageRedux === 2
            ? 'Working location'
            : languageRedux === 3 && '근무 위치'}
        </Typography>

        <CascaderFilter listDis={listDis} setListDis={setListDis} />

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {languageRedux === 1
            ? 'Lưu thông tin'
            : languageRedux === 2
            ? 'Save information'
            : languageRedux === 3 && '정보 저장'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileLocation;
