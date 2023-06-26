import React from 'react'

import { Button } from 'antd'

const RejectedApplication: React.FC = () => {
  return (
    <>
      <Button
        type="primary"
        style={{
          backgroundColor: '#bd3131',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
          cursor: 'default',
        }}
      >
        Đã từ chối hồ sơ
      </Button>
    </>
  )
}

export default RejectedApplication
