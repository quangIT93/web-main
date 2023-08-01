import React, { useState, memo } from 'react'
import { Box } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'

// import Typography from '@mui/material/Typography'

import { styleLabel } from '../CssEditPost'

import './style.scss'

interface IEditPostTypeSalary {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
  salaryType?: number
}

const EditPostTypeSalary: React.FC<IEditPostTypeSalary> = (props) => {
  const { editDataPosted, setEditDataPosted, salaryType } = props

  const handleChangeMoneyType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      moneyType: Number(e.target.value),
    }))
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <FormControl sx={{ marginTop: '24px' }}>
        <FormLabel
          id="salaryFilter"
          component="legend"
          sx={{
            ...styleLabel,
            opacity: salaryType === 6 ? 0.5 : 1, // Thiết lập opacity thành 0.5 nếu salaryType === 6
          }}
          color="warning"
        >
          Mức lương <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="changeTypesalary"
          name="salaryFilter"
          onChange={handleChangeMoneyType}
          value={editDataPosted.moneyType}
        >
          <FormControlLabel
            value={1}
            control={
              <Radio
                id="typeSalaryVND"
                disabled={salaryType === 6}
                sx={{ color: salaryType === 6 ? 'gray' : 'inherit' }}
              />
            }
            label="VND"
            htmlFor="typeSalaryVND"
          />
          <FormControlLabel
            value={2}
            control={
              <Radio
                id="typeSalaryUSD"
                disabled={salaryType === 6}
                sx={{ color: salaryType === 6 ? 'gray' : 'inherit' }}
              />
            }
            label="USD"
            htmlFor="typeSalaryUSD"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default memo(EditPostTypeSalary)
