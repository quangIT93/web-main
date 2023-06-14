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
  // startTime: number
  // endTime: number
  // isWorkingWeekend: number
  // isRemotely: number
  // salaryMin: number
  // salaryMax: number
  // salaryType: number
  // moneyType: number
  jobTypeId: number | null
  // description: string
  // phoneNumber: string
  // email: string
  // categoryIds: string[]
  // images: string[]
  // // companyResourceId: string
  // url: null
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
    // startTime: new Date(2023, 0, 2, 0, 0).getTime(),
    // endTime: new Date(2023, 0, 2, 0, 0).getTime(),
    // isWorkingWeekend: 0,
    // isRemotely: 0,
    // salaryMin: 1000,
    // salaryMax: 1000,
    // salaryType: 1,
    // moneyType: 1,
    // description: '',
    // phoneNumber: '',
    // categories: [],
    // images: [],
    jobTypeId: null,
    // // companyResourceId: null,
    // url: null,
    // email: '',
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
  console.log('edit', editDataPosted)
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

            <EditPostImage editDataPosted={editDataPosted} />

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

            <EditStyleWork />

            <EditPostTime />

            <EditPostCategoryId />

            <EditPostFilterSalary />

            <EditSalaryType />

            <EditPostNumberPhone />

            <EditDescription />

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
