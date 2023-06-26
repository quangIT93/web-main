import React from 'react'

import { Button } from 'antd'

const RecuitApplication = () => {
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
      >
        Đã tuyển ứng viên này
      </Button>
    </>
  )
}

export default RecuitApplication
