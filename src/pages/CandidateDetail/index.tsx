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

import Footer from '../../components/Footer/index'
import 'intl'
import 'intl/locale-data/jsonp/en'

// import icon

// @ts-ignore
import { Navbar } from '#components'

import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { Button, Skeleton } from 'antd'

import ItemApply from '../../pages/Profile/components/Item'
// import component
import RejectedApplication from '#components/CandidateDetail/RejectedApplication'
import SeenApplication from '#components/CandidateDetail/SeenApplication'
import ApprovedApplication from '#components/CandidateDetail/ApprovedApplication'
import RecuitApplication from '#components/CandidateDetail/RecuitApplication'
import CVItem from '#components/Profile/CV'
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
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [dataPost, setDataPost] = useState<any>(null)
  const [dataCandidate, setDataCandidate] = useState<any>(null)
  const [statusApplication, setStatusApplication] = useState<number>(
    // 1
    dataCandidate?.applicationProfile?.application_status
  )
  const [open, setOpen] = useState(false)
  console.log('search')
  // when dataCandidate changed, statusApplication change
  useEffect(() => {
    if (dataCandidate) {
      setStatusApplication(
        dataCandidate?.applicationProfile?.application_status
      )
    }
  }, [dataCandidate])
  const getPostById = async () => {
    try {
      const postId = parseInt(searchParams.get('post-id') ?? '')
      const candidateId = searchParams.get('application_id') ?? ''
      const result = await postApi.getById(postId)
      console.log(result, 'search')

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
  console.log('candidateStatus', statusApplication)
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

  const SeenApply = useMemo(() => {
    if (statusApplication === 1 || statusApplication === 0) {
      return <SeenApplication setStatusApplication={setStatusApplication} />
    }
    return null
  }, [statusApplication, setStatusApplication])

  const ApprovedApply = useMemo(() => {
    if (statusApplication === 2) {
      return <ApprovedApplication setStatusApplication={setStatusApplication} />
    }
    return null
  }, [statusApplication, setStatusApplication])

  const RejectedApply = useMemo(() => {
    if (statusApplication === 3) {
      return <RejectedApplication />
    }
    return null
  }, [statusApplication, setStatusApplication])

  const RecruitApply = useMemo(() => {
    if (statusApplication === 4) {
      return <RecuitApplication />
    }
    return null
  }, [statusApplication, setStatusApplication])

  return (
    <div className="candidate-detail">
      <Navbar />
      <Box className="containerCandidate">
        <Skeleton loading={loading} active>
          <Card
            sx={{
              background: '#D5EDFF',
              padding: '12px',
              margin: '8px 0',
              display: 'flex',
              justifyContent: 'space-between',
              minWidth: '100%',
              borderRadius: '5px',
            }}
            onClick={(e) => handleClickPost(e, dataPost)}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'none',
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
                        fontSize: '18px',
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
                      {new Intl.NumberFormat('en-US').format(
                        dataPost?.salary_min
                      )}
                      {` ${dataPost?.money_type_text} `}-{' '}
                      {new Intl.NumberFormat('en-US').format(
                        dataPost?.salary_max
                      ) +
                        ` ${dataPost?.money_type_text} ` +
                        `/${dataPost?.salary_type}`}
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
                      fontStyle: 'italic',
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
                      fontStyle: 'italic',
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
                      fontStyle: 'italic',
                    }}
                  >
                    Không chấp nhận
                  </p>
                )}
              </Box>
            </Box>
            <Space
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'space-between',
                justifyContent: 'space-between',
              }}
              direction="vertical"
              align="center"
            >
              {/* <BookmarkBorderOutlinedIcon sx={{ top: 0, right: 0 }} /> */}
              <img
                className="img-resource-company"
                src={dataPost?.resource.company_icon}
                alt="anh icon"
              />
              <p
                style={{ fontSize: 13, fontStyle: 'italic', padding: '4px 0' }}
              >
                {dataPost?.job_type.job_type_name}
              </p>
            </Space>
          </Card>
          <p
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Hồ sơ ứng viên
          </p>
          <Box sx={{ marginTop: '10px' }}>
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
                  >
                    <Avatar
                      style={{ height: '70px', width: '70px' }}
                      alt="U"
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
                      onClick={() =>
                        window.open(
                          `/message?post_id=${searchParams.get(
                            'post-id'
                          )}&user_id=${
                            dataCandidate.applicationProfile.account_id
                          }&application_id=${searchParams.get(
                            'application_id'
                          )} `,
                          '_blank'
                        )
                      }
                    ></Button>
                    {ApprovedApply}
                    {RejectedApply}
                    {SeenApply}
                    {RecruitApply}
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
                <h3>CV/ Resume</h3>
              </div>
              <Space wrap className="item-info-work">
                {dataCandidate?.applicationProfile?.cv_url ? (
                  <CVItem
                    url={dataCandidate?.applicationProfile?.cv_url}
                    open={open}
                    setOpen={setOpen}
                    isProfile={false}
                  />
                ) : (
                  <>Chưa cập nhật</>
                )}
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
