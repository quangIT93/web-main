import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import ImageListItem from '@mui/material/ImageListItem'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
// import { url } from 'inspector'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../store/index'
import { RootState } from '../../../store/reducer'
// import api
import postApi from 'api/postApi'

import moment from 'moment'
import 'intl'
import 'intl/locale-data/jsonp/en'
import { useSearchParams } from 'react-router-dom'

import { useNavigate, createSearchParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import './style.scss'

interface PostNewest {
  id: number
  post_id: Number
  title: string
  company_name: string
  image: string
  ward: string
  district: string
  province: string
  end_time: number
  start_time: number
  salary_max: number
  salary_min: number
  salary_type: string
}
const NewJobs: React.FC = () => {
  const [page, setPage] = React.useState(1)
  const [automatic, setAutomatic] = React.useState<Boolean>(false)
  const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null)

  const listRef = React.useRef<HTMLUListElement | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // state redux
  const { postNewest } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const { setPostNewest } = bindActionCreators(actionCreators, dispatch)

  // handle click post details
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`)
  }
  // handle change paginaton
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    listRef.current?.scrollIntoView()
  }

  const getPostNewest = async () => {
    try {
      const result = await postApi.getPostNewest(null, null, null, 19)
      if (result) {
        setPostNewest(result)
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getPostNewest()

    // delete param when back to page
    // searchParams.delete("theme-id")
    // setSearchParams(searchParams)
  }, [])

  setTimeout(() => {
    setAutomatic(true)
  }, 700)

  return (
    <>
      {automatic && (
        <Box sx={{ flexGrow: 1 }} ref={listRef}>
          <h1 style={{ fontSize: '16px', marginBottom: '24px' }}>
            Công việc mới nhất
          </h1>

          <Grid container spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
            {postNewest.data.posts.map((item: PostNewest, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    minWidth: '100%',
                    display: 'flex',
                    padding: '12px',
                    cursor: 'pointer',
                    '&:hover': {
                      background: '#e8f5ff',
                      transition: 'all 0.3s linear',
                    },
                    boxShadow: 'none',
                    borderRadius: 'unset',
                  }}
                  onClick={(e) => {
                    handleClickItem(e, item.id)
                  }}
                >
                  <ImageListItem
                    key={item.image}
                    sx={{ flex: 1, display: 'flex' }}
                  >
                    <img
                      src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '120px',
                        maxWidth: 'auto',
                        height: '120px',
                        borderRadius: 10,
                      }}
                    />
                    <div style={{ padding: '0', marginLeft: '12px' }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontSize: '16px', margin: 0 }}
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h1"
                        component="div"
                        sx={{ fontSize: '12px' }}
                      >
                        {item.company_name}
                      </Typography>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <RoomOutlinedIcon />
                        <Typography variant="body2" color="text.secondary">
                          {`${item.district}, ${item.province}`}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <RoomOutlinedIcon />
                        <Typography variant="body2" color="text.secondary">
                          {moment(new Date(item.start_time)).format('HH:mm')} -{' '}
                          {moment(new Date(item.end_time)).format('HH:mm')}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <RoomOutlinedIcon sx={{ fontSize: '14px' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Intl.NumberFormat('en-US').format(
                            item.salary_min
                          )}{' '}
                          -{' '}
                          {new Intl.NumberFormat('en-US').format(
                            item.salary_max
                          ) + `/${item.salary_type}`}
                        </Typography>
                      </div>
                    </div>
                  </ImageListItem>
                  <CardActions sx={{ position: 'relative' }}>
                    <BookmarkBorderOutlinedIcon
                      sx={{ position: 'absolute', top: 0, right: 0 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}
          >
            {/* <Pagination count={10} shape="rounded" /> */}
            Test page: {page}
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Box>
      )}
    </>
  )
}

export default NewJobs

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
]
