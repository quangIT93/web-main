import React, { useState } from 'react'
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

const EditRecruitmentTime = () => {
  const [startDate, setStartDate] = useState<number>(1)
  const [endDate, setEndDate] = useState<number>(1)
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
            Ngày bắt đầu *:
          </Typography>
          <DatePicker
          // value={moment(startDate)}
          // onChange={handleChangeStartTime}
          />
        </div>
        <div className="wrapTimeDay">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Ngày kết thúc *:
          </Typography>
          <DatePicker
          //   value={moment(endDate)}
          //   onChange={handleChangeEndTime}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default EditRecruitmentTime
