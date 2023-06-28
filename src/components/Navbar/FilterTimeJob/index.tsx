import React, { useState } from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'
import { Collapse, Radio, Input, Button, Typography } from 'antd'

import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import './style.scss'
import { AnyMxRecord } from 'dns'

const { Text } = Typography

const { Panel } = Collapse

interface IFilterTimeJob {
  setIsWorkingWeekend: React.Dispatch<React.SetStateAction<number>>
  setIsRemotely: React.Dispatch<React.SetStateAction<number>>
  isRemotely: number
  isWorkingWeekend: number
}

const FilterTimeJob: React.FC<IFilterTimeJob> = (props) => {
  const { setIsWorkingWeekend, isWorkingWeekend, isRemotely, setIsRemotely } =
    props

  // const [selectedValue, setSelectedValue] = useState('')
  // const [inputValue, setInputValue] = useState('')
  const [checkboxIsWeekend, setCheckboxIsWeekend] = useState(0)
  const [checksetIsRemotely, setChecksetIsRemotely] = useState(0)

  // const handleRadioChange = (e: any) => {
  //   setSelectedValue(e.target.value)
  // }

  // const handleInputChange = (e: any) => {
  //   setInputValue(e.target.value)
  // }

  const handleConfirm = () => {
    // console.log(`Selected value: ${selectedValue}`)
    // console.log(`Input value: ${inputValue}`)
    setIsWorkingWeekend(checkboxIsWeekend)
    setIsRemotely(checksetIsRemotely)
  }

  // const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString)
  // }

  // const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString)
  // }

  const handleWeekendChange = (e: any) => {
    if (e.target.checked) {
      setCheckboxIsWeekend(1)
    } else {
      setCheckboxIsWeekend(0)
    }
  }

  const handleRemoteChange = (e: any) => {
    if (e.target.checked) {
      setChecksetIsRemotely(1)
    } else {
      setChecksetIsRemotely(0)
    }
  }
  return (
    <Collapse
      className={`inputFilterTimeJob input-filter_nav ${
        isRemotely || isWorkingWeekend ? 'activeTimeJob' : ''
      }`}
    >
      <Panel
        header={
          isRemotely || isWorkingWeekend
            ? `${isWorkingWeekend ? 'Làm việc cuối tuần' : ''} 
            ${isWorkingWeekend && isRemotely ? '-' : ''}
            
            ${isRemotely ? 'Làm việc từ xa' : ''}`
            : `Thời gian làm việc`
        }
        key="1"
      >
        <Text className="title-filter_timeJob">Thời gian làm việc</Text>

        {/* <Radio.Group
          value={selectedValue}
          onChange={handleRadioChange}
          className="inputFilter-grouptimeJob_radio"
        >
          <Radio value="option1">Không thời hạn</Radio>
          <Radio value="option2">Có thời hạn</Radio>
        </Radio.Group>
        <div className="group-input_dateJob">
          <DatePicker onChange={onChangeStartDate} />
          <DatePicker onChange={onChangeEndDate} />
        </div> */}

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            label="Làm việc cuối tuần"
            control={
              <Checkbox
                checked={checkboxIsWeekend === 0 ? false : true}
                onChange={handleWeekendChange}
              />
            }
          />
          <FormControlLabel
            label="Làm việc từ xa"
            control={
              <Checkbox
                checked={checksetIsRemotely === 0 ? false : true}
                onChange={handleRemoteChange}
              />
            }
          />
        </Box>
        <div className="wrap-button_filter">
          <Button type="default" onClick={handleConfirm}>
            Huỷ
          </Button>
          <Button type="primary" onClick={handleConfirm}>
            Áp dụng
          </Button>
        </div>
      </Panel>
    </Collapse>
  )
}

export default FilterTimeJob
