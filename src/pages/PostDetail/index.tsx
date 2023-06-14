import React from 'react'
// @ts-ignore
import moment from 'moment'
import 'intl'
import 'intl/locale-data/jsonp/en'
import NavBar from '../../components/Navbar/index'
import { AxiosResponse } from 'axios'
import Footer from '../../components/Footer/index'
// @ts-ignore
import { useSearchParams } from 'react-router-dom'
import postApi from '../../api/postApi'
import locationApi from '../../api/locationApi'
import appplicationApi from 'api/appplication'
import ItemSuggest from './components/ItemSuggest'
// @ts-ignore
import { Carousel } from 'react-carousel-minimal'
import { Button, Breadcrumb, notification, Input, Tooltip } from 'antd'
//@ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard'
//@ts-ignore
import { useHomeState } from '../Home/HomeState'
import { StatePropsCloseSlider } from 'pages/Home'

import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../store/index'
import { RootState } from '../../store/reducer'

import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  CheckCircleFilled,
  DesktopOutlined,
  SlidersOutlined,
  FormOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'

import './style.scss'

interface ItemCategories {
  child_category_id?: Number
  parent_category?: string

  child_category?: string
  parent_category_id: Number
}

// state props
interface PostNewest {
  id?: Number
  status?: Number
  account_id?: string
  title?: string
  company_name?: string
  is_date_period?: number
  start_date?: number
  end_date?: number
  start_time?: number
  image?: string
}
const ACCESS_TOKEN = localStorage.getItem('accessToken')


// page view details post
const Detail: React.FC = () => {
  const { Search } = Input
  // test redux
  const state = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()
  const { setPostByTheme, setProvince } = bindActionCreators(
    actionCreators,
    dispatch
  )

  const {
    openCollapse,
    setOpenCollapse,
    height,
    setHeight,
    openModalLogin,
    setOpenModalLogin,
  } = useHomeState()

  const componentRef = React.useRef<HTMLDivElement>(null)
  const componentRefJob = React.useRef<HTMLDivElement>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const [width, setWidth] = React.useState<Number>(1050)
  const [post, setPost] = React.useState<AxiosResponse | null>(null)
  const [postNewest, setPostNewest] = React.useState<AxiosResponse | null>(null)
  const [automatic, setAutomatic] = React.useState<Boolean>(false)

  const [textButton, setTextButton] = React.useState<string>('Ứng Tuyển')
  const [backgroundButton, setBackgroundButton] = React.useState<string>("#0D99FF")
  const [checkPostUser, setCheckPostUser] = React.useState<Boolean>(false)
  const [checkApply, setCheckApply] = React.useState<boolean>(false)

  const [api, contextHolder] = notification.useNotification()

  const statePropsCloseSlider: StatePropsCloseSlider = {
    openCollapse,
    setOpenCollapse,
    setHeight,
    height,
    setOpenModalLogin,
  }
  const POST_ID = Number(searchParams.get('post-id'));

  const openNotification = () => {
    api.info({
      message: `Ứng tuyển thành công - Chia sẻ công việc ?`,
      description: (
        <Input
          addonBefore="Link"
          addonAfter={
            <CopyToClipboard text={window.location.href}>
              <Tooltip
                trigger="click"
                placement="topRight"
                title={'Đã copy link '}
                arrow={true}
              >
                <div style={{ cursor: 'pointer' }}>Copy</div>
              </Tooltip>
            </CopyToClipboard>
          }
          defaultValue={window.location.href}
        />
      ),
      placement: 'topRight',
      icon: <CheckCircleFilled style={{ color: "green" }} />
    })
  }

  // message if user login yet
  const CheckWasLogin = () => {
    api.info({
      message: `Không thể thực hiện thao tác`,
      description: "Vui lòng đăng nhập để thực hiện thao tác",
      placement: 'top',
      icon: <ExclamationCircleFilled style={{ color: "red" }} />
    })
  }


  // get post by id-post
  const getPostById = async () => {
    try {
      const accountId = localStorage.getItem("accountId")

      const result = await postApi.getById(POST_ID)
      if (result) {

        console.log("post detail", result)
      }
      const list = result?.data.categories.map(
        (category: any) => Number(category.child_category_id)
      )
      console.log('child', list)

      // check  application status
      if (result.data.account_id === accountId) {
        setTextButton("Chỉnh sửa bài tuyển dụng")
        setBackgroundButton("black")
        setCheckPostUser(true)
      } else if (result.data.status == 3) {
        setTextButton("Bài đăng đã đóng")
        setBackgroundButton("gray")
        result.data.applied = true
      } else
        if (result.data.application_status == 1) {
          setTextButton("Đã ứng tuyển")
          setBackgroundButton("gray")
        } else if (result.data.application_status == 2) {
          setTextButton("Hồ sơ được phê duyệt")
          setBackgroundButton("#0D99FF")
        } else if (result.data.application_status == 3) {
          setTextButton("Hồ sơ bị từ chối")
          setBackgroundButton("#BD3131")
        } else if (result.data.application_status == 4) {
          setTextButton("Hồ sơ được chấp nhận")
          setBackgroundButton("#5CB265")
        }
      setPost(result)
      setCheckApply(result.data.applied)

      // get post related by id post
      const postNewest = await postApi.getPostRelated(
        POST_ID
      )
      //setPost related
      setPostNewest(postNewest)

    } catch (error) {
      console.error(error)
    }
  }
  React.useEffect(() => {
    getPostById()
  }, [])

  // set size for Breadcrumb
  React.useEffect(() => {
    function handleWindowResize() {
      const w =
        Number(componentRef?.current?.offsetWidth) +
        Number(componentRefJob?.current?.offsetWidth)
      setWidth(w)
    }

    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const data = [
    {
      id: 81,
      image:
        'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg',
      status: 1,
    },
    {
      id: 82,
      image:
        'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-3eedf311-0479-4ecc-804e-ca810f1b7658.jpg',
      status: 1,
    },
    {
      id: 83,
      image:
        'https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-8ade830d-f957-4aaa-8fdd-c5035d81d529.jpg',
      status: 1,
    },
  ]

  // handle click button
  const onclick = async () => {
    //  window.open(`${post?.data.share_link}`)

    try {
      if (!ACCESS_TOKEN) {
        CheckWasLogin()
        return
      }
      // navigate to edit post
      if (checkPostUser) {
        window.open(`edit-posted/?postId=${POST_ID}`)
        return
      }
      const result = await appplicationApi.applyAplication(POST_ID)

      if (result) {
        openNotification()
        setTextButton("Đã ứng tuyển")
        setBackgroundButton("gray")
        setCheckApply(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
  }

  setTimeout(() => {
    setAutomatic(true)
  }, 700)
  return (
    <>
      {automatic && (
        <div className="detail">
          <NavBar {...statePropsCloseSlider} />
          <div className="div-include-breadcrumb">
            <div className="job-breadcrumb">
              <div className="div-breadcrumb" style={{ width: `${width}px` }}>
                <Breadcrumb
                  separator=">"
                  items={[
                    {
                      title: 'HiJob',
                    },
                    {
                      title: 'Viec lam',
                      href: '',
                    },
                    {
                      title: `${post?.data.title}`,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '30px',
            }}
          >
            <div className="detail-container">
              <div ref={componentRef}>
                <Carousel
                  data={post?.data.images.length > 0 ? post?.data.images : data}
                  time={2000}
                  width="850px"
                  height="500px"
                  captionStyle={captionStyle}
                  radius="10px"
                  slideNumber={true}
                  slideNumberStyle={slideNumberStyle}
                  captionPosition="bottom"
                  automatic={false}
                  // dots={true}
                  pauseIconColor="white"
                  pauseIconSize="40px"
                  slideBackgroundColor="darkgrey"
                  slideImageFit="cover"
                  thumbnails={true}
                  thumbnailWidth="100px"
                  style={{
                    textAlign: 'center',
                    maxWidth: '850px',
                    maxHeight: '590px',
                  }}
                />
              </div>
              <div className="div-job-title" ref={componentRefJob}>
                <div className="title">
                  <h2>{post?.data.title}</h2>
                  <h3>{post?.data.company_name}</h3>
                </div>
                <div className="job-title-details">
                  <h4>Thông tin việc làm</h4>
                  <div className="div-detail-row">
                    <EnvironmentOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Địa chỉ</p>
                      <h5>{post?.data.address}</h5>
                    </div>
                  </div>
                  <div className="div-detail-row">
                    <SlidersOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Loại công viêc</p>
                      <h5>{post?.data.job_type.job_type_name}</h5>
                    </div>
                  </div>
                  <div className="div-detail-row">
                    <ClockCircleOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Giờ làm việc</p>
                      <h5>
                        {moment(new Date(post?.data.start_time)).format(
                          'HH:mm'
                        )}{' '}
                        -{' '}
                        {moment(new Date(post?.data.end_time)).format('HH:mm')}
                      </h5>
                    </div>
                  </div>

                  <div className="div-detail-row">
                    <CalendarOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Làm việc cuối tuần</p>
                      <h5>
                        {post?.data.is_working_weekend == 0
                          ?
                          'Không làm việc cuối tuần' : 'Có làm việc cuối tuần'}
                      </h5>
                    </div>
                  </div>
                  <div className="div-detail-row">
                    <DollarOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Mức lương</p>
                      <h5>
                        {new Intl.NumberFormat('en-US').format(
                          post?.data.salary_min
                        ) + ` ${post?.data.money_type_text}`}{' '}
                        -{' '}
                        {new Intl.NumberFormat('en-US').format(
                          post?.data.salary_max
                        ) + ` ${post?.data.money_type_text}`}
                      </h5>
                    </div>
                  </div>
                  <div className="div-detail-row">
                    <CreditCardOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Danh mục</p>
                      {post?.data.categories.map(
                        (item: ItemCategories, index: null | number) => (
                          <h5 key={index}>
                            {item.parent_category}/{item.child_category}
                          </h5>
                        )
                      )}
                    </div>
                  </div>
                  <div className="div-detail-row">
                    <DesktopOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Làm việc từ xa</p>
                      <h5>{post?.data.is_remotely == 0 ? "Không làm việc từ xa" : "Có làm việc từ xa"}</h5>
                    </div>
                  </div>
                  <div className="div-detail-row">
                    <ClockCircleOutlined style={{ color: '#575757' }} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <p>Thời gian hết hạn</p>
                      <h5>{post?.data.expired_date ? moment(new Date(post?.data.expired_date)).format(
                        'DD/MM/yyyy'
                      ) : "Không thời hạn"}</h5>
                    </div>
                  </div>
                  <>
                    {contextHolder}
                    <Button
                      onClick={onclick}
                      className="btn-apply"
                      type={'primary'}
                      disabled={checkApply}
                      style={{
                        fontSize: 16,
                        backgroundColor: `${backgroundButton}`,
                        color: "white",
                        fontWeight: "normal"
                      }}
                      icon={checkPostUser ? <FormOutlined /> : null}
                    >
                      {textButton}
                    </Button>
                  </>
                </div>
              </div>
              <div className="div-description-mo">
                <div className="description">
                  <h3>Mô tả công việc</h3>
                  <div
                    style={{
                      whiteSpace: 'pre-line',
                      fontFamily: 'Roboto',
                      marginTop: '10px',
                    }}
                  >
                    {post?.data.description}
                  </div>
                </div>
                <Button
                  onClick={onclick}
                  className="btn-apply btn-for-mo"
                  type={'primary'}
                  disabled={checkApply}
                  style={{
                    fontSize: 16,
                    backgroundColor: `${backgroundButton}`,
                    color: "white",
                    fontWeight: "normal"
                  }}
                  icon={checkPostUser ? <FormOutlined /> : null}
                >
                  {textButton}
                </Button>
              </div>
              <div className="div-suggest">
                <h3 style={{ paddingLeft: 10 }}>Việc làm tương tự </h3>
                <div className="item">
                  {postNewest?.data.posts.map(
                    (item: PostNewest, index: null | number) => (
                      <ItemSuggest
                        key={index}
                        content={item.title}
                        imgBackground={item.image}
                        describe={item.company_name}
                        postId={item.id}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}

export default Detail
