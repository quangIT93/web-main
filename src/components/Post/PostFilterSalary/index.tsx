import React, { useEffect, useState, memo } from 'react'
import { Box, Slider } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Input, Space } from 'antd'
import Typography from '@mui/material/Typography'
//@ts-ignore
import 'intl'
import 'intl/locale-data/jsonp/en'
import { styleLabel } from '#components/Post/CssPost'

interface PropsSalaryFilterSubnav {
  setSalaryMin: React.Dispatch<React.SetStateAction<any>>
  salaryMin: number
  setSalaryMax: React.Dispatch<React.SetStateAction<any>>
  salaryMax: number
  salaryType?: number
}

const PostFilterSalary: React.FC<PropsSalaryFilterSubnav> = (props) => {
  const { setSalaryMax, setSalaryMin, salaryMax, salaryMin, salaryType } = props
  const VND_TO_USD = 0.000043 // Conversion rate: 1 VND = 0.000043 USD
  const USD_TO_VND = 23155

  const [valueSalaryMax, setValueSalaryMax] = useState('')
  const [valueSalaryMin, setValueSalaryMin] = useState('')

  const handleChangesalaryMin = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValueSalaryMin(e.target.value.replace(',', ''))

    const inputValue = e.target.value.replace(',', '')
    const reg = /[0-9]+$/

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setSalaryMin(inputValue.replace(',', ''))
    }
  }
  const handleChangesalaryMax = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValueSalaryMax(e.target.value.replace(',', ''))

    const inputValue = e.target.value.replace(',', '')
    const reg = /[0-9]+$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setSalaryMax(inputValue.replace(',', ''))
    }
  }

  useEffect(() => {
    if (salaryType === 6) {
      setSalaryMax(0)
      setSalaryMin(0)
    } else {
      setSalaryMax(valueSalaryMax.replace(',', ''))
      setSalaryMin(valueSalaryMin.replace(',', ''))
    }
  }, [salaryType])

  // const handleChange = (event: Event, newValue: number | number[]) => {
  //   let convertedValue: number[]

  //   if (moneyType === 1) {
  //     // Convert USD to VND
  //     convertedValue = (newValue as number[]).map((value) =>
  //       Math.round(value / USD_TO_VND)
  //     )

  //     return setSalary(newValue as number[])
  //   } else {
  //     // Convert VND to USD
  //     convertedValue = (newValue as number[]).map((value) =>
  //       Math.round(value / 23155)
  //     )

  //     return setSalary(newValue as number[])
  //   }
  // }

  // event change salary
  // function valuetext(value: number) {
  //   return `${value}`
  // }

  // const handleChangeMoneyType = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMoneyType(Number(e.target.value))
  //   let convertedValue: number[]
  //   if (moneyType === 1) {
  //     // Convert USD to VND

  //     convertedValue = (salary as number[]).map((value) => {
  //       console.log('value', value * VND_TO_USD)

  //       return Math.round(value * VND_TO_USD)
  //     })
  //     return setSalary(convertedValue)
  //   } else {
  //     convertedValue = (salary as number[]).map((value) => {
  //       console.log('value', value * USD_TO_VND)
  //       return Math.round(value * USD_TO_VND)
  //     })
  //     return setSalary(convertedValue)
  //   }
  // }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Space size={50} style={{ marginTop: 24 }}>
        <Space direction="vertical">
          <Typography
            sx={{
              ...styleLabel,
              opacity: salaryType === 6 ? 0.5 : 1, // Thiết lập opacity thành 0.5 nếu salaryType === 6
            }}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Lương tối thiểu <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Input
            style={{ height: 40 }}
            maxLength={15}
            placeholder="Luong toi thieu"
            onChange={handleChangesalaryMin}
            value={new Intl.NumberFormat('en-US').format(
              Number(salaryMin.toString().replace(',', ''))
            )}
            disabled={salaryType === 6}
          />
        </Space>

        <Space direction="vertical">
          <Typography
            sx={{
              ...styleLabel,
              opacity: salaryType === 6 ? 0.5 : 1, // Thiết lập opacity thành 0.5 nếu salaryType === 6
            }}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Lương tối đa <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Input
            style={{ height: 40 }}
            maxLength={15}
            placeholder="Luong toi da"
            onChange={handleChangesalaryMax}
            value={new Intl.NumberFormat('en-US').format(
              Number(salaryMax.toString().replace(',', ''))
            )}
            disabled={salaryType === 6}
          />
        </Space>
      </Space>
    </Box>
  )
}

export default memo(PostFilterSalary)
