import React from 'react'
import { Box } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost'

interface ISalaryType {
  salaryType: number
  setSalaryType: React.Dispatch<React.SetStateAction<number>>
}
const SalaryType: React.FC<ISalaryType> = (props) => {
  const { salaryType, setSalaryType } = props
  const handleChangeSalaryType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryType(Number(e.target.value))
  }
  return (
    <Box sx={{ marginTop: '24px' }}>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="demo-row-radio-buttons-group-label" sx={styleLabel}>
          Trả lương theo *:
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={salaryType}
          onChange={handleChangeSalaryType}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <FormControlLabel value={0} control={<Radio />} label="Giờ" />
          <FormControlLabel value={1} control={<Radio />} label="Ngày" />
          <FormControlLabel value={2} control={<Radio />} label="Tuần" />
          <FormControlLabel value={3} control={<Radio />} label="Tháng" />
          <FormControlLabel
            value="work"
            control={<Radio />}
            label="Công việc"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default SalaryType
