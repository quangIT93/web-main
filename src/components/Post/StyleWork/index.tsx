import React, { useState, memo } from 'react'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface IStyleWork {
  isWorkingWeekend: number
  isRemotely: number
  setIsWorkingWeekend: React.Dispatch<React.SetStateAction<number>>
  setIsRemotely: React.Dispatch<React.SetStateAction<number>>
}

const StyleWork: React.FC<IStyleWork> = (props) => {
  const { isWorkingWeekend, isRemotely, setIsWorkingWeekend, setIsRemotely } =
    props

  const handleWeekendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return setIsWorkingWeekend(1)
    setIsWorkingWeekend(0)
  }

  const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return setIsRemotely(1)
    setIsRemotely(0)
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControlLabel
        label="Làm việc cuối tuần"
        control={
          <Checkbox
            checked={isWorkingWeekend === 0 ? false : true}
            onChange={handleWeekendChange}
          />
        }
      />
      <FormControlLabel
        label="Làm việc từ xa"
        control={
          <Checkbox
            checked={isRemotely === 0 ? false : true}
            onChange={handleRemoteChange}
          />
        }
      />
    </Box>
  )
}

export default memo(StyleWork)
