import React, { useState } from 'react';
// @ts-ignore

import { useSearchParams } from 'react-router-dom';

import { Space } from 'antd';

import {
  setAlertSuccess,
  setAlert,
  setAlertLackInfo,
  setAlertEditInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';

import './style.scss';
import { DeleteIcon, SectionEditIcon } from '#components/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import apiCv from 'api/apiCv';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import profileApi from 'api/profileApi';

interface ISkillItem {
  item: {
    dataLevel: {
      data: string;
      id: number;
    };
    id: number;
    languageName: string;
  };
  index: number;
  setLanguageValues: React.Dispatch<React.SetStateAction<any>>;
  languageValues: any;
  setOpenModallanguages: React.Dispatch<React.SetStateAction<boolean>>;
  openModallanguages: boolean;
  setOpenModalEditlanguages: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: null | number;
      name: string;
      idLevel: number | null;
    }>
  >;
  openModalEditlanguages: {
    open: boolean;
    id: null | number;
    name: string;
    idLevel: number | null;
  };
}

const LanguageItem: React.FC<ISkillItem> = (props) => {
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {
    item,
    index,
    setLanguageValues,
    languageValues,
    openModallanguages,
    setOpenModallanguages,
    setOpenModalEditlanguages,
    openModalEditlanguages,
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const handleDeleteLanguage = async (id: number) => {
    try {
      const result = await apiCv.deleteProfileLanguage([id]);
      if (result) {
        const resultProfile = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (resultProfile) {
          dispatch(setProfileV3(resultProfile));
          dispatch(setAlert(true));
        }
      }
    } catch (error) {}
    // setLanguageValues(
    //   languageValues.filter((value: any, index: any) => {
    //     return index !== id;
    //   }),
    // );
  };

  const handleEditLanguage = (
    id: number,
    idLevel: number | null,
    name: string,
  ) => {
    setOpenModalEditlanguages({ open: true, id, idLevel, name });
  };

  console.log('item', item);

  return (
    <div className="language-item-container">
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
            <h3>{item?.languageName}</h3>
            <p>
              {item?.dataLevel.id === 1
                ? languageRedux === 1
                  ? 'Sơ cấp'
                  : 'Primary'
                : item?.dataLevel.id === 2
                ? languageRedux === 1
                  ? 'Trung cấp'
                  : 'Intermediate'
                : item?.dataLevel.id === 3
                ? languageRedux === 1
                  ? 'Trình độ cao'
                  : 'High - level'
                : item?.dataLevel.id === 4
                ? languageRedux === 1
                  ? 'Thành thạo'
                  : 'Native'
                : ''}
            </p>
          </Space>
        </div>
      </div>
      <div className="div-item-right">
        <Space
          onClick={() =>
            handleEditLanguage(item.id, item.dataLevel.id, item.languageName)
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
          onClick={() => handleDeleteLanguage(item.id)}
          style={{
            cursor: 'pointer',
            marginRight: '16px',
          }}
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

export default LanguageItem;
