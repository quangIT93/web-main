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
interface Url_CV {
  url: string;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProfile: boolean;
}

const ItemInfoLeft: React.FC<Url_CV> = ({ url, open, setOpen, isProfile }) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  return (
    <Space className="cv-item-container">
      <div
        className="cv-item-container"
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
        <Space className="cv-item">
          <p style={{ color: '#575757', wordBreak: 'break-all' }}>
            {url.substring(url.lastIndexOf('/') + 1, url.length)}
          </p>

          <FilePdfOutlined style={{ fontSize: 20, color: '#575757' }} />
        </Space>
      </div>
      {isProfile && (
        <Tooltip
          placement="right"
          title={
            languageRedux === 1 ? profileVi.delete_cv : profileEn.delete_cv
          }
          style={{ fontSize: 5 }}
        >
          <DeleteOutlined
            onClick={() => {
              setOpen(true);
            }}
            className="icon-remove"
          />
        </Tooltip>
      )}
    </Space>
  );
};

export default ItemInfoLeft;
