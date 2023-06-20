import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import ImageListItem from '@mui/material/ImageListItem'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
// import { url } from 'inspector'
// import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { AxiosResponse } from 'axios'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

// @ts-ignore
import moment from 'moment'
import 'intl'
import 'intl/locale-data/jsonp/en'

import { useNavigate, createSearchParams } from 'react-router-dom'
import { MouseEvent, MouseEventHandler } from 'react'

// @ts-ignore
import { useSearchParams } from 'react-router-dom'
// import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import TurnedInIcon from '@mui/icons-material/TurnedIn'

// import component
import ListCompanyCarousel from '../ListCompanyCarousel'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../store/index'
import { RootState } from '../../../store/reducer'

import postApi from 'api/postApi'
import themeApi from '../../../api/themesApi'
import bookMarkApi from 'api/bookMarkApi'

import './style.scss'

// import icon
import {
  EnvironmentFilled,
  ClockCircleFilled,
  EuroCircleFilled,
  CaretDownFilled,
} from '@ant-design/icons'

import { Space, Tooltip } from 'antd'
// interface item post themes

interface PostTheme {
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
  resource: {
    company_icon: string
  }
  job_type: {
    job_type_name: string
  }
  created_at_text: string
  bookmarked: boolean
}

const ThemesJob: React.FC = () => {
  const [page, setPage] = React.useState(1)
  const [automatic, setAutomatic] = React.useState<Boolean>(false)
  const [listTheme, setListThem] = React.useState<AxiosResponse | null>(null)
  const [openBackdrop, setOpenBackdrop] = React.useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [checkBookMark, setCheckBookMark] = React.useState(true)

  // state redux
  const { post } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const { setPostByTheme, setPostThemeMore } = bindActionCreators(
    actionCreators,
    dispatch
  )

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
    setOpenBackdrop(!openBackdrop)
    // const test = [1, 2]
    // const p = createSearchParams({ page: `${test}`})
    // navigate(`/home/?${p}`);
    // console.log(searchParams.get(`page`))
    const themeId = searchParams.get(`theme-id`)
      ? searchParams.get(`theme-id`)
      : listTheme?.data[0].id

    const threshold = post.data.posts[post.data.posts.length - 1].id
    const result = await postApi.getPostByThemeId(Number(themeId), 9, threshold)

    if (result) {
      setPostThemeMore(result)

      setOpenBackdrop(false)
    }
  }

  // handle click post details
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`)
  }

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false)
  }

  // get post by theme id
  const getPostByThemeId = async () => {
    try {
      const result = await themeApi.getThemesEnable()
      console.log('result', result)
      if (result) {
        setListThem(result)

        const list = await postApi.getPostByThemeId(result.data[0].id, 19, null)
        if (list) {
          setPostByTheme(list)
          setAutomatic(true)
        }
      }
    } catch (error) {
      setAutomatic(true)
      console.log(error)
    }
  }
  React.useEffect(() => {
    getPostByThemeId()

    // delete param when back to page
    searchParams.delete('theme-id')
    searchParams.delete('categories-id')
    setSearchParams(searchParams)
  }, [])
  // React.useEffect(() => {
  //   console.log("vap")
  //   getPostByThemeId()
  //   // delete param when back to page
  //   // searchParams.delete("theme-id")
  //   // setSearchParams(searchParams)

  // }, [localStorage.getItem("accessToken")])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2>Công việc theo chủ đề</h2>

      <ListCompanyCarousel listTheme={listTheme} />
      <>
        {automatic && (
          <>
            <Grid container spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
              {post?.data.posts.map((item: PostTheme, index: number) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
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
                      borderRadius: 'unset',
                    }}
                  >
                    <div
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
                            maxHeight: '150px',
                            borderRadius: 10,
                            height: '100% ',
                            minHeight: '120px',
                          }}
                        />
                        <div
                          style={{ padding: '0', marginLeft: '12px' }}
                          className="div-cart-item-post"
                        >
                          <Tooltip placement="top" title={item.title}>
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
                              {item?.title.length > 38
                                ? `${item.title.substring(0, 38)} ...`
                                : item.title}
                            </Typography>
                          </Tooltip>
                          <Tooltip placement="top" title={item.company_name}>
                            <Typography
                              gutterBottom
                              variant="h1"
                              component="div"
                              sx={{ fontSize: '12px' }}
                            >
                              {item?.company_name.length > 38
                                ? `${item.company_name.substring(0, 38)} ...`
                                : item.company_name}
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
                            <ClockCircleFilled className="icon-cart-item-post" />
                            <Typography variant="body2" color="text.secondary">
                              {moment(new Date(item.start_time)).format(
                                'HH:mm'
                              )}{' '}
                              -{' '}
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
                                item.salary_min
                              )}{' '}
                              -{' '}
                              {new Intl.NumberFormat('en-US').format(
                                item.salary_max
                              ) + `/${item.salary_type}`}
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
                              {item.created_at_text}
                            </p>
                          </div>
                        </div>
                      </ImageListItem>
                    </div>

                    <Space
                      style={{ justifyContent: 'space-between' }}
                      direction="vertical"
                      align="center"
                    >
                      <div
                        onClick={async (e) => {
                          try {
                            if (!localStorage.getItem('accessToken')) {
                              return
                            }
                            if (item.bookmarked) {
                              const result = await bookMarkApi.deleteBookMark(
                                item.id
                              )
                              item.bookmarked = false
                              if (result) {
                                setCheckBookMark(!checkBookMark)
                              }
                            } else {
                              const result = await bookMarkApi.createBookMark(
                                item.id
                              )
                              item.bookmarked = true
                              if (result) {
                                setCheckBookMark(!checkBookMark)
                              }
                            }
                          } catch (error) {
                            console.log(error)
                          }
                        }}
                      >
                        {item.bookmarked ? (
                          <TurnedInIcon
                            sx={{ top: 0, right: 0, color: '#0d99ff' }}
                          />
                        ) : (
                          <BookmarkBorderOutlinedIcon
                            sx={{ top: 0, right: 0, color: '' }}
                          />
                        )}
                      </div>

                      <img
                        className="img-resource-company"
                        src={item.resource.company_icon}
                      />
                      <p style={{ fontSize: 13, fontStyle: 'italic' }}>
                        {item.job_type.job_type_name}
                      </p>
                    </Space>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack
              spacing={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '24px 0',
                marginBottom: '50px',
              }}
            >
              {/* <Pagination count={10} shape="rounded" /> */}
              {/* Test page: {page} */}
              {/* <Pagination
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={handleChange}
                /> */}
              <Space
                className="div-hover-more"
                onClick={(e) => {
                  handleChange(e, page)
                }}
              >
                <p>Xem thêm</p>
                <CaretDownFilled />
              </Space>
            </Stack>
            <Backdrop
              sx={{
                color: '#0d99ff ',
                zIndex: (theme: any) => theme.zIndex.drawer + 1,
              }}
              open={openBackdrop}
            //   onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        )}
      </>
    </Box>
  )
}

export default ThemesJob
