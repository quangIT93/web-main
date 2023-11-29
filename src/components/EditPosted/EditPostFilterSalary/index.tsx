import React, { useState, useEffect, memo } from 'react'
import { Box } from '@mui/material'
// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControl from '@mui/material/FormControl'
// import FormLabel from '@mui/material/FormLabel'
// import FormControlLabel from '@mui/material/FormControlLabel'
import { Input, Space } from 'antd'
import Typography from '@mui/material/Typography'

//@ts-ignore
import 'intl'
import 'intl/locale-data/jsonp/en'
import { styleLabel } from '../CssEditPost'
import { post } from 'validations/lang/vi/post'
import { postEn } from 'validations/lang/en/post'

interface IEditPostFilterSalary {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
  salaryType?: number
  dataOld: any
  language: any;
  languageRedux: any;
}

const EditPostFilterSalary: React.FC<IEditPostFilterSalary> = (props) => {
  const { setEditDataPosted, editDataPosted, salaryType, dataOld, language, languageRedux } = props

  const [valueSalaryMax, setValueSalaryMax] = useState(dataOld?.salary_max)
  const [valueSalaryMin, setValueSalaryMin] = useState(dataOld?.salary_min)

  const handleChangesalaryMin = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValueSalaryMin(e.target.value.replace(',', ''))

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
    setValueSalaryMax(e.target.value.replace(',', ''))

    const inputValue = e.target.value.replace(',', '')
    const reg = /[0-9]+$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        salaryMax: inputValue.replace(',', ''),
      }))
    }
  }

  useEffect(() => {
    if (salaryType === 6) {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        salaryMax: 0,
        salaryMin: 0,
      }))
    } else {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        salaryMax: valueSalaryMax?.toString()?.replace(',', ''),
        salaryMin: valueSalaryMin?.toString()?.replace(',', ''),
      }))
    }
  }, [salaryType])

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
            {
              languageRedux === 1
                ? "Lương tối thiểu"
                : languageRedux === 2
                  ? "Min salary"
                  : '루옹 투이 티에우'
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Input
            style={{ height: 40 }}
            maxLength={12}
            placeholder={
              languageRedux === 1
                ? "Lương tối thiểu"
                : languageRedux === 2
                  ? "Min salary"
                  : '루옹 투이 티에우'
            }
            onChange={handleChangesalaryMin}
            value={new Intl.NumberFormat('en-US').format(
              Number(editDataPosted?.salaryMin?.toString().replace(',', ''))
            )}
            disabled={salaryType === 6}
            id="edit_post_salaryMin"
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
            {
              languageRedux === 1
                ? "Lương tối đa"
                : languageRedux === 2
                  ? "Max salary"
                  : '루옹 터이 다'
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Input
            style={{ height: 40 }}
            maxLength={12}
            placeholder={
              languageRedux === 1
                ? "Lương tối đa"
                : languageRedux === 2
                  ? "Max salary"
                  : '루옹 터이 다'
            }
            onChange={handleChangesalaryMax}
            value={new Intl.NumberFormat('en-US').format(
              Number(editDataPosted?.salaryMax?.toString().replace(',', ''))
            )}
            disabled={salaryType === 6}
            id="edit_post_salaryMax"
          />
        </Space>
      </Space>
    </Box>
  )
}

export default memo(EditPostFilterSalary)
