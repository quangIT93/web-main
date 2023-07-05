import React, { useState, useEffect } from 'react'
// import ReactHtmlParser from 'react-html-parser'

import { Space, Tooltip, Input, Switch } from 'antd'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled, lighten, darken } from '@mui/system'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  NativeSelect,
  ListSubheader,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Autocomplete,
  Box,
  Chip,
  ListItemButton,
  Collapse,
} from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
// import Api
import notificationApi from 'api/notification'
import notificationKeywordApi from 'api/notificationKeyword'
import locationApi from '../../../api/locationApi'

import { LocationIcon, CateIcon, CreateKeywordIcon } from '#components/Icons'

import './style.scss'
// import fake data notificates
import { notificates } from './data'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const Notificate = () => {
  const [dataNotification, setDataNotification] = useState<any>([])
  const [dataNotificationKeyword, setDataNotificationkeyword] = useState<any>(
    []
  )
  const [dataAllLocation, setDataAllLocation] = React.useState<any>(null)
  const [selectedProvince, setSelectedProvince] = useState<any>(null)

  const [activeSystem, setActiveSystem] = useState(true)
  const [activeKeyword, setActiveKeyword] = useState(false)

  const [showCreateNotification, setShowCreateNotification] = useState(false)

  const [input, setInput] = useState(true)

  const [value, setValue] = React.useState<string | number>('')

  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  )

  const [open, setOpen] = React.useState<any>([])
  const locations: any = []
  const [location, setLocation] = React.useState<any>(
    locations?.map((v: any, i: number) => v.district)
  )

  const [locationId, setLocationId] = React.useState<any>(
    locations?.map((v: any, i: number) => v.district_id)
  )
  const options = [
    {
      province: {
        id: 1,
        name: 'Tỉnh A',
      },
      districts: [
        { id: 1, name: 'Quận A1' },
        { id: 2, name: 'Quận A2' },
        { id: 3, name: 'Quận A3' },
        { id: 4, name: 'Quận A4' },
        { id: 5, name: 'Quận A5' },
        { id: 6, name: 'Quận A6' },
      ],
    },
    {
      province: {
        id: 2,
        name: 'Tỉnh B',
      },
      districts: [
        { id: 3, name: 'Quận B1' },
        { id: 4, name: 'Quận B2' },
      ],
    },
    // ...
  ]

  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(0)

  const handleChangeDistrict = (event: any) => {
    setSelectedDistrictId(event.target.value as number)
  }

  // const inputRef = useRef<InputRef>(null);
  const sharedProps = {
    style: { width: '100%' },
    defaultValue: 'Ant Design love you!',
    // ref: inputRef,
  }

  const handleClickActiveSystem = () => {
    setActiveSystem(true)
    if (activeKeyword === true) setActiveKeyword(false)
  }

  const handleClickActiveKeyword = () => {
    setActiveKeyword(true)
    if (activeSystem === true) setActiveSystem(false)
  }
  const getApiNotificate = async () => {
    try {
      const result = await notificationApi.getNotificationV2()
      if (result) {
        setDataNotification(result.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getApiNotificate()
  }, [])

  const allLocation = async () => {
    try {
      const allLocation = await locationApi.getAllLocation()

      if (allLocation) {
        setDataAllLocation(allLocation.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    allLocation()
    // getAllLocations()
    // delete param when back to page
  }, [])

  const getApiNotificateKeyword = async () => {
    try {
      const result = await notificationKeywordApi.getNotificationKeyword()
      if (result) {
        setDataNotificationkeyword(result.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getApiNotificateKeyword()
  }, [])

  const handleChangeValueProvince = (event: any) => {
    console.log('Event.target.value', event.target.value)

    setValue(event.target.value)
  }

  console.log('dataNotification', dataNotification)
  console.log('dataNotificationKeyword', dataNotificationKeyword)
  console.log('dataALLpROFIVE', dataAllLocation)

  //   console.log('noti', notificationApi)
  const handleClickProvince = (event: any, index: number) => {
    event.stopPropagation()
    const newOpen = open.map((value: boolean, i: number) =>
      i === index ? !value : false
    )
    setOpen(newOpen)
  }

  const handleClickDistrict = (value: any) => {
    setLocation((prevValues: number[]) => {
      if (prevValues.includes(value.district)) {
        // Nếu giá trị đã tồn tại, xoá nó khỏi
        const newValues = prevValues.filter((item) => item !== value.district)
        return newValues
      } else {
        // Nếu giá trị chưa tồn tại, thêm nó vào mảng
        const newValues = [...prevValues, value.district]
        return newValues
      }
    })

    setLocationId((prevValuesId: number[]) => {
      if (prevValuesId.includes(value.district_id)) {
        // Nếu giá trị đã tồn tại, xoá nó khỏi
        const newValues = prevValuesId.filter(
          (item: number) => item !== value.district_id
        )
        return newValues
      } else {
        // Nếu giá trị chưa tồn tại, thêm nó vào mảng
        const newValues = [...prevValuesId, value.district_id]
        return newValues
      }
    })
  }

  const renderOptions = () => {
    return dataAllLocation?.map((item: any, index: number) => (
      <div key={index}>
        <ListItemButton onClick={(event) => handleClickProvince(event, index)}>
          <ListItemText primary={item.province_fullName} />
          {open[index] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open[index]} timeout="auto" unmountOnExit>
          {item.districts.map((v: any, i: number) => (
            <MenuItem
              key={i}
              value={v.district}
              onClick={() => handleClickDistrict(v)}
            >
              <Checkbox checked={location?.indexOf(v.district) > -1} />
              <ListItemText primary={v.district} />
            </MenuItem>
          ))}
        </Collapse>
      </div>
    ))
  }
  return (
    <div className="notification">
      <div className="top-notificate">
        <div
          className={`top-notificate_system ${
            activeSystem ? 'active-system' : ''
          }`}
          onClick={handleClickActiveSystem}
        >
          Thông báo
        </div>
        <div
          className={`top-notificate_keyword ${
            activeKeyword ? 'active-keyword' : ''
          }`}
          onClick={handleClickActiveKeyword}
        >
          Từ khoá
        </div>
      </div>
      <div className="bottom-notificate">
        {activeSystem ? (
          dataNotification?.notifications?.map(
            (notificate: any, index: number) => {
              if (notificate.data.typeText === 'keyword') {
                return (
                  <div key={index} className="wrap-system">
                    <div className="wrap-img_keyword">
                      <img src={notificate.data.image} alt="ảnh lỗi" />
                    </div>
                    <div className="content-notificate">
                      <div className="wrap-title_contentNotificate">
                        <Tooltip
                          placement="top"
                          title={notificate.data.postTitle}
                        >
                          <h3>{notificate.data.postTitle}</h3>
                        </Tooltip>
                        <img
                          src={notificate.data.companyResource.logo}
                          alt=""
                        />
                      </div>
                      <Tooltip
                        placement="top"
                        title={notificate.data.companyResource.companyName}
                      >
                        <h5>{notificate.data.companyResource.companyName}</h5>
                      </Tooltip>
                      <ul>
                        <Tooltip
                          placement="top"
                          title={`${notificate.data.location.province.name}, ${notificate.data.location.district.name}`}
                        >
                          <li>
                            <LocationIcon />
                            <p>
                              {`${notificate.data.location.province.name}, ${notificate.data.location.district.name}`}
                            </p>
                          </li>
                        </Tooltip>
                        <li>
                          <CateIcon />
                          <p>
                            {notificate.data.category.map(
                              (cate: any, index: number) => {
                                return `${cate.child_category}${' '}`
                              }
                            )}
                          </p>
                        </li>
                      </ul>
                      <div className="time-content_keyword">
                        <div className="wrap-time">
                          <p>
                            {new Date(
                              notificate.data.createdAt
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          <p>
                            {new Date(
                              notificate.data.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <p>{notificate.data.jobType.name}</p>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={index} className="wrap-notificate_system">
                    <h3>{notificate.content_app.title}</h3>
                    <h5
                      dangerouslySetInnerHTML={{
                        __html: notificate.content_app.body,
                      }}
                    />
                    <div className="wrap-time">
                      <p>
                        {new Date(notificate.data.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </p>
                      <p>
                        {new Date(
                          notificate.data.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              }
            }
          )
        ) : (
          <div className="wrap-keyword">
            <p>
              Bạn muốn nhận danh sách công việc theo từ khóa tìm kiếm nhanh
              chóng qua:
            </p>
            <div className="wrap-checkbox_keyword">
              <div className="checkbox-keyword">
                <input type="checkbox" id="email" value="email" name="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="checkbox-keyword">
                <input type="checkbox" name="app" id="app" value="app" />
                <label htmlFor="app">APP</label>
              </div>
            </div>
            <div className="count-keyword">
              <p>
                Bạn đã lưu trữ được: <strong>3/10 </strong>
                gợi ý công việc
              </p>
            </div>

            {dataNotificationKeyword ? (
              dataNotificationKeyword?.keywords?.map((dataKeyword: any) => (
                <div className="wrap-content_keyword">
                  <div className="content_keyword">
                    <h3>{dataKeyword.keyword}</h3>
                    <ul>
                      <li>
                        <LocationIcon />
                        <p>{`${dataKeyword.province.name}, ${dataKeyword.district.name}`}</p>
                      </li>
                      <li>
                        <CateIcon />
                        <p>{`${dataKeyword.category.name}`}</p>
                      </li>
                    </ul>
                    <div className="wrap-time_keyword">
                      <p>
                        {new Date(dataKeyword.created_at).toLocaleTimeString(
                          [],
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </p>

                      <p>
                        {new Date(dataKeyword.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={input}
                    checkedChildren=""
                    unCheckedChildren=""
                    onChange={() => {
                      setInput(!input)
                    }}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      {activeKeyword ? (
        <div
          className="create-keyword"
          onClick={() => setShowCreateNotification(!showCreateNotification)}
        >
          <CreateKeywordIcon />
        </div>
      ) : (
        <></>
      )}

      {showCreateNotification ? (
        <div className="modal-keyword_notification">
          <h3>Thêm từ khoá công việc</h3>
          <FormControl sx={{ width: '100%', margin: '12px auto' }} size="small">
            <Select
              multiple
              displayEmpty
              value={location}
              input={<OutlinedInput placeholder="Quận, Tỉnh/Thành Phố" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <p style={{ color: ' #aaaaaa', padding: '4px 0' }}>
                      Quận, Tỉnh/Thành Phố
                    </p>
                  )
                } else {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value: string, i: number) => (
                        <Chip key={i} label={value} />
                      ))}
                    </Box>
                  )
                }
              }}
              MenuProps={MenuProps}
            >
              {renderOptions()}
            </Select>
          </FormControl>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Notificate
