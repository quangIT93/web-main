import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { TextField } from '@mui/material'

import { styleLabel } from '../CssPost'
import './style.scss'

interface IRecruitmentTime {
  startDate: any
  endDate: any
  setStartDate: any
  setEndDate: any
}

const RecruitmentTime: React.FC<IRecruitmentTime> = (props) => {
  const { startDate, endDate, setStartDate, setEndDate } = props
  const handleChangeStartTime = (newValue: any, e: any) => {
    setStartDate(new Date(newValue._d).getTime())
  }

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEndDate(new Date(newValue._d).getTime())
  }
  console.log('startDate', startDate)
  console.log('endDate', endDate)

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
            value={moment(startDate)}
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
            Ngày kết thúc *:
          </Typography>
          <DatePicker value={moment(endDate)} onChange={handleChangeEndTime} />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default RecruitmentTime
