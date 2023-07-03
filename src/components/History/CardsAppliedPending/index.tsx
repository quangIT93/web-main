import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Space, Tooltip, message, Button } from 'antd'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Box, Typography, MenuItem, TextField } from '@mui/material'
import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons'

import { Skeleton } from 'antd'

import 'intl'
import 'intl/locale-data/jsonp/en'

// import data
import historyApplicator from 'api/historyApplicator'
import sortData from 'utils/SortDataHistory/sortData'
import NoDataComponent from 'utils/NoDataPage'

interface ICardsAppliedPending {
  activeChild: string
}

const CardsAppliedPending: React.FC<ICardsAppliedPending> = (props) => {
  const { activeChild } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [dataApplied, setDataApplied] = useState<any>(null)
  const [newOld, setnewOld] = React.useState('Mới nhất')
  const [count, setCount] = useState(5)
  const [lastPostId, setLastPostId] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const getAllPending = async () => {
    try {
      const result = await historyApplicator.getAllSubmitedApplied(
        null,
        5,
        1
      )

      if (result) {
        setDataApplied(result.data)
        setLastPostId(result.data[result.data.length - 1].id)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getAllPending().then(() => {
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
    setDataApplied(sortData.sortDataByDate(event.target.value, dataApplied))
  }

  const handleClickAddItem = async () => {
    try {
      setUploading(true)
      const result = await historyApplicator.getAllSubmitedApplied(
        lastPostId,
        5, 1)
      if (result) {
        setUploading(false)
        if (result.data.length == 0) {
          messageApi.open({
            type: 'error',
            content: 'Đã hết công việc để hiển thị',
          })
          return
        }
        setLastPostId(result.data[result.data.length - 1].id)
        setDataApplied((prev: any) => {
          const array = [
            ...prev,
            ...result.data
          ]
          return sortData.sortDataByDate(newOld, array)
        }
        )
      }
    } catch (error) {

    }
  }

  // click card
  const handleClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    postId: number
  ) => {

    window.open(`/post-detail?post-id=${postId}`)
  }

  // Sắp xếp mảng dữ liệu khi state `oldDate` thay đổi

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
          Các công việc ứng tuyển đang chờ duyệt
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
      <Skeleton loading={loading} active>
        {dataApplied?.length > 0 ?
          <div className='history-post'>
            <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>


              {dataApplied?.map((posted: any, i: number) => (
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
                  onClick={(e) => handleClickCard(e, posted.post_id)}
                  key={i}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                        <Tooltip placement="top" title={posted.company_name}>
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
                        <Tooltip placement="top" title={posted.title}>
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
                            {moment(new Date(posted?.start_time)).format(
                              'HH:mm'
                            )}{' '}
                            -{' '}
                            {moment(new Date(posted?.end_time)).format('HH:mm')}
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
                            display: 'flex',
                            alignItems: 'center',
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
                      {posted?.application_status <= 1 ? (
                        <p
                          style={{
                            background: '#0D99FF',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            color: '#ffffff',
                            marginLeft: '100px',
                          }}
                        >
                          Đang chờ duyệt
                        </p>
                      ) : (
                        <p
                          style={{
                            background: '#5cb265',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            color: '#ffffff',
                            marginLeft: '100px',
                          }}
                        >
                          Đã được duyệt
                        </p>
                      )}
                    </Box>
                  </Box>

                  <Space
                    style={{ justifyContent: 'space-between' }}
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
              <Button style={{
                width: 130,
                height: 40,
                backgroundColor: `#0D99FF`,
                color: '#FFFFFF',
                fontWeight: "bold"
              }} loading={uploading} onClick={handleClickAddItem}>
                Xem thêm
              </Button>
            </Box>
          </div> : <NoDataComponent />
        }
      </Skeleton>



    </>
  )
}

export default CardsAppliedPending
