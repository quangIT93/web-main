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
import { useSearchParams } from 'react-router-dom'
import { Skeleton } from 'antd'
import { Col, Row } from 'antd'

// import data
import historyRecruiter from 'api/historyRecruiter'
import DetailPosted from './DetailPosted'

interface ICardsApplied {
  activeChild: string
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>
  showDetailPosted: boolean
}

const CardsPosted: React.FC<ICardsApplied> = (props) => {
  const { activeChild, setShowDetailPosted, showDetailPosted } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [dataPosted, setDataPosted] = useState<any>(null)
  const [newOld, setnewOld] = React.useState('Mới nhất')

  const [detailPosted, setDetailPosted] = React.useState<any>(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [count, setCount] = useState(7)
  const getAllPosted = async () => {
    try {
      const result = await historyRecruiter.getAllPosted(0, count)
      console.log('result', result)

      if (result) {
        setDataPosted(result.data)
        console.log('result', result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getAllPosted().then(() => {
      if (isMounted) {
        setLoading(false)
      }
    })

    return () => {
      isMounted = false // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    }
  }, [])

  const handleChange = (event: any) => {
    setnewOld(event.target.value)
  }
  console.log('dataPosted', dataPosted)

  const handleShowDetail = (posted: any) => {
    setShowDetailPosted(true)
    setDetailPosted(posted)
  }

  // click Button
  const handleAddItem = async () => {
    console.log('handleClick bUTTO')
    const newCount = count + 6
    setCount(newCount)
    try {
      const result = await historyRecruiter.getAllPosted(0, newCount)
      console.log('result', result)
      if (result) {
        setDataPosted(result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  console.log('searchParam', searchParams.get('threshold'))
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
          }}
        >
          {dataPosted?.length} công việc đã đăng tuyển {activeChild}
        </Typography>
        <TextField
          select
          id="sex"
          value={newOld}
          onChange={handleChange}
          variant="outlined"
          placeholder="Giới tính"
          size="small"
          sx={{ width: '120px' }}
        >
          <MenuItem value="Mới nhất">Mới nhất</MenuItem>
          <MenuItem value="Cũ nhất">Cũ nhất</MenuItem>
        </TextField>
      </Box>
      {!showDetailPosted ? (
        <Box>
          <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
            <Skeleton loading={loading} active>
              {dataPosted?.map((posted: any, i: number) => (
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
                  onClick={(e) => handleShowDetail(posted)}
                  key={i}
                >
                  <ImageListItem sx={{ flex: 1, display: 'flex' }}>
                    <img
                      src={`${posted.image}?w=164&h=164&fit=crop&auto=format`}
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
                          {posted.company_name}
                        </Typography>
                      </Tooltip>
                      <Tooltip placement="top" title="j j  j jj">
                        <Typography
                          gutterBottom
                          variant="h1"
                          component="div"
                          sx={{ fontSize: '12px' }}
                        >
                          {posted.title}
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
                          {posted.district}, {posted.province}
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
                          {moment(dataPosted?.start_time).format('HH:mm')} :{' '}
                          {moment(dataPosted?.end_time).format('HH:mm')}
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
                          {posted.salary_min} - {posted.salary_max}/
                          {posted.salary_type}
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
                          {posted.created_at_text}
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
                      src={posted.resource.company_icon}
                      alt="anh icon"
                    />
                    <p style={{ fontSize: 13, fontStyle: 'italic' }}>
                      {posted.job_type.job_type_name}
                    </p>
                  </Space>
                </Card>
              ))}
            </Skeleton>
          </Grid>
          <Box
            sx={{
              margin: '12px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button variant="contained" onClick={handleAddItem}>
              Xem thêm
            </Button>
          </Box>
        </Box>
      ) : (
        <DetailPosted detailPosted={detailPosted} />
      )}
    </>
  )
}

export default CardsPosted
