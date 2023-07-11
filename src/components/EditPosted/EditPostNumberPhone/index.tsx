import React, { useState, memo } from 'react'
import { Box } from '@mui/material'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Input } from 'antd'

interface NumericInputProps {
  style: React.CSSProperties
  value: any
  onChange: (value: any) => any
}

interface IEditPostNumberPhone {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange((preValue: any) => ({ ...preValue, phoneNumber: inputValue }))
    }
  }

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1)
    }
    onChange((preValue: any) => ({
      ...preValue,
      phoneNumber: valueTemp.replace(/(\d+)/, '$1'),
    }))
  }
  return (
    <Input
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Nhập số điện thoại"
      maxLength={16}
    />
  )
}

const EditPostNumberPhone: React.FC<IEditPostNumberPhone> = (props) => {
  const { setEditDataPosted, editDataPosted } = props

  const [phone, setPhoneNumber] = useState<string>('')
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  }
  return (
    <Box sx={{ marginTop: '24px' }}>
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="company"
      >
        Số điện thoại liên hệ <span style={{ color: 'red' }}>*</span>
      </Typography>
      <NumericInput
        style={{ width: '100%', height: 40 }}
        value={editDataPosted.phoneNumber}
        onChange={setEditDataPosted}
      />
      {/* <Input
    value={`${phone}d`}
    onChange={handleChangeNumber}
  /> */}
    </Box>
  )
}

export default memo(EditPostNumberPhone)
