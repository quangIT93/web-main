import React, { useState, memo } from 'react'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface IEditStyleWork {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
  language: any;
  languageRedux: any;
}

const EditStyleWork: React.FC<IEditStyleWork> = (props) => {
  const { editDataPosted, setEditDataPosted, language, languageRedux } = props

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
        label={
          languageRedux === 1
            ? "Làm việc cuối tuần"
            : languageRedux === 2
              ? "Working on the weekend"
              : languageRedux === 3
                ? '주말 근무'
                : "Làm việc cuối tuần"
        }
        control={
          <Checkbox
            checked={editDataPosted.isWorkingWeekend === 0 ? false : true}
            onChange={handleWeekendChange}
          />
        }
      />
      <FormControlLabel
        label={
          languageRedux === 1
            ? "Làm việc từ xa"
            : languageRedux === 2
              ? "Remote work"
              : languageRedux === 3
                ? '원격으로 작업'
                : "Làm việc từ xa"
        }
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
