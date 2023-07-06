import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { message, Space } from 'antd';

// data
import profileApi from 'api/profileApi'
import { useDispatch } from 'react-redux'

// data
import locationApi from '../../../api/locationApi'

import {
  getProfile,
  resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer'
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
  locations: number[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}



const ModalProfileLocation: React.FC<IModalProfileLocation> = (props) => {
  const { openModalLocation, setOpenModalLocation, locations } = props
  const [dataAllLocation, setDataAllLocation] = React.useState<any>(null)
  const [open, setOpen] = React.useState<any>([])

  const [location, setLocation] = React.useState<any>(
    locations?.map((v: any, i) => v.district)
  )

  const [locationId, setLocationId] = React.useState<any>(
    locations?.map((v: any, i) => v.district_id)
  )

  console.log("locations", locations)
  console.log("location", location)

  const dispatch = useDispatch()
  const handleClose = () => setOpenModalLocation(false)
  const allLocation = async () => {
    try {
      const allLocation = await locationApi.getAllLocation()

      if (allLocation) {
        setDataAllLocation(allLocation.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    allLocation()
    // getAllLocations()
    // delete param when back to page
  }, [])

  useEffect(() => {
    if (dataAllLocation && dataAllLocation.length > 0) {
      setOpen(Array(dataAllLocation.length).fill(false))
    }
  }, [dataAllLocation])

  // console.log('dataAllLocation', dataAllLocation)

  const handleClickProvince = (event: any, index: number) => {
    event.stopPropagation()
    const newOpen = open.map((value: boolean, i: number) =>
      i === index ? !value : false
    )
    setOpen(newOpen)
  }

  const handleClickDistrict = (value: any) => {
    setLocation((prevValues: number[]) => {
      if (prevValues.includes(value.district)) {
        // Nếu giá trị đã tồn tại, xoá nó khỏi
        const newValues = prevValues.filter((item) => item !== value.district)
        return newValues
      } else {
        // Nếu giá trị chưa tồn tại, thêm nó vào mảng
        const newValues = [...prevValues, value.district]
        return newValues
      }
    })

    setLocationId((prevValuesId: number[]) => {
      if (prevValuesId.includes(value.district_id)) {
        // Nếu giá trị đã tồn tại, xoá nó khỏi
        const newValues = prevValuesId.filter(
          (item: number) => item !== value.district_id
        )
        return newValues
      } else {
        // Nếu giá trị chưa tồn tại, thêm nó vào mảng
        const newValues = [...prevValuesId, value.district_id]
        return newValues
      }
    })
  }

  const renderOptions = () => {
    return dataAllLocation?.map((item: any, index: number) => (
      <div key={index}>
        <ListItemButton onClick={(event) => handleClickProvince(event, index)}>
          <ListItemText primary={item.province_fullName} />
          {open[index] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open[index]} timeout="auto" unmountOnExit>
          {item.districts.map((v: any, i: number) => (
            <MenuItem
              key={i}
              value={v.district}
              onClick={() => handleClickDistrict(v)}
            >
              <Checkbox checked={location?.indexOf(v.district) > -1} />
              <ListItemText primary={v.district} />
            </MenuItem>
          ))}
        </Collapse>
      </div>
    ))
  }

  const handleSubmit = async () => {
    try {
      if (locationId.length > 3) {
        message.warning("Chon 3 khu vuc lam viec")
        return
      }
      const result = await profileApi.updateProfileLocation(
        // value.map((v) => parseInt(v))
        locationId)
      if (result) {
        setOpenModalLocation(false)
      }
    } catch (error) {
      console.log(error)
    }
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

        <FormControl sx={{ width: '100%', margin: '12px auto' }} size="small">
          <Select
            multiple
            displayEmpty
            value={location}
            input={<OutlinedInput placeholder="Quận, Tỉnh/Thành Phố" />}
            renderValue={(selected) => {
              console.log("selected", selected)

              if (selected.length === 0) {
                return (
                  <p style={{ color: ' #aaaaaa', padding: '4px 0' }}>
                    Quận, Tỉnh/Thành Phố
                  </p>
                )
              } else {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value: string, i: number) => (
                      <Chip key={i} label={value} />
                    ))}
                  </Box>
                )
              }
            }}
            MenuProps={MenuProps}
          >
            {renderOptions()}
          </Select>
        </FormControl>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalProfileLocation
