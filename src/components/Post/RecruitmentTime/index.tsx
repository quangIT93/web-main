import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Typography from '@mui/material/Typography'

import { styleLabel } from '../CssPost'
import './style.scss'

interface IRecruitmentTime {
  startTime: any
  endTime: any
  setStartTime: any
  setEndTime: any
}

const RecruitmentTime: React.FC<IRecruitmentTime> = (props) => {
  const { startTime, endTime, setStartTime, setEndTime } = props
  const handleChangeStartTime = (newValue: any, e: any) => {
    setStartTime(new Date(newValue.$d).getTime())
  }

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEndTime(new Date(newValue.$d).getTime())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <DatePicker value={startTime} onChange={handleChangeStartTime} />
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
          <DatePicker value={endTime} onChange={handleChangeEndTime} />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default RecruitmentTime
