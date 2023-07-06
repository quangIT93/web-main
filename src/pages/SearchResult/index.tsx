import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'

import ImageListItem from '@mui/material/ImageListItem'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
// import { url } from 'inspector'

import Stack from '@mui/material/Stack'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from 'store/index'
import { RootState } from 'store/reducer'

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer'
// import api
// import postApi from 'api/postApi'
import bookMarkApi from 'api/bookMarkApi'
import searchApi from 'api/searchApi'
import profileApi from 'api/profileApi'

import Footer from '../../components/Footer/index'

import moment from 'moment'
import 'intl'
import 'intl/locale-data/jsonp/en'
// @ts-ignore
import { Navbar } from '#components'

//import jobcard
import JobCard from '../../components/Home/JobCard'

// import { useHomeState } from '../Home/HomeState'

import {
  // useNavigate,
  // createSearchParams,
  useSearchParams,
} from 'react-router-dom'
// import { AxiosResponse } from 'axios'
// import icon
import {
  EnvironmentFilled,
  ClockCircleFilled,
  // EuroCircleFilled,
  CaretDownFilled,
} from '@ant-design/icons'

import { Space, Tooltip } from 'antd'

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
  resource: {
    company_icon: string
  }
  job_type: {
    job_type_name: string
  }
  created_at_text: string
  bookmarked: boolean
}

const NewJobs: React.FC = () => {
  // const {
  //   openCollapse,
  //   setOpenCollapse,
  //   height,
  //   setHeight,

  //   setOpenModalLogin,
  // } = useHomeState()

  const [page, setPage] = React.useState(2)
  const [openBackdrop, setOpenBackdrop] = React.useState(false)
  const [searchData, setSearchData] = React.useState<any>()

  const listRef = React.useRef<HTMLUListElement | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  // const navigate = useNavigate()
  const [checkBookMark, setCheckBookMark] = React.useState(true)

  // state redux
  // const { postNewest } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  // const { setPostNewest, setPostNewestMore } = bindActionCreators(
  //     actionCreators,
  //     dispatch
  // )

  const { setProfileUser } = bindActionCreators(actionCreators, dispatch)

  const dataProfile = useSelector((state: RootState) => state.profileUser)

  // query value
  const QUERY = decodeURIComponent(`${searchParams.get('q')}`)

  const SALARY_TYPE = Number(searchParams.get('sal-type'))
  const MONEY_TYPE = Number(searchParams.get('money_type'))
  const SALARY_MIN = Number(searchParams.get('salary_min'))
  const SALARY_MAX = Number(searchParams.get('salary_max'))
  const IS_WORKING_WEEKEND = Number(searchParams.get('is_working_weekend'))
  const IS_REMOTELY = Number(searchParams.get('is_remotely'))

  const JOB_TYPE =
    Number(searchParams.get('job-type')) &&
      Number(searchParams.get('job-type'))! !== 5
      ? [Number(searchParams.get('job-type'))]
      : []

  const LIST_DIS_ID = searchParams
    .getAll('dis-ids')
    .map((disId) => disId.split(','))
    .map((dis) => dis[1])
  const LIST_CATEGORIES_ID = searchParams
    .getAll('categories-ids')
    .map((cateId) => cateId.split(','))
    .map((dis) => dis[1])
    .map(Number)

  // handle click post details
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail?post-id=${id}`)
  }

  // handle change paginaton
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // listRef.current?.scrollIntoView();
    // const array = [1, 2, 3]
    // // const e = createSearchParams({ name: `${array}` })
    // setSearchParams({ 'name': `${array}` })
    // // console.log("newest: ", result)
    // const test = searchParams.get('name')?.toString().split(",").map(Number)
    // console.log(test)
    // //    window.open(`/home?${e}`)
    // const result = await searchApi.getSearchByQueryV2(
    //   !dataProfile && !QUERY //không có profile và value
    //     ? ''
    //     : !dataProfile && QUERY //không có profile nhưng có value
    //     ? QUERY
    //     : dataProfile && !QUERY //Có profile nhưng không có value
    //     ? '' // Lấy profile
    //     : dataProfile && QUERY // Có profile và value
    //     ? QUERY
    //     : '',
    //   page,
    //   !dataProfile && !MONEY_TYPE //không có profile và value
    //     ? 1
    //     : !dataProfile && MONEY_TYPE //không có profile nhưng có value
    //     ? MONEY_TYPE
    //     : dataProfile && !MONEY_TYPE //Có profile nhưng không có value
    //     ? 1 // Lấy profile
    //     : dataProfile && MONEY_TYPE // Có profile và value
    //     ? MONEY_TYPE
    //     : 1,
    //   !dataProfile && !IS_WORKING_WEEKEND //không có profile và value
    //     ? null
    //     : !dataProfile && IS_WORKING_WEEKEND //không có profile nhưng có value
    //     ? IS_WORKING_WEEKEND
    //     : dataProfile && !IS_WORKING_WEEKEND //Có profile nhưng không có value
    //     ? null // Lấy profile
    //     : dataProfile && IS_WORKING_WEEKEND // Có profile và value
    //     ? IS_WORKING_WEEKEND
    //     : null,
    //   !dataProfile && !IS_REMOTELY //không có profile và value
    //     ? null
    //     : !dataProfile && IS_REMOTELY //không có profile nhưng có value
    //     ? IS_REMOTELY
    //     : dataProfile && !IS_REMOTELY //Có profile nhưng không có value
    //     ? null // Lấy profile
    //     : dataProfile && IS_REMOTELY // Có profile và value
    //     ? IS_REMOTELY
    //     : null,
    //   null,
    //   !dataProfile && !SALARY_MIN //không có profile và value
    //     ? 6000000
    //     : !dataProfile && SALARY_MIN //không có profile nhưng có value
    //     ? SALARY_MIN
    //     : dataProfile && !SALARY_MIN //Có profile nhưng không có value
    //     ? 6000000 // Lấy profile
    //     : dataProfile && SALARY_MIN // Có profile và value
    //     ? SALARY_MIN
    //     : 6000000,
    //   !dataProfile && !SALARY_MAX //không có profile và value
    //     ? 12000000
    //     : !dataProfile && SALARY_MAX //không có profile nhưng có value
    //     ? SALARY_MAX
    //     : dataProfile && !SALARY_MAX //Có profile nhưng không có value
    //     ? 12000000 // Lấy profile
    //     : dataProfile && SALARY_MAX // Có profile và value
    //     ? SALARY_MAX
    //     : 12000000,
    //   null,
    //   null,
    //   !dataProfile && !JOB_TYPE //không có profile và value
    //     ? []
    //     : !dataProfile && JOB_TYPE //không có profile nhưng có value
    //     ? JOB_TYPE
    //     : dataProfile && !JOB_TYPE //Có profile nhưng không có value
    //     ? [] // Lấy profile
    //     : dataProfile && JOB_TYPE // Có profile và value
    //     ? JOB_TYPE
    //     : [],
    //   !dataProfile && LIST_CATEGORIES_ID.length === 0 //không có profile và value
    //     ? null
    //     : !dataProfile && LIST_CATEGORIES_ID //không có profile nhưng có value
    //     ? LIST_CATEGORIES_ID
    //     : dataProfile && LIST_CATEGORIES_ID.length === 0 //Có profile nhưng không có value
    //     ? dataProfile.categories.map(
    //         (categorie: any) => categorie.child_category_id
    //       ) || null // Lấy profile
    //     : dataProfile && LIST_CATEGORIES_ID // Có profile và value
    //     ? LIST_CATEGORIES_ID
    //     : null,
    //   !dataProfile && !LIST_DIS_ID //không có profile và value
    //     ? []
    //     : !dataProfile && LIST_DIS_ID //không có profile nhưng có value
    //     ? LIST_DIS_ID
    //     : dataProfile && !LIST_DIS_ID //Có profile nhưng không có value
    //     ? dataProfile.locations.map((location: any) => location.district_id) ||
    //       null // Lấy profile
    //     : dataProfile && LIST_DIS_ID // Có profile và value
    //     ? LIST_DIS_ID
    //     : [],
    //   !dataProfile && !SALARY_TYPE //không có profile và value
    //     ? null
    //     : !dataProfile && SALARY_TYPE //không có profile nhưng có value
    //     ? SALARY_TYPE
    //     : dataProfile && !SALARY_TYPE //Có profile nhưng không có value
    //     ? null // Lấy profile
    //     : dataProfile && SALARY_TYPE // Có profile và value
    //     ? SALARY_TYPE
    //     : null
    // )
    const result = await searchApi.getSearchByQueryV2(
      QUERY,
      page,
      MONEY_TYPE,
      IS_WORKING_WEEKEND,
      IS_REMOTELY,
      null,
      SALARY_MIN,
      SALARY_MAX,
      null,
      null,
      JOB_TYPE,
      LIST_CATEGORIES_ID,
      LIST_DIS_ID,
      SALARY_TYPE
    )

    //
    if (result && result?.data?.posts.length !== 0) {
      setSearchData((prev: any) => {
        return {
          posts: [...prev.posts, ...result.data.posts],
          total: result.data.total,
        }
      })
      setPage(page + 1)
    } else {
      console.log('da het data', result)
    }
  }

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false)
  }

  const fetchDataProfileUser = async () => {
    try {
      await dispatch(getProfile() as any)
      const result = await profileApi.getProfile()
      if (result) {
        setProfileUser(result.data)
      }
    } catch (error) {
      // Xử lý lỗi
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchDataProfileUser()
  }, [])

  const getPostSearch = async () => {
    try {
      if (dataProfile) {
        // const result = await searchApi.getSearchByQueryV2(
        //   QUERY,
        //   null,
        //   !dataProfile && !MONEY_TYPE //không có profile và value
        //     ? 1
        //     : !dataProfile && MONEY_TYPE //không có profile nhưng có value
        //     ? MONEY_TYPE
        //     : dataProfile && !MONEY_TYPE //Có profile nhưng không có value
        //     ? 1 // Lấy profile
        //     : dataProfile && MONEY_TYPE // Có profile và value
        //     ? MONEY_TYPE
        //     : 1,
        //   !dataProfile && !IS_WORKING_WEEKEND //không có profile và value
        //     ? null
        //     : !dataProfile && IS_WORKING_WEEKEND //không có profile nhưng có value
        //     ? IS_WORKING_WEEKEND
        //     : dataProfile && !IS_WORKING_WEEKEND //Có profile nhưng không có value
        //     ? null // Lấy profile
        //     : dataProfile && IS_WORKING_WEEKEND // Có profile và value
        //     ? IS_WORKING_WEEKEND
        //     : null,
        //   !dataProfile && !IS_REMOTELY //không có profile và value
        //     ? null
        //     : !dataProfile && IS_REMOTELY //không có profile nhưng có value
        //     ? IS_REMOTELY
        //     : dataProfile && !IS_REMOTELY //Có profile nhưng không có value
        //     ? null // Lấy profile
        //     : dataProfile && IS_REMOTELY // Có profile và value
        //     ? IS_REMOTELY
        //     : null,
        //   null,
        //   !dataProfile && !SALARY_MIN //không có profile và value
        //     ? 6000000
        //     : !dataProfile && SALARY_MIN //không có profile nhưng có value
        //     ? SALARY_MIN
        //     : dataProfile && !SALARY_MIN //Có profile nhưng không có value
        //     ? 6000000 // Lấy profile
        //     : dataProfile && SALARY_MIN // Có profile và value
        //     ? SALARY_MIN
        //     : 6000000,
        //   !dataProfile && !SALARY_MAX //không có profile và value
        //     ? 12000000
        //     : !dataProfile && SALARY_MAX //không có profile nhưng có value
        //     ? SALARY_MAX
        //     : dataProfile && !SALARY_MAX //Có profile nhưng không có value
        //     ? 12000000 // Lấy profile
        //     : dataProfile && SALARY_MAX // Có profile và value
        //     ? SALARY_MAX
        //     : 12000000,
        //   null,
        //   null,
        //   !dataProfile && !JOB_TYPE //không có profile và value
        //     ? []
        //     : !dataProfile && JOB_TYPE //không có profile nhưng có value
        //     ? JOB_TYPE
        //     : dataProfile && !JOB_TYPE //Có profile nhưng không có value
        //     ? [] // Lấy profile
        //     : dataProfile && JOB_TYPE // Có profile và value
        //     ? JOB_TYPE
        //     : [],
        //   !dataProfile && LIST_CATEGORIES_ID.length === 0 //không có profile và value
        //     ? []
        //     : !dataProfile && LIST_CATEGORIES_ID //không có profile nhưng có value
        //     ? LIST_CATEGORIES_ID
        //     : dataProfile && LIST_CATEGORIES_ID.length === 0 //Có profile nhưng không có value
        //     ? dataProfile.categories.map(
        //         (categorie: any) => categorie.child_category_id
        //       ) // Lấy profile
        //     : dataProfile && LIST_CATEGORIES_ID // Có profile và value
        //     ? LIST_CATEGORIES_ID
        //     : [],
        //   !dataProfile && !LIST_DIS_ID //không có profile và value
        //     ? []
        //     : !dataProfile && LIST_DIS_ID //không có profile nhưng có value
        //     ? LIST_DIS_ID
        //     : dataProfile && !LIST_DIS_ID //Có profile nhưng không có value
        //     ? [] // Lấy profile
        //     : dataProfile && LIST_DIS_ID // Có profile và value
        //     ? LIST_DIS_ID
        //     : [],
        //   !dataProfile && !SALARY_TYPE //không có profile và value
        //     ? null
        //     : !dataProfile && SALARY_TYPE //không có profile nhưng có value
        //     ? SALARY_TYPE
        //     : dataProfile && !SALARY_TYPE //Có profile nhưng không có value
        //     ? null // Lấy profile
        //     : dataProfile && SALARY_TYPE // Có profile và value
        //     ? SALARY_TYPE
        //     : null
        // )

        const result = await searchApi.getSearchByQueryV2(
          QUERY,
          null,
          MONEY_TYPE,
          IS_WORKING_WEEKEND,
          IS_REMOTELY,
          null,
          SALARY_MIN,
          SALARY_MAX,
          null,
          null,
          JOB_TYPE,
          LIST_CATEGORIES_ID,
          LIST_DIS_ID,
          SALARY_TYPE
        )
        if (result) {
          setSearchData(result.data)
        }
      }
    } catch (error) {
      setOpenBackdrop(false)
      console.log(error)
    }
  }

  React.useEffect(() => {
    getPostSearch()
  }, [dataProfile])

  return (
    <>
      <Navbar />

      <div className="search-result">
        {
          // automatic && (
          <Box sx={{ flexGrow: 1 }} ref={listRef}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '20px 0',
              }}
            >
              Tìm thấy{' '}
              <h4 style={{ margin: '0 10px' }}>
                {searchData ? searchData?.total : 0}
              </h4>
              công việc phù hợp
            </div>
            {searchData?.posts.length > 0 ? (
              <>
                <Grid container spacing={3} columns={{ xs: 6, sm: 4, md: 12 }}>
                  {searchData?.posts.map((item: PostNewest, index: number) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                      <JobCard
                        item={item}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Stack
                  spacing={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '24px 0',
                  }}
                >
                  {/* <Pagination count={10} shape="rounded" /> */}
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
              </>
            ) : (
              <></>
            )}
            <Backdrop
              sx={{
                color: '#0d99ff ',
                zIndex: (theme: any) => theme.zIndex.drawer + 1,
              }}
              open={openBackdrop}
            //  onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
          // )
        }
      </div>

      <Footer />
    </>
  )
}
export default NewJobs
