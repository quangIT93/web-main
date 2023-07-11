import React, { memo } from 'react'
import { Box } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost'
import { AxiosResponse } from 'axios'
import siteApi from 'api/siteApi'

interface ISalaryType {
  salaryType: number
  setSalaryType: React.Dispatch<React.SetStateAction<number>>
}
const SalaryType: React.FC<ISalaryType> = (props) => {
  const { salaryType, setSalaryType } = props
  const handleChangeSalaryType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryType(Number(e.target.value))
  }

  const [salary, setSalary] = React.useState<AxiosResponse | null>(null)

  // call api get salaryType
  const getSalaryType = async () => {
    const result = await siteApi.getSalaryType()
    if (result) {
      setSalary(result)
    }
  }

  React.useEffect(() => {
    getSalaryType()
  }, [])

  return (
    <Box sx={{ marginTop: '24px' }}>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="demo-row-radio-buttons-group-label" sx={styleLabel}>
          Trả lương theo <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={salaryType}
          onChange={handleChangeSalaryType}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {salary?.data.map((item: any, i: number) => {
            return (
              <FormControlLabel
                key={i}
                value={item.id}
                control={<Radio />}
                label={`${item.value}`}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default memo(SalaryType)
