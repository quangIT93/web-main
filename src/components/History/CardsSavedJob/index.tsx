import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Space, Tooltip, message, Button } from 'antd'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Box, Typography, MenuItem, TextField } from '@mui/material'
import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons'
import './style.scss'

import { Skeleton } from 'antd'

import { SaveIconFill } from '#components/Icons'

import 'intl'
import 'intl/locale-data/jsonp/en'
import Nodata from 'utils/NoDataPage'
import sortData from 'utils/SortDataHistory/sortData'

// import data
import historyBookmark from 'api/historyBookmark'
import bookMarkApi from 'api/bookMarkApi'

import { useDispatch, useSelector } from 'react-redux';

import { setAlertCancleSave } from 'store/reducer/alertReducer';

interface ICardsApplied {
  activeChild: string
}

const CardsSavedJob: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [dataBookmarks, setDataBookmarks] = useState<any>(null)
  const [newOld, setnewOld] = React.useState('Mới nhất')
  const [count, setCount] = useState(5)
  const [uploading, setUploading] = useState(false)
  const [lastPostId, setLastPostId] = useState(0)
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage()

  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyBookmark.getAllBookmark(newCount, 10)

      if (result) {
        setLastPostId(result.data[result.data.length - 1].bookmark_id)
        setDataBookmarks(sortData.sortDataByDate(newOld, result.data))
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getAllPosted(0).then(() => {
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

    setDataBookmarks(sortData.sortDataByDate(event.target.value, dataBookmarks))
  }

  // click button
  const handleClickAddItem = async () => {
    try {
      setUploading(true)
      const result = await historyBookmark.getAllBookmark(lastPostId, 10)

      if (result) {
        setUploading(false)
        if (result.data.length == 0) {
          messageApi.open({
            type: 'error',
            content: 'Đã hết công việc để hiển thị',
          })
          return
        }
        setLastPostId(result.data[result.data.length - 1].bookmark_id)
        setDataBookmarks((prev: any) => {
          const array = [...prev, ...result.data]
          return sortData.sortDataByDate(newOld, array)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // click card
  const handleClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    bookmarkId: number
  ) => {
    window.open(`/post-detail?post-id=${bookmarkId}`)
  }

  const handleDeleteBookmark = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    bookmarkId: number
  ) => {
    const result = await bookMarkApi.deleteBookMark(bookmarkId)

    if (result) {
      setDataBookmarks((prev: any) => {
        const newData = [...prev]
        newData.splice(index, 1)
        return newData
      })
      dispatch<any>(setAlertCancleSave(true));
    }
  }

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
      <Skeleton loading={loading} active>
        {dataBookmarks?.length > 0 ? (
          <div className="history-post">
            <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
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
                  key={i}
                >
                  <div
                    onClick={(e) => handleClickCard(e, dataBookmark.id)}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <ImageListItem sx={{ flex: 1, display: 'flex' }}>
                      <img
                        src={`${dataBookmark.image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`aaa?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt="anh job"
                        loading="lazy"
                        style={{
                          width: '120px',
                          marginRight: '1rem',
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
                        <Tooltip placement="top" title={dataBookmark.title}>
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
                            {dataBookmark.title}
                          </Typography>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          title={dataBookmark.company_name}
                        >
                          <Typography
                            gutterBottom
                            variant="h1"
                            component="div"
                            sx={{ fontSize: '12px' }}
                          >
                            {dataBookmark.company_name}
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
                            {moment(new Date(dataBookmark?.start_time)).format(
                              'HH:mm'
                            )}{' '}
                            -{' '}
                            {moment(new Date(dataBookmark?.end_time)).format(
                              'HH:mm'
                            )}
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
                              dataBookmark?.salary_min
                            )}
                            {` ${dataBookmark?.money_type_text} `}-{' '}
                            {new Intl.NumberFormat('en-US').format(
                              dataBookmark?.salary_max
                            ) +
                              ` ${dataBookmark?.money_type_text} ` +
                              `/${dataBookmark?.salary_type}`}
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
                        {dataBookmark?.created_at != null
                          ? moment(dataBookmark?.created_at).format('DD/MM/YY')
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
                            fontStyle: 'italic',
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
                            marginLeft: '100px',
                            fontStyle: 'italic',
                          }}
                        >
                          Không chấp nhận
                        </p>
                      )}
                    </Box>
                  </div>
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
                    <div
                      onClick={(e) =>
                        handleDeleteBookmark(e, i, dataBookmark.id)
                      }
                    >
                      <SaveIconFill width={24} height={24} />
                    </div>
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
            </Grid>
            <Box
              sx={{
                margin: '12px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                style={{
                  width: 130,
                  height: 40,
                  marginBottom: '2rem',
                  backgroundColor: `#0D99FF`,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
                loading={uploading}
                onClick={handleClickAddItem}
              >
                Xem thêm
              </Button>
            </Box>
          </div>
        ) : (
          <Nodata />
        )}
      </Skeleton>
    </>
  )
}

export default CardsSavedJob
