import React from 'react';
// @ts-ignore

import { Space, Tooltip } from 'antd';
import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons';

// import moment from 'moment';
import './style.scss';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import { SectionDeleteIcon, UploadCVIcon } from '#components/Icons';
interface Url_CV {
  url: string;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProfile: boolean;
  language: any;
}

const ItemInfoLeft: React.FC<Url_CV> = ({
  url,
  open,
  setOpen,
  isProfile,
  language,
}) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  return (
    <Space className="cv-item-container">
      <div
        className="cv-item"
        style={{
          backgroundColor: '#F1F0F0',
          padding: 10,
          borderRadius: 10,
          cursor: 'pointer',
        }}
        onClick={() => {
          window.open(`${url}`);
        }}
      >
        <Space>
          <p style={{ color: '#575757', wordBreak: 'break-all' }}>
            {url.substring(url.lastIndexOf('/') + 1, url.length)}
          </p>
          {/* <FilePdfOutlined style={{ fontSize: 20, color: '#575757' }} /> */}
          <div className="upload-cv-icon" style={{ color: "#575757" }}>
            <UploadCVIcon />
          </div>
        </Space>
      </div>
      {isProfile && (
        <Tooltip
          placement="right"
          title={languageRedux === 1 ?
            "Xóa CV" :
            languageRedux === 2 ?
              "Delete CV" :
              "이력서 삭제"}
          style={{ fontSize: 5 }}
        >
          {/* <DeleteOutlined
            onClick={() => {
              setOpen(true);
            }}
            className="icon-remove"
          /> */}
          <div className="icon-remove"

            onClick={() => {
              setOpen(true);
            }}
          >
            <SectionDeleteIcon />
          </div>
        </Tooltip>
      )}
    </Space>
  );
};

export default ItemInfoLeft;
