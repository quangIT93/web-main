import React, { useState } from 'react';
// @ts-ignore

import { Button, Space, Tooltip } from 'antd';
import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons';

import moment from 'moment';
import './style.scss';

interface Url_CV {
  url: string;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProfile: boolean;
}

const ItemInfoLeft: React.FC<Url_CV> = ({ url, open, setOpen, isProfile }) => {
  return (
    <Space>
      <div
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
          <p style={{ color: '#575757' }}>
            {url.substring(url.lastIndexOf('/') + 1, url.length)}
          </p>

          <FilePdfOutlined style={{ fontSize: 20, color: '#575757' }} />
        </Space>
      </div>
      {isProfile && (
        <Tooltip placement="right" title={'Xóa CV'} style={{ fontSize: 5 }}>
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
