import React, { useState } from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'
import { Collapse, Radio, Input, Button, Checkbox, Typography } from 'antd'
import './style.scss'

const { Text } = Typography

const { Panel } = Collapse

const FilterTimeJob = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState([])
  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value)
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleConfirm = () => {
    console.log(`Selected value: ${selectedValue}`)
    console.log(`Input value: ${inputValue}`)
  }

  const handleCheckboxChange = (checkedValues: any) => {
    setCheckboxValues(checkedValues)
  }
  const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }
  return (
    <Collapse
      className={`inputFilterTimeJob input-filter_nav ${
        inputValue ? 'activeTimeJob' : ''
      }`}
    >
      <Panel
        header={
          inputValue ? `${inputValue} - ${inputValue}` : `Thời gian làm việc`
        }
        key="1"
      >
        <Text className="title-filter_timeJob">Thời gian làm việc</Text>

        <Radio.Group
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
        </div>

        <Checkbox.Group
          onChange={handleCheckboxChange}
          className="filter-job_checkboxGroup"
        >
          <Checkbox value="checkbox1">Làm việc cuối tuần </Checkbox>
          <Checkbox value="checkbox2">Làm việc từ xa</Checkbox>
        </Checkbox.Group>
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
