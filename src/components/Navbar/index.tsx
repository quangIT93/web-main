import React, { useEffect, useRef, useState, useContext } from 'react'
// @ts-ignore
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate, Link } from 'react-router-dom'

import ModalLogin from '../../components/Home/ModalLogin'

// @ts-ignore
import { Logo } from '#components'
// @ts-ignore
import { SearchIcon } from '#components'
// @ts-ignore
import { ModalFilter } from '#components'

import FilterLocationNav from './FilterLocationNav'

// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'

import { Collapse } from '@mui/material'
// import styled from '@emotion/styled'
import './style.scss'

import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// import icon

import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'

import {
  FormOutlined,
  UserOutlined,
  RightOutlined,
  BarsOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  KeyOutlined,
  LoadingOutlined,
} from '@ant-design/icons'



// import component
import SalaryFilterSubnav from './components/SalaryFilterSubnav'
import PositionFilterSubnav from './components/PositionFilterSubnav'
import CareerFilterSubnav from './components/CareerFilterSubnav'
import SearchInput from './SearchInput'

import { Avatar, Button, Space, Spin } from 'antd'

import authApi from 'api/authApi'
import profileApi from 'api/profileApi'

import {
  Container,
  Wrapper,
  SearchContainer,
  Left,
  Right,
  Center,
  NavSearch,
  InputSearh,
  NavSearchButton,
  SearchButton,
  NavFilter,
  ChoosesCarreer,
  WrapChooseLocation,
  collapseCssFilter,
} from './Css'

import { getProfile } from 'store/reducer/profileReducer/getProfileReducer'
import { RootState } from '../../store/reducer'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../store/index'

// import Context
import { HomeValueContext } from 'context/HomeValueContextProvider'
import { DivRef1 } from 'context/HomeValueContextProvider'

const Navbar: React.FC = () => {
  const {
    openCollapseFilter,
    setOpenCollapseFilter,
    // setHeightNavbar,
    SetRefNav,
  }: // setRefNav,
    {
      openCollapseFilter: boolean
      setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>
      // heightNavbar: number
      // setHeightNavbar: React.Dispatch<React.SetStateAction<number>>
      SetRefNav: React.Dispatch<React.SetStateAction<DivRef1>>
    } = useContext(HomeValueContext)

  const [showTap, setshowTap] = React.useState(false)

  const [valueSearchInput, setValueSearchInput] = useState<string | undefined>()

  const [openModalLogin, setOpenModalLogin] = React.useState(false)
  const [openInfoUser, setOpenInfoUser] = React.useState(false)
  const [openBackdrop, setOpenBackdrop] = React.useState(false)
  const [spinning, setSpinning] = React.useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

  const navigate = useNavigate()

  // thay đổi width setState
  const [windowWidth, setWindowWidth] = useState(false)

  // use redux
  const dispatch = useDispatch()
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch)

  //const dataProfile: any = useSelector((data: RootState) => data.profile)

  const dataProfile = useSelector((state: RootState) => state.profileUser)
  // handle show tap on screen mobile
  const handleTap = () => {
    setshowTap(!showTap)
  }

  //  MOdalFilter
  const [openModalFilter, setOpenModalFilter] = React.useState(false)

  // const handleClickInput = () => {
  //   setOpenCollapse(!openCollapse)
  // }

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false)
  }

  // fecth data profile with accesstoken
  const fecthDataProfileUser = async () => {
    try {
      await dispatch(getProfile() as any)

      const result = await profileApi.getProfile()
      if (result) {
        setProfileUser(result.data)
      }
    } catch (error) {
      setOpenBackdrop(false)
      // error authentication
      // setOpenBackdrop(true)
      // if (!localStorage.getItem('accessToken')) {
      //   setOpenBackdrop(false)
      //   return
      // }
      // const result = await profileApi.getProfile()
      // if (result) {

      //   setProfileUser(result.data)
      //   setOpenBackdrop(false)
      // }
      // await dispatch(getProfile() as any)
    }
  }

  useEffect(() => {
    fecthDataProfileUser()
    dispatch(getProfile() as any)
  }, [])

  const ref = React.useRef<HTMLDivElement | null>(null)

  const handleCollapseEntered = () => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height
      SetRefNav(ref)
      // setHeightNavbar(height)
    }
  }

  const handleCollapseExited = () => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height

      // setHeightNavbar(height)
      SetRefNav(ref)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setWindowWidth(true)
      } else {
        setWindowWidth(false)
      }
    }
    SetRefNav(ref)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // handle Show modal Filter
  const handleShowModalFilter = () => {
    if (!openModalFilter) return setOpenModalFilter(true)
    setOpenModalFilter(false)
  }

  const handleSearch = () => {
    const encode = encodeURIComponent(`${valueSearchInput}`)

    window.open(`/search-results?q=${encode}`, "_parent")
  }

  // login
  const handleClickLogin = async () => {
    try {
      if (openInfoUser) {
        setSpinning(false)
        setOpenInfoUser(!openInfoUser)
      } else {
        setSpinning(true)
      }
      var result = null
      if (localStorage.getItem('accessToken')) {
        result = await profileApi.getProfile()
      }
      if (result) {
        console.log(result)
        setProfileUser(result.data)
        setSpinning(false)
        setOpenInfoUser(!openInfoUser)
      } else {
        setOpenModalLogin(true)
        setSpinning(false)
      }
    } catch (error) {
      console.log(error)
      // if (!localStorage.getItem("accessToken")) {
      //   setSpinning(false)
      //   setOpenInfoUser(false)
      //   setOpenModalLogin(true)
      // } else {
      //   setSpinning(false)
      //   setOpenInfoUser(!openInfoUser)
      // }
      setSpinning(false)
    }
  }

  // handle logout
  const handleLogout = async () => {
    try {
      console.log('d')
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        const result = await authApi.signOut(refreshToken)
        if (result) {
          window.location.replace('/home')
          localStorage.clear()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const buttons = [
    <button
      className="btn btn__post"
      onClick={() => {
        if (dataProfile && localStorage.getItem('refreshToken')) {
          window.open('/post', '_blank')
        } else {
          setOpenModalLogin(true)
        }
      }}
    >
      <FormOutlined style={{ color: 'white' }} />
      <p style={{ marginLeft: 10, color: 'white' }}>Đăng bài</p>
    </button>,
    <div className="actions-login" onClick={handleClickLogin}>
      <button className="btn btn__login">
        <div style={{ display: 'flex' }}>
          <div className="login__avatar">
            <Avatar
              style={{ backgroundColor: '#0D99FF' }}
              icon={<UserOutlined />}
              src={dataProfile.avatar ? dataProfile.avatar : ''}
            />
          </div>
          <div className="login__center">
            {localStorage.getItem('accessToken') && dataProfile ? (
              <span>{dataProfile.name}</span>
            ) : (
              <span>Đăng nhập</span>
            )}
          </div>
        </div>
        <div className="login__icon">
          <RightOutlined />
        </div>
      </button>
      <Spin indicator={antIcon} spinning={spinning}>
        {openInfoUser && (
          <div className="sub-login">
            <Space className="sub-login_info">
              <Avatar
                style={{ backgroundColor: '#0D99FF' }}
                icon={<UserOutlined style={{ fontSize: 30 }} />}
                size={50}
                src={dataProfile?.avatar ? dataProfile.avatar : null}
              />
              <div>
                <h2>{dataProfile?.name ? dataProfile.name : ''}</h2>
                <span>{dataProfile?.email ? dataProfile?.email : ''}</span>
              </div>
            </Space>
            <div className="sub-login_items">
              <Link to="/profile">
                <div className="sub-login_item">
                  <SyncOutlined />
                  <span>Cập nhật thông tin</span>
                </div>
              </Link>
              <Link to="/history">
                <div
                  className="sub-login_item"
                // onClick={() => {
                //   window.open('/history', "_top")
                // }}
                >
                  <ClockCircleOutlined />
                  <span>Lịch sử</span>
                </div>
              </Link>
              <div className="sub-login_item">
                <KeyOutlined />
                <span>Đổi mật khẩu</span>
              </div>
              <div className="sub-login_item" onClick={handleLogout}>
                <LogoutOutlined />
                <span>Đăng xuất</span>
              </div>
            </div>
          </div>
        )}
      </Spin>
    </div>,
  ]

  return (
    <Container className="nav" ref={ref}>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
      <Backdrop
        sx={{
          color: '#0d99ff ',
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Wrapper>
        <Left>
          <Logo />
        </Left>
        <Center className="div-nav-center">
          {/* <div>assssssssssssssssssssssssssssssss</div> */}
          <SearchInput value={valueSearchInput} setValue={setValueSearchInput} />
          <Button onClick={handleSearch}>Tim Kiem</Button>

          <Button onClick={() => setOpenCollapseFilter(!openCollapseFilter)}>
            <TuneOutlinedIcon />
          </Button>
        </Center>
        <Right className="div-nav-right">
          <div className="tabBar-right">
            <BarsOutlined style={{ fontSize: 25 }} onClick={handleTap} />
          </div>
          {/* <Button
            variant="contained"
            startIcon={<AdsClickIcon />}
            style={{ marginRight: '25px' }}
            sx={boxSX}
            onClick={handleClick}
          >
            Hãy nhấn vào
            {open ? <ExpandLess /> : <ExpandMore />}
            <Collapse in={open} timeout="auto" unmountOnExit sx={collapse}>
              <Div>adjklasdjkla</Div>
            </Collapse>
          </Button> */}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup sx={{ margin: '0' }}>{buttons}</ButtonGroup>
          </Box>
        </Right>
      </Wrapper>
      <Collapse
        in={openCollapseFilter}
        // timeout="auto"
        // unmountOnExit
        onEnter={handleCollapseEntered}
        onExited={handleCollapseExited}
        sx={collapseCssFilter}
      >
        <div className="filter-wrap_top">
          <FilterLocationNav />
        </div>
        <div>áldkjakl;sjdl;kạd s ada sd ád ád á d ád</div>
        <div>áldkjakl;sjdl;kạd s ada sd ád ád á d ád</div>
        <div>áldkjakl;sjdl;kạd s ada sd ád ád á d ád</div>
        <div>áldkjakl;sjdl;kạd s ada sd ád ád á d ád</div>
        <div>áldkjakl;sjdl;kạd s ada sd ád ád á d ád</div>
        <div>áldkjakl;sjdl;kạd s ada sd ád ád á d ád</div>
      </Collapse>
    </Container>
  )
}

export default Navbar
