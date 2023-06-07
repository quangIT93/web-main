import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Space, Tooltip } from 'antd'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Box, Typography, MenuItem, TextField, Button } from '@mui/material'
import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons'

import { Skeleton } from 'antd'
import { Col, Row } from 'antd'

// import data
import historyRecruiter from 'api/historyRecruiter'

// impport Icon
import PersonIcon from '@mui/icons-material/Person'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import './styles.scss'

interface IDetailPosted {
  detailPosted: any
}

const DetailPosted: React.FC<IDetailPosted> = (props) => {
  const { detailPosted } = props
  const [dataCandidates, setDadaCandidates] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getAllCandidates = async () => {
    try {
      const result = await historyRecruiter.GetAllApplicationsOfAJob(
        detailPosted.post_id,
        10,
        0
      )
      console.log('result', result)
      if (result) {
        setDadaCandidates(result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getAllCandidates().then(() => {
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
    detailPosted: any
  ) => {
    console.log('detailPosted', detailPosted)
  }

  const handleClickCandidate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    applicationId: number,
    postId: number
  ) => {
    // console.log('applicationId', applicationId)
    window.open(
      `/candidate-detail?post-id=${postId}&application_id=${applicationId}`
    )
  }

  return (
    <Box>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px',
          cursor: 'pointer',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          margin: '8px 0',
        }}
        onClick={(e) => handleClickPost(e, detailPosted)}
      >
        <ImageListItem sx={{ flex: 1, display: 'flex' }}>
          <img
            src={`${detailPosted?.image}?w=164&h=164&fit=crop&auto=format`}
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
                {detailPosted?.company_name}
              </Typography>
            </Tooltip>
            <Tooltip placement="top" title="j j  j jj">
              <Typography
                gutterBottom
                variant="h1"
                component="div"
                sx={{ fontSize: '12px' }}
              >
                {detailPosted?.title}
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
                {detailPosted?.district}, {detailPosted?.province}
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
                {moment(detailPosted?.start_time).format('HH:mm')} :{' '}
                {moment(detailPosted?.end_time).format('HH:mm')}
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
                {detailPosted?.salary_min} - {detailPosted?.salary_max}/
                {detailPosted?.salary_type}
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
                {detailPosted?.created_at_text}
              </p>
            </div>
          </div>
        </ImageListItem>

        <Space
          style={{ justifyContent: 'space-between' }}
          direction="vertical"
          align="center"
        >
          <BookmarkBorderOutlinedIcon sx={{ top: 0, right: 0 }} />
          <img
            className="img-resource-company"
            src={detailPosted?.resource.company_icon}
            alt="anh icon"
          />
          <p style={{ fontSize: 13, fontStyle: 'italic' }}>
            {detailPosted?.job_type.job_type_name}
          </p>
        </Space>
      </Card>
      <Box>
        <h3 style={{ margin: '12px 0' }}>
          Những người đã ứng tuyển ({dataCandidates?.applications.length})
        </h3>
        {dataCandidates?.applications.map((candidate: any, index: number) => (
          <Card
            sx={{
              minWidth: '100%',
              display: 'flex',
              padding: '12px',
              cursor: 'pointer',
              '&:hover': {
                background: '#E7E7ED',
                transition: 'all 0.3s linear',
              },
              boxShadow: 'none',
              borderRadius: '5px',
              margin: '8px 0',
            }}
            onClick={(e) =>
              handleClickCandidate(e, candidate.id, detailPosted.id)
            }
          >
            <div className="image-cadidate_wrap">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="image-cadidate"
              />
            </div>
            <Box sx={{ marginLeft: '12px' }}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginLeft: '12px' }}
              >
                {candidate.name}
              </Typography>
              <div className="item-candidate">
                <PersonIcon fontSize="small" className="icon-candidate" />
                <p>
                  {candidate.gender === 0 ? 'Nam' : 'Nữ'} -{' '}
                  {moment(candidate.birthday).format('DD/MM/YYYY')}
                </p>
              </div>
              <div className="item-candidate">
                <LocationOnIcon fontSize="small" className="icon-candidate" />
                <p>{candidate.province_name}</p>
              </div>
              <div className="item-candidate">
                <BusinessCenterIcon
                  fontSize="small"
                  className="icon-candidate"
                />
                <p>
                  Lĩnh vực quan tâm:
                  {candidate.categories.map((candid: any, index: number) => (
                    <span key={index}> {candid.child_category}, </span>
                  ))}
                </p>
              </div>
            </Box>
          </Card>
        ))}
        <Box
          sx={{
            margin: '12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained">Xem thêm</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default DetailPosted
