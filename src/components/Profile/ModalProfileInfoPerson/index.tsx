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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/reducer/index'
import {
  getProfile,
  resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer'

import './style.scss'
import profileApi from 'api/profileApi'
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

interface IModalProfileInfoPerson {
  openModelPersonalInfo: boolean
  setOpenModalPersonalInfo: React.Dispatch<React.SetStateAction<boolean>>
  profile: any
}
interface IInfoPersonal {
  name: string
  birthday: number
  gender: number
  address: number
  introduction: string
}

const ModalProfileInfoPerson: React.FC<IModalProfileInfoPerson> = (props) => {
  const { openModelPersonalInfo, setOpenModalPersonalInfo, profile } = props
  const [gender, setGender] = React.useState(
    profile?.gender != null ? (profile.gender == 0 ? 'Nam' : 'Nữ') : null
  )
  const [day, setDay] = useState(
    profile?.birthday ? moment(new Date(profile?.birthday)) : moment()
  ) // Giá trị mặc định là ngày hiện tại
  const [dataProvinces, setDataProvinces] = useState<any>()
  const [selectedProvince, setSelectedProvince] = useState<any>(
    profile?.address ? profile?.address : null
  )
  const [name, setName] = useState(profile?.name)
  const [introduction, setIntroduction] = useState(profile?.introduction)

  const dispatch = useDispatch()

  const handleSetFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

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

  const handleDateChange = (date: any) => {
    setDay(date._d)
  }
  const handleClose = () => setOpenModalPersonalInfo(false)

  const handleChange = (event: any) => {
    setGender(event.target.value)
    //  console.log(event.target.value)
  }

  const handleProvinceChange = (event: any, value: any) => {
    setSelectedProvince(value)
    // console.log("value: ", value)
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntroduction(e.target.value)
  }
  // handle update information user
  const handleSubmit = async () => {
    // const data = new Date(day.toString()).getTime()

    try {
      const info: IInfoPersonal = {
        name: name,
        birthday: new Date(day.toString()).getTime(),
        gender: gender === 'Nam' ? 0 : 1,
        address: selectedProvince.id,
        introduction: introduction,
      }

      const result = await profileApi.putProfilePersonal(info)
      if (result) {
        setOpenModalPersonalInfo(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      open={openModelPersonalInfo}
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
          Thông tin cá nhân
        </Typography>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Họ và tên *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={name}
            onChange={handleSetFullName}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Họ và tên"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="sex"
          >
            Giới tính *
          </Typography>
          <TextField
            select
            id="sex"
            value={gender}
            // defaultValue={gender}
            onChange={handleChange}
            variant="outlined"
            placeholder="Giới tính"
            size="small"
            sx={{ width: '100%' }}
            error={!gender} // Đánh dấu lỗi
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </TextField>
        </Box>
        <Box sx={styleChildBox}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className="wrapModalBirth">
              <Typography variant="body1" component="label" htmlFor="startTime">
                Ngày sinh *:
              </Typography>
              <DatePicker value={day} onChange={handleDateChange} />
            </div>
          </LocalizationProvider>
        </Box>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Địa điểm *:
          </Typography>
          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.name || ''}
            value={
              selectedProvince
                ? dataProvinces?.find(
                    (province: any) => province.id === selectedProvince.id
                  )
                : null
            }
            defaultValue={dataProvinces}
            onChange={handleProvinceChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Tỉnh/TP"
                size="small"
                error={!selectedProvince}
              />
            )}
          />
        </Box>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="startTime"
          >
            Giới thiệu bản thân *:
          </Typography>
          <TextField
            // className={classes.textarea}
            onChange={handleChangeDescription}
            sx={{ width: '100%', marginTop: '4px' }}
            multiline
            rows={4}
            value={introduction}
            // label="Một số đặc điểm nhận diện công ty"
            placeholder="Giới thiệu bản thân với Nhà Tuyển dụng
            Nêu sở trường và mong muốn của bạn liên quan đến công việc để gây chú ý với Nhà Tuyển dụng"
            error={!introduction} // Đánh dấu lỗi
          />
        </Box>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalProfileInfoPerson
