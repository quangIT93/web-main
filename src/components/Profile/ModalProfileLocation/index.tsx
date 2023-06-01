import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// data
import locationApi from '../../../api/locationApi'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '840px',
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
}

interface IModalProfileLocation {
  openModalLocation: boolean
  setOpenModalLocation: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalProfileLocation: React.FC<IModalProfileLocation> = (props) => {
  const { openModalLocation, setOpenModalLocation } = props
  const [dataProvinces, setDataProvinces] = React.useState<any>(null)
  const [selectedProvince, setSelectedProvince] = React.useState<any>(null)

  const handleClose = () => setOpenModalLocation(false)
  const getAllProvinces = async () => {
    try {
      const allLocation = await locationApi.getAllProvinces()

      if (allLocation) {
        setDataProvinces(allLocation.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getAllProvinces()
    // getAllLocations()
    // delete param when back to page
  }, [])

  console.log('dataProvinces', dataProvinces)

  const handleProvinceChange = (event: any, value: any) => {
    setSelectedProvince(value)
  }

  return (
    <Modal
      open={openModalLocation}
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
        >
          Khu vực làm việc
        </Typography>
        <Autocomplete
          options={dataProvinces ? dataProvinces : []}
          getOptionLabel={(option: any) => option?.name || ''}
          value={selectedProvince || null}
          onChange={handleProvinceChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Tỉnh/TP"
              size="small"
              sx={{ margin: '12px auto' }}
            />
          )}
        />
        <Button variant="contained" fullWidth>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalProfileLocation
