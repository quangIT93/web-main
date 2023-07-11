import React, { useState, memo } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost'

interface IEditPostPeriodDate {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
}

const EditPostPeriodDate: React.FC<IEditPostPeriodDate> = (props) => {
  const { setEditDataPosted, editDataPosted } = props

  const [isDatePeriod, setIsPeriodDate] = useState<number>(1)

  const handleChangePeriodDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDataPosted((preValue: any) => {
      return {
        ...preValue,
        isDatePeriod: Number(e.target.value),
      }
    })
  }

  return editDataPosted ? (
    <FormControl sx={{ marginTop: '24px' }}>
      <FormLabel id="limit-time" component="legend" sx={styleLabel}>
        Thời gian làm việc <span style={{ color: 'red' }}>*</span>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="limit-time"
        name="limit-time"
        onChange={handleChangePeriodDate}
        value={Number(editDataPosted?.isDatePeriod)}
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
  ) : (
    <></>
  )
}

export default memo(EditPostPeriodDate)
