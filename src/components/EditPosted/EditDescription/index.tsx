import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
//@ts-ignore
import { styleLabel } from '../CssEditPost'

const EditDescription = () => {
  return (
    <Box sx={{ marginTop: '24px' }}>
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="startTime"
      >
        Mô tả công việc *:
      </Typography>
      <TextField
        // className={classes.textarea}
        // onChange={handleChangeDescription}
        sx={{ width: '100%', marginTop: '4px' }}
        multiline
        rows={6}
        // label="Một số đặc điểm nhận diện công ty"
        placeholder="Một số đặc điểm nhận diện công ty:
Tên công ty, địa chỉ, hình thức, mặt hàng kinh doanh
Vị trí, yêu cầu công việc
Mô tả yêu cầu kỹ năng, bằng cấp nếu có"
      />
    </Box>
  )
}

export default EditDescription
