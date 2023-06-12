import React, { useState } from 'react'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const EditStyleWork = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControlLabel
        label="Làm việc cuối tuần"
        control={
          <Checkbox
          // checked={isWorkingWeekend === 0 ? false : true}
          // onChange={handleWeekendChange}
          />
        }
      />
      <FormControlLabel
        label="Làm việc từ xa"
        control={
          <Checkbox
          // checked={isRemotely === 0 ? false : true}
          // onChange={handleRemoteChange}
          />
        }
      />
    </Box>
  )
}

export default EditStyleWork
