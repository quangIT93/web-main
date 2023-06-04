import React, { useState } from 'react'
import { Box, Modal, Typography, Button } from '@mui/material'

// data
import profileApi from 'api/profileApi'
import { useDispatch } from 'react-redux'
import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer'

import {
  getProfile,
  resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer'
import alertProfile from 'store/reducer/profileReducer/alertProfileReducer'
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

interface IModalProfileDeleteEducation {
  openModalDeleteEducation: boolean
  setOpenModalDeleteEducation: React.Dispatch<React.SetStateAction<boolean>>
  educationId?: number | null
}
const ModalDelete: React.FC<IModalProfileDeleteEducation> = (props) => {
  const { openModalDeleteEducation, setOpenModalDeleteEducation, educationId } =
    props
  const dispatch = useDispatch()

  const handleClose = () => setOpenModalDeleteEducation(false)

  const handleSubmitDelete = async () => {
    try {
      const result = await profileApi.deleteProfileEducation(educationId)
      if (result) {
        console.log('xoá thành công', result)
        await dispatch(getProfile() as any)
        await dispatch(setAlert(true))
        setOpenModalDeleteEducation(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmitRefuse = () => {
    setOpenModalDeleteEducation(false)
  }

  return (
    <Modal
      open={openModalDeleteEducation}
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
          Bạn có chắc chắn muốn xoá thông tin này chứ?
        </Typography>
        <Box sx={{ display: 'flex', gap: '100px' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmitDelete}
            color="error"
          >
            Delete
          </Button>

          <Button variant="contained" fullWidth onClick={handleSubmitRefuse}>
            Trở về
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default React.memo(ModalDelete)
