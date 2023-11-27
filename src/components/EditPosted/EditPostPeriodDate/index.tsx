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
  language: any;
  languageRedux: any;
}

const EditPostPeriodDate: React.FC<IEditPostPeriodDate> = (props) => {
  const { setEditDataPosted, editDataPosted, language, languageRedux } = props

  // const [isDatePeriod, setIsPeriodDate] = useState<number>(1)

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
        {
          languageRedux === 1
            ? "Thời gian làm việc"
            : languageRedux === 2
              ? "Working period"
              : languageRedux === 3
                ? '근무 기간'
                : "Thời gian làm việc"
        }{' '}
        <span style={{ color: 'red' }}>*</span>
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
          label={
            languageRedux === 1
              ? "Không thời hạn"
              : languageRedux === 2
                ? "Indefinite"
                : languageRedux === 3
                  ? '무기한'
                  : "Không thời hạn"
          }
          htmlFor="limited-time-radio1"
        />
        <FormControlLabel
          value={1}
          control={<Radio id="limited-time-radio" />}
          label={
            languageRedux === 1
              ? "Có thời hạn"
              : languageRedux === 2
                ? "Fixed - term"
                : languageRedux === 3
                  ? '마감일이 있습니다'
                  : "Có thời hạn"
          }
          htmlFor="limited-time-radio"
        />
      </RadioGroup>
    </FormControl>
  ) : (
    <></>
  )
}

export default memo(EditPostPeriodDate)
