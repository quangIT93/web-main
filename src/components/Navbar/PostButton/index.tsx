import React from 'react';
import './style.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

import { Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';

// import breakpoints from '../../../scss/breakpoints';

// const { mobile, tablet } = breakpoints;

interface Iprops {
  setOpenModalLogin: (params: any) => any;
}

const PostButton: React.FC<Iprops> = (props) => {
  const dataProfile = useSelector((state: RootState) => state.profileUser);
  const [height, setHeight] = React.useState(0);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      style={
        // true
        height > 200
          ? {
              bottom: '140px',
            }
          : {
              bottom: '060px',
            }
      }
    />
  );
};

export default PostButton;
