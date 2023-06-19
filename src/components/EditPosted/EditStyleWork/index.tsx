import React, { useState, memo } from 'react'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface IEditStyleWork {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
}

const EditStyleWork: React.FC<IEditStyleWork> = (props) => {
  const { editDataPosted, setEditDataPosted } = props

  const handleWeekendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      return setEditDataPosted((preValue: any) => ({
        ...preValue,
        isWorkingWeekend: 1,
      }))
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      isWorkingWeekend: 0,
    }))
  }

  const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      return setEditDataPosted((preValue: any) => ({
        ...preValue,
        isRemotely: 1,
      }))
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      isRemotely: 0,
    }))
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControlLabel
        label="Làm việc cuối tuần"
        control={
          <Checkbox
            checked={editDataPosted.isWorkingWeekend === 0 ? false : true}
            onChange={handleWeekendChange}
          />
        }
      />
      <FormControlLabel
        label="Làm việc từ xa"
        control={
          <Checkbox
            checked={editDataPosted.isRemotely === 0 ? false : true}
            onChange={handleRemoteChange}
          />
        }
      />
    </Box>
  )
}

export default memo(EditStyleWork)
