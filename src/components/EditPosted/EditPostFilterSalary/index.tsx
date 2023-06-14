import React, { useState } from 'react'
import { Box, Slider } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Input, Space } from 'antd'
//@ts-ignore
import 'intl'
import 'intl/locale-data/jsonp/en'
import { styleLabel } from '../CssEditPost'

interface IEditPostFilterSalary {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
}

const EditPostFilterSalary: React.FC<IEditPostFilterSalary> = (props) => {
  const { setEditDataPosted, editDataPosted } = props

  const [salary, setSalary] = useState<number[]>([])
  const VND_TO_USD = 0.000043 // Conversion rate: 1 VND = 0.000043 USD
  const USD_TO_VND = 23155

  console.log('edit', editDataPosted)

  const handleChangesalaryMin = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value.replace(',', '')
    const reg = /[0-9]+$/

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        salaryMin: inputValue.replace(',', ''),
      }))
    }
  }
  const handleChangesalaryMax = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value.replace(',', '')
    const reg = /[0-9]+$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        salaryMax: inputValue.replace(',', ''),
      }))
    }
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    let convertedValue: number[]

    if (editDataPosted.moneyType === 1) {
      // Convert USD to VND
      convertedValue = (newValue as number[]).map((value) =>
        Math.round(value / USD_TO_VND)
      )

      return setSalary(newValue as number[])
    } else {
      // Convert VND to USD
      convertedValue = (newValue as number[]).map((value) =>
        Math.round(value / 23155)
      )

      return setSalary(newValue as number[])
    }
  }

  // event change salary
  function valuetext(value: number) {
    return `${value}`
  }

  const handleChangeMoneyType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      moneyType: Number(e.target.value),
    }))
    let convertedValue: number[]
    if (editDataPosted.moneyType === 1) {
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
        <FormLabel id="salaryFilter" component="legend" sx={styleLabel}>
          Loại tiền *:
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="salaryFilter"
          onChange={handleChangeMoneyType}
          value={editDataPosted.moneyType}
        >
          <FormControlLabel
            value={1}
            control={<Radio id="typeSalaryVND" />}
            label="VND"
            htmlFor="typeSalaryVND"
          />
          <FormControlLabel
            value={2}
            control={<Radio id="typeSalaryUSD" />}
            label="USD"
            htmlFor="typeSalaryUSD"
          />
        </RadioGroup>
      </FormControl>
      {/* <div
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
  /> */}
      <Space size={50} style={{ marginTop: 10 }}>
        <Space direction="vertical">
          <p>Luong toi thieu</p>
          <Input
            style={{ height: 40 }}
            maxLength={12}
            placeholder="Luong toi thieu"
            onChange={handleChangesalaryMin}
            value={new Intl.NumberFormat('en-US').format(
              Number(editDataPosted?.salaryMin?.toString().replace(',', ''))
            )}
          />
        </Space>

        <Space direction="vertical">
          <p>Luong toi da</p>
          <Input
            style={{ height: 40 }}
            maxLength={12}
            placeholder="Luong toi da"
            onChange={handleChangesalaryMax}
            value={new Intl.NumberFormat('en-US').format(
              Number(editDataPosted?.salaryMax?.toString().replace(',', ''))
            )}
          />
        </Space>
      </Space>
    </Box>
  )
}

export default EditPostFilterSalary
