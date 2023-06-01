import React, { useState } from 'react'
import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
// data
import locationApi from '../../../api/locationApi'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 840,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
}

const styleChildBox = {
  marginBottom: '12px',
}

interface IModalProfileEducation {
  openModalEducation: boolean
  setOpenModalEducation: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalProfileEducation: React.FC<IModalProfileEducation> = (props) => {
  const { openModalEducation, setOpenModalEducation } = props
  const [startTime, setStartTime] = React.useState<any>(
    new Date(1970, 0, 2, 0, 0).getTime()
  )
  const [endTime, setEndTime] = React.useState<any>(
    new Date(1970, 0, 2, 0, 0).getTime()
  )
  const [startDate, setStartDate] = React.useState<any>(
    new Date(2023, 4, 1, 0, 0).getTime()
  )
  const [endDate, setEndDate] = React.useState<any>(
    new Date(2023, 4, 30, 0, 0).getTime()
  )

  const handleClose = () => setOpenModalEducation(false)

  const handleAddInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const handleChangeStartTime = (newValue: any, e: any) => {
    setStartDate(new Date(newValue.$d).getTime())
  }

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEndDate(new Date(newValue.$d).getTime())
  }
  return (
    <Modal
      open={openModalEducation}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{ marginBottom: '12px' }}
        >
          Trình độ học vấn
        </Typography>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Trường/Tổ chức *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            //   value={formValues.title}
            // onChange={handleChangeTitleForm}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Nhập tên trường hoặc tổ chức"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>

        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Chuyên ngành *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            //   value={formValues.title}
            // onChange={handleChangeTitleForm}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Ngành"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={styleChildBox}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer
              components={['DatePicker', 'DatePicker']}
              sx={{ display: 'flex' }}
            >
              <div className="wrapTimeDay">
                <Typography
                  // sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="startTime"
                >
                  Thời gian bắt đầu *:
                </Typography>
                <DatePicker
                  value={moment(startDate)}
                  onChange={handleChangeStartTime}
                />
              </div>
              <div className="wrapTimeDay">
                <Typography
                  // sx={styleLabel}
                  variant="body1"
                  component="label"
                  htmlFor="startTime"
                >
                  Thời gian kết thúc *:
                </Typography>
                <DatePicker
                  value={moment(endDate)}
                  onChange={handleChangeEndTime}
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Thông tin bổ sung *:
          </Typography>
          <TextField
            // className={classes.textarea}
            onChange={handleAddInfo}
            sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
            multiline
            rows={4}
            // label="Một số đặc điểm nhận diện công ty"
            placeholder="Để được nhà tuyển dụng quan tâm và tăng cơ hội ứng tuyển vào công ty mong muốn. Hẫy nhập thông tin bổ sung của bạn vào đây!"
          />
        </Box>

        <Button variant="contained" fullWidth>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalProfileEducation
