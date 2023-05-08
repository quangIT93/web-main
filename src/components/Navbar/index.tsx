import React, { useEffect, useRef, useState } from 'react'
// @ts-ignore
// import { Link } from 'react-router-dom'

// @ts-ignore
import { Logo } from '#components'
// @ts-ignore
import { SearchIcon } from '#components'
// @ts-ignore

import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'

import { Collapse } from '@mui/material'
// import styled from '@emotion/styled'
import './style.scss'

// import Badge from '@mui/material/Badge'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemText from '@mui/material/ListItemText'
// @ts-ignore

import Slider from '@mui/material/Slider'

// import icon
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import CloseIcon from '@mui/icons-material/Close'

import {
  Container,
  Wrapper,
  SearchContainer,
  Left,
  Right,
  Center,
  ItemCenter,
  NavSearch,
  InputSearh,
  NavSearchButton,
  SearchButton,
  NavFilter,
  ChoosesCarreer,
  WrapChooseLocation,
  // SubNavChoosesCarreer,
  collapse,
} from './Css'

import { dataLocation, locationProp, careerProp, datacareer } from './data'

const buttons = [
  <Button
    key="one"
    style={{
      marginLeft: '8px',
      width: '120px',
      border: '1px solid black',
      padding: '12px',
    }}
  >
    Đăng nhập
  </Button>,
  <Button
    key="two"
    style={{
      marginLeft: '8px',
      width: '120px',
      border: '1px solid black',
      padding: '12px',
    }}
  >
    Đăng ký
  </Button>,
]
// import './style.scss'

// const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()

// const dataLocation: locationProp[] = [
//   {
//     id: '1',
//     city: 'Thành Phố Hồ Chí Minh',
//     district: [
//       'Quận 1',
//       'Quận 2',
//       'Quận 3',
//       'Quận 4',
//       'Quận 5',
//       'Quận 6',
//       'Quận 7',
//       'Quận 8',
//       'Quận 9',
//       'Quận 10',
//       'Quận 11',
//       'Quận 12',
//       'Tân Bình',
//       'Tân Phú',
//       'Phú Nhuận',
//     ],
//   },
//   {
//     id: '1',
//     city: 'Hà Nội',
//     district: [
//       'Quận 1',
//       'Quận 2',
//       'Quận 3',
//       'Quận 4',
//       'Quận 5',
//       'Quận 6',
//       'Quận 7',
//       'Quận 8',
//       'Quận 9',
//       'Quận 10',
//       'Quận 11',
//       'Quận 12',
//       'Tân Bình',
//       'Tân Phú',
//       'Phú Nhuận',
//     ],
//   },
//   {
//     id: '1',
//     city: 'Bình Dương',
//     district: [
//       'Quận 1',
//       'Quận 2',
//       'Quận 3',
//       'Quận 4',
//       'Quận 5',
//       'Quận 6',
//       'Quận 7',
//       'Quận 8',
//       'Quận 9',
//       'Quận 10',
//       'Quận 11',
//       'Quận 12',
//       'Tân Bình',
//       'Tân Phú',
//       'Phú Nhuận',
//     ],
//   },
// ]
interface propsCloseSlider {
  openCollapse: boolean
  setOpenCollapse: React.Dispatch<React.SetStateAction<boolean>>
  setHeight: React.Dispatch<React.SetStateAction<number>>
}

const Navbar: React.FC<propsCloseSlider> = (props) => {
  const { openCollapse, setOpenCollapse, setHeight } = props
  // console.log(openCollapse)

  // const [hidenNavPost, setHiddenNavPost] = useState('')
  // const handleNavPost = () => {
  //   if (!hidenNavPost) {
  //     setHiddenNavPost('hidenNavPost')
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     setHiddenNavPost('')
  //     document.body.style.overflow = 'scroll'
  //   }
  // }
  const [openSubJob, setOpenSubJob] = React.useState(false)
  const [openSubHistory, setOpenSubHistory] = React.useState(false)
  const [openLogin, setOpenLogin] = React.useState(false)
  // const [openCollapse, setOpenCollapse] = React.useState(false)
  const [openLocation, setOpenLocation] = React.useState(false)
  const [openCareer, setOpenCareer] = React.useState(false)
  const [openSalary, setOpenSalary] = React.useState(false)

  const handleClickLogin = () => {
    setOpenLogin(!openLogin)
  }

  const handleClickInput = () => {
    setOpenCollapse(!openCollapse)
  }

  const handleClickArrowJob = () => {
    if (!openSubJob) return setOpenSubJob(true)
    setOpenSubJob(false)
  }

  const handleClickArrowHistory = () => {
    if (!openSubHistory) return setOpenSubHistory(true)
    setOpenSubHistory(false)
  }

  const handleClickArrowLocation = (e: any) => {
    console.log(e.target)
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
  // event change salary
  function valuetext(value: number) {
    return `${value}`
  }

  const [value, setValue] = React.useState<number[]>([0, 100000000])
  const [salary, setSalary] = React.useState<number[]>([])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  function handleClickAddSalary() {
    // setOpenSalary(false)
    console.log(salary)
    setSalary(value)
  }

  // event checkboxPosition

  const [checkedState, setCheckedState] = useState<string[]>([])

  const [position, setPosition] = React.useState<string[]>([])

  const handleOnChangeCheckboxPosition = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentValue = e.target.value

    // Nếu phần tử đã có trong mảng, loại bỏ nó
    if (checkedState.includes(currentValue)) {
      setCheckedState((prevState) =>
        prevState.filter((value) => value !== currentValue)
      )
    }
    // Nếu phần tử chưa có trong mảng, thêm vào
    else {
      setCheckedState((prevState) => [...prevState, currentValue])
    }
  }

  const handleClickCheckboxPosition = () => {
    setPosition(checkedState)
  }

  // event career
  useEffect(() => {
    const handleClickCloseTabLocation = (event: any) => {
      // console.log(document.querySelector(`.nav`)?.clientHeight)
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

  useEffect(() => {
    const divElement = ref.current
    if (divElement) {
      const handleTransitionEnd = () => {
        // Khi transition kết thúc, lấy chiều cao của phần tử
        // const height = divElement.offsetHeight;
        setHeight(divElement?.offsetHeight)
        // console.log('Chiều cao của phần tử:', height)
      }

      // Thêm event listener cho sự kiện transitionend
      divElement.addEventListener('transitionend', handleTransitionEnd)

      // Xóa event listener khi component unmount
      return () => {
        divElement.removeEventListener('transitionend', handleTransitionEnd)
      }
    }
  }, [ref.current?.offsetHeight, setHeight])

  return (
    <Container className="nav" ref={ref}>
      <Wrapper>
        <Left>
          <Logo />
          <SearchContainer onClick={handleClickInput}>
            {/* <Input placeholder="Search" /> */}
            Nhập công việc mà bạn muốn tìm kiếm...
            <SearchIcon
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <ItemCenter>Trang chủ</ItemCenter>
          <ItemCenter onClick={handleClickArrowJob}>
            Công việc
            {openSubJob ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </ItemCenter>
          <ItemCenter onClick={handleClickArrowHistory}>
            Lịch sử
            {openSubHistory ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </ItemCenter>
        </Center>
        <Right>
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
            <ButtonGroup sx={{ margin: '0' }}>
              {buttons}

              <Button
                variant="contained"
                style={{
                  marginLeft: '16px',
                  borderRadius: '30px',
                  width: '80px',
                  background: 'white',
                }}
                onClick={handleClickLogin}
              >
                <Person2OutlinedIcon
                  // fontSize="large"
                  sx={{
                    fontSize: '40px',
                    borderRadius: '50%',
                    background: 'blue',
                    padding: '4px',
                    color: 'white',
                  }}
                />
                {openLogin ? (
                  <ExpandLess sx={{ color: '#000' }} />
                ) : (
                  <ExpandMore sx={{ color: '#000' }} />
                )}
                <Collapse
                  in={openLogin}
                  timeout="auto"
                  unmountOnExit
                  sx={collapse}
                >
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'red',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <Person2OutlinedIcon
                        component="div"
                        id="nested-list-subheader"
                      >
                        Nested List Items
                      </Person2OutlinedIcon>
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Person2OutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sent mail" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <Person2OutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClickLogin}>
                      <ListItemIcon>
                        <Person2OutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                      {openLogin ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openLogin} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                          <ListItemText primary="Starred" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </Button>
            </ButtonGroup>
          </Box>
        </Right>
      </Wrapper>
      <Collapse
        in={openCollapse}
        timeout="auto"
        unmountOnExit
        sx={{
          // backgroundColor: '#ccc',
          width: '100%',
          boxSizing: 'border-box',
          borderTop: '1px solid #ccc',
        }}
      >
        <NavSearch>
          <InputSearh placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..." />
          <NavSearchButton>
            <SearchButton style={{ backgroundColor: '#48a5f2', color: '#fff' }}>
              <SearchOutlinedIcon
                sx={{ marginRight: '2px', fontSize: '18px', color: '#fff' }}
              />
              Tìm kiếm
            </SearchButton>
            <SearchButton>
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
              <LocationOnOutlinedIcon
                sx={{ marginRight: '8px', overflow: 'hidden' }}
              />
              <div
                style={{
                  width: '260px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  overflowX: 'hidden',
                }}
              >
                {
                  position.length === 0
                    ? 'Chọn địa điểm'
                    : position.map((v, i) => (
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

                  // `${position[0]} - ${position[1]} - ${position[2]}`
                }
              </div>
              {openLocation ? (
                <KeyboardArrowDownOutlinedIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </WrapChooseLocation>
            <Collapse
              in={openLocation}
              timeout="auto"
              unmountOnExit
              sx={{
                position: 'absolute',
                top: '100%',
                background: '#fff',
                // padding: '12px 24px',
                marginTop: '24px',
                minWidth: '400px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '1px 1px 5px #000',
                height: '400px',
                zIndex: 1,
              }}
              className="subnav-chooses__carreer"
              onClick={(e: any) => e.stopPropagation()}
            >
              <h3 style={{ padding: '12px 24px', textAlign: 'center' }}>
                Địa điểm
              </h3>

              <ul
                className="list-locations"
                style={{
                  height: '300px',
                  borderTop: '1px solid #ccc',
                  borderBottom: '1px solid #ccc',
                  overflowY: 'scroll',
                  margin: '0 24px',
                }}
              >
                {dataLocation.map((location: locationProp, index1) => (
                  <li
                    key={index1}
                    style={{
                      padding: '4px 0 24px',
                      listStyle: 'none',
                    }}
                    className="list-location"
                  >
                    <h4
                      style={{
                        padding: '6px 0',
                        borderBottom: '1px solid #ccc',
                        color: '#1b87f5 ',
                      }}
                    >
                      {location.city}
                    </h4>
                    {location.district.map((name: string, index2) => (
                      <label
                        key={index2}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px',
                          borderBottom: '1px solid #ccc',
                        }}
                        htmlFor={name}
                      >
                        {name}
                        <input
                          type="checkbox"
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '4px',
                          }}
                          id={name}
                          value={name}
                          onChange={(e) =>
                            handleOnChangeCheckboxPosition(index1, e)
                          }
                          checked={checkedState.includes(name) ? true : false}
                        />
                      </label>
                    ))}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: '0px 24px',
                  padding: '24px 0',
                  gap: '10px',
                  flexDirection: 'row',
                }}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    width: '108px',
                    height: '48px',
                    borderRadius: '10px',
                    outline: 'none',
                    border: 'none',
                  }}
                >
                  Huỷ
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    width: '108px',
                    height: '48px',
                    background: '#0D99FF',
                    borderRadius: '10px',
                    outline: 'none',
                    border: 'none',
                    color: 'white',
                  }}
                  onClick={handleClickCheckboxPosition}
                >
                  Áp dụng
                </button>
              </div>
            </Collapse>
          </ChoosesCarreer>
          <ChoosesCarreer>
            <WrapChooseLocation onClick={handleClickArrowCarreer}>
              <BusinessCenterOutlinedIcon sx={{ marginRight: '8px' }} />
              <span style={{ width: '260px' }}>Chọn ngành nghề</span>
              {openCareer ? (
                <KeyboardArrowDownOutlinedIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </WrapChooseLocation>

            <Collapse
              in={openCareer}
              timeout="auto"
              unmountOnExit
              sx={{
                position: 'absolute',
                top: '100%',
                background: '#fff',
                // padding: '12px 24px',
                marginTop: '24px',
                minWidth: '400px',
                borderRadius: '12px',
                // overflow: 'hidden',
                boxShadow: '1px 1px 5px #000',
                height: '400px',
                zIndex: 1,
              }}
              className="subnav-chooses__carreer"
            >
              <h3 style={{ padding: '12px 24px', textAlign: 'center' }}>
                Địa điểm
              </h3>

              <ul
                className="list-locations"
                style={{
                  height: '300px',
                  borderTop: '1px solid #ccc',
                  borderBottom: '1px solid #ccc',
                  overflowY: 'scroll',
                  margin: '0 24px',
                }}
              >
                {datacareer.map((carreers: careerProp, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '4px 0 24px',
                      listStyle: 'none',
                    }}
                    className="list-location"
                  >
                    <h4
                      style={{
                        padding: '6px 0',
                        borderBottom: '1px solid #ccc',
                        color: '#1b87f5 ',
                      }}
                    >
                      {carreers.career}
                    </h4>
                    {carreers.jobs.map((name: string, index) => (
                      <label
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px',
                          borderBottom: '1px solid #ccc',
                        }}
                        htmlFor={name}
                      >
                        {name}
                        <input
                          type="checkbox"
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '4px',
                          }}
                          id={name}
                        />
                      </label>
                    ))}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: '0px 24px',
                  padding: '24px 0',
                  gap: '10px',
                  flexDirection: 'row',
                }}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    width: '108px',
                    height: '48px',
                    borderRadius: '10px',
                    outline: 'none',
                    border: 'none',
                  }}
                >
                  Huỷ
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    width: '108px',
                    height: '48px',
                    background: '#0D99FF',
                    borderRadius: '10px',
                    outline: 'none',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  Áp dụng
                </button>
              </div>
            </Collapse>
          </ChoosesCarreer>
          <ChoosesCarreer>
            <WrapChooseLocation onClick={handleClickArrowSalary}>
              <AttachMoneyOutlinedIcon sx={{ marginRight: '8px' }} />
              <span style={{ width: '260px' }}>
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
        <Collapse
          in={openSalary}
          timeout="auto"
          unmountOnExit
          sx={{
            background: '#fff',
            minWidth: '100%',
            overflow: 'hidden',
          }}
          className="subnav-chooses-__carreer"
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingTop: '12px',
            }}
          >
            <div className="rangeSalary" style={{ display: 'flex' }}>
              <p style={{ flex: '3', textAlign: 'center' }}>
                Lương từ
                <span style={{ color: 'black', fontWeight: '600' }}>
                  {' '}
                  {value[0].toLocaleString()}{' '}
                </span>
                đến
                <span style={{ color: 'black', fontWeight: '600' }}>
                  {' '}
                  {value[1].toLocaleString()}{' '}
                </span>
              </p>
              <div className="wrapRadiSalary" style={{ flex: '1' }}>
                <input type="radio" id="html" />
                <label htmlFor="html" style={{ paddingLeft: '8px' }}>
                  VND
                </label>
                <input type="radio" id="css" />
                <label htmlFor="css" style={{ paddingLeft: '8px' }}>
                  USD
                </label>
              </div>
            </div>
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={100000000}
              step={1000000}
              sx={{ width: '50%', margin: '0 auto' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '0px 24px',
                padding: '24px 0',
                gap: '10px',
                flexDirection: 'row',
              }}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  width: '108px',
                  height: '48px',
                  borderRadius: '10px',
                  outline: 'none',
                  border: 'none',
                }}
              >
                Huỷ
              </button>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  width: '108px',
                  height: '48px',
                  background: '#0D99FF',
                  borderRadius: '10px',
                  outline: 'none',
                  color: 'white',
                  border: 'none',
                }}
                onClick={handleClickAddSalary}
              >
                Áp dụng
              </button>
            </div>
          </Box>
        </Collapse>
      </Collapse>
    </Container>
  )
}

export default Navbar
