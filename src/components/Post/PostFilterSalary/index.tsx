import React from 'react'
import { Box, Slider } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'

//@ts-ignore
import { styleLabel } from '#components/Post/CssPost'

interface PropsSalaryFilterSubnav {
  setSalary: (value: number[]) => void
  salary: number[]
  setMoneyType: React.Dispatch<React.SetStateAction<number>>
  moneyType: number
}

const PostFilterSalary: React.FC<PropsSalaryFilterSubnav> = (props) => {
  const { setSalary, salary, setMoneyType, moneyType } = props
  const VND_TO_USD = 0.000043 // Conversion rate: 1 VND = 0.000043 USD
  const USD_TO_VND = 23155

  const handleChange = (event: Event, newValue: number | number[]) => {
    let convertedValue: number[]

    if (moneyType === 1) {
      // Convert USD to VND
      convertedValue = (newValue as number[]).map((value) =>
        Math.round(value / USD_TO_VND)
      )
      console.log('salary', salary)
      console.log('conv', convertedValue)
      return setSalary(newValue as number[])

      console.log('newValue', newValue)
    } else {
      // Convert VND to USD
      convertedValue = (newValue as number[]).map((value) =>
        Math.round(value / 23155)
      )
      console.log('conv', convertedValue)
      console.log('newValue', newValue)
      console.log('salary', salary)
      return setSalary(newValue as number[])
    }
  }

  // event change salary
  function valuetext(value: number) {
    return `${value}`
  }

  const handleChangeMoneyType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyType(Number(e.target.value))
    let convertedValue: number[]
    if (moneyType === 1) {
      // Convert USD to VND

      convertedValue = (salary as number[]).map((value) => {
        console.log('value', value * VND_TO_USD)

        return Math.round(value * VND_TO_USD)
      })
      return setSalary(convertedValue)

      console.log(convertedValue)
      console.log(salary)
    } else {
      convertedValue = (salary as number[]).map((value) => {
        console.log('value', value * USD_TO_VND)
        return Math.round(value * USD_TO_VND)
      })
      return setSalary(convertedValue)

      console.log(convertedValue)
      console.log(salary)
    }
  }
  console.log('moneyType', moneyType)

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '12px 0',
      }}
    >
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
          onChange={handleChangeMoneyType}
          value={moneyType}
        >
          <FormControlLabel
            value={1}
            control={<Radio id="limited-time-radio" />}
            label="VND"
            htmlFor="limited-time-radio"
          />
          <FormControlLabel
            value={2}
            control={<Radio id="limited-time-radio1" />}
            label="USD"
            htmlFor="limited-time-radio1"
          />
        </RadioGroup>
      </FormControl>
      <div
        className="rangeSalary"
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '12px 16px',
        }}
      >
        <p style={{ flex: '3' }}>
          Lương từ
          <span style={{ color: 'black', fontWeight: '600', margin: '0 4px' }}>
            {salary[0].toLocaleString()}
          </span>
          đến
          <span style={{ color: 'black', fontWeight: '600', margin: '0 4px' }}>
            {salary[1].toLocaleString()}
          </span>
        </p>
      </div>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={salary}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={moneyType === 1 ? 0 : 0}
        max={moneyType === 1 ? 100000000 : 4300}
        step={moneyType === 1 ? 1000000 : 100}
        sx={{ width: '80%', margin: '0 auto' }}
      />
    </Box>
  )
}

export default PostFilterSalary
