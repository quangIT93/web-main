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
// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'

import { Collapse } from '@mui/material'
// import styled from '@emotion/styled'
import './style.scss'

import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// import icon
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import CloseIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
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

import { Button } from 'antd'

// import component
import SalaryFilterSubnav from './components/SalaryFilterSubnav'
import PositionFilterSubnav from './components/PositionFilterSubnav'
import CareerFilterSubnav from './components/CareerFilterSubnav'
import SearchInput from './SearchInput'

import { Avatar, Space, Spin } from 'antd'

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

interface propsCloseSlider {
  openCollapse: boolean
  setOpenCollapse: React.Dispatch<React.SetStateAction<boolean>>
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<propsCloseSlider> = (props) => {
  const {
    openCollapseFilter,
    setOpenCollapseFilter,
  }: {
    openCollapseFilter: boolean
    setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>
  } = useContext(HomeValueContext)

  const [salary, setSalary] = React.useState<number[]>([])
  const [openLocation, setOpenLocation] = React.useState(false)
  const [openCareer, setOpenCareer] = React.useState(false)
  const [openSalary, setOpenSalary] = React.useState(false)
  const [showTap, setshowTap] = React.useState(false)

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

  const handleClickArrowLocation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()

    if (
      !openLocation &&
      e.target !== document.querySelector(`.subnav-chooses__carreer`)
    ) {
      setOpenLocation(true)
      setOpenCareer(false)
      setOpenSalary(false)
    } else {
      setOpenLocation(false)
    }
  }

  const handleClickArrowCarreer = () => {
    if (!openCareer) {
      setOpenCareer(true)
      setOpenSalary(false)
      setOpenLocation(false)
    } else {
      setOpenCareer(false)
    }
  }

  const handleClickArrowSalary = () => {
    if (!openSalary) {
      setOpenSalary(true)
      setOpenCareer(false)
      setOpenLocation(false)
    } else {
      setOpenSalary(false)
    }
  }

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false)
  }

  const [position, setPosition] = React.useState<string[]>([])
  const [career, setCareer] = React.useState<string[]>([])

  // áp dụng chọn địa điểm

  // event career
  useEffect(() => {
    const handleClickCloseTabLocation = (event: any) => {
      // event.preventDefault()

      if (
        event.target !== document.querySelector(`.choose-locations`) ||
        event.target !== document.querySelector(`.subnav-chooses__carreer`)
      ) {
        setOpenLocation(false)
        // setOpenInfoUser(!openInfoUser)
      }
    }
    window.addEventListener('click', handleClickCloseTabLocation)
    return () =>
      window.removeEventListener('click', handleClickCloseTabLocation)
  }, [])

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
  // fecth data user when access token changes
  const fecthDataProfileWhileAccecsToken = async () => {
    const result = await profileApi.getProfile()
    if (result) {
      setProfileUser(result.data)
      setOpenBackdrop(false)
    }
  }
  // useEffect(() => {
  //   fecthDataProfileWhileAccecsToken()
  // }, [localStorage.getItem('accessToken')])

  useEffect(() => {
    fecthDataProfileUser()
    dispatch(getProfile() as any)
  }, [])

  const ref = useRef<HTMLDivElement>(null)

  const handleCollapseEntered = () => {
    if (ref.current) {
      const height = ref.current.clientHeight
      // setHeightNavbar()
    }
  }

  const handleCollapseExited = () => {
    if (ref.current) {
      // setHeightNavbar(0)
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
          <SearchInput />
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
        timeout="auto"
        unmountOnExit
        onEnter={handleCollapseEntered}
        onExited={handleCollapseExited}
        sx={collapseCssFilter}
      >
        <NavSearch>
          <InputSearh placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..." />
          <NavSearchButton>
            <SearchButton
              style={{
                backgroundColor: '#48a5f2',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <SearchOutlinedIcon
                sx={{
                  marginRight: '2px',
                  fontSize: '18px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              />
              Tìm kiếm
            </SearchButton>
            <SearchButton
              style={{ cursor: 'pointer' }}
              onClick={handleShowModalFilter}
            >
              <TuneOutlinedIcon sx={{ marginRight: '2px', fontSize: '18px' }} />
              Lọc
            </SearchButton>
          </NavSearchButton>
        </NavSearch>
        <NavFilter>
          <ChoosesCarreer>
            <WrapChooseLocation
              onClick={handleClickArrowLocation}
              className="choose-locations"
            >
              <div
                style={{
                  // width: '260px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  overflowX: 'hidden',
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{ marginRight: '8px', overflow: 'hidden' }}
                />
                {position.length === 0 ? (
                  <span
                    style={{
                      padding: '4px 8px',
                    }}
                  >
                    Chọn địa điểm
                  </span>
                ) : position.length <= 2 ? (
                  position.map((v, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 8px',
                        background: '#ccc',
                        borderRadius: '12px',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        alignItems: 'center',
                        marginRight: '4px',
                      }}
                    >
                      {`${v}`}
                      <CloseIcon sx={{ fontSize: '20px' }} />
                    </span>
                  ))
                ) : (
                  <>
                    {position.slice(0, windowWidth ? 1 : 2).map((v, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '4px 8px',
                          background: '#ccc',
                          borderRadius: '12px',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          alignItems: 'center',
                          marginRight: '12px',
                        }}
                      >
                        {`${v}`}
                        <CloseIcon sx={{ fontSize: '20px' }} />
                      </span>
                    ))}
                    <span
                      style={{
                        padding: '2px',
                        background: '#ccc',
                        borderRadius: '50%',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        alignItems: 'center',
                        marginRight: '12px',
                      }}
                    >
                      <MoreHorizIcon />
                    </span>
                  </>
                )}
              </div>
              {openLocation ? (
                <KeyboardArrowDownOutlinedIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </WrapChooseLocation>
            <PositionFilterSubnav
              openLocation={openLocation}
              setPosition={setPosition}
            />
          </ChoosesCarreer>
          <ChoosesCarreer>
            <WrapChooseLocation onClick={handleClickArrowCarreer}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  overflowX: 'hidden',
                }}
              >
                <BusinessCenterOutlinedIcon sx={{ marginRight: '8px' }} />
                {
                  career.length === 0 ? (
                    <span
                      style={{
                        padding: '4px 8px',
                      }}
                    >
                      Chọn ngành nghề
                    </span>
                  ) : career.length <= 2 ? (
                    career.map((v, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '4px 8px',
                          background: '#ccc',
                          borderRadius: '12px',
                          // maxWidth: '120px',
                          // minWidth: '90px',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          alignItems: 'center',
                          marginRight: '12px',
                        }}
                      >
                        {`${v}`}
                        <CloseIcon sx={{ fontSize: '20px' }} />
                      </span>
                    ))
                  ) : (
                    <>
                      {career.slice(0, 2).map((v, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '4px 8px',
                            background: '#ccc',
                            borderRadius: '12px',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            alignItems: 'center',
                            marginRight: '12px',
                          }}
                        >
                          {`${v}`}
                          <CloseIcon sx={{ fontSize: '20px' }} />
                        </span>
                      ))}
                      <span
                        style={{
                          padding: '2px',
                          background: '#ccc',
                          borderRadius: '12px',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          alignItems: 'center',
                          marginRight: '12px',
                        }}
                      >
                        <MoreHorizIcon />
                      </span>
                    </>
                  )

                  // `${position[0]} - ${position[1]} - ${position[2]}`
                }
              </div>

              {openCareer ? (
                <KeyboardArrowDownOutlinedIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </WrapChooseLocation>

            <CareerFilterSubnav setCareer={setCareer} openCareer={openCareer} />
          </ChoosesCarreer>
          <ChoosesCarreer>
            <WrapChooseLocation onClick={handleClickArrowSalary}>
              <span
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                }}
              >
                <AttachMoneyOutlinedIcon sx={{ marginRight: '8px' }} />
                {salary.length === 0
                  ? 'Chọn mức lương'
                  : `${salary[0].toLocaleString()} - ${salary[1].toLocaleString()}`}
              </span>
              {openSalary ? (
                <KeyboardArrowDownOutlinedIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </WrapChooseLocation>
          </ChoosesCarreer>
        </NavFilter>
        {/* filter salary */}
        <SalaryFilterSubnav setSalary={setSalary} openSalary={openSalary} />
      </Collapse>
      <ModalFilter
        openModalFilter={openModalFilter}
        setOpenModalFilter={setOpenModalFilter}
        setOpenLocation={setOpenLocation}
        openLocation={openLocation}
        setPosition={setPosition}
        position={position}
        handleClickArrowLocation={handleClickArrowLocation}
        windowWidth={windowWidth}
        setCareer={setCareer}
        career={career}
        salary={salary}
        setSalary={setSalary}
      />
    </Container>
  )
}

export default Navbar
