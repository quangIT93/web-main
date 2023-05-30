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

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSalary(newValue as number[])
  }

  // event change salary
  function valuetext(value: number) {
    return `${value}`
  }

  const handleChangeMoneyType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyType(Number(e.target.value))
  }

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
          Loại tiền *:
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
          <span style={{ color: 'black', fontWeight: '600' }}>
            {salary[0].toLocaleString()}
          </span>
          đến
          <span style={{ color: 'black', fontWeight: '600' }}>
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
        min={0}
        max={100000000}
        step={1000000}
        sx={{ width: '80%', margin: '0 auto' }}
      />
    </Box>
  )
}

export default PostFilterSalary
