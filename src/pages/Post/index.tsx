import React, { useState, FormEvent, ChangeEvent } from 'react'
// @ts-ignore
import { Navbar } from '#components'
import { useHomeState } from '../Home/HomeState'
import { StatePropsCloseSlider } from 'pages/Home'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import PostFilterSalary from './components/PostFilterSalary'
import Autocomplete from '@mui/material/Autocomplete'
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// import component
import PostJobCompany from './components/PostJobCompany'
import PostAddress from './components/PostAddress'
import PostTypeJob from './components/PostTypeJob'

import './style.scss'

const posts = {
  id: 15,
  status: 0,
  account_id: '4d207f7c-d443-476b-af9a-b59da47560a9',
  title: 'Title',
  company_name: 'AIWorks',
  is_date_period: 1,
  start_date: 1668043800000,
  end_date: 1668907800000,
  start_time: 1668043800000,
  end_time: 1668043800000,
  salary: 5000,
  salary_type: 'Giờ',
  created_at: 1669772817000,
  image:
    'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/896aff4a-8c90-4891-8bce-43be9ec5606b-7edfc0ed-1899-44ee-85ec-a05fb3d07260-kali-logo-16x9-1.png',
  province_id: 202,
  province: 'Hồ Chí Minh',
  district_id: 1448,
  district: 'Quận 6',
}

const posts1 = {
  title: '',
  companyName: '',
  wardId: '',
  address: '',
  isDatePeriod: 0,
  startDate: 0,
  endDate: 0,
  startTime: 0,
  endTime: 0,
  isWorkingWeekend: 0,
  isRemotely: 0,
  salaryMin: 0,
  salaryMax: 0,
  salaryType: 0,
  moneyType: 0,
  jobTypeId: 0,
  description: '',
  phoneNumber: '',
  email: '',
  expiredDate: 0,
  categoryIds: [],
  images: [],
}

interface ICategoryIds {
  id: string
  name: string
}

interface IImage {
  id: string
  images: number
  status: 0 | 1
}

export interface FormValues {
  title: string
  companyName: string
  wardId: string | null
  address: string
  isDatePeriod: number
  startDate: number
  endDate: number
  startTime: number
  endTime: number
  isWorkingWeekend: number
  isRemotely: number
  salaryMin: number
  salaryMax: number
  salaryType: number
  moneyType: number
  jobTypeId: number
  description: string
  phoneNumber: string
  email: string
  expiredDate: number
  categoryIds: ICategoryIds[]
  images: IImage[]
}

interface Option {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

interface IPostAddress {
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedProvince: React.Dispatch<React.SetStateAction<string>>
}

const Post: React.FC = () => {
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  }
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    companyName: '',
    wardId: '',
    address: '',
    isDatePeriod: 0,
    startDate: 0,
    endDate: 0,
    startTime: 0,
    endTime: 0,
    isWorkingWeekend: 0,
    isRemotely: 0,
    salaryMin: 0,
    salaryMax: 0,
    salaryType: 0,
    moneyType: 0,
    jobTypeId: 0,
    description: '',
    phoneNumber: '',
    email: '',
    expiredDate: 0,
    categoryIds: [],
    images: [],
  })

  const [titleJob, setTitleJob] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedWard, setSelectedWard] = useState<string | null>('')
  const [typeJob, setTypeJob] = useState(0)

  const [salary, setSalary] = React.useState<number[]>([])
  const [openSalary, setOpenSalary] = React.useState<boolean>(false)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const [phoneNumber, setPhoneNumber] = useState('')

  const handleOptionChange = (
    event: React.ChangeEvent<{}>,
    values: Option[]
  ) => {
    // if(event.target.value)

    setSelectedOptions(values)
  }

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    const newInputValue = (event?.target as HTMLInputElement)?.value
    if (newInputValue) {
      const updatedOptions = [...options]
      const existingOption = updatedOptions.find(
        (option) => option.value === newInputValue
      )
      if (!existingOption) {
        // Thêm tùy chọn mới vào danh sách tùy chọn
        updatedOptions.push({ label: newInputValue, value: newInputValue })
        // Cập nhật danh sách tùy chọn
        setSelectedOptions(updatedOptions)
      }
    }
  }

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value)
  }

  const {
    openCollapse,
    setOpenCollapse,
    height,
    setHeight,
    openModalLogin,
    setOpenModalLogin,
  } = useHomeState()

  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const statePropsCloseSlider: StatePropsCloseSlider = {
    openCollapse,
    setOpenCollapse,
    setHeight,
    height,
    setOpenModalLogin,
  }

  // submit
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent
  ) => {
    e.preventDefault()
    setFormValues((prevValues) => ({
      ...prevValues,
      title: titleJob,
      companyName: companyName,
      wardId: selectedWard,
      jobTypeId: typeJob,

      // Các trường khác bạn muốn cập nhật tương tự
    }))
    console.log('formValues', formValues)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      const selectedFiles = Array.from(files)
      setSelectedImages(selectedFiles)
    }
  }

  // test

  return (
    <div className="post">
      <Navbar {...statePropsCloseSlider} />
      <div className="post-main">
        <h1>Tạo bài đăng tuyển dụng</h1>
        <form onSubmit={handleSubmit}>
          <PostJobCompany
            setFormValues={setFormValues}
            setTitleJob={setTitleJob}
            setCompanyName={setCompanyName}
          />
          <PostAddress
            setSelectedDistrict={setSelectedDistrict}
            setSelectedProvince={setSelectedProvince}
            selectedDistrict={selectedDistrict}
            selectedProvince={selectedProvince}
            setSelectedWard={setSelectedWard}
            selectedWard={selectedWard}
          />
          <div className="postImages">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              id="chooseImg"
            />

            <div>
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                />
              ))}
            </div>
          </div>
          <PostTypeJob typeJob={typeJob} setTypeJob={setTypeJob} />

          <FormControl sx={{ marginTop: '24px' }}>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              component="legend"
              sx={styleLabel}
            >
              Thời gian làm việc *:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="LimitedTime"
                control={<Radio id="limited-time-radio" />}
                label="Có giới hạn thời gian"
                htmlFor="limited-time-radio"
              />
              <FormControlLabel
                value="UnlimitedTime"
                control={<Radio id="limited-time-radio1" />}
                label="Không giới hạn thời gian"
                htmlFor="limited-time-radio1"
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel
              label="Làm việc cuối tuần"
              control={
                <Checkbox
                // checked={checked[0]} onChange={handleChange2}
                />
              }
            />
            <FormControlLabel
              label="Làm việc từ xa"
              control={
                <Checkbox
                // checked={checked[1]} onChange={handleChange3}
                />
              }
            />
          </Box>
          <Box sx={{ display: 'flex', marginTop: '24px' }}>
            <div className="work-hours">
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="startTime"
              >
                Giờ bắt đầu *:
              </Typography>
              <TextField
                type="time"
                id="startTime"
                name="startTime"
                size="small"
                // value={formValues.startTime}
                // onChange={handleChange}
                style={{ marginTop: '4px' }}
                InputProps={{
                  inputProps: {
                    step: 300, // Các giá trị thời gian sẽ được chia thành khoảng cách 5 phút
                    min: '11:00', // Thời gian bắt đầu là 11:00
                    max: '16:59', // Thời gian kết thúc là 16:59
                  },
                }}
                sx={{ width: '100%' }}
              />
            </div>
            <div className="work-hours" style={{ marginLeft: '12px' }}>
              <Typography
                sx={styleLabel}
                variant="body1"
                component="label"
                htmlFor="endTime"
              >
                Giờ kết thúc *:
              </Typography>
              <TextField
                type="time"
                id="endTime"
                name="endTime"
                size="small"
                style={{ marginTop: '4px' }}
                // value={formValues.endTime}
                // onChange={handleChange}
                InputProps={{
                  inputProps: {
                    step: 300, // Các giá trị thời gian sẽ được chia thành khoảng cách 5 phút
                    min: '11:01', // Thời gian bắt đầu là 11:01 (để tránh trùng với giờ bắt đầu)
                    max: '17:00', // Thời gian kết thúc là 17:00
                  },
                }}
                sx={{ width: '100%' }}
              />
            </div>
          </Box>
          <Box sx={{ marginTop: '24px' }}>
            <Typography
              sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="jobTitle"
            >
              Danh mục nghề *:
            </Typography>
            <Autocomplete
              multiple // Cho phép chọn nhiều option
              options={options}
              getOptionLabel={(option) => option.label}
              value={selectedOptions}
              onChange={handleOptionChange}
              // isOptionEqualToValue={isOptionEqualToValue}
              onInputChange={handleInputChange}
              style={{ marginTop: '4px' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label="Select options"
                  type="text"
                  size="small"
                  id="jobs"
                />
              )}
            />
          </Box>

          <PostFilterSalary setSalary={setSalary} openSalary={openSalary} />
          <Box sx={{ marginTop: '24px' }}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={styleLabel}
              >
                Trả lương theo *:
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // value={selectedValue}
                // onChange={handleChange}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <FormControlLabel
                  value="time"
                  control={<Radio />}
                  label="Giờ"
                />
                <FormControlLabel
                  value="day"
                  control={<Radio />}
                  label="Ngày"
                />
                <FormControlLabel
                  value="week"
                  control={<Radio />}
                  label="Tuần"
                />
                <FormControlLabel
                  value="month"
                  control={<Radio />}
                  label="Tháng"
                />
                <FormControlLabel
                  value="work"
                  control={<Radio />}
                  label="Công việc"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ marginTop: '24px' }}>
            <Typography
              sx={styleLabel}
              variant="body1"
              component="label"
              htmlFor="startTime"
            >
              Số điện thoại liên hệ *:
            </Typography>
            <PhoneInput
              international
              defaultCountry="VN"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              style={{ marginTop: '4px' }}
            />
          </Box>
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

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-submitForm"
          >
            Đăng
          </button>
        </form>
      </div>
    </div>
  )
}

export default Post
