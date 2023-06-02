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
import profileApi from 'api/profileApi'
import categoriesApi from '../../../api/categoriesApi'
import { useDispatch } from 'react-redux'
import {
  getProfile,
  resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer'

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

interface IEducation {
  educationId: number
  companyName: string
  major: string
  startDate: number
  endDate: number
  extraInformation: string
}

interface IModalProfileEducationUpdate {
  openModalEducationUpdate: boolean
  setOpenModalEducationUpdate: React.Dispatch<React.SetStateAction<boolean>>
  typeItem: string
  educations: IEducation[]
}

interface IInfoEducation {
  educationId: number | null
  companyName: string
  major: string
  startDate: number
  endDate: number
  extraInformation: string
}

const ModalProfileEducationUpdate: React.FC<IModalProfileEducationUpdate> = (
  props
) => {
  const {
    openModalEducationUpdate,
    setOpenModalEducationUpdate,
    typeItem,
    educations,
  } = props
  // console.log('typeItem', typeItem)
  const dispatch = useDispatch()

  const [companyName, setCompanyName] = useState<string>('')
  const [startDate, setStartDate] = React.useState<any>(
    new Date(2023, 4, 30, 0, 0).getTime()
  )
  const [endDate, setEndDate] = React.useState<any>(
    new Date(2023, 4, 30, 0, 0).getTime()
  )
  const [major, setMajor] = useState<string>('')

  const [extraInformation, setExtraInformation] = useState<string>('')

  const [education, setEducation] = useState<IInfoEducation>({
    educationId: null,
    companyName: '',
    major: '',
    startDate: 0,
    endDate: 0,
    extraInformation: '',
  })

  console.log('school', companyName)
  console.log('major', major)
  console.log('extraInformation', extraInformation)

  // console.log('endDate', endDate)

  const handleClose = () => setOpenModalEducationUpdate(false)

  // school
  const handleChangeSchool = (e: any) => {
    setCompanyName(e.target.value)
  }

  // time
  const handleChangeStartTime = (newValue: any, e: any) => {
    console.log('newDate', newValue._i)
    setStartDate(newValue._i)
  }

  const handleChangeEndTime = (newValue: any, e: any) => {
    console.log(
      'new Date(newValue.$d).getTime()',
      new Date(newValue.$d).getTime()
    )
    setEndDate(new Date(newValue.$d).getTime())
  }

  // major
  const handleChangeMajor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMajor(e.target.value)
  }

  const handleChangeExtraInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExtraInformation(e.target.value)
  }

  // submit

  const handleSubmit = async () => {
    try {
      const result = await profileApi.updateProfileEducation(
        {} as IInfoEducation
      )
      if (result) {
        console.log('update thành công', result)
        await dispatch(getProfile() as any)
        setOpenModalEducationUpdate(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal
      open={openModalEducationUpdate}
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
          Chỉnh sửa thông tin trình độ học vấn
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
            onChange={handleChangeSchool}
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
            onChange={handleChangeMajor}
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
            onChange={handleChangeExtraInfo}
            sx={{ width: '100%', marginTop: '4px', textAlign: 'start' }}
            multiline
            rows={4}
            // label="Một số đặc điểm nhận diện công ty"
            placeholder="Để được nhà tuyển dụng quan tâm và tăng cơ hội ứng tuyển vào công ty mong muốn. Hẫy nhập thông tin bổ sung của bạn vào đây!"
          />
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalProfileEducationUpdate
