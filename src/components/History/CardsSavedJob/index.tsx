import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Space, Tooltip, message } from 'antd'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Box, Typography, MenuItem, TextField, Button } from '@mui/material'
import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons'

import { Skeleton } from 'antd'
import { Col, Row } from 'antd'

// import data
import historyBookmark from 'api/historyBookmark'

interface ICardsApplied {
  activeChild: string
}

const CardsSavedJob: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [dataBookmarks, setDataBookmarks] = useState<any>(null)
  const [newOld, setnewOld] = React.useState('Mới nhất')
  const [count, setCount] = useState(5)

  const [messageApi, contextHolder] = message.useMessage()

  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyBookmark.getAllBookmark(0, newCount)
      console.log('result', result)
      if (result) {
        setDataBookmarks(result.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getAllPosted(5).then(() => {
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
  console.log('dataPosted', dataBookmarks)

  const validCount = () => {
    if (dataBookmarks.length < count) {
      return {
        message: 'Đã hết công việc để hiển thị',
        checkForm: false,
      }
    }
    return {
      message: '',
      checkForm: true,
    }
  }

  // click button
  const handleClickAddItem = async () => {
    const newCount = count + 6
    const { message, checkForm } = validCount()
    setnewOld('Mới nhất')
    if (!checkForm) {
      setCount(14)
      await messageApi.open({
        type: 'error',
        content: message,
      })
      await getAllPosted(20)
    } else {
      setCount(newCount)
      await getAllPosted(newCount)
    }
  }

  // click card
  const handleClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    bookmarkId: number
  ) => {
    window.open(`/post-detail?post-id=${bookmarkId}`)
  }

  // Sắp xếp mảng dữ liệu khi state `oldDate` thay đổi
  useEffect(() => {
    if (dataBookmarks) {
      const sorted = [...dataBookmarks]?.sort((a: any, b: any): any => {
        const dateA = parseInt(a.created_at_text[0])
        const dateB = parseInt(b.created_at_text[0])

        if (newOld === 'Mới nhất') {
          return dateB - dateA // Sắp xếp từ cũ đến mới
        } else if (newOld === 'Cũ nhất') {
          return dateA - dateB // Sắp xếp từ mới đến cũ
        }

        return 0
      })

      setDataBookmarks(sorted)
    }
  }, [newOld, count])
  return (
    <>
      {contextHolder}
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
          Các công việc đã lưu
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

      <Box>
        <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
          <Skeleton loading={loading} active>
            {dataBookmarks?.map((dataBookmark: any, i: number) => (
              <Card
                sx={{
                  background: '#ffffff',
                  '&:hover': {
                    background: '#E7E7ED',
                    transition: 'all 0.3s linear',
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px',
                  minWidth: '100%',
                  boxShadow: 'none',
                  borderRadius: '5px',
                  margin: '8px 0',
                  cursor: 'pointer',
                }}
                onClick={(e) => handleClickCard(e, dataBookmark.id)}
                key={i}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ImageListItem sx={{ flex: 1, display: 'flex' }}>
                    <img
                      src={`${dataBookmark.image}?w=164&h=164&fit=crop&auto=format`}
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
                          {dataBookmark.company_name}
                        </Typography>
                      </Tooltip>
                      <Tooltip placement="top" title="j j  j jj">
                        <Typography
                          gutterBottom
                          variant="h1"
                          component="div"
                          sx={{ fontSize: '12px' }}
                        >
                          {dataBookmark.title}
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
                          {dataBookmark.district}, {dataBookmark.province}
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
                          {moment(dataBookmarks?.start_time).format('HH:mm')} :{' '}
                          {moment(dataBookmarks?.end_time).format('HH:mm')}
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
                          {dataBookmark.salary_min} - {dataBookmark.salary_max}/
                          {dataBookmark.salary_type}
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
                          {dataBookmark.created_at_text}
                        </p>
                      </div>
                    </div>
                  </ImageListItem>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '12px',
                    }}
                  >
                    <p
                      style={{
                        color: '#001424',
                        fontSize: 13,
                        fontStyle: 'italic',
                      }}
                    >
                      Đã đăng vào:{' '}
                      {dataBookmark?.start_date != null
                        ? moment(dataBookmark?.start_date).format('DD/MM/YY')
                        : 'Chưa cập nhật'}
                    </p>
                    {dataBookmark?.status === 1 ? (
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
                    ) : dataBookmark?.status === 3 ? (
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
                          marginLeft: '100px',
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
                  <BookmarkIcon
                    sx={{
                      top: 0,
                      right: 0,
                      color: '#0d99ff',
                      fontSize: '32px',
                    }}
                  />
                  <img
                    className="img-resource-company"
                    src={dataBookmark.resource.company_icon}
                    alt="anh icon"
                  />
                  <p
                    style={{
                      fontSize: 13,
                      fontStyle: 'italic',
                      padding: '4px 0',
                    }}
                  >
                    {dataBookmark.job_type.job_type_name}
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
          <Button variant="contained" onClick={handleClickAddItem}>
            Xem thêm
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CardsSavedJob
