import { Box } from '@mui/material'
import React from 'react'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

interface IPhoneNumber {
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
}
const PostNumberPhone: React.FC<IPhoneNumber> = (props) => {
  const { setPhoneNumber } = props
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  }

  const handleChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPhoneNumber(e.target.value)
  }

  return (
    <Box>
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="company"
      >
        Số điện thoại liên hệ *:
      </Typography>
      <TextField
        type="text"
        id="company"
        name="company_name"
        // value={formValues.company_name}
        size="small"
        onChange={handleChangeNumber}
        sx={{ width: '100%', marginTop: '4px' }}
        placeholder="Số điện thoại liên hệ"
      />
    </Box>
  )
}

export default PostNumberPhone
