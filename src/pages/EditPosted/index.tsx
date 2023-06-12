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

  const [dataPostById, setDataPostById] = useState<any>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const postId = parseInt(searchParams.get('postId') ?? '')

  console.log('idPost', postId)

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
      if (isMounted) {
        setLoading(false)
      }
    })
  }, [])

  console.log('dataPostById', dataPostById)

  const handleSubmit = () => {}
  return (
    <div className="edit-posted">
      <Navbar {...statePropsCloseSlider} />
      <div className="edit-posted_main">
        <h1>Chỉnh sửa bài đăng tuyển dụng</h1>
        <Skeleton loading={loading} active>
          <form action="">
            <EditPostJobCompany
              companyName={dataPostById?.company_name}
              title={dataPostById?.title}
            />

            <EditPostAddress province={dataPostById?.province_name} />

            <EditPostImage />

            <EditPostTypeJob />

            <EditPostPeriodDate />

            <EditRecruitmentTime />

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
