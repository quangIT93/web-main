import React from 'react'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'
import { styleLabel } from '../CssPost'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import './style.scss'

interface IPostTime {
  startTime: any
  endTime: any
  setStartTime: any
  setEndTime: any
}
const PostTime: React.FC<IPostTime> = (props) => {
  const { startTime, endTime, setStartTime, setEndTime } = props
  const handleChangeStartTime = (newValue: any, e: any) => {
    // console.log(e.target.value)
    console.log('e.target.valuetimeeee', newValue)
    setStartTime(new Date(newValue._d).getTime())
  }

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEndTime(new Date(newValue._d).getTime())
  }
  console.log('endTime', moment(endTime))
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div className="wrap-time_left">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Thời gian bắt đầu *:
          </Typography>
          <MobileTimePicker
            ampm={false}
            ampmInClock={true}
            defaultValue={moment(new Date(startTime))}
            // sx={{ width: '80%' }}
            onChange={handleChangeStartTime}
            value={moment(new Date(startTime))}
          />
        </div>
        <div className="wrap-time_right">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="endTime"
          >
            Thời gian kết thúc *:
          </Typography>
          <MobileTimePicker
            ampm={false}
            ampmInClock={true}
            defaultValue={moment(new Date(endTime))}
            // sx={{ width: '30%' }}
            value={moment(new Date(endTime))}
            onChange={handleChangeEndTime}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default PostTime
