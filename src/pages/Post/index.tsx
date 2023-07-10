import React, { useState, FormEvent, useContext } from 'react'

import { toast } from 'react-toastify'
// @ts-ignore
import { Navbar } from '#components'
//@ts-ignore

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
// import PostCategoryIds from '#components/Post/PostCategoryIds'
import PostTime from '#components/Post/PostTime'
import EditText from '#components/Post/EditText'
import PostNumberPhone from '#components/Post/PostNumberPhone'

import PostCategoryId from '#components/Post/PostCategoryId'

import PostSalaryType from '#components/Post/PostSalaryType'

import Footer from '../../components/Footer/Footer'

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider'

import './style.scss'

// import data
import postApi from 'api/postApi'
import { Form, message } from 'antd'

const initPost = {
  title: '',
  companyName: '',
  provinceId: null,
  districtId: null,
  wardId: null,
  address: '',
  latitude: null,
  longitude: null,
  isDatePeriod: 0,
  startDate: null,
  endDate: null,
  startTime: new Date(1970, 0, 2, 0, 0).getTime(),
  endTime: new Date(1970, 0, 2, 0, 0).getTime(),
  isWorkingWeekend: 0,
  isRemotely: 0,
  salaryMin: 1000,
  salaryMax: 1000,
  salaryType: 1,
  moneyType: 1,
  description: '',
  phoneNumber: '',
  categories: [],
  images: [],
  jobTypeId: null,
  companyResourceId: null,
  url: '',
  email: '',
}

interface ICategoryIds {
  id: string
  name: string
}

export interface FormValues {
  title: string
  companyName: string
  provinceId: string | null
  districtId: string | null
  wardId: string | null
  address: string
  isDatePeriod: number
  startDate: number | null
  endDate: number | null
  latitude: number
  longitude: number
  startTime: number
  endTime: number
  isWorkingWeekend: number
  isRemotely: number
  salaryMin: number
  salaryMax: number
  salaryType: number
  moneyType: number
  jobTypeId: number | null
  description: string
  phoneNumber: string
  email: string
  categoryIds: string[]
  images: string[]
  // companyResourceId: string
  url: null
}

interface Option {
  id: string
  name: string
  image: string
  default_post_image: string
}

const Post: React.FC = () => {
  const { openCollapseFilter } = useContext(HomeValueContext)

  const formValues = {
    title: '',
    companyName: '',
    provinceId: null,
    districtId: null,
    wardId: null,
    address: '',
    latitude: null,
    longitude: null,
    isDatePeriod: 0,
    startDate: null,
    endDate: null,
    startTime: new Date(2023, 0, 2, 0, 0).getTime(),
    endTime: new Date(2023, 0, 2, 0, 0).getTime(),
    isWorkingWeekend: 0,
    isRemotely: 0,
    salaryMin: 1000,
    salaryMax: 1000,
    salaryType: 1,
    moneyType: 1,
    description: '',
    phoneNumber: '',
    categories: [],
    images: [],
    jobTypeId: null,
    // companyResourceId: null,
    url: null,
    email: '',
  }

  const [titleJob, setTitleJob] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')

  const [typeJob, setTypeJob] = useState(1)
  const [isPeriodDate, setIsPeriodDate] = useState<number>(1)
  const [startTime, setStartTime] = React.useState<any>(
    new Date(1970, 0, 2, 7, 0).getTime()
  )
  const [endTime, setEndTime] = React.useState<any>(
    new Date(1970, 0, 2, 17, 0).getTime()
  )
  const [startDate, setStartDate] = React.useState<any>(new Date().getTime())
  const [endDate, setEndDate] = React.useState<any>(new Date().getTime())
  const [isWorkingWeekend, setIsWorkingWeekend] = React.useState<number>(0)
  const [isRemotely, setIsRemotely] = React.useState<number>(0)
  const [salary, setSalary] = React.useState<number[]>([500000, 100000000])
  const [moneyType, setMoneyType] = React.useState<number>(1)
  const [salaryType, setSalaryType] = React.useState<number>(1)
  const [description, setDescription] = React.useState<string>('')
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [categoriesId, setCategoriesId] = useState<string[]>([])
  const [address, setAddress] = useState<string>('')
  const [wardId, setWardId] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const [latitude, SetLatitude] = useState<number>(10.761955)
  const [longitude, SetLongitude] = useState<number>(106.70183)
  const [salaryMin, setSalaryMin] = React.useState<number>(0)
  const [salaryMax, setSalaryMax] = React.useState<number>(0)
  // modal
  const [openModalPost, setOpenModalPost] = React.useState(false)
  // check error
  const [titleError, setTitleError] = useState(false)
  const [companyError, setCompanyError] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  // submit
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent
  ) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', titleJob)
    formData.append('companyName', companyName)
    formData.append('wardId', wardId)
    formData.append('jobTypeId', String(typeJob))
    formData.append('isDatePeriod', String(isPeriodDate))
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    formData.append('startTime', startTime)
    formData.append('endTime', endTime)
    formData.append('salaryMin', String(salaryMin.toString().replace(',', '')))
    formData.append('salaryMax', String(salaryMax).toString().replace(',', ''))
    formData.append('isWorkingWeekend', String(isWorkingWeekend))
    formData.append('isRemotely', String(isRemotely))
    formData.append('moneyType', String(moneyType))
    formData.append('salaryType', String(salaryType))
    formData.append('description', description.trim())
    formData.append('address', String(address))
    formData.append('phoneNumber', String(phoneNumber))

    categoriesId.forEach((category: any) => {
      formData.append('categoryIds', category)
    })

    selectedFiles.forEach((image: any) => {
      formData.append('images', image.image)
    })

    // NEW FIELD
    formData.append('email', formValues.email)
    // formData.append('companyResourceId', String(formValues.companyResourceId))
    // formData.append('url', Str1q 1q  1q  1q  1qing(formValues.url))
    formData.append('latitude', String(latitude))
    formData.append('longitude', String(longitude))

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`)
    // }

    if (formData) {
      createNewPost(formData)
    }
  }

  // valid values form data
  const validValue = () => {
    if (titleJob == '') {
      return {
        message: 'Vui lòng nhập tên công việc',
        checkForm: false,
      }
    }
    if (companyName == '') {
      return {
        message: 'Vui lòng nhập tên công ty',
        checkForm: false,
      }
    }
    if (address == '') {
      return {
        message: 'Vui lòng nhập dia chi',
        checkForm: false,
      }
    }
    if (wardId == '') {
      return {
        message: 'Vui lòng chọn tỉnh thành phố',
        checkForm: false,
      }
    }
    if (categoriesId.length <= 0) {
      return {
        message: 'Vui lòng chọn danh mục nghề nghiệp',
        checkForm: false,
      }
    }
    if (
      (Number(salaryMax) === 0 && salaryType !== 6) ||
      (Number(salaryMin) === 0 && salaryType !== 6)
    ) {
      return {
        message: 'Vui lòng nhập mức lương',
        checkForm: false,
      }
    }
    if (Number(salaryMax) < Number(salaryMin)) {
      return {
        message: 'Lương tối đa phải lớn hơn lương tối thiểu',
        checkForm: false,
      }
    }
    if (phoneNumber == '' || phoneNumber.length < 10) {
      return {
        message: 'Số điện thoại sai định dạng',
        checkForm: false,
      }
    }
    if (description == '') {
      return {
        message: 'Vui lòng nhập mô tả công việc',
        checkForm: false,
      }
    }

    return {
      message: '',
      checkForm: true,
    }
  }

  // post newPost
  const createNewPost = async (formData: any) => {
    // valid value form data
    const { message, checkForm } = validValue()
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          const result = await postApi.createPost(formData)
          if (result) {
            setOpenModalPost(true)
          }
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        })
      }
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <div className="post">
      <Navbar />

      {contextHolder}
      <div className="post-main">
        <h1>Tạo bài đăng tuyển dụng</h1>
        <form onSubmit={handleSubmit}>
          <PostJobCompany
            setTitleJob={setTitleJob}
            setCompanyName={setCompanyName}
            titleError={titleError}
            companyError={companyError}
          />
          <PostAddress
            setWardId={setWardId}
            setAddress={setAddress}
            address={address}
          />
          <PostImage
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
          <PostTypeJob typeJob={typeJob} setTypeJob={setTypeJob} />
          <PostPeriodDate
            setIsPeriodDate={setIsPeriodDate}
            isPeriodDate={isPeriodDate}
          />
          {isPeriodDate === 1 ? (
            <RecruitmentTime
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          ) : (
            <></>
          )}
          <StyleWork
            isWorkingWeekend={isWorkingWeekend}
            isRemotely={isRemotely}
            setIsWorkingWeekend={setIsWorkingWeekend}
            setIsRemotely={setIsRemotely}
          />
          <PostTime
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />

          <PostCategoryId
            setCategoriesId={setCategoriesId}
            categoriesId={categoriesId}
          />

          <SalaryType salaryType={salaryType} setSalaryType={setSalaryType} />

          <PostSalaryType
            setMoneyType={setMoneyType}
            moneyType={moneyType}
            salaryType={salaryType}
          />

          <PostFilterSalary
            salaryMin={salaryMin}
            setSalaryMin={setSalaryMin}
            salaryMax={salaryMax}
            setSalaryMax={setSalaryMax}
            salaryType={salaryType}
          />

          <PostNumberPhone
            phone={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          <Description setDescription={setDescription} />
          {/* <EditText /> */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-submitForm"
          >
            Đăng
          </button>
        </form>
      </div>
      <Footer />
      <ModalPost
        openModalPost={openModalPost}
        setOpenModalPost={setOpenModalPost}
      />
    </div>
  )
}

export default Post
