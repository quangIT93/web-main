import React, { useEffect, useState, useMemo } from 'react'
import moment, { Moment } from 'moment'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Space, Tooltip } from 'antd'
import { message, Button } from 'antd'
import ImageListItem from '@mui/material/ImageListItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Box, Typography, MenuItem, TextField } from '@mui/material'
import {
  EnvironmentFilled,
  ClockCircleFilled,
  MoreOutlined,
  LeftOutlined
} from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'
import { Skeleton } from 'antd'
import 'intl'
import 'intl/locale-data/jsonp/en'
import Nodata from 'utils/NoDataPage'

import sortData from 'utils/SortDataHistory/sortData'


// api
import historyRecruiter from 'api/historyRecruiter'

// import component
import DetailPosted from '../DetailPosted'

import JobCardPostHistory from '../JobCardPostHistory'

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
  const [lastPostId, setLastPostId] = useState(0)

  const [uploading, setUploading] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()
  const [isVisible, setIsVisible] = useState(true);

  //get post to check if length <= 10
  const getAllPostToCheck = async () => {
    const result = await historyRecruiter.GetInformationAndCandidatesCount(
      0,
      11
    )
    if (result.data.length <= 10) {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    getAllPostToCheck();
  }, [])

  //   getData
  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyRecruiter.getAllPosted(newCount, 10, 1)

      if (result) {
        setDataPosted(result.data)
        setLastPostId(result.data[result.data.length - 1].id)
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
  }, [showDetailPosted])



  // click Button
  const handleAddItem = async () => {

    try {
      setUploading(true)
      const result = await historyRecruiter.getAllPosted(
        lastPostId,
        10, 3)
      if (result) {
        setUploading(false)
        if (result.data.length == 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content: 'Đã hết công việc để hiển thị',
          })
          return
        }
        setLastPostId(result.data[result.data.length - 1].id)
        setDataPosted((prev: any) => {
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

  const handleShowDetail = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    posted: any
  ) => {
    event.stopPropagation()

    setShowDetailPosted(true)
    setDetailPosted(posted)
  }

  const handleChange = (event: any) => {
    setnewOld(event.target.value)
    setDataPosted(sortData.sortDataByDate(event.target.value, dataPosted))
  }

  const handleHideDetail = () => {
    setShowDetailPosted(false)
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
        <div className="back-container">
          <Button
            className="back-button"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={handleHideDetail}
            style={{
              display: showDetailPosted ? 'block' : 'none'
            }}
          />
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            Các công việc chưa đóng
          </Typography>
        </div>

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
                    <JobCardPostHistory item={posted} handleShowDetail={handleShowDetail} isHide={true} />
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
                    marginBottom: '2rem',
                    color: '#FFFFFF',
                    fontWeight: "bold",
                    display: isVisible ? 'block' : 'none'
                  }} loading={uploading} onClick={handleAddItem}>
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
