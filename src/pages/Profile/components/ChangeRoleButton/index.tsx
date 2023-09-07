import React, { useState } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface IChangeRole {
  role: any;
  setRole: React.Dispatch<React.SetStateAction<any>>;
}
const ChangeRoleButton: React.FC<IChangeRole> = (props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
  //0: candidate, 1: employer
  const { role, setRole } = props;

  const handleOnchange = (e: any) => {
    e.target.checked ?
      setRole(1) :
      setRole(0)
  }

  console.log(role);


  return (
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input type="checkbox" checked={
          role === 0 ? false : true
        }
          name="color_mode" id="color_mode" value={role}
          onChange={handleOnchange}
        />
        <label htmlFor="color_mode"
          data-on={
            languageRedux === 1 ?
              "Nhà tuyển dụng" : "Employer"
          }
          data-off={
            languageRedux === 1 ?
              "Ứng viên" : "Candidate"
          }
          className="btn-color-mode-switch-inner"
        ></label>
      </label>
    </div>
  )
}

export default ChangeRoleButton;

