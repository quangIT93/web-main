import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

// @ts-ignore
import { Navbar } from '#components'
import { StatePropsCloseSlider } from 'pages/Home'
import { useHomeState } from '../Home/HomeState'
import './style.scss'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { Button, Space, Skeleton } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

import { RootState } from '../../store/reducer/index'

import Footer from '../../components/Footer/index'
import ItemApply from './components/Item'

import ModalProfileInfoPerson from '#components/Profile/ModalProfileInfoPerson'
import ModalProfileCareerObjectice from '#components/Profile/ModalProfileCareerObjectice'
import ModalProfileContact from '#components/Profile/ModalProfileContact'
import ModalProfileEducationCreate from '#components/Profile/ModalProfileEducationCreate'
import ModalProfileLocation from '#components/Profile/ModalProfileLocation'
import ModalProfileExperienceUpdate from '#components/Profile/ModalProfileExperienceUpdate'
import ModalProfileExperienceCreate from '#components/Profile/ModalProfileExperienceCreate'
import ModalProfileEducationUpdate from '#components/Profile/ModalProfileEducationUpdate'
// import data
import {
  getProfile,
  resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer'
import profileApi from 'api/profileApi'

import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
  backgroundColor: 'white',
}))

interface ItemAppy {
  id?: number | null
  company_name?: string
  major?: string
  start_date?: number
  end_date?: number
  extra_information?: string
  title?: string
}

interface ICategories {
  child_category_id: number
  parent_category_id: number
  parent_category: string
  child_category: string
}
const Profile: React.FC = () => {
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
  const dispatch = useDispatch()
  const dataTest = {
    code: 200,
    success: true,
    data: {
      id: 'a9e5bc4d-823f-4acc-9356-f9e53c611eaf',
      name: 'Nguyen The Truong',
      birthday: '2001-06-09T17:00:00.000Z',
      address: {
        id: 225,
        name: 'Hải Dương',
      },
      gender: 1,
      introduction: 'My intro',
      phone: '0919004743',
      email: 'truong@gmail.com',
      avatar:
        'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/1a635477-97a2-4d53-80c5-c56be5729fe5-hou-china-6.jpg',
      facebook: 'facebook.com',
      linkedin: 'linkedin.com',
      categories: [
        {
          child_category_id: 25,
          child_category: 'Hiệu chỉnh',
          parent_category_id: 1,
          parent_category: 'Công việc giấy tờ, sổ sách',
        },
      ],
      locations: [
        {
          district_id: 1451,
          district: 'Quận 9',
          province_id: 202,
          province: 'Hồ Chí Minh',
        },
        {
          district_id: 1655,
          district: 'Thành phố Bạc Liêu',
          province_id: 200,
          province: 'Bạc Liêu',
        },
      ],
      educations: [
        {
          id: 5,
          company_name: 'TDT University - Vietnam',
          major: 'Computer Science',
          start_date: '2019-09-09T17:00:00.000Z',
          end_date: '2023-06-11T17:00:00.000Z',
          extra_information: 'Nothing to tell',
        },
        {
          id: 5,
          company_name: 'TDT University - Vietnam',
          major: 'Computer Science',
          start_date: '2019-09-09T17:00:00.000Z',
          end_date: '2023-06-11T17:00:00.000Z',
          extra_information: 'Nothing to tell',
        },
      ],
      experiences: [
        {
          id: 3,
          title: 'Student',
          company_name: 'TDT University',
          start_date: '2019-09-09T17:00:00.000Z',
          end_date: '2023-06-11T17:00:00.000Z',
          extra_information: 'Nothing to tell',
        },
        {
          id: 3,
          title: 'Student',
          company_name: 'TDT University',
          start_date: '2019-09-09T17:00:00.000Z',
          end_date: '2023-06-11T17:00:00.000Z',
          extra_information: 'Nothing to tell',
        },
      ],
    },
    message: 'Successfully',
  }

  // const [dataProfile, setDataProfile] = useState(null)

  const { profile, error }: any = useSelector(
    (state: RootState) => state.profile
  )

  useEffect(() => {
    // Gọi action để lấy thông tin profile
    setLoading(true)
    dispatch<any>(getProfile())
      .unwrap()
      .catch((err: any) => {
        console.log('Error:', err)
      })
    console.log('Error:')
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  const [openModelPersonalInfo, setOpenModalPersonalInfo] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)
  const [openModalCareerObjective, setOpenModalCareerObjective] =
    useState(false)
  const [openModalLocation, setOpenModalLocation] = useState(false)
  const [openModalEducationCreate, setOpenModalEducationCreate] =
    useState(false)

  const [openModalExperienceCreate, setOpenModalExperienceCreate] =
    useState(false)
  const [imageInfo, setImageInfo] = useState<string>('')
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const handleAvatarClick = () => {
    // Khi click vào SmallAvatar, thực hiện hành động tương ứng
    const fileInput = document.getElementById('avatar-input')
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleImageChange = async (e: any) => {
    // const file = e.target.files[0]
    const files = Array.from(e.target.files) // Chuyển đổi FileList thành mảng các đối tượng file
    if (files) {
      const imageUrl = await uploadImage(e, files)
      // Cập nhật URL của ảnh mới vào trạng thái của component
      setAvatarUrl(imageUrl)
    }
  }
  const uploadImage = async (e: any, files: any) => {
    const formData = new FormData()

    files.forEach((file: File) => {
      if (file instanceof File) {
        formData.append(`images`, file)
      }
    })
    try {
      const response = await profileApi.postAvatar(formData)

      if (response) {
        dispatch(getProfile() as any)

        return profile.avatar
      } else {
        throw new Error('Failed to upload image')
      }
    } catch (error) {
      console.error(error)
      // Xử lý lỗi tải lên ảnh
    }
  }
  // console.log('profile', profile)

  const alert = useSelector((state: any) => state.alertProfile.alert)
  const handleClose = () => dispatch<any>(setAlert(false))
  // console.log('alert', alert)
  return (
    <div className="profile">
      <Navbar {...statePropsCloseSlider} />

      <div className="container">
        <Skeleton loading={loading} active>
          <div className="div-profile-avatar">
            <div className="div-avatar">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <div style={{ position: 'relative' }}>
                      <SmallAvatar
                        alt="Remy Sharp"
                        src="/logoH2.png"
                        sizes="10"
                        onClick={handleAvatarClick} // Xử lý click vào SmallAvatar
                        sx={{ cursor: 'pointer' }}
                      />

                      <input
                        id="avatar-input"
                        type="file"
                        name="images"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  }
                >
                  <Avatar
                    style={{ height: '70px', width: '70px' }}
                    alt="Ảnh lỗi"
                    src={profile?.avatar ? profile?.avatar : ''}
                  />
                </Badge>
                <div style={{ marginLeft: '10px' }}>
                  <h2>{profile?.name ? profile?.name : 'Chưa cập nhật'}</h2>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '5px',
                    }}
                  >
                    <img src="/images/profile/HiCoin.png" alt="ảnh" />
                    <p style={{ marginLeft: '5px' }}>0</p>
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                style={{ backgroundColor: '#FBBC04' }}
              >
                HiCoin
              </Button>
            </div>
            <div
              style={{
                whiteSpace: 'pre-wrap',
                marginTop: '20px',
                color: '#575757',
              }}
            >
              {profile?.introduction ? profile?.introduction : 'Chưa cập nhật'}
            </div>
          </div>
          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h3>Thông tin cá nhân</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalPersonalInfo(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />

                <p
                  style={{
                    color: '#0D99FF',
                    fontSize: '14px',
                  }}
                >
                  Sửa
                </p>
              </Space>
            </div>
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>Ngày sinh</p>
                <p>Giới tính</p>
                <p>Địa điểm</p>
              </div>
              <div className="div-detail-row right">
                <p>
                  {profile?.birthday
                    ? moment(new Date(profile?.birthday)).format('DD/MM/yyyy')
                    : 'Chưa cập nhật'}
                </p>
                <p>
                  {profile?.gender
                    ? profile?.gender === 0
                      ? 'Nam'
                      : 'Nu'
                    : 'Nam'}
                </p>
                <p>
                  {profile?.address?.name
                    ? profile?.address?.name
                    : 'Chưa cập nhật'}
                </p>
              </div>
            </div>
          </div>

          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h3>Thông tin liên hệ</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalContact(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Sửa</p>
              </Space>
            </div>
            <div className="info-detail">
              <div className="div-detail-row left">
                <p>Số điện thoại</p>
                <p>Email</p>

                <p>Facebook</p>

                <p>LinkedIn</p>
              </div>
              <div className="div-detail-row right">
                <p>{profile?.phone ? profile?.phone : 'Chưa cập nhật'}</p>
                <p>{profile?.email ? profile?.email : 'Chưa cập nhật'}</p>

                <p>{profile?.facebook ? profile?.facebook : 'Chưa cập nhật'}</p>

                <p>{profile?.linkedin ? profile?.linkedin : 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>

          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h3>Lĩnh vực quan tâm</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalCareerObjective(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Sửa</p>
              </Space>
            </div>
            <Space wrap className="item-info-work">
              {profile?.categories?.length !== 0
                ? profile?.categories.map(
                    (item: ICategories, index: number) => (
                      <Button key={index} className="btn" type="text">
                        {item.child_category}
                      </Button>
                    )
                  )
                : 'Chưa cập nhật'}
            </Space>
          </div>
          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h3>Khu vực làm việc</h3>
              <Space
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenModalLocation(true)}
              >
                <img src="/images/profile/pen.png" alt="ảnh" />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Sửa</p>
              </Space>
            </div>
            <Space wrap className="item-info-work">
              {profile?.locations?.length !== 0
                ? profile?.locations.map((item: any, index: number) => (
                    <Button key={index} className="btn" type="text">
                      {item?.district}
                    </Button>
                  ))
                : 'Chưa cập nhật'}
            </Space>
          </div>

          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h3>Trình độ học vấn</h3>
            </div>
            {profile?.educations?.length !== 0 ? (
              profile?.educations?.map((education: ItemAppy, index: number) => (
                <ItemApply item={education} key={index} />
              ))
            ) : (
              <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
            )}

            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenModalEducationCreate(true)}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Them</p>
              </Space>
            </div>
          </div>

          <div className="div-profile-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h3>Kinh nghiệm làm việc</h3>
            </div>
            {profile?.experiences?.length !== 0 ? (
              profile?.experiences?.map((item: any, index: number) => (
                <ItemApply typeItem="experiences" key={index} item={item} />
              ))
            ) : (
              <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
            )}

            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenModalExperienceCreate(true)}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>Them</p>
              </Space>
            </div>
          </div>
          <ModalProfileInfoPerson
            openModelPersonalInfo={openModelPersonalInfo}
            setOpenModalPersonalInfo={setOpenModalPersonalInfo}
            profile={profile}
          />

          <ModalProfileContact
            openModalContact={openModalContact}
            setOpenModalContact={setOpenModalContact}
            profile={profile}
          />
          <ModalProfileCareerObjectice
            openModalCareerObjective={openModalCareerObjective}
            setOpenModalCareerObjective={setOpenModalCareerObjective}
            categories={profile?.categories}
          />

          <ModalProfileEducationCreate
            openModalEducationCreate={openModalEducationCreate}
            setOpenModalEducationCreate={setOpenModalEducationCreate}
            typeItem="createEducation"
            educations={profile?.educations}
          />
          <ModalProfileLocation
            openModalLocation={openModalLocation}
            setOpenModalLocation={setOpenModalLocation}
            locations={profile?.locations}
          />

          <ModalProfileExperienceCreate
            openModalExperienceCreate={openModalExperienceCreate}
            setOpenModalExperienceCreate={setOpenModalExperienceCreate}
            typeItem="createExperience"
            educations={profile?.educations}
          />
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
              open={alert}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                Bạn đã xoá thông tin thành công!
              </Alert>
            </Snackbar>
          </Stack>
        </Skeleton>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
