// import React from 'react'

import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const RecuitApplication = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  return (
    <>
      <Button
        type="primary"
        style={{
          backgroundColor: '#aaaaaa',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
          cursor: 'default',
        }}
        name="RecuitApplication"
      >
        {languageRedux === 1
          ? 'Đã tuyển ứng viên này'
          : languageRedux === 2
            ? 'Hired this candidate'
            : languageRedux === 3 && '이 후보자를 모집했습니다.'}
      </Button>
    </>
  );
};

export default RecuitApplication;
