import React, { useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setRole } from 'store/reducer/roleReducer';

interface IChangeRole {
  // role: any;
  // setRole: React.Dispatch<React.SetStateAction<any>>;
}
const ChangeRoleButton: React.FC<IChangeRole> = (props) => {
  const dispatch = useDispatch()
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
  const roleRedux = useSelector((state: RootState) => state.changeRole.role)
  //0: candidate, 1: employer
  // const { role, setRole } = props;

  const handleOnchange = (e: any) => {
    if (e.target.checked) {
      // setRole(1)
      // localStorage.setItem('role', '1')
      dispatch<any>(setRole(1));
    } else {
      // setRole(0)
      // localStorage.setItem('role', '0')
      dispatch<any>(setRole(0));
    }
  }

  return (
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input type="checkbox" checked={
          roleRedux === 0 ? false : true
        }
          name="color_mode" id="color_mode" value={roleRedux}
          onChange={handleOnchange}
        />
        <label htmlFor="color_mode"
          data-on={
            languageRedux === 1 ?
              "Nhà tuyển dụng" : "Recruiter"
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

