import React, { useEffect, useRef, useState } from 'react'
// @ts-ignore
// import { Link } from 'react-router-dom'

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

// import icon
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import CloseIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import {
  FormOutlined,
  UserOutlined,
  RightOutlined,
  BarsOutlined,
} from '@ant-design/icons'

// import component
import SalaryFilterSubnav from './components/SalaryFilterSubnav'
import PositionFilterSubnav from './components/PositionFilterSubnav'
import CareerFilterSubnav from './components/CareerFilterSubnav'

import { Avatar } from 'antd'

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

const buttons = [
  <button className="btn btn__post">
    <FormOutlined style={{ color: 'white' }} />
    <span style={{ marginLeft: 10, color: 'white' }}>Đăng bài</span>
  </button>,
  <div className="actions-login">
    <button className="btn btn__login">
      <div style={{ display: 'flex' }}>
        <div className="login__avatar">
          <Avatar
            style={{ backgroundColor: '#0D99FF' }}
            icon={<UserOutlined />}
          />
        </div>
        <div className="login__center">
          <span>Đăng nhập</span>
        </div>
      </div>
      <div className="login__icon">
        <RightOutlined />
      </div>
    </button>
  </div>,
]

interface propsCloseSlider {
  openCollapse: boolean
  setOpenCollapse: React.Dispatch<React.SetStateAction<boolean>>
  setHeight: React.Dispatch<React.SetStateAction<number>>
  // height: number
}

const Navbar: React.FC<propsCloseSlider> = (props) => {
  const { openCollapse, setOpenCollapse, setHeight } = props
  const [salary, setSalary] = React.useState<number[]>([])
  const [openLocation, setOpenLocation] = React.useState(false)
  const [openCareer, setOpenCareer] = React.useState(false)
  const [openSalary, setOpenSalary] = React.useState(false)
  const [showTap, setshowTap] = React.useState(false)
  // thay đổi width setState
  const [windowWidth, setWindowWidth] = useState(false)
  // handle show tap on screen mobile
  const handleTap = () => {
    setshowTap(!showTap)
  }

  //  MOdalFilter
  const [openModalFilter, setOpenModalFilter] = React.useState(false)

  const handleClickInput = () => {
    setOpenCollapse(!openCollapse)
  }

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

  const [position, setPosition] = React.useState<string[]>([])
  const [carreer, setCareer] = React.useState<string[]>([])

  // áp dụng chọn địa điểm

  // event career
  useEffect(() => {
    const handleClickCloseTabLocation = (event: any) => {
      event.preventDefault()

      if (
        event.target !== document.querySelector(`.choose-locations`) ||
        event.target !== document.querySelector(`.subnav-chooses__carreer`)
      ) {
        setOpenLocation(false)
      }
    }

    window.addEventListener('click', handleClickCloseTabLocation)

    return () =>
      window.removeEventListener('click', handleClickCloseTabLocation)
  }, [])

  const ref = useRef<HTMLDivElement>(null)

  const handleCollapseEntered = () => {
    if (ref.current) {
      const height = ref.current.clientHeight

      setHeight(height)
    }
  }

  const handleCollapseExited = () => {
    if (ref.current) {
      setHeight(0)
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

  return (
    <Container className="nav" ref={ref}>
      <Wrapper>
        <Left>
          <Logo />
          <SearchContainer onClick={handleClickInput}>
            {/* <Input placeholder="Search" /> */}
            <div className="div-search">
              Nhập công việc mà bạn muốn tìm kiếm...
            </div>

            <SearchIcon
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            />
          </SearchContainer>
        </Left>
        <Center className="div-nav-center">
          <BarsOutlined style={{ fontSize: 25 }} onClick={handleTap} />
        </Center>
        <Right className="div-nav-right">
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
        in={openCollapse}
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
                  carreer.length === 0 ? (
                    <span
                      style={{
                        padding: '4px 8px',
                      }}
                    >
                      Chọn ngành nghề
                    </span>
                  ) : carreer.length <= 2 ? (
                    carreer.map((v, i) => (
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
                      {carreer.slice(0, 2).map((v, i) => (
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
      />
    </Container>
  )
}

export default Navbar
