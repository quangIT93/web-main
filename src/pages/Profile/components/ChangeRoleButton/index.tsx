import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const ChangeRoleButton = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
  return (
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input type="checkbox" name="color_mode" id="color_mode" value="1" />
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

