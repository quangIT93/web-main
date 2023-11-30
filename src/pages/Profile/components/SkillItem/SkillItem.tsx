import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';

import './styleSkillItem.scss';
import { DeleteIcon, SectionEditIcon } from '#components/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import profileApi from 'api/profileApi';
import apiCv from 'api/apiCv';

import {
  setAlertSuccess,
  setAlert,
  setAlertLackInfo,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';
import ModalDeleteSkill from '#components/Profile/ModalDeleteSkill';
interface ISkillItem {
  item: {
    dataLevel: {
      data: string;
      id: number;
    };
    id: number;
    skillName: string;
  };
  index: number;
  setSkillValues: React.Dispatch<React.SetStateAction<any>>;
  skillValues: any;
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
}

const SkillItem: React.FC<ISkillItem> = (props) => {
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {
    item,
    index,
    setSkillValues,
    skillValues,
    setOpenModalEditSkills,
    openModalEditSkills,
  } = props;
  const dispatch = useDispatch();
  const [openModalDeleteSkill, setOpenModalDeleteSkill] = useState(false);
  const handleDeleteSkill = async (id: number) => {
    // const result = await apiCv.deleteProfileSkill([id]);
    // if (result) {
    //   const resultProfile = await profileApi.getProfileV3(
    //      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
    //   );
    //   dispatch(setProfileV3(resultProfile));
    //   dispatch(setAlert(true));
    // }
    // setSkillValues(
    //   skillValues.filter((value: any, index: any) => {
    //     return index !== id;
    //   }),
    // );
    // console.log(id);
    setOpenModalDeleteSkill(true);
  };
  // console.log('itemSkillName', item.skillName);
  const handleEditSkills = (
    id: number,
    idLevel: number | null,
    name: string,
  ) => {
    setOpenModalEditSkills({ open: true, id, idLevel, name });
  };

  return (
    <div className="skill-item-container">
      <div className="div-item-left">
        <div className="div-info-item">
          <Space
            size={4}
            direction="vertical"
            style={{
              padding: '8px 12px',
              border: '0.5px solid #aaaaaa',
              borderRadius: '10px',
              wordBreak: 'break-word',
            }}
          >
            <h3>{item?.skillName}</h3>
            <p>{item?.dataLevel?.data}</p>
          </Space>
        </div>
      </div>
      <div className="div-item-right">
        <Space
          onClick={() =>
            handleEditSkills(item.id, item.dataLevel.id, item.skillName)
          }
          style={{ cursor: 'pointer', marginRight: '16px' }}
        >
          <div className="edit-icon">
            <SectionEditIcon width={16} height={16} />
          </div>
          <p style={{ color: 'rgb(13, 153, 255)', fontSize: '14px' }}>
            {languageRedux === 1
              ? 'Sửa'
              : languageRedux === 2
                ? 'Edit'
                : '수정'}
          </p>
        </Space>
        <Space
          onClick={() => handleDeleteSkill(item.id)}
          style={{ cursor: 'pointer', marginRight: '16px' }}
        >
          <div className="edit-icon">
            <DeleteIcon width={15} height={15} />
          </div>
          <p style={{ color: '#575757', fontSize: '14px' }}>
            {languageRedux === 1
              ? 'Xóa'
              : languageRedux === 2
                ? 'Delete'
                : '삭제'}
          </p>
        </Space>
      </div>
      <ModalDeleteSkill
        openModalDeleteSkill={openModalDeleteSkill}
        setOpenModalDeleteSkill={setOpenModalDeleteSkill}
        skillId={[item?.id]}
        skillValue={item?.skillName}
        deleteAll={false}
      />
    </div>
  );
};

export default SkillItem;
