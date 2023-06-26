import React, { memo } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost'

interface IPostPeriodDate {
  setIsPeriodDate: React.Dispatch<React.SetStateAction<number>>
  isPeriodDate: number
}

const PostPeriodDate: React.FC<IPostPeriodDate> = (props) => {
  const { setIsPeriodDate, isPeriodDate } = props

  const handleChangePeriodDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPeriodDate(Number(e.target.value))
  }

  return (
    <FormControl sx={{ marginTop: '24px' }}>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        component="legend"
        sx={styleLabel}
      >
        Thời gian làm việc *:
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChangePeriodDate}
        value={isPeriodDate}
      >
        <FormControlLabel
          value={0}
          control={<Radio id="limited-time-radio1" />}
          label="Không thời hạn"
          htmlFor="limited-time-radio1"
        />
        <FormControlLabel
          value={1}
          control={<Radio id="limited-time-radio" />}
          label="Có thời hạn"
          htmlFor="limited-time-radio"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default memo(PostPeriodDate)
