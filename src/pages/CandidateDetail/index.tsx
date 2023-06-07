import React, { useMemo, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// materi
import { Box, Typography } from '@mui/material'

import moment, { Moment } from 'moment'
import Card from '@mui/material/Card'
import { Space, Tooltip } from 'antd'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import {
  EnvironmentFilled,
  ClockCircleFilled,
  MessageOutlined,
} from '@ant-design/icons'

// import data// import api
import postApi from 'api/postApi'
import historyRecruiter from 'api/historyRecruiter'
// import component
import { StatePropsCloseSlider } from 'pages/Home'
import { useHomeState } from '../Home/HomeState'
import Footer from '../../components/Footer/index'

// import icon

// @ts-ignore
import { Navbar } from '#components'

import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { Button, Skeleton } from 'antd'

import ItemApply from '../../pages/Profile/components/Item'

import appplicationApi from 'api/appplication'

import './style.scss'
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

const CandidateDetail: React.FC = () => {
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
  const [dataPost, setDataPost] = useState<any>(null)
  const [dataCandidate, setDataCandidate] = useState<any>(null)
  const [statusApplication, setStatusApplication] = useState<number>(
    dataCandidate?.applicationProfile?.application_status
  )
  console.log('search')
  const getPostById = async () => {
    try {
      const postId = parseInt(searchParams.get('post-id') ?? '')
      const candidateId = parseInt(searchParams.get('application_id') ?? '')
      const result = await postApi.getById(postId)
      if (result) {
        setDataPost(result.data)
      }
      const detailCandidate = await historyRecruiter.GetAJobApplication(
        postId,
        candidateId
      )

      if (detailCandidate) {
        setDataCandidate(detailCandidate.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  console.log('data', dataPost)
  console.log('candidate', dataCandidate)
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getPostById().then(() => {
      if (isMounted) {
        setLoading(false)
      }
    })

    return () => {
      isMounted = false // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    }
  }, [])

  const handleClickPost = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dataPost: any
  ) => {
    console.log('click pi')
  }

  const handleClickReject = async () => {
    console.log('rejected appli')
    const candidateId = parseInt(searchParams.get('application_id') ?? '')
    try {
      const result = await appplicationApi.updateApplication(candidateId, 3)
      if (result) {
        setStatusApplication(3)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickApproved = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '')
    console.log('approved appli')
    try {
      const result = await appplicationApi.updateApplication(candidateId, 2)
      if (result) {
        console.log('Duyệt hồ sơ', result)
        setStatusApplication(2)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="candidate-detail">
      <Navbar {...statePropsCloseSlider} />
      <Box className="containerCandidate">
        <Skeleton loading={loading} active>
          <Card
            sx={{ background: '#D5EDFF', padding: '12px', margin: '8px 0' }}
            onClick={(e) => handleClickPost(e, dataPost)}
          >
            <Box
              sx={{
                minWidth: '100%',
                display: 'flex',
                padding: '12px',

                boxShadow: 'none',
                borderRadius: '5px',
              }}
            >
              <ImageListItem sx={{ flex: 1, display: 'flex' }}>
                <img
                  src={`${dataPost?.image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`aaa?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="anh job"
                  loading="lazy"
                  style={{
                    width: '120px',
                    maxWidth: 'auto',
                    height: '100%',
                    maxHeight: 150,
                    borderRadius: 10,
                  }}
                />
                <div
                  style={{ padding: '0', marginLeft: '12px' }}
                  className="div-cart-item-post"
                >
                  <Tooltip placement="top" title="àhakj">
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: '15px',
                        margin: 0,
                        fontWeight: 'bold',
                      }}
                    >
                      {dataPost?.company_name}
                    </Typography>
                  </Tooltip>
                  <Tooltip placement="top" title="j j  j jj">
                    <Typography
                      gutterBottom
                      variant="h1"
                      component="div"
                      sx={{ fontSize: '12px' }}
                    >
                      {dataPost?.title}
                    </Typography>
                  </Tooltip>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <EnvironmentFilled className="icon-cart-item-post" />
                    <Typography variant="body2" color="text.secondary">
                      {dataPost?.district}, {dataPost?.province}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ClockCircleFilled className="icon-cart-item-post" />
                    <Typography variant="body2" color="text.secondary">
                      {moment(dataPost?.start_time).format('HH:mm')} :{' '}
                      {moment(dataPost?.end_time).format('HH:mm')}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AttachMoneyIcon
                      sx={{
                        fontSize: 20,
                        marginLeft: '-2px',
                        marginRight: '2px',
                        color: '#575757',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {dataPost?.salary_min} - {dataPost?.salary_max}/
                      {dataPost?.salary_type}
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                    }}
                  >
                    <p
                      style={{
                        color: '#AAAAAA',
                        fontSize: 13,
                        fontStyle: 'italic',
                      }}
                    >
                      {dataPost?.created_at_text}
                    </p>
                  </div>
                </div>
              </ImageListItem>

              {/* <Space direction="vertical" align="center">
                <SubIcon />
              </Space> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  color: '#001424',
                  fontSize: 13,
                  fontStyle: 'italic',
                }}
              >
                Đã đăng vào: {moment(dataPost?.start_date).format('DD/MM/YY')}
              </p>
              {dataPost?.status === 1 ? (
                <p
                  style={{
                    background: '#0D99FF',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    color: '#ffffff',
                    marginLeft: '100px',
                  }}
                >
                  Đang tuyển
                </p>
              ) : dataPost?.status === 3 ? (
                <p
                  style={{
                    background: '#aaaaaa',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    color: '#ffffff',
                    marginLeft: '100px',
                  }}
                >
                  Đã đóng
                </p>
              ) : (
                <p
                  style={{
                    background: '#aaaaaa',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    color: '#ffffff',
                  }}
                >
                  Không chấp nhận
                </p>
              )}
            </Box>
          </Card>
          <Box sx={{ marginTop: '36px' }}>
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
                          // onClick={handleAvatarClick} // Xử lý click vào SmallAvatar
                          sx={{ cursor: 'pointer' }}
                        />

                        <input
                          id="avatar-input"
                          type="file"
                          name="images"
                          hidden
                          accept="image/*"
                          // onChange={handleImageChange}
                        />
                      </div>
                    }
                  >
                    <Avatar
                      style={{ height: '70px', width: '70px' }}
                      alt="Ảnh lỗi"
                      src={
                        dataCandidate?.applicationProfile?.avatar
                          ? dataCandidate?.applicationProfile?.avatar
                          : ''
                      }
                    />
                  </Badge>
                  <div style={{ marginLeft: '10px' }}>
                    <h2>
                      {dataCandidate?.applicationProfile?.name
                        ? dataCandidate?.applicationProfile?.name
                        : 'Chưa cập nhật'}
                    </h2>
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
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      ghost
                      icon={<MessageOutlined />}
                      style={{
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    ></Button>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: '#BD3131',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 8px',
                      }}
                      onClick={handleClickReject}
                    >
                      Từ chối hồ sơ
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: '#5CB365',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={handleClickApproved}
                    >
                      Duyệt hồ sơ
                    </Button>
                  </Box>
                </Box>
              </div>
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  marginTop: '20px',
                  color: '#575757',
                }}
              >
                {dataCandidate?.applicationProfile?.introduction
                  ? dataCandidate?.applicationProfile?.introduction
                  : 'Chưa cập nhật'}
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
              </div>
              <div className="info-detail">
                <div className="div-detail-row left">
                  <p>Ngày sinh</p>
                  <p>Giới tính</p>
                  <p>Địa điểm</p>
                </div>
                <div className="div-detail-row right">
                  <p>
                    {dataCandidate?.applicationProfile?.birthday
                      ? moment(
                          new Date(dataCandidate?.applicationProfile?.birthday)
                        ).format('DD/MM/yyyy')
                      : 'Chưa cập nhật'}
                  </p>
                  <p>
                    {dataCandidate?.applicationProfile?.gender
                      ? dataCandidate?.applicationProfile?.gender === 0
                        ? 'Nam'
                        : 'Nu'
                      : 'Nam'}
                  </p>
                  <p>
                    {dataCandidate?.applicationProfile?.address?.name
                      ? dataCandidate?.applicationProfile?.address?.name
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
              </div>
              <div className="info-detail">
                <div className="div-detail-row left">
                  <p>Số điện thoại</p>
                  <p>Email</p>

                  <p>Facebook</p>

                  <p>LinkedIn</p>
                </div>
                <div className="div-detail-row right">
                  <p>
                    {dataCandidate?.applicationProfile?.phone
                      ? dataCandidate?.applicationProfile?.phone
                      : 'Chưa cập nhật'}
                  </p>
                  <p>
                    {dataCandidate?.applicationProfile?.email
                      ? dataCandidate?.applicationProfile?.email
                      : 'Chưa cập nhật'}
                  </p>

                  <p>
                    {dataCandidate?.applicationProfile?.facebook
                      ? dataCandidate?.applicationProfile?.facebook
                      : 'Chưa cập nhật'}
                  </p>

                  <p>
                    {dataCandidate?.applicationProfile?.linkedin
                      ? dataCandidate?.applicationProfile?.linkedin
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
                <h3>Lĩnh vực quan tâm</h3>
              </div>
              <Space wrap className="item-info-work">
                {dataCandidate?.categories?.length !== 0
                  ? dataCandidate?.categories?.map(
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
              </div>
              <Space wrap className="item-info-work">
                {dataCandidate?.locations?.length !== 0
                  ? dataCandidate?.locations?.map(
                      (item: any, index: number) => (
                        <Button key={index} className="btn" type="text">
                          {item?.district}
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
                <h3>Trình độ học vấn</h3>
              </div>
              {dataCandidate?.educations?.length !== 0 ? (
                dataCandidate?.educations?.map(
                  (education: ItemAppy, index: number) => (
                    <ItemApply item={education} key={index} />
                  )
                )
              ) : (
                <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
              )}

              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              ></div>
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
              {dataCandidate?.experiences?.length !== 0 ? (
                dataCandidate?.experiences?.map((item: any, index: number) => (
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
              ></div>
            </div>
          </Box>
        </Skeleton>
      </Box>
      <Footer />
    </div>
  )
}

export default CandidateDetail
