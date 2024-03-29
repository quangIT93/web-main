import React, { useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setRole } from 'store/reducer/roleReducer';
import typeUser from 'api/apiTypeUser';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
interface IChangeRole {
  // role: any;
  // setRole: React.Dispatch<React.SetStateAction<any>>;
}
const ChangeRoleButton: React.FC<IChangeRole> = (props) => {
  const dispatch = useDispatch();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3);
  //0: candidate, 1: employer
  // const { role, setRole } = props;
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const handleOnchange = async (e: any) => {
    try {
      if (e.target.checked) {
        const result = await typeUser.putTypeUser(1);
        if (result) {
          dispatch<any>(setRole(1));
          const getProfileV3Data = await profileApi.getProfileInformationV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );
          if (getProfileV3Data) {
            dispatch<any>(setProfileMeInformationV3(getProfileV3Data));
          }
        }
        // setRole(1)
        // localStorage.setItem('role', '1')
      } else {
        const result = await typeUser.putTypeUser(0);
        if (result) {
          dispatch<any>(setRole(0));
          const getProfileV3Data = await profileApi.getProfileInformationV3(
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );
          if (getProfileV3Data) {
            dispatch<any>(setProfileMeInformationV3(getProfileV3Data));
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
    // setRole(0)
    // localStorage.setItem('role', '0')
  };

  return (
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input
          type="checkbox"
          checked={
            profileV3.length !== 0 && profileV3.typeRoleData === 0
              ? false
              : true
          }
          name="color_mode"
          id="color_mode"
          value={profileV3.length !== 0 && profileV3.typeRoleData === 0 ? 0 : 1}
          onChange={handleOnchange}
        />
        <label
          htmlFor="color_mode"
          data-on={
            languageRedux === 1
              ? 'Nhà tuyển dụng'
              : languageRedux === 2
              ? 'Employer'
              : languageRedux === 3
              ? '고용주'
              : 'Nhà tuyển dụng'
          }
          data-off={
            languageRedux === 1
              ? 'Ứng viên'
              : languageRedux === 2
              ? 'Candidate'
              : languageRedux === 3 && '개인 사용자'
          }
          className="btn-color-mode-switch-inner"
        ></label>
      </label>
    </div>
  );
};

export default ChangeRoleButton;
