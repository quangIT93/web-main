import React from 'react';
import './style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducer';

import { Button, Tooltip, Space } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import breakpoints from '../../../scss/breakpoints';

const { mobile, tablet } = breakpoints;

interface Iprops {
  setOpenModalLogin: (params: any) => any;
}

const PostButton: React.FC<Iprops> = (props) => {
  const dataProfile = useSelector((state: RootState) => state.profileUser);

  return (
    <Button
      className="post-button-responsive"
      size="large"
      type="primary"
      shape="circle"
      icon={<FormOutlined />}
      onClick={() => {
        if (dataProfile && localStorage.getItem('refreshToken')) {
          window.open('/post', '_seft');
        } else {
          props.setOpenModalLogin(true);
        }
      }}
    />
  );
};

export default PostButton;
