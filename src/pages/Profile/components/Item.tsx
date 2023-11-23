import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import './styleItem.scss';

import { PencilIcon, DeleteIcon } from '#components/Icons';
import moment from 'moment';
import languageApi from 'api/languageApi';

// import component
import ModalDeleteEducation from '#components/Profile/ModalDeleteEducation';
import ModalProfileEducationUpdate from '#components/Profile/ModalProfileEducationUpdate';
import ModalProfileExperienceUpdate from '#components/Profile/ModalProfileExperienceUpdate';
import ModalDeleteExperience from '#components/Profile/ModalDeleteExperience';

import { RootState } from '../../../store/reducer/index';
import { useDispatch, useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import profileApi from 'api/profileApi';
interface SuggestItemProps {
  typeItem?: string;
  item?: ItemAppy;
}
interface ItemAppy {
  id?: number | null;
  companyName?: String;
  major?: String;
  startDate?: number;
  endDate?: number;
  extraInformation?: string;
  title?: String;
}

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const ItemInfoLeft: React.FC<SuggestItemProps> = ({ typeItem, item }) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const dispatch = useDispatch();
  const [openModalDeleteEducation, setOpenModalDeleteEducation] =
    useState(false);
  const [openModalEducationUpdate, setOpenModalEducationUpdate] =
    useState(false);
  const [openModalDeleteExperience, setOpenModalDeleteExperience] =
    useState(false);
  const [openModalExperienceUpdate, setOpenModalExperienceUpdate] =
    useState(false);
  // const [language, setLanguage] = useState<any>();
  // console.log('logging education', item);

  const handleDeleteEducation = async (id?: number | null) => {
    setOpenModalDeleteEducation(true);
  };

  const handleUpdateEducation = (id?: number | null) => {
    setOpenModalEducationUpdate(true);
  };

  const handleDeleteExperience = async (id?: number | null) => {
    setOpenModalDeleteExperience(true);
  };

  const handleUpdateExperience = (id?: number | null) => {
    setOpenModalExperienceUpdate(true);
  };
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

  return (
    <div className="div-apply-item">
      <div className="div-item-left">
        <div className="div-time-line">
          <div
            style={{
              height: '10px',
              width: '10px',
              borderRadius: '10px',
              backgroundColor: '#0D99FF',
            }}
          ></div>
          <div
            style={{ width: '3px', height: '100%', backgroundColor: '#0D99FF' }}
          ></div>
        </div>
        <div className="div-info-item">
          <Space
            size={4}
            direction="vertical"
            style={{
              marginLeft: 10,
              wordBreak: 'break-word',
            }}
          >
            <h3>{item?.companyName}</h3>
            <p>{typeItem === 'experiences' ? item?.title : item?.major}</p>
            <p>
              {`${moment(item?.startDate).format('MM/YYYY')}`} - {` `}
              {`${moment(item?.endDate).format('MM/YYYY')}`}
            </p>

            <div
              style={{
                whiteSpace: 'pre-wrap',
                marginTop: '15px',
                color: '#575757',
                wordBreak: 'break-all',
              }}
            >
              {item?.extraInformation}
            </div>
          </Space>
        </div>
      </div>
      <div className="div-item-right">
        <Space
          onClick={
            typeItem === 'experiences'
              ? () => handleUpdateExperience(item?.id)
              : () => handleUpdateEducation(item?.id)
          }
          style={{ cursor: 'pointer' }}
        >
          <div className="edit-icon">
            <PencilIcon width={15} height={15} />
          </div>

          <p style={{ color: '#0D99FF', fontSize: '14px' }}>{language?.edit}</p>
        </Space>
        <Space
          onClick={
            typeItem === 'experiences'
              ? () => handleDeleteExperience(item?.id)
              : () => handleDeleteEducation(item?.id)
          }
          style={{ cursor: 'pointer', marginRight: '16px' }}
        >
          <div className="edit-icon">
            <DeleteIcon width={15} height={15} />
          </div>
          <p style={{ color: '#575757', fontSize: '14px' }}>
            {language?.profile_page?.delete}
          </p>
        </Space>
      </div>
      <ModalDeleteEducation
        openModalDeleteEducation={openModalDeleteEducation}
        setOpenModalDeleteEducation={setOpenModalDeleteEducation}
        educationId={item?.id}
      />
      <ModalProfileEducationUpdate
        openModalEducationUpdate={openModalEducationUpdate}
        setOpenModalEducationUpdate={setOpenModalEducationUpdate}
        typeItem="updateEducation"
        educationId={item?.id}
        educationValue={item}
      />

      <ModalDeleteExperience
        openModalDeleteExperience={openModalDeleteExperience}
        setOpenModalDeleteExperience={setOpenModalDeleteExperience}
        experienceId={item?.id}
      />
      <ModalProfileExperienceUpdate
        openModalExperienceUpdate={openModalExperienceUpdate}
        setOpenModalExperienceUpdate={setOpenModalExperienceUpdate}
        typeItem="updateExperience"
        experienceId={item?.id}
        experienceValue={item}
      />
    </div>
  );
};

export default ItemInfoLeft;
