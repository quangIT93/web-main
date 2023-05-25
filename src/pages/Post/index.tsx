import React, { useState, FormEvent, ChangeEvent } from 'react'
import dayjs, { Dayjs } from 'dayjs'

// @ts-ignore
import { Navbar } from '#components'
//@ts-ignore
import { useHomeState } from '../Home/HomeState'
import { StatePropsCloseSlider } from 'pages/Home'
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete'
import 'react-phone-number-input/style.css'

//import PhoneInput from 'react-phone-number-input'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// import component
import PostFilterSalary from '../../components/Post/PostFilterSalary'
import PostJobCompany from '../../components/Post/PostJobCompany'
import PostAddress from '../../components/Post/PostAddress'
import PostTypeJob from '../../components/Post/PostTypeJob'
import ModalPost from '#components/Post/ModalPost'
import PostPeriodDate from '#components/Post/PostPeriodDate'
import RecruitmentTime from '#components/Post/RecruitmentTime'
import StyleWork from '#components/Post/StyleWork'
import SalaryType from '#components/Post/SalaryType'
import Description from '#components/Post/Description'
import PostImage from '#components/Post/PostImage'
import PostCategoryIds from '#components/Post/PostCategoryIds'
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost'
import './style.scss'

// import data
import postApi from 'api/postApi'
import { Form } from 'antd'

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
  images: string[]
}

interface IPostAddress {
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedProvince: React.Dispatch<React.SetStateAction<string>>
}

interface Option {
  id: string
  name: string
  image: string
  default_post_image: string
}

const Post: React.FC = () => {
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
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>('')
  const [selectedProvince, setSelectedProvince] = useState<string | null>('')
  const [typeJob, setTypeJob] = useState(1)
  const [isPeriodDate, setIsPeriodDate] = useState<number>(0)
  const [startTime, setStartTime] = React.useState<any>(dayjs('2023-01-01'))
  const [endTime, setEndTime] = React.useState<any>(dayjs('2023-01-30'))
  const [isWorkingWeekend, setIsWorkingWeekend] = React.useState<number>(0)
  const [isRemotely, setIsRemotely] = React.useState<number>(0)
  const [salary, setSalary] = React.useState<number[]>([0, 100000000])
  const [moneyType, setMoneyType] = React.useState<number>(0)
  const [salaryType, setSalaryType] = React.useState<number>(0)
  const [description, setDescription] = React.useState<string>('')
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [address, setAddress] = useState<string>('')
  const [wardId, setWardId] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  // modal
  const [openModalPost, setOpenModalPost] = React.useState(false)

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
      wardId: wardId,
      jobTypeId: typeJob,
      isDatePeriod: isPeriodDate,
      startTime,
      endTime,
      salaryMin: salary[0],
      salaryMax: salary[1],
      isWorkingWeekend,
      isRemotely,
      moneyType,
      salaryType,
      description,
      address,
      images: selectedImages,
      categoryIds: selectedOptions,

      // Các trường khác bạn muốn cập nhật tương tự
    }))
    if (formValues) createNewPost()
  }

  // post newPost
  const createNewPost = async () => {
    try {
      const areAllFieldsFilled = Object.values(formValues).every(
        (fieldValue) => fieldValue !== ''
      )
      if (areAllFieldsFilled) {
        console.log('cho phep submit')
        // const result = await postApi.createPost(formValues)
        // if (result) {
        //   setOpenModalPost(true)
        // }
      } else {
        console.log('Vui long nhap day du thong tin')
      }
    } catch (error) {
      console.error(error)
    }
  }
  console.log('form', formValues)

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
            setWardId={setWardId}
            wardId={wardId}
            setAddress={setAddress}
            address={address}
          />

          <PostImage
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />

          <PostTypeJob typeJob={typeJob} setTypeJob={setTypeJob} />
          <PostPeriodDate
            setIsPeriodDate={setIsPeriodDate}
            isPeriodDate={isPeriodDate}
          />
          <StyleWork
            isWorkingWeekend={isWorkingWeekend}
            isRemotely={isRemotely}
            setIsWorkingWeekend={setIsWorkingWeekend}
            setIsRemotely={setIsRemotely}
          />
          <RecruitmentTime
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
          {/* <Box sx={{ display: 'flex', marginTop: '24px' }}>
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
          </Box> */}

          <PostFilterSalary
            setSalary={setSalary}
            salary={salary}
            setMoneyType={setMoneyType}
            moneyType={moneyType}
          />

          <SalaryType salaryType={salaryType} setSalaryType={setSalaryType} />
          <PostCategoryIds
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <Description setDescription={setDescription} />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-submitForm"
          >
            Đăng
          </button>
        </form>
      </div>
      <ModalPost
        openModalPost={openModalPost}
        setOpenModalPost={setOpenModalPost}
      />
    </div>
  )
}

export default Post
