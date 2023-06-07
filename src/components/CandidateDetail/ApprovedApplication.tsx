import React from 'react'

import { Box } from '@mui/material'
import { Button } from 'antd'
const ApprovedApplication = () => {
  return (
    <Box>
      <Button
        type="primary"
        style={{
          backgroundColor: '#0d99ff',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        Hồ sơ đã được duyệt
      </Button>
    </Box>
  )
}

export default ApprovedApplication
