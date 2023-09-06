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
  // const dataProfile = useSelector((state: RootState) => state.profileUser);
  // const [height, setHeight] = React.useState(0);
  // const currentPath = window.location.pathname;
  // console.log('ccc', currentPath);

  // const listenToScroll = () => {
  //   const winScroll =
  //     document.body.scrollTop || document.documentElement.scrollTop;
  //   setHeight(winScroll);
  // };

  // React.useEffect(() => {
  //   // if (currentPath === '/') {
  //   // }
  //   window.addEventListener('scroll', listenToScroll);
  //   return () => window.removeEventListener('scroll', listenToScroll);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  console.log('voooooo');

  return (
    <Button
      className="post-button-responsive"
      size="large"
      type="primary"
      shape="circle"
      icon={<FormOutlined />}
      onClick={() => {
        if (
          localStorage.getItem('accessToken') &&
          localStorage.getItem('refreshToken')
        ) {
          window.open('/post', '_seft');
        } else {
          props.setOpenModalLogin(true);
        }
      }}
      style={
        // true
        {
          bottom: '140px',
        }
      }
    />
  );
};

export default PostButton;
