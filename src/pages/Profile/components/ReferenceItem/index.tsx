import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';

import './style.scss';
import { DeleteIcon, SectionEditIcon } from '#components/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import apiCv from 'api/apiCv';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
import profileApi from 'api/profileApi';

interface ISkillItem {
  item: {
    fullName: string;
    phone: string;
    id: number;
    email: string;
  };
  index: number;
  setReferenceValues: React.Dispatch<React.SetStateAction<any>>;
  referenceValues: any;
  openModalReference: boolean;
  setOpenModalReference: React.Dispatch<React.SetStateAction<boolean>>;
  openModalEditReference: {
    open: boolean;
    name: string;
    email: string;
    phone: string;
    id: number | null;
  };
  setOpenModalEditReference: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      name: string;
      email: string;
      phone: string;
      id: number | null;
    }>
  >;
}

const ReferenceItem: React.FC<ISkillItem> = (props) => {
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const {
    item,
    index,
    setReferenceValues,
    referenceValues,
    setOpenModalEditReference,
  } = props;

  const dispatch = useDispatch();

  const handleDeleteLanguage = (id: number) => {
    setReferenceValues(
      referenceValues.filter((value: any, index: any) => {
        return index !== id;
      }),
    );
    // console.log(id);
  };

  const handleEditReference = async (
    id: number,
    name: string,
    phone: string,
    email: string,
  ) => {
    setOpenModalEditReference({ open: true, name, email, phone, id });
    //   const result = await apiCv.putProfileReference(name, phone, email, id);
    //   if (result) {
    //     const resultProfile = await profileApi.getProfileV3(
    //       languageRedux === 1 ? 'vi' : 'en',
    //     );
    //     if (resultProfile) {
    //       dispatch(setProfileV3(resultProfile));
    //       dispatch(setAlert(true));
    //     }
    //   }
  };

  return (
    <div className="reference-item-container">
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
            <h3
              style={{
                textAlign: 'center',
                color: '#000000',
                fontWeight: '500',
              }}
            >
              {item?.fullName}
            </h3>
            <p style={{ textAlign: 'center', color: '#AAAAAA' }}>
              {item?.phone}
            </p>
            <p style={{ textAlign: 'center', color: '#AAAAAA' }}>
              {item?.email}
            </p>
          </Space>
        </div>
      </div>
      <div className="div-item-right">
        <Space
          onClick={() =>
            handleEditReference(item.id, item.fullName, item.phone, item.email)
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
          onClick={() => handleDeleteLanguage(index)}
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

export default ReferenceItem;
