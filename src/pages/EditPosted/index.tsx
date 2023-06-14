import React, { useEffect, useState } from 'react'
import { useHomeState } from '../Home/HomeState'
import { useSearchParams } from 'react-router-dom'

import { Skeleton } from 'antd'

// import component
// @ts-ignore
import { Navbar } from '#components'
import { StatePropsCloseSlider } from 'pages/Home'
import EditPostJobCompany from '#components/EditPosted/EditPostJobCompany'
import EditPostAddress from '#components/EditPosted/EditPostAddress'
import EditPostImage from '#components/EditPosted/EditPostImage'
import EditPostTypeJob from '#components/EditPosted/EditPostTypeJob'
import EditPostPeriodDate from '#components/EditPosted/EditPostPeriodDate'
import EditRecruitmentTime from '#components/EditPosted/EditRecruitmentTime'
import EditStyleWork from '#components/EditPosted/EditStyleWork'
import EditPostTime from '#components/EditPosted/EditPostTime'
import EditPostCategoryId from '#components/EditPosted/EditPostCategoryId'
import EditSalaryType from '#components/EditPosted/EditSalaryType'
import EditPostFilterSalary from '#components/EditPosted/EditPostFilterSalary'
import EditPostNumberPhone from '#components/EditPosted/EditPostNumberPhone'
import EditDescription from '#components/EditPosted/EditDescription'

import './style.scss'

// inport Api
import postApi from 'api/postApi'
import { ConsoleSqlOutlined } from '@ant-design/icons'

export interface FormValues {
  title: string
  company_name: string
  // provinceId: string | null
  // districtId: string | null
  ward_id: string | null
  address: string
  isDatePeriod: number
  startDate: number | null
  endDate: number | null
  // latitude: number
  // longitude: number
  startTime: number
  endTime: number
  isWorkingWeekend: number
  isRemotely: number
  salaryMin: number
  salaryMax: number
  moneyType: number
  salaryType: number
  jobTypeId: number | null
  description: string
  // phoneNumber: string
  // email: string
  categoryIds: string[]
  images: string[]
  // // companyResourceId: string
  // url: null
  deletedImages: any[]
}

const EditPosted = () => {
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

  const [loading, setLoading] = useState<boolean>(true)

  const [searchParams, setSearchParams] = useSearchParams()

  const [dataPostById, setDataPostById] = useState<any>(null)

  const [formValues, setFormValues] = useState<any>({
    title: '',
    company_name: '',
    // provinceId: null,
    // districtId: null,
    ward_id: null,
    address: '',
    // latitude: null,
    // longitude: null,
    isDatePeriod: 0,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    isWorkingWeekend: 0,
    isRemotely: 0,
    salaryMin: 1000,
    salaryMax: 1000,
    moneyType: 1,
    salaryType: 1,
    description: '',
    // phoneNumber: '',
    categoryIds: [],
    images: [],
    jobTypeId: null,
    // // companyResourceId: null,
    // url: null,
    // email: '',
    deletedImages: [],
  })

  const [editDataPosted, setEditDataPosted] = useState<FormValues | null>(
    formValues
  )
  const postId = parseInt(searchParams.get('postId') ?? '')

  useEffect(() => {
    if (dataPostById) {
      setFormValues((prevFormValues: any) => ({
        ...prevFormValues,
        isDatePeriod: dataPostById.is_date_period,
        address: dataPostById.address,
        company_name: dataPostById.company_name,
        title: dataPostById.title,
        ward_id: dataPostById.ward_id,
        jobTypeId: dataPostById.job_type.job_type_id,
        endDate: dataPostById.end_date,
        startDate: dataPostById.start_date,
        startTime: dataPostById.start_time,
        endTime: dataPostById.end_time,
        categoryIds: dataPostById.categories.map(
          (cata: any) => cata.child_category_id
        ),
        salaryMax: dataPostById.salary_max,

        salaryMin: dataPostById.salary_min,

        moneyType: dataPostById.money_type,

        salaryType: dataPostById.salary_type_id,

        phoneNumber: dataPostById.phone_contact.replace('+84', '0'),

        description: dataPostById.description,

        images: [],

        deletedImages: [],
      }))
    }
  }, [dataPostById])

  React.useEffect(() => {
    setEditDataPosted(formValues)
  }, [formValues])

  const getDataPosted = async () => {
    try {
      const result = await postApi.getPostbyId(postId)
      if (result) {
        setDataPostById(result.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    let isMounted = true
    setLoading(true)
    getDataPosted().then(() => {
      if (isMounted && editDataPosted) {
        setLoading(false)
      }
    })
  }, [])

  const handleSubmit = () => {}
  console.log('dataPostById', dataPostById)
  console.log('editDataPosted', editDataPosted)

  return (
    <div className="edit-posted">
      <Navbar {...statePropsCloseSlider} />
      <div className="edit-posted_main">
        <h1>Chỉnh sửa bài đăng tuyển dụng</h1>
        <Skeleton loading={loading} active>
          <form action="">
            <EditPostJobCompany
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />

            <EditPostAddress
              dataPostById={dataPostById}
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />

            <EditPostImage
              editDataPosted={editDataPosted}
              setEditDataPosted={setEditDataPosted}
              dataPosted={dataPostById?.images}
            />

            <EditPostTypeJob
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />

            <EditPostPeriodDate
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />
            {editDataPosted?.isDatePeriod === 1 ? (
              <EditRecruitmentTime
                setEditDataPosted={setEditDataPosted}
                editDataPosted={editDataPosted}
              />
            ) : (
              <></>
            )}
            {editDataPosted?.startTime ? (
              <EditStyleWork
                setEditDataPosted={setEditDataPosted}
                editDataPosted={editDataPosted}
              />
            ) : (
              <></>
            )}

            <EditPostTime
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />
            {editDataPosted?.categoryIds?.length != 0 && dataPostById ? (
              <EditPostCategoryId
                setEditDataPosted={setEditDataPosted}
                editDataPosted={editDataPosted}
                dataPost={dataPostById?.categories}
              />
            ) : (
              <></>
            )}

            <EditPostFilterSalary
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />

            <EditSalaryType
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />

            <EditPostNumberPhone
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />

            <EditDescription
              setEditDataPosted={setEditDataPosted}
              editDataPosted={editDataPosted}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-edit_submitForm"
            >
              Đăng
            </button>
          </form>
        </Skeleton>
      </div>
    </div>
  )
}

export default EditPosted
