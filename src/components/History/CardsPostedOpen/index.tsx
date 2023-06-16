import React, { useEffect, useState, useMemo } from 'react'
import moment, { Moment } from 'moment'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Space, Tooltip } from 'antd'
import { message } from 'antd'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Box, Typography, MenuItem, TextField, Button } from '@mui/material'
import {
  EnvironmentFilled,
  ClockCircleFilled,
  MoreOutlined,
} from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'
import { Skeleton } from 'antd'
import 'intl'
import 'intl/locale-data/jsonp/en'
import Nodata from 'utils/NoDataPage'

// api
import historyRecruiter from 'api/historyRecruiter'

// import component
import DetailPosted from '../DetailPosted'

interface CardsPostedOpen {
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>
  showDetailPosted: boolean
}
const CardsPostedOpen: React.FC<CardsPostedOpen> = (props) => {
  const { setShowDetailPosted, showDetailPosted } = props
  const [detailPosted, setDetailPosted] = React.useState<any>(null)
  const [dataPosted, setDataPosted] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [newOld, setnewOld] = React.useState('Mới nhất')
  const [count, setCount] = useState(5)

  const [messageApi, contextHolder] = message.useMessage()

  //   getData
  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyRecruiter.getAllPosted(0, newCount, 1)

      if (result) {
        setDataPosted(result.data)
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
  }, [showDetailPosted])

  const validCount = () => {
    if (dataPosted.length < count) {
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

  // click Button
  const handleAddItem = async () => {
    // valid value form data
    const { message, checkForm } = validCount()
    const newCount = count + 6
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

  const handleShowDetail = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    posted: any
  ) => {
    event.stopPropagation()
    console.log('click')
    setShowDetailPosted(true)
    setDetailPosted(posted)
  }

  const handleChange = (event: any) => {
    setnewOld(event.target.value)
  }

  // Sắp xếp mảng dữ liệu khi state `oldDate` thay đổi
  useEffect(() => {
    if (dataPosted) {
      const sorted = [...dataPosted]?.sort((a: any, b: any): any => {
        const dateA = parseInt(a.created_at)
        const dateB = parseInt(b.created_at)

        if (newOld === 'Mới nhất') {
          return dateB - dateA // Sắp xếp từ cũ đến mới
        } else if (newOld === 'Cũ nhất') {
          return dateA - dateB // Sắp xếp từ mới đến cũ
        }

        return 0
      })

      setDataPosted(sorted)
    }
  }, [newOld, count])

  console.log('render cardPostedAll')
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
          Các công việc chưa đóng
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

      {!showDetailPosted ? <>



        <Skeleton loading={loading} active>
          {
            dataPosted?.length > 0 ?
              <div className='history-post'>
                <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>

                  {dataPosted?.map((posted: any, i: number) => (
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

                        margin: '8px 0',
                        cursor: 'pointer',
                      }}
                      onClick={(event) => handleShowDetail(event, posted)}
                      key={i}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
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
                                  fontSize: '18px',
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
                                {new Intl.NumberFormat('en-US').format(
                                  posted?.salary_min
                                )}{` ${posted?.money_type_text} `}
                                -{' '}
                                {new Intl.NumberFormat('en-US').format(
                                  posted?.salary_max
                                ) + ` ${posted?.money_type_text} ` + `/${posted?.salary_type}`}
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
                            {posted?.created_at != null
                              ? moment(posted?.created_at).format('DD/MM/YY')
                              : 'Chưa cập nhật'}
                          </p>

                          {/* <p
                        style={{
                          background: '#5cb265',
                          padding: '4px 12px',
                          borderRadius: '15px',
                          color: '#ffffff',
                          marginLeft: '30px',
                        }}
                      >
                        {posted?.num_of_application} hồ sơ ứng tuyển
                      </p> */}
                          {posted?.status === 1 ? (
                            <p
                              style={{
                                background: '#0D99FF',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                color: '#ffffff',
                                marginLeft: '30px',
                                fontStyle: "italic"
                              }}
                            >
                              Đang tuyển
                            </p>
                          ) : posted?.status === 3 ? (
                            <p
                              style={{
                                background: '#aaaaaa',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                color: '#ffffff',
                                marginLeft: '30px',
                                fontStyle: "italic"
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
                                marginLeft: '30px',
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
                          src={posted.resource.company_icon}
                          alt="anh icon"
                        />
                        <p
                          style={{
                            fontSize: 13,
                            fontStyle: 'italic',
                            padding: '4px 0',
                          }}
                        >
                          {posted.job_type.job_type_name}
                        </p>
                      </Space>
                    </Card>
                  ))}

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
              </div> : <Nodata />
          }
        </Skeleton>
      </> : (
        <DetailPosted detailPosted={detailPosted} />
      )}
    </>
  )
}

export default CardsPostedOpen
