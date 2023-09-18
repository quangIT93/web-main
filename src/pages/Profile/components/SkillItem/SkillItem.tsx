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
  const handleDeleteSkill = async (id: number) => {
    const result = await apiCv.deleteProfileSkill([id]);
    if (result) {
      const resultProfile = await profileApi.getProfileV3(
        languageRedux === 1 ? 'vi' : 'en',
      );
      dispatch(setProfileV3(resultProfile));
    }
    // setSkillValues(
    //   skillValues.filter((value: any, index: any) => {
    //     return index !== id;
    //   }),
    // );
    // console.log(id);
  };
  // console.log('itemSkillName', item.skillName);
  const handleEditSkills = (
    id: number,
    idLevel: number | null,
    name: string,
  ) => {
    setOpenModalEditSkills({ open: true, id, idLevel, name });
  };

  console.log('item', item);

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
            }}
          >
            <h3>{item?.skillName}</h3>
            <p>
              {item?.dataLevel.id === 1
                ? languageRedux === 1
                  ? 'Người mới'
                  : 'Novice'
                : item?.dataLevel.id === 2
                ? languageRedux === 1
                  ? 'Người bắt đầu'
                  : 'Beginner'
                : item?.dataLevel.id === 3
                ? languageRedux === 1
                  ? 'Khéo léo'
                  : 'Skillful'
                : item?.dataLevel.id === 4
                ? languageRedux === 1
                  ? 'Có kinh nghiệm'
                  : 'Experienced'
                : item?.dataLevel.id === 5
                ? languageRedux === 1
                  ? 'Chuyên gia'
                  : 'Expert'
                : ''}
            </p>
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
            {languageRedux === 1 ? 'Sửa' : 'Edit'}
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
            {language?.profile_page?.delete}
          </p>
        </Space>
      </div>
    </div>
  );
};

export default SkillItem;
