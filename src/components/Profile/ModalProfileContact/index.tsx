import React, { useState } from 'react'
import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { DatePicker } from '@mui/lab'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
// data
import locationApi from '../../../api/locationApi'

import './style.scss'
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

interface IModalProfileContact {
  openModalContact: boolean
  setOpenModalContact: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalProfileContact: React.FC<IModalProfileContact> = (props) => {
  const { openModalContact, setOpenModalContact } = props

  const handleClose = () => setOpenModalContact(false)

  return (
    <Modal
      open={openModalContact}
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
          Thông tin liên hệ
        </Typography>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Số điện thoại *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            //   value={formValues.title}
            // onChange={handleChangeTitleForm}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Số điện thoại"
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
            Email *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            //   value={formValues.title}
            // onChange={handleChangeTitleForm}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Email"
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
            Link Facebook *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            //   value={formValues.title}
            // onChange={handleChangeTitleForm}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Facebook"
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
            Link Linkedin *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            //   value={formValues.title}
            // onChange={handleChangeTitleForm}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Linkedin"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>

        <Button variant="contained" fullWidth>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalProfileContact
