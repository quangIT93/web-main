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
  id?: number | null
  company_name?: string
  major?: string
  start_date?: number
  end_date?: number
  extra_information?: string
  title?: string
}

interface IModalProfileEducationUpdate {
  openModalEducationUpdate: boolean
  setOpenModalEducationUpdate: React.Dispatch<React.SetStateAction<boolean>>
  typeItem: string
  educationId?: number | null
  educationValue: any
}

interface IInfoEducation {
  educationId?: number | null
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
    educationId,
    educationValue,
  } = props
  // console.log('typeItem', typeItem)
  const dispatch = useDispatch()
  // const [companyName, setCompanyName] = useState<string>('')
  // const [startDate, setStartDate] = React.useState<any>(
  //   new Date(2023, 4, 30, 0, 0).getTime()
  // )
  // const [endDate, setEndDate] = React.useState<any>(
  //   new Date(2023, 4, 30, 0, 0).getTime()
  // )
  // const [major, setMajor] = useState<string>('')
  // const [extraInformation, setExtraInformation] = useState<string>('')
  const [education, setEducation] = useState<IInfoEducation>({
    educationId: educationId,
    companyName: educationValue.company_name,
    major: educationValue.major,
    startDate: educationValue.start_date,
    endDate: educationValue.end_date,
    extraInformation: educationValue.extra_information,
  })
  console.log('educationValue', educationValue)
  const handleClose = () => setOpenModalEducationUpdate(false)

  // school
  const handleChangeSchool = (e: any) => {
    setEducation((preValue) => {
      return { ...preValue, companyName: e.target.value }
    })
  }

  // time
  const handleChangeStartTime = (newValue: any, e: any) => {
    setEducation((preValue) => {
      return { ...preValue, startDate: new Date(newValue._d).getTime() }
    })
  }

  const handleChangeEndTime = (newValue: any, e: any) => {
    setEducation((preValue) => {
      return {
        ...preValue,
        endDate: new Date(newValue._d).getTime(),
      }
    })
  }

  // major
  const handleChangeMajor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEducation((preValue) => {
      return { ...preValue, major: e.target.value }
    })
  }

  const handleChangeExtraInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEducation((preValue) => {
      return { ...preValue, extraInformation: e.target.value }
    })
  }

  // submit

  const handleSubmit = async () => {
    try {
      const result = await profileApi.updateProfileEducation(education)
      if (result) {
        console.log('update thành công', result)

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
          Thêm thông tin trình độ học vấn
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
            value={education.companyName}
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
            value={education.major}
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
                  value={moment(education.startDate)}
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
                  value={moment(education.endDate)}
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
            value={education.extraInformation}
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

export default React.memo(ModalProfileEducationUpdate)
