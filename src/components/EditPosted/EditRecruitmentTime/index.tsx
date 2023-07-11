import React, { useState, memo } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { TextField } from '@mui/material'

import { styleLabel } from '../CssEditPost'
import './style.scss'

interface IEditRecruitmentTime {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
}

const EditRecruitmentTime: React.FC<IEditRecruitmentTime> = (props) => {
  const { setEditDataPosted, editDataPosted } = props

  const handleChangeStartTime = (newValue: any, e: any) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      startDate: new Date(newValue._d).getTime(),
    }))
  }

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      endDate: new Date(newValue._d).getTime(),
    }))
  }
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer
        components={['DatePicker', 'DatePicker']}
        sx={{ display: 'flex' }}
      >
        <div className="wrapTimeDay">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={moment(editDataPosted.startDate)}
            onChange={handleChangeStartTime}
          />
        </div>
        <div className="wrapTimeDay">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Ngày kết thúc <span style={{ color: 'red' }}>*</span>
          </Typography>
          <DatePicker
            value={moment(editDataPosted.endDate)}
            onChange={handleChangeEndTime}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default memo(EditRecruitmentTime)
